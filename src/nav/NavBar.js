import React, { Component } from "react"
import logo from "../images/Logo.png"
import $ from "jquery"
import profilepic from "../images/settings.png"
import "./NavBar.css"
import exportpic from "../images/export.png"


export default class NavBar extends Component {

    // Set initial state
    state = {
        searchTerms: ""
    }

    /**
     * Local search handler, which invokes the searchHandler reference
     * passed from App
     */
    search = (e) => {
        if (e.charCode === 13) {
            this.props.searchHandler(this.state.searchTerms)
            this.setState({ searchTerms: "" })
        }
    }

    LoginLogout = () => {
        if (this.props.activeUser === null) {
            return <a className="nav-link" id="nav__login"
                onClick={this.props.viewHandler} href="#">Login</a>
        } else {
            return <a className="nav-link" id="nav__logout"
                onClick={this.props.viewHandler} href="#">Logout</a>
        }
    }

    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render() {
        return (
            <nav className="navbar navbar-light fixed-top white flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" onClick={this.props.viewHandler} href="#">
                    <img id="nav__home" src={logo} style={{ height: `50px` }} />
                </a>
                <input id="searchTerms"
                    value={this.state.searchTerms}
                    onChange={this.handleFieldChange}
                    onKeyPress={this.search}
                    className="form-control w-100"
                    type="search"
                    placeholder="Search Your Diary"
                    aria-label="Search" />
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" id="nav__profile"
                            /* onClick={this.props.viewHandler}*/ href="#">
                            <img id="navimg__profile"
                                 onClick={()=>$(".profileMenu").slideToggle(333)}
                                 src={profilepic} style={{ height: `30px` }} />
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <a className="nav-link" id="nav__export"
                            /* onClick={this.props.viewHandler}*/ href="#">
                            <img id="navimg__export"
                                 onClick={()=>$("#").slideToggle(333)}
                                 src={exportpic} style={{ height: `30px` }} />
                        </a>
                    </li>
                </ul>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <this.LoginLogout />
                    </li>
                </ul>
                <article className="profileMenu">
                    <section className="profileMenu__item">
                        <div><a title="notifications" id="nav__notifications" href="#">Notifications</a></div>
                        <div><a title="notifications" id={`nav__profile__${localStorage.getItem("yakId")}`} onClick={this.props.viewHandler} href="#">My Profile</a></div>
                        <div><a title="notifications" id="nav__followers" href="#">My Followers</a></div>
                        <div><a title="notifications" id="nav__friends" href="#">My Friends</a></div>
                    </section>
                </article>
            </nav>
        )
    }
}
