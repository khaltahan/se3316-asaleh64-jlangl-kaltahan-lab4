import React from 'react';
import styles from '../../styles/generalsearch.module.css'

const PublicLists = () =>{

    return(
        <div class = {styles.track_list}>
            <div> 
                <input placeholder = "List Name" type="text" id = "create-list"/>
                        <button id = "create-list-button">Create</button>
            </div>
                <table id = "lists" class = {styles.display_list}>
                </table>
        </div>
    )

}

export default PublicLists;