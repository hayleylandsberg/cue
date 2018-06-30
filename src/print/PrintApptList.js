import React, { Component } from "react"
import "./Print.css"


export default class PrintApptList extends Component {

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
            <div className="appt-print">
            <div className="doctor-calendar-dash">
                <h6>{this.date(this.props.appointment.appointmentDate)}</h6>
                <h6>{this.hours(this.props.appointment.appointmentTime)}</h6>
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
