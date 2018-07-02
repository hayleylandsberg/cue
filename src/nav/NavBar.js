import React, { Component } from "react"
import logo from "../images/Logo.png"
import $ from "jquery"
import profilepic from "../images/menu.png"
import "./NavBar.css"
import exportpic from "../images/export.png"
import medicineCabinet from "../images/medicine-box-dark.png"
import doctor from "../images/doctor-dark.png"
import diary from "../images/diary-dark.png"
import Search from "../search/Search"

export default class NavBar extends Component {

    // Set initial state
    state = {
        searchTerms: "",
        activeUser: localStorage.getItem("yakId")
    }

    /**
     * Local search handler, which invokes the searchHandler reference
     * passed from App
     */
    search = (e) => {
        if (e.charCode === 13) {
            Search.getResults(this.state.searchTerms)
            .then(foundItems => {
                    this.setState({ searchTerms: "" })
                    this.props.showView("results", foundItems)
                })

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

    // doSearch = () => {
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
                    placeholder="Search Your Cue"
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
                        {/* <a className="nav-link" id="nav__export"
                            onClick={this.props.viewHandler} href="#">
                            <img id="navimg__export"
                                 title="print" onClick={this.exportPage}
                                 src={exportpic} style={{ height: `30px` }} />
                        </a> */}
                        
                        <a className="nav-link" id={`nav__export__${localStorage.getItem("yakId")}`}
                            /* onClick={this.props.viewHandler}*/ href="#">
                            <img id="navimg__export"
                                 onClick={this.props.viewHandler}
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
                        <div className="menu-option"><img src={diary}></img><a title="diary" id={`nav__profile__${localStorage.getItem("yakId")}`} onClick={this.props.viewHandler} href="#"> My Diary</a></div>
                        <div className="menu-option"><img src={medicineCabinet}></img><a title="medicine-cabinet" id={`nav__medicine-cabinet__${localStorage.getItem("yakId")}`} onClick={this.props.viewHandler} href="#"> My Medicine Cabinet</a>
                        </div>
                        <div className="menu-option"><img src={doctor}></img><a title="doctor" id={`nav__doctors__${localStorage.getItem("yakId")}`} onClick={this.props.viewHandler} href="#"> My Doctors & Appts</a></div>
                    </section>
                </article>
            </nav>
        )
    }
}
