
import {React,useState,useEffect} from 'react';
import DisplayReviews from './displayreviews.component'
import styles from "./admin.module.css";

const Reviews = ()=>{
    const [reviews,setReviews]= useState([]);

    useEffect(()=>{ 
        getReviews();
    },[]) 

    const getReviews = async()=>{
        const res = await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/reviews`);
        const data = await res.json();
        setReviews(data);
    }

    const hide = async(event)=>{
        const value = event.target.getAttribute('value');
        await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/hide/${value}`,{method: 'POST'});
        window.location.reload();
    }
    const unhide = async(event)=>{
        const value = event.target.getAttribute('value');
        await fetch(`http://localhost:${process.env.REACT_APP_API_PORT}/api/admin/unhide/${value}`,{method: 'POST'});
        window.location.reload();
    }

    

    return(
        <div className={styles.users}>
            <h1>Reviews</h1>
        {reviews.map(review =>(
            <DisplayReviews
            key = {review._id}
            reviewer = {review.reviewer}
            rating = {review.rating}
            comments = {review.comments}
            date = {review.date_of_review}
            hidden = {review.is_hidden}
            hideReview = {hide}
            unhideReview = {unhide}
            />) 
        )}
        </div>
    )

}

export default Reviews;