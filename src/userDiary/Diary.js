import React, { Component } from "react"
import "./Profile.css"
import RegModalDiary from "./RegModalDiary"

/**
 * TODOs:
 *     - Only show the Like button if it's another user's post
 *     - Instead of user email, show user's first and last name
 */
export default class Diary extends Component {

    deletePost = (postId) => {
        fetch(`http://localhost:5001/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        })
        .then(() => {
            this.props.displayAllPosts()
        })
    }

    render() {
        return (
            <div className="card post">
            {/* <img className="avatar" src={require('../images/avatar1.png')}/> */}
                <div className="card-body">
                    {/* <h5 className="card-title">{this.props.post.user.firstName} {this.props.post.user.lastName}</h5> */}
                    <div className="date-close">
                    <h5>{this.props.post.date}</h5>
                    <img className="delete" src={require('../images/close.png')}onClick={()=> this.deletePost(this.props.post.id)}></img>
                    </div>
                    <p className="card-text">
                        {this.props.post.message}
                    </p>
                    <RegModalDiary post={this.props.post} displayAllPosts={this.props.displayAllPosts}/>
                    {/* <a href="#" className="btn btn-outline-success">Edit</a> */}
                </div>
            </div>
        )
    }
}
