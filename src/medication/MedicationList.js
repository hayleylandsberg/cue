import React, { Component } from "react"
import Medication from "./Medication";


export default class MedicationList extends Component {

    state = {
        medications: []
    }

    componentDidMount () {
        fetch(`http://localhost:5001/medications`)
            .then(r => r.json())
            .then(medication => this.setState({medications: medication}))
    }

    render() {
        return (
            <div className="medication">
                <h3>Medicine Cabinet</h3>
                {
                    this.state.medications.map(medication => <Medication key={medication.id} medication={medication} />)
                }
            </div>
        )
    }
}
