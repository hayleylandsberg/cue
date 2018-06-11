import React, { Component } from "react"
import "./Doctors.css"


export default class Doctor extends Component {

    render() {
        return (
            <div className="doctor">
                <h5>{this.props.doctor.name}</h5>
                <div className="contact">
                <p>{this.props.doctor.specialty}</p>
                <p>{this.props.doctor.address}</p>
                <p>{this.props.doctor.phoneNumber}</p>
                </div>
            </div>
        )
    }
}
