import React, { Component } from "react"
import Doctor from "./Doctor";
import RegModal from "./RegModalDoctor"


export default class DoctorList extends Component {

    state = {
        doctors: this.props.doctors
    }

    componentDidMount () {
        this.props.displayAllDoctors()
        // fetch(`http://localhost:5001/doctors?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
        //     .then(r => r.json())
        //     .then(doctor => this.setState({doctors: doctor}))
    }

    render() {
        return (
            <div className="doctors">
                <div id="doctor-heading"><h3>Your Doctors</h3>
                <div><RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllDoctors={this.props.displayAllDoctors} /></div>
                </div>
                <div id="listOfDoctors">
                {
                    this.props.doctors.slice(0).reverse().map(doctor => <Doctor key={doctor.id} doctor={doctor} />)
                }
                </div>
            </div>
        )
    }
}
