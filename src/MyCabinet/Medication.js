import React, { Component } from "react"
import "./Medication.css"
import "./Style.less"
import "./Style.css"
import swal from 'sweetalert'


export default class Medication extends Component {

    state = {
        users: {}
    }

    archive = (medicationId) => {
        fetch(`http://localhost:5001/medications/${medicationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                archive: true
            })
        })
        .then(() => {
            this.props.displayAllMedications()
        })
    }

    areMedsTaken = () => {
        fetch(`http://localhost:5001/medications?&userId=${this.props.activeUser}&takenMeds=false&archive=false`)
            .then(r => r.json())
            .then(medications => {
                    if (medications.length > 0) {
                        console.log("Still need to take all of your medications")
                    } else {
                        swal("Congrats!", "You have taken all your medications today!", "success")
                        this.props.updateScore(this.props.activeUser)
                        .then(()=> {
                            return this.props.resetMeds()
                        })
                        .then(() => {
                            return this.props.displayAllMedications()
                        })
                        .then(() => {
                            this.props.showView("medicine-cabinet", { randomizer: Date.now() })
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                })


}

    takenMeds = (medicationId) => {
        fetch(`http://localhost:5001/medications/${medicationId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                takenMeds: true
            })
        })
        .then(()=> {
            this.areMedsTaken()
        })
    }

render() {
        return (
            <div className="medicine-mc">
            <div className="whole-medication-mc">
                <div class="center checkBox">
                    <label class="label">
                    <input  class="label__checkbox" type="checkbox" defaultChecked={this.props.medication.takenMeds} onClick={()=> this.takenMeds(this.props.medication.id)} />
                    <span class="label__text">
                    <span class="label__check">
                    <i class="fa fa-check icon"></i>
                    </span>
                    </span>
                    </label>
                </div>
            <div className="fullMeds-mc">
                <div className="heading-meds">
                    <h4>{this.props.medication.name}</h4>
                    <img className="archive" onClick={()=> this.archive(this.props.medication.id)} src={require('../images/archive.png')}></img>
                </div>
                <div className="description">
                    <p className="underline">Dosage</p>
                    <p className="underline">Frequency</p>
                    <p className="underline">Rx Number</p>
                </div>
                <div className="dosage">
                <p>{this.props.medication.dosage}</p>
                <p>{this.props.medication.frequency}</p>
                <p>{this.props.medication.rxNumber}</p>
                </div>
            </div>
            </div>
            </div>
        )
    }
}
