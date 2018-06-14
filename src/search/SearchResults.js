import React, { Component } from "react"
import "./SearchResults.css"
import Avatar from "../images/avatar.png"
import "../newsfeed/Post.css"


export default class SearchResults extends Component {

    // Set initial state
    state = {
        posts: [],
        users: [],
        doctors: [],
        medications: []
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.terms !== nextProps.terms
    // }

    // componentDidUpdate(){
    //     const newState = {}
    //     fetch(`http://localhost:5001/posts?message_like=${encodeURI(this.props.terms)}&userId=${this.props.activeUser}&_expand=user`)
    //         .then(r => r.json())
    //         .then(posts => {
    //             newState.posts = posts
    //             return fetch(`http://localhost:5001/medications?q=${encodeURI(this.props.terms)}`)
    //         })
    //         .then(r => r.json())
    //         .then(medications => {
    //             newState.medications = medications
    //             return fetch(`http://localhost:5001/doctors?q=${encodeURI(this.props.terms)}&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
    //         })
    //         .then(r => r.json())
    //         .then(doctors => {
    //             newState.doctors = doctors
    //             this.setState(newState)
    //         })
    // }

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
                                <a href="#" className="btn btn-outline-success">Edit</a>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.medications.map(m =>
                        <div className="card post" key={m.id}>
                            {/* {image} */}
                            <div className="card-body">
                                <h5 className="card-title">{m.name}</h5>
                                <div className="card-info">
                                <p>{m.dosage}</p> 
                                <p>{m.frequency}</p> 
                                <p>{m.rxNumber}</p>
                            </div>
                                <a href="#" className="btn btn-outline-success" id={`results__profile__${m.id}`} onClick={this.props.showView}>View Medicine Cabinet</a>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.doctors.map(d =>
                        <div className="card post" key={d.id}>
                            {/* {image} */}
                            <div className="card-body">
                                <h5 className="card-title">{d.name}</h5>
                                <div className="card-info-doc">
                                <p>{d.specialty}</p> 
                                <p>{d.address}</p> 
                                <p>{d.phoneNumber}</p>
                            </div>
                                <a href="#" className="btn btn-outline-success" id={`results__profile__${d.id}`} onClick={this.props.showView}>See All Doctors</a>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
