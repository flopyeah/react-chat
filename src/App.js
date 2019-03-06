import React, { Component, createRef } from 'react'
import Formulaire from './components/Formulaire'
import Message from "./components/Message";

import 'antd/dist/antd.css'
import './App.css'

// firebase
import base from './base'

// transition
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'



class App extends Component {

  state = {
    messageList : {},
    user : this.props.match.params.user
  }



  messageRef = createRef()

  componentDidMount() {
    base.syncState('/', {
      context : this,
      state : 'messageList'
    })
  }

  componentDidUpdate() {
    const ref = this.messageRef.current
    ref.scrollTop = ref.scrollHeight
  }

  isUser = ( username ) => {
    return (username === this.state.user)
  }

  addMessage = (message) => {
    const messageList = { ...this.state.messageList }

    messageList[`message-${Date.now()}`] = message

    Object.keys(messageList)
        .slice(0, -20)
        .forEach(key => {
          messageList[key] = null
        })

    this.setState({messageList})
  }

  render () {

    const messageList = Object
        .keys(this.state.messageList)
        .map(key => (
            <CSSTransition
                key={key}
                timeout={2000}
                classNames={"fade"}>
              <Message
                  isUser={this.isUser}
                  message={this.state.messageList[key]} />
            </CSSTransition>
        ))

    return (
        <div className='chat-box'>
            <div className='box' >
                <header>
                    <h1>Chat Group</h1>
                </header>
                <div>
                    <div className="messages" ref={this.messageRef}>
                        <TransitionGroup className="message">
                          {messageList}
                        </TransitionGroup>
                    </div>
                </div>
                <Formulaire
                    length={150}
                    username={this.state.user}
                    addMessage={this.addMessage}
                />
            </div>
        </div>
    )
  }
}

export default App
