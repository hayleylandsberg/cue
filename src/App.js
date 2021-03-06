import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import $ from "jquery"
import NavBar from './nav/NavBar';
import Home from './newsfeed/Home';
import Login from './auth/Login';
import SearchResults from './search/SearchResults';
import Profile from "./userDiary/Profile"
import Register from "./auth/Register"
import RegModal from "./auth/RegModal"
import MyDoctors from "./MyDoctors/MyDoctors";
import MyCabinet from "./MyCabinet/MyCabinet";
import Print from "./print/Print"

class App extends Component {

    // Set initial state
    state = {
        currentView: "login",
        searchTerms: "",
        activeUser: localStorage.getItem("yakId"),
        userProfile: localStorage.getItem("yakId"),
        viewProps: {},
        medications: [],
        posts: [],
        doctors: [],
        appointments: [],
        viewProps: {
            randomizer: Date.now()
        }
    }

    // Search handler -> passed to NavBar
    performSearch = function (terms) {
        this.setState({
            searchTerms: terms,
            currentView: "results"
        })
    }.bind(this)

    resetMeds = () => {
        const falseMeds = []

        this.state.medications.forEach(med => {
            console.log(med)
            falseMeds.push(fetch(`http://localhost:5001/medications/${med.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        takenMeds: false
                    })
                })
            )
        })
        return Promise.all(falseMeds)
    }

    displayAllPosts = function () {
        fetch(`http://localhost:5001/posts?&userId=${this.state.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(post => this.setState({posts: post}))
    }.bind(this)

    displayAllMedications = function () {
        fetch(`http://localhost:5001/medications?&userId=${this.state.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(medication => this.setState({medications: medication}))
    }.bind(this)

    displayAllDoctors = function () {
        fetch(`http://localhost:5001/doctors?&userId=${this.state.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(doctor => this.setState({doctors: doctor}))
    }.bind(this)

    displayAllAppointments = function () {
        fetch(`http://localhost:5001/appointments?&userId=${this.state.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(appointment => this.setState({appointments: appointment}))
    }.bind(this)
    
    // Function to update local storage and set activeUser state
    setActiveUser = (val) => {
        if (val) {
            localStorage.setItem("yakId", val)
        } else {
            localStorage.removeItem("yakId")
        }
        this.setState({
            activeUser: val
        })
    }

    // View switcher -> passed to NavBar and Login
    // Argument can be an event (via NavBar) or a string (via Login)
    showView = function (e, ...props) {
        let view = null
        let user = this.state.userProfile
        // Click event triggered switching view
        if (e.hasOwnProperty("target")) {
            view = e.target.id.split("__")[1]
            if(e.target.id.split("__").length > 2){
                user = e.target.id.split("__")[2]
            }
            // View switch manually triggered by passing in string
        } else {
            view = e
        }

        // If user clicked logout in nav, empty local storage and update activeUser state
        if (view === "logout") {
            this.setActiveUser(null)
        }

        if(view === "profile"){
            this.setState({
                userProfile: user
            })
        }
        
        // Update state to correct view will be rendered
        this.setState({
            currentView: view,
            viewProps: Object.assign({}, ...props)
        })

    }.bind(this)


    changeDivImage = function() {
        $("body").toggleClass("on");
    }.bind(this)
    /*
        Function to determine which main view to render.

        TODO:
            1. Profile view
            2. Register view
            3. Create event view
    */
    View = () => {
        if (localStorage.getItem("yakId") === null) {
            return <Login showView={this.showView} setActiveUser={this.setActiveUser} />
        } else {
            switch (this.state.currentView) {
                case "logout":
                    return <Login showView={this.showView} setActiveUser={this.setActiveUser} changeDivImage= {this.changeDivImage} />
                case "results":
                    return <SearchResults terms={this.state.searchTerms} showView={this.showView} {...this.state.viewProps}/>
                case "profile":
                    return <Profile user={this.state.userProfile} activeUser={this.state.activeUser} posts={this.state.posts}/>
                case "medicine-cabinet":
                    return <MyCabinet user={this.state.userProfile} activeUser={this.state.activeUser} displayAllMedications={this.displayAllMedications} medications={this.state.medications} resetMeds={this.resetMeds} showView = {this.showView} 
                    key={this.state.viewProps.randomizer}
                     />
                case "doctors":
                    return <MyDoctors user={this.state.userProfile} activeUser={this.state.activeUser} displayAllDoctors={this.displayAllDoctors} doctors={this.state.doctors} displayAllAppointments={this.displayAllAppointments} appointments={this.state.appointments}/>
                case "export":
                    return <Print user={this.state.userProfile} activeUser={this.state.activeUser} displayAllDoctors={this.displayAllDoctors} doctors={this.state.doctors} displayAllAppointments={this.displayAllAppointments} appointments={this.state.appointments} posts={this.state.posts} displayAllMedications={this.displayAllMedications} medications={this.state.medications} displayAllPosts={this.displayAllPosts} />
                case "home":
                default:
                    return <Home activeUser={this.state.activeUser} appointments={this.state.appointments} displayAllAppointments={this.displayAllAppointments} />
            }
        }
    }

    render() {
        return (
            <article>
                <NavBar viewHandler={this.showView}
                    searchHandler={this.performSearch}
                    activeUser={this.state.activeUser}
                    setActiveUser={this.setActiveUser}
                    showView={this.showView}
                />

                {this.View()}
            </article>
        )
    }
}

export default App
