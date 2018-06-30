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

    hours = (time) => {
        let hours = time[0] + time[1];
        let min = time[3] + time[4];
        if (hours < 12) {
            return hours + ':' + min + ' AM';
        } else {
            hours=hours - 12;
            hours=(hours.length < 10) ? '0'+hours:hours;
            return hours+ ':' + min + ' PM';
        }
    }

    date = (date) => {
        let month = date[5] + date[6];
        let day = date[8] + date[9];
        let year = date[0] + date[1] + date[2] + date[3];
        return month + "/" + day + "/" + year;
    }

    render() {
        return (
            <div className="appointment-md">
            <div className="doctor-calendar-md">
                <h5>{this.date(this.props.appointments.appointmentDate)}</h5>
                <h5>{this.hours(this.props.appointments.appointmentTime)}</h5>
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
