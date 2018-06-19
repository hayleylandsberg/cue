import React, { Component } from "react"
import "./Medication.css"
import "../MyCabinet/Style.css"
import "../MyCabinet/Style.less"


export default class Medication extends Component {

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
        .then(() => {
            this.props.displayAllMedications()
        })
    }

    render() {
        return (
            <div className="medicine">
                <div className="heading-meds">
    <div class="center checkBox">
  <label class="label">
    <input  class="label__checkbox" type="checkbox" onClick={()=> this.takenMeds(this.props.medication.id)} />
    <span class="label__text">
      <span class="label__check">
        <i class="fa fa-check icon"></i>
      </span>
    </span>
  </label>
</div>
                    <h5>{this.props.medication.name}</h5>
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
        )
    }
}
