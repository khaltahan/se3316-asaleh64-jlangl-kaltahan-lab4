//Map all the components that go into a user, this component will be rendered in users.component.js

import React from "react";
import styles from "./admin.module.css";


const DisplayReviews= ({reviewer, rating, comments, date, hidden, hideReview, unhideReview}) =>{
    


    return(
        <div className = {styles.track_row}>
            <div className = {styles.header}>
            <p>Reviewer: {reviewer}</p>
            <p>Rating: {rating}</p>
            <p>Comments: {comments}</p>
            <p>Date Posted: {date}</p>
            <p>Hidden: {hidden? "True":"False"}</p>
            {!hidden ? <button  value = {reviewer} className = {styles.search_button} onClick = {hideReview}>Hide Review</button> :
            <button  value = {reviewer} className = {styles.search_button} onClick = {unhideReview}>Un-Hide Review</button>}
            </div>
        </div>
    )
}
export default DisplayReviews;