import React from 'react'
import moment from "moment";


const Message = (props) => {

    const {message, isUser} = props

    let imagePath = '';

    if (message.image) {
        imagePath = (
            <img src={message.image} alt={message.time} className="image" />
        )
    }

    if (isUser(message.username)) {
        return (
                <p className="user-message">
                    <span className="time">{moment(message.time).format('H:mm')}</span>{message.message}
                    <br />{imagePath}
                </p>
        )
    }
    else {
        return (
                <p className="not-user-message">
                    <strong>{message.username}</strong> : {message.message} <span className="time">{moment(message.time).format('H:mm')}</span>
                    <br />{imagePath}
                </p>
        )
    }
}

export default Message
