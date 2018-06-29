import React, { Component } from "react"
import "./Appointments.css"


export default class Appointments extends Component {
        
    deleteAppointment = (appointmentId) => {
        fetch(`http://localhost:5001/appointments/${appointmentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        })
        .then(() => {
            this.props.displayAllAppointments()
        })
    }

    render() {
        return (
            <div className="appointment-md">
            <div className="doctor-calendar-md">
                <h5>{this.props.appointments.appointmentDate}</h5>
                <h5>{this.props.appointments.appointmentTime}</h5>
                <img className="delete" src={require('../images/close.png')}onClick={()=> this.deleteAppointment(this.props.appointments.id)}></img>
            </div>
                <div id="contact-calendar">
                    <div className="contact-md">
                        <p>{this.props.appointments.doctorName}</p>
                        <p>{this.props.appointments.doctorSpecialty}</p>
                        <p>{this.props.appointments.doctorFacility}</p>
                        <p>{this.props.appointments.doctorAddress}</p>
                        <p>{this.props.appointments.doctorPhone}</p>
                    </div>
                </div>
            </div>
        )
    }
}
