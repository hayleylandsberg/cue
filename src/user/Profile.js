import React, { Component } from "react"
import "./Profile.css"

export default class Profile extends Component{

    state = {
        user: {}
    }

    componentDidMount(){
        fetch(`http://localhost:5001/users?id=${this.props.user}`).then(r => r.json()).then(userData => {
            this.setState({user: userData[0]})
        })
    }

    render(){
        return(
            <div>
                <h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
                <h2>{this.state.user.city}, {this.state.user.state}</h2>
            </div>
        )
    }
}