import React from 'react'
import moment from "moment";


const Message = (props) => {

    const {message, isUser} = props

    let imagePath = '';

    if (message.image) {
        imagePath = (
            <div className="container-img"><img src={message.image} alt={message.time} className="image" /></div>
        )
    }

    if (isUser(message.username)) {
        return (
                <div className="user-message">
                    <span className="time">{moment(message.time).format('H:mm')}</span>{message.message}
                    {imagePath}
                </div>
        )
    }
    else {
        return (
                <div className="not-user-message">
                    <strong>{message.username}</strong> : {message.message} <span className="time">{moment(message.time).format('H:mm')}</span>
                    {imagePath}
                </div>
        )
    }
}

export default Message
