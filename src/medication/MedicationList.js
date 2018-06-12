import React, { Component } from "react"
import Medication from "./Medication";


export default class MedicationList extends Component {

    state = {
        medications: []
    }

    componentDidMount () {
        fetch(`http://localhost:5001/medications?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`)
            .then(r => r.json())
            .then(medication => this.setState({medications: medication}))
    }

    render() {
        return (
            <div className="medication">
                <div id="medicine-heading"><h3>Medicine Cabinet</h3>
                <img className="addBtn" width="40px" src={require ("../images/plus.png")}></img>
                </div>

                {
                    this.state.medications.slice(0).reverse().map(medication => <Medication key={medication.id} medication={medication} />)
                }
            </div>
        )
    }
}
