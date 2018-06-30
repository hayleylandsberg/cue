import React, { Component } from "react"
import "./Print.css"


export default class Print extends Component {

    state = {
        users: {},
        medications: [],
        posts: [],
        doctors: [],
        appointments: []
    }

    displayUserInfo = () => {
    fetch(`http://localhost:5001/users?id=${this.props.activeUser}`)
            .then(r => r.json()).then(userData => {
                this.setState({users: userData[0]})
            })
        }
  
    date = (date) => {
        let month = date[5] + date[6];
        let day = date[8] + date[9];
        let year = date[0] + date[1] + date[2] + date[3];
        return month + "/" + day + "/" + year;
    }

    componentDidMount () {
        this.props.displayAllMedications()
        this.props.displayAllAppointments()
        this.props.displayAllDoctors()
        this.displayUserInfo()
    }

    render() {
        return (
            <div>
                <input type="button" id="print-button" className="btn btn-danger btn-lg" onClick={()=> window.print()} value="Print"/>
                <div id="pi-heading">
                <h3>Personal Information</h3>
            <div className="first-component">
                <div>
                    <p className="bold-personal">Name:</p><p>{this.state.users.firstName} {this.state.users.lastName}</p>
                    <p className="bold-personal">Address:</p><p>{this.state.users.address} {this.state.users.city} {this.state.users.state}</p>
                    <p className="bold-personal">Email:</p><p>{this.state.users.email}</p>
                </div>
                <div>
                    <p className="bold-personal">Birth Date:</p><p>{this.state.users.birthDate}</p>
                    <p className="bold-personal">Gender:</p><p>{this.state.users.gender}</p>
                    <p className="bold-personal">Conditions:</p><p>{this.state.users.conditions}</p>
                    <p className="bold-personal">Allergies:</p><p>{this.state.users.allergies}</p>
                </div>
                <div>
                    <p className="bold-personal">Pharmacy:</p><p>{this.state.users.pharmacyName}</p>
                    <p className="bold-personal">Pharmacy Number:</p><p>{this.state.users.pharmacyNumber}</p>
                    <p className="bold-personal">Emergency Contact:</p><p>{this.state.users.emergencyName}</p>
                    <p className="bold-personal">Emergency Contact Number:</p><p>{this.state.users.emergencyNumber}</p>
                </div>
                </div>
                <div id="printMedications">
                    <div className="print-heading">
                        <h3>Appointments</h3>
                    </div>
                    <div>
                        <p>{this.props.appointments.appointmentTime}</p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
