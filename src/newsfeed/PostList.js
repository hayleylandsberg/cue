import React, { Component } from "react"
import Post from "./Post"
import "./PostList.css"


export default class PostList extends Component {
    render() {
        return (
            <div className="postList">
                <h4 className="postList__header">Diary Entries</h4>
                <div id="diaryList">
                {
                    this.props.posts.map(p => <Post key={p.id} post={p} />)
                }
                </div>
            </div>
        )
    }
}
