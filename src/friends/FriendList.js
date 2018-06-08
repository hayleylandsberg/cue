import React, { Component } from "react"
import "./Friend.css"

export default class FriendList extends Component {

    render() {
        return (
            <div id="sideNav">
            <img className="avatarLarge" src={require('../images/avatar1.png')}/>
            <h4 id="activeUserName">active user</h4>
            <div className="flexIcons"><img src={require('../images/first-aid-case.png')}/>
            <a><h5>Medicine Cabinet</h5></a></div>
            <div className="flexIcons"><img src={require('../images/diary.png')}/> 
            <a><h5>Diary</h5></a></div>
            <div className="flexIcons"><img src={require('../images/doctor1.png')}/>
            <a><h5>Doctors</h5></a></div>
            </div>
        )
    }
}
