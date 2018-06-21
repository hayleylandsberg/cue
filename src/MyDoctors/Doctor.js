import React, { Component } from "react"
import "./Doctors.css"
import AppointmentRegModal from "./AppointmentRegModal"


export default class Doctor extends Component {
        
    deleteDoctor = (doctorId) => {
        fetch(`http://localhost:5001/doctors/${doctorId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                
            })
        })
        .then(() => {
            this.props.displayAllDoctors()
        })
    }

    render() {
        return (
            <div className="doctor-md">
            <div className="doctor-calendar-md">
                <h5>{this.props.doctor.name}</h5>
                <img className="delete" src={require('../images/close.png')}onClick={()=> this.deleteDoctor(this.props.doctor.id)}></img>
            </div>
                <div id="contact-calendar">
                    <div className="contact-md">
                        <p>{this.props.doctor.specialty}</p>
                        <p>{this.props.doctor.facility}</p>
                        <p>{this.props.doctor.address}</p>
                        <p>{this.props.doctor.phoneNumber}</p>
                    </div>
                    <div>
                        <AppointmentRegModal doctor={this.props.doctor} displayAllAppointments={this.props.displayAllAppointments} appointments={this.props.appointments}/>
                    </div>
                </div>
            </div>
        )
    }
}
