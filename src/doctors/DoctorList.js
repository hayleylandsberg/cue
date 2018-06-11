import React, { Component } from "react"
import Doctor from "./Doctor";


export default class DoctorList extends Component {

    state = {
        doctors: []
    }

    componentDidMount () {
        fetch(`http://localhost:5001/doctors?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(doctor => this.setState({doctors: doctor}))
    }

    render() {
        return (
            <div className="doctors">
                <h3>Doctors List</h3>
                {
                    this.state.doctors.map(doctor => <Doctor key={doctor.id} doctor={doctor} />)
                }
            </div>
        )
    }
}
