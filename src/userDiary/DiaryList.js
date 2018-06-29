import React, { Component } from "react"
import Diary from "./Diary"
import "./DiaryList.css"
import PersonalList from "../sideNav/PersonalList"



export default class DiaryList extends Component {
    render() {
        return (
            <div>
            <PersonalList activeUser={this.props.activeUser} />
            <div className="postList">
                <h1 className="postList__header">Diary Entries</h1>
                <div id="diaryList-profile">
                {
                    this.props.posts.map(p => <Diary key={p.id} post={p} displayAllPosts={this.props.displayAllPosts}/>)
                }
                </div>
            </div>
            </div>
        )
    }
}
