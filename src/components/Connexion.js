import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

class Connexion extends Component {

    state = {
        user : '',
        goChat : false
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(event.target.username.value)
        this.setState({
            user : event.target.username.value,
            goChat : true
        })
    }

    render () {

        if (this.state.goChat) {
            return (
                <Redirect push to={`/user/${this.state.user}`} />
            )
        }

        return (
            <div className='connexionBox' >
                <form className="connexion" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" required />
                    <button type="submit">Go</button>
                </form>
            </div>
        )
    }
}

export default Connexion
