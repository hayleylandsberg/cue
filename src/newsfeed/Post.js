import React, { Component } from "react"
import "./Post.css"
import RegModalPost from "./RegModalPost"

/**
 * TODOs:
 *     - Only show the Like button if it's another user's post
 *     - Instead of user email, show user's first and last name
 */
export default class Post extends Component {

    render() {
        return (
            <div className="card post">
            {/* <img className="avatar" src={require('../images/avatar1.png')}/> */}
                <div className="card-body">
                    {/* <h5 className="card-title">{this.props.post.user.firstName} {this.props.post.user.lastName}</h5> */}
                    <h5>{this.props.post.date}</h5>
                    <p className="card-text">
                        {this.props.post.message}
                    </p>
                    {/* <RegModalPost post={this.props.post}/> */}
                    {/* <a href="#" className="btn btn-outline-success" onClick={this.editPost()}>Edit</a> */}
                </div>
            </div>
        )
    }
}
