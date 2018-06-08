import React, { Component } from "react"
import Post from "./Post"
import "./PostList.css"


export default class PostList extends Component {
    render() {
        return (
            <div className="postList">
                <h1 className="postList__header">Stories</h1>
                {
                    this.props.posts.map(p => <Post key={p.id} post={p} />)
                }
            </div>
        )
    }
}
