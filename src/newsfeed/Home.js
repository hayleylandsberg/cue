import React, { Component } from "react"
import "./Home.css"
import $ from "jquery"
import PostList from "./PostList";
import MedicationList from "../medication/MedicationList";
import PersonalList from "../sideNav/PersonalList";
import DoctorList from "../doctors/DoctorList"
import AppointmentList from "../appointment/AppointmentList"

export default class Home extends Component {

    state = {
        message: "",
        posts: [],
        medications: [],
        doctors: [],
        appointments: []
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

    displayAllMedications = function () {
        fetch(`http://localhost:5001/medications?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(medication => this.setState({medications: medication}))
    }.bind(this)

    displayAllDoctors = function () {
        fetch(`http://localhost:5001/doctors?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(doctor => this.setState({doctors: doctor}))
    }.bind(this)

    componentDidMount() {
        fetch(`http://localhost:5001/posts?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(posts => this.setState({ posts: posts }))
    }

render() {
    return (
        <div className="hi">
        {/* container-full */}
            <div className="row">
                <div className="personal-list">
                {/* col-sm-3 */}
                    <PersonalList activeUser={this.props.activeUser} />
                </div>

                <div className="container-full flex-home">
                <div className="diary-newsfeed col content col-sm-6">
                {/* col-sm-6 */}
                    <div className="newsfeed">
                        <form>
                            <div className="form-group">
                                <label htmlForm="message"><h4>How are you feeling today?</h4></label>
                                <div id="message-flex">
                                <textarea id="message"
                                          value={this.state.message}
                                          onChange={this.handleFieldChange}
                                          className="form-control"
                                          rows="4"></textarea>
                            <button type="button" onClick={this.postMessage} className="btn btn-info btn-lg" id="log">Log</button>
                            </div>
                            </div>
                        </form>
                        
                        <PostList posts={this.state.posts} activeUser={this.props.activeUser} />
                    </div>
                    <div>
                    <AppointmentList activeUser={this.props.activeUser} appointments={this.props.appointments} displayAllAppointments={this.props.displayAllAppointments}/>
                    </div>
                </div>
                <div className="med-doc-list col col-sm-3">
                {/* col-sm-3 */}
                    <div>
                        <MedicationList activeUser={this.props.activeUser} displayAllMedications={this.displayAllMedications} medications={this.state.medications}/>
                    </div>
                    <div>
                        <DoctorList activeUser={this.props.activeUser} displayAllDoctors={this.displayAllDoctors} doctors={this.state.doctors}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}
}

