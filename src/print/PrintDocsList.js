import React, { Component } from "react"
import "./Print.css"


export default class PrintDocsList extends Component {

    render() {
        return (
            <div className="doctor-print">
                <h5>{this.props.doctor.name}</h5>
                <div className="contact">
                <p>{this.props.doctor.specialty}</p>
                <p>{this.props.doctor.facility}</p>
                <p>{this.props.doctor.address}</p>
                <p>{this.props.doctor.phoneNumber}</p>
                </div>
            </div>
        )
    }
}
