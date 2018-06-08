import React, { Component } from "react"
import "./SearchResults.css"
import Avatar from "../images/avatar.png"
import "../newsfeed/Post.css"


export default class SearchResults extends Component {

    // Set initial state
    state = {
        posts: [],
        users: [],
        events: []
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.terms !== nextProps.terms
    // }

    componentDidUpdate(){
        const newState = {}
        fetch(`http://localhost:5001/posts?message_like=${encodeURI(this.props.terms)}&_expand=user`)
            .then(r => r.json())
            .then(posts => {
                newState.posts = posts
                return fetch(`http://localhost:5001/users?q=${encodeURI(this.props.terms)}`)
            })
            .then(r => r.json())
            .then(users => {
                newState.users = users
                this.setState(newState)
            })
    }

    componentDidMount() {
        const newState = {}
        fetch(`http://localhost:5001/posts?message_like=${encodeURI(this.props.terms)}&_expand=user`)
            .then(r => r.json())
            .then(posts => {
                newState.posts = posts
                return fetch(`http://localhost:5001/users?q=${encodeURI(this.props.terms)}`)
            })
            .then(r => r.json())
            .then(users => {
                newState.users = users
                this.setState(newState)
            })
    }

    render() {
        return (
            <div className="searchResults">
                <h1>Search Results for {`"${this.props.terms}"`}</h1>

                {
                    this.state.posts.map(p =>
                        <div className="card post" key={p.id}>
                            <div className="card-body">
                                <h5 className="card-title">{p.user.firstName} {p.user.lastName}</h5>
                                <p className="card-text">
                                    {p.message}
                                </p>
                                <a href="#" className="btn btn-outline-success">Like</a>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.users.map(u =>
                        <div className="card post" key={u.id}>
                            <img className="card-img-top avatar" src={Avatar} alt="Generic person image" />
                            <div className="card-body">
                                <h5 className="card-title">{u.firstName} {u.lastName}</h5>
                                <h6 className="card-title">{u.email}</h6>
                                <a href="#" className="btn btn-outline-success" id={`results__profile__${u.id}`} onClick={this.props.showView}>View profile</a>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
