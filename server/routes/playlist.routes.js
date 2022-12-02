const router = require('express').Router();
const Playlist = require('../models/playlist.model');
const Track =  require('../models/track.model.js');
const Review = require('../models/review.model');


// create playlist 
router.post('/create', async (req,res) => {
    // body data
    var user = req.body.created_by;
    var list = req.body.playlist_name;
    var list_desc = req.body.description;
    // convert string visibility value to a boolean 
    var visibility = (req.body.visibility === 'true');

    // get all current users list 
    const userLists = await Playlist.find(
        {created_by: user}
    )
    
    // ensure user has not exceeded list creation limits 
    if (userLists.length < 20){
        try{
            const listToCreate = await Playlist.countDocuments({
                created_by: user,
                playlist_name: list
            })
            
            // if list does'nt exist allow them to create it
            if (listToCreate < 1) {
                // create list with given details 
                const newList = new Playlist({
                    created_by: user,
                    playlist_name: list,
                    description: list_desc,
                    is_public: visibility
                });

                // save list creation 
                await newList.save();
        
                // send success response and playlist object 
                return res.status(200).send({
                    message: 'Playlist created successfully',
                    data: newList
                })
            }
            else{
                // suggest different name or to populate current list   
                return res.status(400).send({
                    message:"List already exist add tracks or create a new list"
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        // let user know they exceeded list creation
        res.status(400).send({
            message:"You have exceeded list limits"
        })
    }
})

// delete playlist  
router.delete('/delete', async(req,res) => {
    // find list to delete
    const listToDelete = await Playlist.find({
        playlist_name: req.body.playlist_name
    })

    // check if user attempting to delete list was the one who created the list 
    if (req.body.user === listToDelete[0].created_by.toString()){
        // allow the deletion 
        try{
            await Playlist.deleteOne({
                playlist_name: req.body.playlist_name 
            });    
    
            // return result 
            res.status(200).send({
                message:"List Has Been Deleted",
                data:listToDelete
            })
        }
        catch(error){
            return res.status(400).send({
                message: "400 Invalid Request, List to delete could potentially not exist or already been deleted"
            })
        }
    }
    else{
        return res.status(400).send({
            message:"Invalid Permission, Please Register or log in"
        })
    }   
})

// get playlists 
router.get('/all-lists', async (req,res) => {
    // return lists of the user requesting lists and not other users 
    try{
        const allLists = await Playlist.find({
            created_by: req.query.user
        });

        return res.send(allLists);
    }
    catch(err){
        console.log(err)
    }
})

// show information about a playlist 
router.get('/view', async (req,res) => {
    // get user and list they are trying to view 
    const user = req.query.user;
    const list = req.query.list;

    var listTracks = [];
    // query the list 
    const listToView = await Playlist.findOne({
        created_by: user,
        _id: list
    }) 
    // if playlist has tracks map the ids to numbers for reference, else return tracks as empty 
    if (listToView.tracks){
        const tracks = listToView.tracks.map(Number)

        // for every track store it for return 
        for (let i=0; i < tracks.length; i++){
            const track = await Track.findOne({
                trackId: tracks[i]
            })
            listTracks.push(track)
        }

        // on success return the playlist and the tracks that belong in it 
        return res.status(200).send({
            playlist:listToView,
            tracks:listTracks
        })
    }
    else{
        listTracks = []
    }
})

// edit playlist route 
router.put('/edit', async (req, res) => {
    // get query values
    const listName = req.body.list;
    const user = req.body.user; 

    // get body values for list editing 
    const newName = req.body.newName; 
    const newDescription = req.body.description;
    const newVisibility = req.body.visibility; 
    var newTracks = req.body.tracks;
    // get date of change 
    const dateChanged = new Date().toISOString().split('T')[0]

    // sanitize track input to get rid of any track ids  that do not exist 
    for (let i=0; i < newTracks.length; i++){
        const track = await Track.findOne(
            {track_id:newTracks[i]}
        );
        // check if the id is vlaid 
        if (!track){
            // remove track if from list  
            newTracks.splice(i, 1)
        }
    }

    // change tracks to number of array 
    newTracks = newTracks.map(Number)
    // get list of user lists 
    const userLists = await Playlist.find({
        created_by: user,
    })
    var listNames = []
    for (let i=0; i < userLists.length; i++) {
        listNames.push(userLists[i].playlist_name);
    }

    // validate user input and check if they are allowed to edit list 
    try{
        // get the list and make sure the user who created it is assigned 
        const list = await Playlist.findOne({
            created_by: user,
            playlist_name: listName,
        })

        // ensure there is a list to edit 
        if (list){

            // change values if they are provided by user 
            list.playlist_name = (newName.length > 0) && newName || listName;
            list.last_change = dateChanged 
            list.description = (newDescription.length > 0) && newDescription || list.description;
            list.is_public = newVisibility
            list.tracks = (newTracks.length > 0) && newTracks || list.tracks
            await list.save();

            const change = await Playlist.findOne({
                created_by: user,
            })
            return res.status(200).send(change)
        }
        else{
            return res.status(400).send({
                message:"User Cannot Edit List, Invalid Permission",
            })
        }   
    }
    catch(err) {
        return res.send(err)
    }
})

// route to add review to public playlists 
router.post('/add-review', async (req, res) => {
    // request data for playlist 
    const user = req.body.user
    const list = req.body.list

    // request data for review 
    const rating = req.body.rating
    const comments = req.body.comments
    const reviewDate = new Date().toISOString().split('T')[0]

    // get the list to review 
    const listToReview = await Playlist.findOne({
        _id:list,
    })

    // check if playlist is allowed to be reviewed
    if (!listToReview.is_public){
        console.log("List is not public cannot be accessed for review")
    }
    else{
        // allow review to be done 

        // create a review object 
        const listReview = await Review.create({
            reviewer:user,
            rating:rating,
            comments:comments,
            date_of_review:reviewDate,
        })

        // add the reviews object's id to the list for reference 
        listToReview.review = listReview._id
        await listToReview.save();
    }
})

module.exports = router;