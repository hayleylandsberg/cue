import React, { Component } from "react"
import "./Doctors.css"


export default class Doctor extends Component {

    state={
        appointments: {
        doctorName: "",
        doctorSpecialty: "",
        doctorFacility: "",
        doctorAddress: "",
        doctorPhone: ""
        }

    }
    appointment = (doctorId) => {
        fetch(`http://localhost:5001/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                doctorName: this.props.doctor.name,
                doctorSpecialty: this.props.doctor.specialty,
                doctorFacility: this.props.doctor.facility,
                doctorAddress: this.props.doctor.address,
                doctorPhone: this.props.doctor.phoneNumber
            })
        }).then(()=> {this.props.displayAllAppointments})
    }
        
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
                        <img className="calendar-icon" src={require('../images/calendar.png')} onClick={()=> this.appointment(this.props.doctor.id)}></img>
                    </div>
                </div>
            </div>
        )
    }
}
