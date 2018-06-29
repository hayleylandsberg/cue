import React, { Component } from "react"
import Doctor from "./Doctor";
import RegModal from "./RegModalDoctor"
import PersonalList from "../sideNav/PersonalList"
import Appointments from "./Appointments"


export default class MyDoctors extends Component {

    state = {
        doctors: this.props.doctors,
        appointments: this.props.appointments
    }

    componentDidMount () {
        this.props.displayAllDoctors()
        this.props.displayAllAppointments()
    }

    render() {
        return (
            <div>
                 <PersonalList activeUser={this.props.activeUser} />
            <div className="doctors-md">
                <div id="doctor-heading-md"><h3>Your Doctors</h3>
                <div><RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllDoctors={this.props.displayAllDoctors} /></div>
                </div>
                <div id="listOfDoctors-md">
                {
                    this.props.doctors.slice(0).reverse().map(doctor => <Doctor key={doctor.id} doctor={doctor} displayAllAppointments={this.props.displayAllAppointments} displayAllDoctors={this.props.displayAllDoctors} appointments={this.props.appointments} />)
                }
                </div>
                <div>
                <h3 className="appointment-heading-md">Your Appointments</h3>
                <div id="listOfAppointments-md">
                {
                    this.props.appointments.slice(0).reverse().map(appointment => <Appointments key={appointment.id} appointments={appointment} displayAllAppointments={this.props.displayAllAppointments} doctors={this.state.doctors}/>)
                }
                </div>
                </div>
            </div>
            </div>
        )
    }
}
