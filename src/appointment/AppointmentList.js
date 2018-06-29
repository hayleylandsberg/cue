import React, { Component } from "react"
import AppointmentsDash from "./AppointmentsDash"


export default class AppointmentList extends Component {

    state = {
        appointments: this.props.appointments
    }

    componentDidMount () {
        this.props.displayAllAppointments()
    }

    render() {
        return (
            <div className="appointments-dash">
                <div id="appointment-dash-heading"><h4>Appointments</h4>
                {/* <div><AppointmentsDash activeUser={this.props.activeUser} appointments={this.props.appointments} displayAllAppointments={this.props.displayAllAppointments}/></div> */}
                </div>
                <div id="listOfAppointments-dash">
                {
                    this.props.appointments.slice(0).reverse().map(appointment => <AppointmentsDash key={appointment.id} appointment={appointment} displayAllAppointments={this.props.displayAllAppointments} appointments={this.props.appointments}/>)

                }
                </div>
            </div>
        )
    }
}
