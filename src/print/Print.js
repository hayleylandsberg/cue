import React, { Component } from "react"
import "./Print.css"
import PrintApptList from "./PrintApptList"
import PrintDocsList from "./PrintDocsList"
import PrintMedsList from "./PrintMedsList"
import PrintDiaryList from "./PrintDiaryList"

export default class Print extends Component {

    state = {
        users: {},
        medications: [],
        posts: [],
        doctors: [],
        appointments: [],
        posts: []
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
        this.props.displayAllPosts()
    }

    render() {
        return (
            <div>
                <div id="print-button">
                <input type="button" className="btn btn-danger btn-lg print-btn" onClick={()=> window.print()} value="Print"/>
                </div>
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
                <div id="printAppointments">
                    <div className="print-heading">
                        <h3>Appointments</h3>
                    </div>
                    <div id="listOfAppointments-print">
                        {
                    this.props.appointments.slice(0).reverse().map(appointment => <PrintApptList key={appointment.id} appointment={appointment} displayAllAppointments={this.props.displayAllAppointments} appointments={this.props.appointments}/>)
                    }
                    </div>
                </div>
                <div id="printDoctors">
                    <div className="print-heading">
                        <h3>Doctors</h3>
                    </div>
                    <div>
                    <div id="listOfDoctors-print">
                    {
                    this.props.doctors.slice(0).reverse().map(doctor => <PrintDocsList key={doctor.id} doctor={doctor} />)
                    }
                </div>
                    </div>
                </div>
                <div id="printMedications">
                    <div className="print-heading">
                        <h3>Medications</h3>
                    </div>
                    <div>
                    <div id="listOfMedications-print">
                {
                    this.props.medications.slice(0).reverse().filter(m => m.archive === false).map(medication => <PrintMedsList key={medication.id} medication={medication} displayAllMedications={this.props.displayAllMedications}/>)

                }
                </div>
                    </div>
                </div>
                <div id="printDiary">
                    <div className="print-heading">
                        <h3>Diary Entries</h3>
                    </div>
                    <div>
                    <div id="diaryList-print">
                     {
                    this.props.posts.map(p => <PrintDiaryList key={p.id} post={p} />)
                        }
                    </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
