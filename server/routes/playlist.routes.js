const router = require('express').Router();
const Playlist = require('../models/playlist.model');
const Track =  require('../models/track.model.js');
const {User} = require('../models/user.model');
const Review = require('../models/review.model');

// create playlist 
router.post('/create', async (req,res) => {
    // body data
    var user = req.body.created_by;
    var list = req.body.playlist_name;
    var list_desc = req.body.description;
    // convert string visibility value to a boolean 
    var visibility = (req.body.visibility === 'true');
    // set last changed to current date 
    var last_change = (req.body.last_change) && req.body.last_change || new Date().toISOString().split('T')[0];

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
                    is_public: visibility,
                    last_change: last_change
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

// get playlists and their information 
router.get('/all-lists', async (req,res) => {
    var lists = []
    try{
        // get user playlist and user info 
        const allLists = await Playlist.find({
            created_by: req.query.user
        });
        const user = await User.findById({
            _id: req.query.user 
        })

        // get playtime of each list if it has tracks 
        for (let i = 0; i < allLists.length; i++){
            // current list 
            var list = {
                "_id": allLists[i]._id,
                "created_by": allLists[i].created_by,
                "playlist_name": allLists[i].playlist_name,
                "tracks": allLists[i].tracks,
                "description": allLists[i].description,
                "is_public": allLists[i].is_public,
                "last_change": allLists[i].last_change
            }

            // get list reviews and calculate average rating 
            var reviews = allLists[i].reviews
            var ratings = 0
            if (reviews.length > 0){
                // calculate average rating 
                for (let i = 0; i < reviews.length; i++){
                    // get current rating and append it to list of rating 
                    const review = await Review.findOne({
                        _id: reviews[i]
                    })
                    ratings += review.rating; 
                }
            }   
            // get average rating of each list 
            list["average_rating"] = (ratings > 0) && (ratings/reviews.length) || 0 ;
            // default time of tracks 
            var totalSeconds = 0; 
            // tracks in the current playlist 
            var tracks = allLists[i].tracks;

            // check if tracks of the current playlist exist 
            if (tracks.length > 1){
                // get total amount of seconds from each track 
                for (let j =0; j < tracks.length ; j ++){
                    // current track in iteration
                    const track = await Track.findOne({
                        track_id: tracks[j]
                    })
                    if (track.track_duration !== undefined){
                        const[mins,secs] = track.track_duration.split(":").map(Number)
                        totalSeconds +=  mins * 60 + secs
                    }
                }
                // convert total playtime to minutes and seconds  
                list["playtime"] = Math.floor(totalSeconds / 60)+":"+(totalSeconds - (Math.floor(totalSeconds / 60) * 60))
                // get number of tracks of each list 
                list["track_count"] = tracks.length
                lists.push(list)
            }
            else{
                // push list with 0 playtime 
                list["playtime"] = "00:00"
                list["track_count"] = tracks.length
                lists.push(list)
            }
        }
       
        // sort the list by date of last changed
        lists.sort( (a,b) => {
            // get the date values of the stored strings 
            a.last_change = new Date (a.last_change);
            b.last_change = new Date (b.last_change);
            
            // sort by most recent modified 
            return b.last_change - a.last_change;
        })

        // return list for display 
        return res.status(200).send({
            user: user,
            lists: lists
        })
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
            // remove invalid tracks from list
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
            return res.status(200).send(list)
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

    // check if playlist is public 
    if (!listToReview.is_public){
        console.log("List is not public cannot be accessed for review")
    }
    else{
        // list is public thus can be reviewed 

        // get a reference list of reviews done on the list 
        var reviews = listToReview.reviews
        var newReviewer = true;
        var reviewToUpdate;

        // check that list has reviews , if it does not allow user to create a review if it does check that the user has not already made a review on the list 
    
        if (reviews.length > 0) {
            // reviews exist , check if user should create a new one or update one he already made 
        
            // check if user has already made a review to decide if a new review should be made or if to update their current review on the playlist 
            for (let i = 0; i < reviews.length; i++) {
                // get review object
                const review = await Review.findOne({
                    _id: reviews[i]
                })
                // check if user has already reviewed this list 
                if (review.reviewer == user){
                    // user has already made review allow them to update 
                    newReviewer = false
                    // reference the review that needs to be updated 
                    reviewToUpdate = review
                }
            }
            if (newReviewer){
                // create new review
                console.log("User has not made review on this list")
                try{
                    const review = await Review.create({
                        reviewer: user,
                        rating:rating,
                        comments:comments,
                        date_of_review:reviewDate
                    })
                    // save the review
                    review.save()
                    // add the id of the review to the playlist being reviewed (keep track of who reviewed what)
                    listToReview.reviews.push(review._id)
                    // save the playlist 
                    listToReview.save()
                } 
                catch(err){
                    return res.status(400).send(err);
                }
            }
            if(!newReviewer){
                console.log("user has made review on this list")
                // update the user's review 
                reviewToUpdate.reviewer = reviewToUpdate.reviewer;
                reviewToUpdate.rating = (rating) || reviewToUpdate.rating;
                reviewToUpdate.comments = (comments.length > 0) && comments ||  reviewToUpdate.comments;
                reviewToUpdate.date_of_review =  reviewDate;
                // save review 
                reviewToUpdate.save()
            }
        }
        else{
            // no reviews exist create one 
            // create new review 
            try{
                const review = await Review.create({
                reviewer: user,
                rating:rating,
                comments:comments,
                date_of_review:reviewDate
                })
                // save the review
                review.save()
                // add the id of the review to the playlist being reviewed (keep track of who reviewed what)
                listToReview.reviews.push(review._id)
                // save the playlist 
                listToReview.save()  
            }
            catch(err){
                return res.status(400).send(err);
            }

        }
        return res.status(200).send(listToReview);
    }
})

// view public playlists of random users 
router.get('/public-playlists', async (req,res) => {
    // list of playlists to display 
    var userLists = []

    // get user ids of users who have public playlists 
    const publicLists = await Playlist.find({
        is_public: true
    })
    
    var averageReview = 0;
    // return data for 10 of the playlists 
    // get lists from up to 10 users out of the hash map 
    for (let i = 0 ; i < 10; i ++){
        // make sure the list exists
        if (publicLists[i]){
            // when a user has been selected create the preset ist object 
            var userList = {
                "_id": publicLists[i]._id,
                "created_by": publicLists[i].created_by,
                "playlist_name": publicLists[i].playlist_name,
                "tracks": publicLists[i].tracks,
                "description": publicLists[i].description,
                "is_public": publicLists[i].is_public,
                "last_change": publicLists[i].last_change,
                "reviews":publicLists[i].reviews
            }
            // find the creator of the list 
            const creator = await User.findById( publicLists[i].created_by);
            userList["creator"] = creator.name;

            // average rating 

            // get list reviews and calculate average rating 
            var reviews = userList.reviews
            var ratings = 0;
            if (reviews.length > 0){
                // calculate average rating 
                for (let i = 0; i < reviews.length; i++){
                    // get current rating and append it to list of rating 
                    const review = await Review.findOne({
                        _id: reviews[i]
                    })
                    ratings += review.rating; 
                }
            }   
            // get average rating of each list 
            userList["average_rating"] = (ratings > 0) && (ratings/reviews.length) || 0 ;


            // get track count , and platime of the current public list

            // playlist tracks 
            const tracks = userList.tracks
            // number of tracks 
            userList["track_count"] = tracks.length
            // average playtime 
            if (tracks.length > 0){
                // get total amount of seconds from each track 
                    for (let j =0; j < tracks.length ; j ++){
                        // current track in iteration
                        const track = await Track.findOne({
                            track_id: tracks[j]
                        })
                        if (track.track_duration !== undefined){
                            const[mins,secs] = track.track_duration.split(":").map(Number)
                            totalSeconds +=  mins * 60 + secs
                        }
                    }
                // convert total playtime to minutes and seconds  
                userList["playtime"] = Math.floor(totalSeconds / 60)+":"+(totalSeconds - (Math.floor(totalSeconds / 60) * 60))
            }
            else{
                userList["track_count"] = 0
                userList["playtime"] = "00:00"
            }
            // push public list for display
            userLists.push(userList);

            // sort playlist by date
            userLists.sort( (a,b) => {
                // get the date values of the stored strings 
                a.last_change = new Date (a.last_change);
                b.last_change = new Date (b.last_change);
                
                // sort by most recent modified 
                return b.last_change - a.last_change;
            })
            
        }
    }
    return res.status(200).send({
        lists:userLists
    })
}) 

module.exports = router;