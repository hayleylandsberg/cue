import React, { Component } from "react"
import "./login.css"
import Register from "./Register.js"
import RegModal from "./RegModal"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        register: false
    }

    // Update state whenever an input field is edited
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this)

    register = function(){
        if(this.state.register === true){
            this.setState({register: false})
        }else{
            this.setState({register: true})
        }
    }.bind(this)

    // Handle for login submit
    handleLogin = function (e) {
        e.preventDefault()
        // Determine if a user already exists in API
        fetch(`http://localhost:5001/users?email=${this.state.email}`)
            .then(r => r.json())
            .then(user => {
                // User exists. Set local storage, and show home view
                if (user.length > 0) {
                    if(user[0].password === this.state.password){
                        this.props.setActiveUser(user[0].id)
                        this.props.showView("home")
                    }else{
                        alert("Incorrect password!")
                     }
                // User doesn't exist
                } else{
                    alert("This user does not exist, feel free to sign up!")
                }
            })



    }.bind(this)


    /*
        TODO:
            - Add first name field
            - Add last name field
            - Add password verification field
    */
    render() {
        return (
            <form className="form-signin" onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal h1-large">Welcome to <b>Cue.</b></h1>
                <p className="h3 mb-3 font-weight-normal">The Easiest Way to Manage Your Medical Needs.</p>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
                <div className="checkbox mb-3">
                    <input type="checkbox" value="remember-me" /> Remember me
                </div>
                <button className="btn btn-lg btn-block btn-gray" type="submit">Sign in</button>
                <div><RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser}/></div>
                <p className="mt-5 mb-3 text-muted">Cue. All Content © 2018</p>
            </form>


        )
    }
}
