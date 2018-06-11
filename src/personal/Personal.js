import React, { Component } from "react"
// import "./Medication.css"


export default class Personal extends Component {

    render() {
        return (
            <div className="personal">
                <h5>{this.props.users.firstName} {this.props.users.lastName}</h5>
            </div>
        )
    }
}
