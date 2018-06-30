import React, { Component } from "react"
import "./Print.css"

export default class PrintDiaryList extends Component {

    render() {
        return (
            <div className="card-print">
            {/* <img className="avatar" src={require('../images/avatar1.png')}/> */}
                <div className="card-body">
                    {/* <h5 className="card-title">{this.props.post.user.firstName} {this.props.post.user.lastName}</h5> */}
                    <h5>{this.props.post.date}</h5>
                    <p className="card-text">
                        {this.props.post.message}
                    </p>
                </div>
            </div>
        )
    }
}
