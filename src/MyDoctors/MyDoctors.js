import React, { Component } from "react"
import Doctor from "./Doctor";
import RegModal from "./RegModalDoctor"


export default class MyDoctors extends Component {

    state = {
        doctors: this.props.doctors
    }

    componentDidMount () {
        this.props.displayAllDoctors()
    }

    render() {
        return (
            <div className="doctors-md">
                <div id="doctor-heading-md"><h3>Your Doctors</h3>
                <div><RegModal showView={this.props.showView} setActiveUser={this.props.setActiveUser} displayAllDoctors={this.props.displayAllDoctors} /></div>
                </div>
                <div id="listOfDoctors-md">
                {
                    this.props.doctors.slice(0).reverse().map(doctor => <Doctor key={doctor.id} doctor={doctor} />)
                }
                </div>
            </div>
        )
    }
}
