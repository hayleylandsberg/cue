import React, { Component } from "react"
import swal from 'sweetalert'
import "./Appointments.css"

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }


export default class AddAppointment extends Component {

    state={
        appointment: [],
        doctorName: "",
        doctorSpecialty: "",
        doctorFacility: "",
        doctorAddress: "",
        doctorPhoneNumber: "",
        userId: "",
        appointmentTime: "",
        appointmentDate: ""

    }

    activeUser = localStorage.getItem("yakId")

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createAppointment = function(){
         // Create user in API
         fetch(`http://localhost:5001/appointments?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: parseInt(this.activeUser),
                appointmentTime: this.state.appointmentTime,
                appointmentDate: this.state.appointmentDate,
                doctorId: this.props.doctor.id,
                doctorName: this.props.doctor.name,
                doctorSpecialty: this.props.doctor.specialty,
                doctorFacility: this.props.doctor.facility,
                doctorAddress: this.props.doctor.address,
                doctorPhone: this.props.doctor.phoneNumber
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            this.props.displayAllAppointments()
            swal("Success!", "Your appointment has been added to your Appointment List.", "success")
        })
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Add an Appointment</h1>
            <div className="flexForm-Doctor">
            <label htmlFor="inputDoctor" className="sr-only">Appointment Date</label>
            <input onChange={this.handleFieldChange} type="date" format="mm-dd-yyyy" id="appointmentDate" className="form-control" placeholder="Appointment Date" required="" autoFocus="" />
            <label htmlFor="inputappointmentDate" className="sr-only">Appointment Time</label>

            <input onChange={this.handleFieldChange} type="time" id="appointmentTime" className="form-control" placeholder="Appointment Time" required="" autoFocus="" />
            <div className="doctor-appointment">
            <p>{this.props.doctor.name}</p>
            <p>{this.props.doctor.specialty}</p>
            <p>{this.props.doctor.facility}</p>
            <p>{this.props.doctor.address}</p>
            <p>{this.props.doctor.phoneNumber}</p>
            </div>

            {/* <label htmlFor="inputDoctor" className="sr-only">Doctor's Name</label>
            <input onChange={this.handleFieldChange} type="name" id="doctorName" className="form-control" value={this.props.doctor.name} required="" autoFocus="" />

            <label htmlFor="inputSpecialty" className="sr-only">Doctor's Speciality</label>
            <input onChange={this.handleFieldChange} type="specialty" id="doctorSpecialty" className="form-control"  value={this.props.doctor.specialty} required="" />

            <label htmlFor="inputFacility" className="sr-only">Facility / Hospital</label>
            <input onChange={this.handleFieldChange} type="facility" id="doctorFacility" className="form-control"  value={this.props.doctor.facility} required="" autoFocus="" />

            <label htmlFor="inputAddress" className="sr-only">Doctor's Address</label>
            <input onChange={this.handleFieldChange} type="address" id="doctorAddress" className="form-control"  value={this.props.doctor.address} required="" autoFocus="" />

            <label htmlFor="inputPhoneNumber" className="sr-only">Doctor's Phone Number</label>
            <input onChange={this.handleFieldChange} type="phoneNumber" id="doctorPhoneNumber" className="form-control"  value={this.props.doctor.phoneNumber} required="" autoFocus="" /> */}

            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={this.createAppointment}>Add Appointment</button>
            </form>
        )
    }
}
