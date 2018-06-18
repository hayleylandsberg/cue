import React, { Component } from "react"
import Diary from "./Diary"
import "./DiaryList.css"


export default class DiaryList extends Component {
    render() {
        return (
            <div className="postList">
                <h1 className="postList__header">Diary Entries</h1>
                <div id="diaryList-profile">
                {
                    this.props.posts.map(p => <Diary key={p.id} post={p} />)
                }
                </div>
            </div>
        )
    }
}