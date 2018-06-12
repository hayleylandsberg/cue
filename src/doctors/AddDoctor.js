import React, { Component } from "react"


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }


export default class AddDoctor extends Component {

    state={
        name: "",
        specialty: "",
        address: "",
        phoneNumber: "",
        userId: ""

    }

    activeUser = localStorage.getItem("yakId")

    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createDoctor = function(){
         // Create user in API
         fetch(`http://localhost:5001/doctors?&userId=${this.props.activeUser}&_sort=id&_order=desc&_expand=user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.name,
                password: this.state.specialty,
                firstName: this.state.address,
                lastName: this.state.phoneNumber,
                userId: parseInt(this.activeUser)
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            alert("Your doctor has been added to your Doctors List.")
        })
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Add a Doctor</h1>
            <div className="flexForm-Doctor">
            <label htmlFor="inputDoctor" className="sr-only">Doctor's Name</label>
            <input onChange={this.handleFieldChange} type="name" id="name" className="form-control" placeholder="Doctor's Name" required="" autoFocus="" />
            <label htmlFor="inputSpecialty" className="sr-only">Doctor's Speciality</label>
            <input onChange={this.handleFieldChange} type="specialty" id="specialty" className="form-control" placeholder="Doctor's Specialty" required="" />
            <label htmlFor="inputAddress" className="sr-only">Doctor's Address</label>
            <input onChange={this.handleFieldChange} type="address" id="address" className="form-control" placeholder="Doctor's Address" required="" autoFocus="" />
            <label htmlFor="inputPhoneNumber" className="sr-only">Doctor's Phone Number</label>
            <input onChange={this.handleFieldChange} type="phoneNumber" id="phoneNumber" className="form-control" placeholder="Doctor's Phone Number" required="" autoFocus="" />
            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={this.createDoctor}>Add Doctor</button>
            </form>
        )
    }
}
