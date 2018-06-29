import React, { Component } from "react"
import "./Appointments.css"


export default class AppointmentsDash extends Component {

    render() {
        return (
            <div className="appointment-dash">
            <div className="doctor-calendar-dash">
                <h6>{this.props.appointment.appointmentDate}</h6>
                <h6>{this.props.appointment.appointmentTime}</h6>
            </div>
                <div id="contact-calendar-dash">
                    <div className="contact-dash">
                        <p>{this.props.appointment.doctorName}</p>
                        <p>{this.props.appointment.doctorSpecialty}</p>
                        {/* <p>{this.props.appointment.doctorFacility}</p>
                        <p>{this.props.appointment.doctorAddress}</p> */}
                        <p>{this.props.appointment.doctorPhone}</p>
                    </div>
                </div>
            </div>
        )
    }
}
