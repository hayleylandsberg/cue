import React, { Component } from "react"
import "./Home.css"
import $ from "jquery"
;

export default class Archive extends Component {

    state = {
        message: "",
        posts: [],
        medications: [],
        doctors: []
    }
postMessage = (text) => fetch(`http://localhost:5001/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: this.state.message,
            userId: this.props.activeUser,
            date: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now())
        })
    })
    .then(() => {
        return fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
    })
    .then(r => r.json())
    .then(posts => {
        this.setState({
            message: "",
            posts: posts
        })
    })
}