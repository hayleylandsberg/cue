import React, { Component } from "react"
import "./Profile.css"
import DiaryList from "./DiaryList";


export default class Profile extends Component{
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
            <div className="row-profile">
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

                        <DiaryList posts={this.state.posts} activeUser={this.props.activeUser} />
                    </div>
                    </div>
                    </div>
                    </div>
                    )}}


                    //     state = {
//         user: {}
//     }

//     componentDidMount(){
//         fetch(`http://localhost:5001/users?id=${this.props.user}`).then(r => r.json()).then(userData => {
//             this.setState({user: userData[0]})
//         })
//     }

//     render(){
//         return(
//             <div>
//                 <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
//                 <h2>{this.state.user.city}, {this.state.user.state}</h2>
//             </div>
//         )
//     }
// }