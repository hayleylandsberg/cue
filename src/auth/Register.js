import React, { Component } from "react"
import swal from 'sweetalert'


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


export default class Register extends Component {

    state={
        firstName: "",
        lastName: "",
        email: "",
        st: "",
        city: "",
        age: "",
        conditions: "",
        allergies: "",
        pharmacyName: "",
        pharmacyNumber: "",
        emergencyName: "",
        emergencyNumber: "",
        password: ""

    }
    handleFieldChange = function (evt) {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }.bind(this);

    createUser = function(){
         // Create user in API
         fetch("http://localhost:5001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                city: this.state.city,
                state: this.state.st,
                age: this.state.age,
                conditions: this.state.conditions,
                allergies: this.state.allergies,
                pharmacyName: this.state.pharmacyName,
                pharmacyNumber: this.state.pharmacyNumber,
                emergencyName: this.state.emergencyName,
                emergencyNumber: this.state.emergencyNumber
            })
        })

        // Set local storage with newly created user's id and show home view
        .then(newUser => {
            this.props.onRequestClose()
            swal("Congrats!", "Your user has been created, you may now log in!", "success");
        })
    }.bind(this);

    render() {
        return (
            <form className="form-signup" onSumbit={this.handleLogin}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="flexForm">
            <div id="firstFormDiv">
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input onChange={this.handleFieldChange} type="email" id="email" className="form-control" placeholder="Email address" required="" autoFocus="" />
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input onChange={this.handleFieldChange} type="password" id="password" className="form-control" placeholder="Password" required="" />
            <label htmlFor="inputFirstName" className="sr-only">First Name</label>
            <input onChange={this.handleFieldChange} type="First Name" id="firstName" className="form-control" placeholder="First Name" required="" autoFocus="" />
            <label htmlFor="inputLastName" className="sr-only">Last Name</label>
            <input onChange={this.handleFieldChange} type="Last Name" id="lastName" className="form-control" placeholder="Last Name" required="" autoFocus="" />
            <label htmlFor="inputAddress" className="sr-only">Address</label>
            <input onChange={this.handleFieldChange} type="Address" id="address" className="form-control" placeholder="Address" required="" autoFocus="" />
            <label htmlFor="inputCity" className="sr-only">City</label>
            <input onChange={this.handleFieldChange} type="City" id="city" className="form-control" placeholder="City" required="" autoFocus="" />
            <label htmlFor="inputState" className="sr-only">State</label>
            <input onChange={this.handleFieldChange} type="State" id="st" className="form-control" placeholder="State" required="" autoFocus="" />
            <label htmlFor="inputPhone" className="sr-only">Phone Number</label>
            <input onChange={this.handleFieldChange} type="phone" id="phone" className="form-control" placeholder="Phone Number" required="" autoFocus="" />
            </div>
            <div id="secondFormDiv">
            <label htmlFor="inputAge" className="sr-only">Age</label>
            <input onChange={this.handleFieldChange} type="age" id="age" className="form-control" placeholder="Age" required="" />
            <label htmlFor="inputGender" className="sr-only">Gender</label>
            <input onChange={this.handleFieldChange} type="Gender" id="gender" className="form-control" placeholder="Gender: female / male" required="" autoFocus="" />
            <label htmlFor="inputConditions" className="sr-only">Conditions</label>
            <input onChange={this.handleFieldChange} type="conditions" id="conditions" className="form-control" placeholder="Conditions" required="" />
            <label htmlFor="inputAllergies" className="sr-only">Allergies</label>
            <input onChange={this.handleFieldChange} type="allergies" id="allergies" className="form-control" placeholder="Allergies" required="" />
            <label htmlFor="inputPharmacyName" className="sr-only">Pharmacy Name</label>
            <input onChange={this.handleFieldChange} type="pharmacyName" id="pharmacyName" className="form-control" placeholder="Pharmacy Name" required="" />
            <label htmlFor="inputPharmacyNumber" className="sr-only">Pharmacy Number</label>
            <input onChange={this.handleFieldChange} type="pharmacyNumber" id="pharmacyNumber" className="form-control" placeholder="Pharmacy Number" required="" />
            <label htmlFor="inputEmergencyName" className="sr-only">Emergency Contact Name</label>
            <input onChange={this.handleFieldChange} type="emergencyName" id="emergencyName" className="form-control" placeholder="Emergency Contact Name" required="" />
            <label htmlFor="inputEmergencyNumber" className="sr-only">Emergency Contact Number</label>
            <input onChange={this.handleFieldChange} type="emergencyNumber" id="emergencyNumber" className="form-control" placeholder="Emergency Contact Number" required="" />
            </div>
            </div>
            <div className="checkbox mb-3">
            <input type="checkbox" value="remember-me" /> Remember me
            </div>
            <button className="btn btn-lg btn-gray btn-block" type="button" onClick={this.createUser}>Sign up</button>
            </form>
        )
    }
}
