import React, { Component } from "react"
import "./Home.css"
import $ from "jquery"
import PostList from "./PostList";
import MedicationList from "../medication/MedicationList";
import PersonalList from "../sideNav/PersonalList";
import DoctorList from "../doctors/DoctorList"

export default class Home extends Component {

    state = {
        message: "",
        posts: []
    }

    postMessage = (text) => fetch("http://localhost:5001/posts", {
        method: "POST",
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

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(posts => this.setState({ posts: posts }))
    }

render() {
    return (
        <div className="container-full">
            <div className="row">
                <div className="col col-sm-3">
                    <PersonalList activeUser={this.props.activeUser} />
                </div>
                <div className="col content col-sm-6">
                    <div className="newsfeed">
                        <form>
                            <div className="form-group">
                                <label htmlForm="message"><h5>How are you feeling today?</h5></label>
                                <textarea id="message"
                                          value={this.state.message}
                                          onChange={this.handleFieldChange}
                                          className="form-control"
                                          rows="4"></textarea>
                            </div>
                            <button type="button" onClick={this.postMessage} className="btn btn-info btn-lg">Log</button>
                        </form>

                        <PostList posts={this.state.posts} activeUser={this.props.activeUser} />
                    </div>
                </div>
                <div className="col col-sm-3">
                    <div>
                        <MedicationList activeUser={this.props.activeUser} />
                    </div>
                    <div>
                        <DoctorList activeUser={this.props.activeUser} />
                    </div>
                </div>
            </div>
        </div>



    )
}
}

