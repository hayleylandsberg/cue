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


class App extends Component {

    // Set initial state
    state = {
        currentView: "login",
        searchTerms: "",
        activeUser: localStorage.getItem("yakId"),
        userProfile: localStorage.getItem("yakId"),
        viewProps: {}
    }

    // Search handler -> passed to NavBar
    performSearch = function (terms) {
        this.setState({
            searchTerms: terms,
            currentView: "results"
        })
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
                    return <Profile user={this.state.userProfile} />
                case "home":
                default:
                    return <Home activeUser={this.state.activeUser} />
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
                />

                {this.View()}
            </article>
        )
    }
}

export default App
