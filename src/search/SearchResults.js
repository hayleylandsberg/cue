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

    hours = (time) => {
        let hours = time[0] + time[1];
        let min = time[3] + time[4];
        if (hours < 12) {
            return hours + ':' + min + ' AM';
        } else {
            hours=hours - 12;
            hours=(hours.length < 10) ? '0'+hours:hours;
            return hours+ ':' + min + ' PM';
        }
    }

    date = (date) => {
        let month = date[5] + date[6];
        let day = date[8] + date[9];
        let year = date[0] + date[1] + date[2] + date[3];
        return month + "/" + day + "/" + year;
    }

    showProfile = (e) => {
        const id = e.target.id.split("--")[1]
        this.props.showView("profile", {userId: id})
    }

    render() {
        return (
            <div className="searchResults">
                <h1>Search Results</h1>
                <div id="columns">
            <div id="firstColumn">
                <h3 className="search-heading">Diary Entries</h3>
                {
                    this.props.foundItems.posts.map(p =>
                        <div className="card post" key={p.id}>
                            <div className="card-body">
                                <h5 className="card-title">By {p.date}</h5>
                                <p className="card-text">
                                    {p.message}
                                </p>
                                {/* <a href="#" className="btn btn-outline-success">Like</a> */}
                            </div>
                        </div>
                    )
                }
                <h3 className="search-heading">Medications</h3>
                {
                    this.props.foundItems.medications.map(m =>
                        <div className="card post" key={m.id}>
                            <div className="card-body">
                                <h5 className="card-title">{m.name}</h5>
                                <div className="card-med-descriptions">
                                <p>Dosage</p>
                                <p>Frequency</p>
                                <p>Rx Number</p>
                                </div>
                                <div className="card-information-search">
                                <p>{m.dosage}</p>
                                <p>{m.frequency}</p>
                                <p>{m.rxNumber}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                <div id="secondColumn">
                <h3 className="search-heading">Appointments</h3>
                {
                    this.props.foundItems.appointments.map(a =>
                        <div className="card post" key={a.id}>
                            <div className="card-body">
                                <h5 className="card-title">{this.date(a.appointmentDate)}</h5>
                                <h6>{this.hours(a.appointmentTime)}</h6>
                                <div className="">
                                <p>{a.doctorSpecialty}</p>
                                <p>{a.doctorFacility}</p>
                                <p>{a.doctorAddress}</p>
                                <p>{a.doctorPhone}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                <h3 className="search-heading">Doctors</h3>
                {
                    this.props.foundItems.doctors.map(d =>
                        <div className="card post" key={d.id}>
                            <div className="card-body">
                                <h5 className="card-title">{d.name}</h5>
                                <div className="">
                                <p>{d.specialty}</p>
                                <p>{d.facility}</p>
                                <p>{d.address}</p>
                                <p>{d.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                </div>
            </div>
        )
    }
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

//     render() {

//         return (
//             <div className="searchResults">
//                 <h1>Search Results for {`"${this.props.terms}"`}</h1>

//                 {
//                     this.state.posts.map(p =>
//                         <div className="card post" key={p.id}>
//                             <div className="card-body">
//                                 <h5 className="card-title">{p.user.firstName} {p.user.lastName}</h5>
//                                 <p className="card-text">
//                                     {p.message}
//                                 </p>
//                                 <a href="#" className="btn btn-outline-success">Edit</a>
//                             </div>
//                         </div>
//                     )
//                 }

//                 {
//                     this.state.medications.map(m =>
//                         <div className="card post" key={m.id}>
//                             {/* {image} */}
//                             <div className="card-body">
//                                 <h5 className="card-title">{m.name}</h5>
//                                 <div className="card-info">
//                                 <p>{m.dosage}</p> 
//                                 <p>{m.frequency}</p> 
//                                 <p>{m.rxNumber}</p>
//                             </div>
//                                 <a href="#" className="btn btn-outline-success" id={`results__profile__${m.id}`} onClick={this.props.showView}>View Medicine Cabinet</a>
//                             </div>
//                         </div>
//                     )
//                 }

//                 {
//                     this.state.doctors.map(d =>
//                         <div className="card post" key={d.id}>
//                             {/* {image} */}
//                             <div className="card-body">
//                                 <h5 className="card-title">{d.name}</h5>
//                                 <div className="card-info-doc">
//                                 <p>{d.specialty}</p> 
//                                 <p>{d.address}</p> 
//                                 <p>{d.phoneNumber}</p>
//                             </div>
//                                 <a href="#" className="btn btn-outline-success" id={`results__profile__${d.id}`} onClick={this.props.showView}>See All Doctors</a>
//                             </div>
//                         </div>
//                     )
//                 }
//             </div>
//         )
//     }
// }
