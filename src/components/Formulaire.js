import React, { Component } from 'react'

import moment from 'moment'

import { storage } from '../base'

import { Row, Col, Button } from 'antd';

//const { TextArea } = Input;

moment().local('fr')

class Formulaire extends Component {

    state = {
        message : '',
        length : this.props.length,
        image : null,
        imagePreview : null,
        icon : 'caret-right'
    }

    createMessage = () => {
        const { addMessage, username, length } = this.props

        const message = {
            username,
            message : this.state.message,
            time : moment().format(),
            image : this.state.image
        }

        addMessage(message)

        // reset textareabox
        /*this.setState({
            message : '',
            length : this.props.length
        })*/
        // OR
        this.setState({
            message : '',
            image : null,
            imagePreview : null,
            length,
            icon : 'caret-right'
        })
    }

    enterLoading = () => {
        this.setState({ icon: 'loading' });
    }

    uploadImage = () => {
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',
                (snapshot) => {
                    // progress
                    //const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                }, (error) => {
                    console.log(error)
                }, () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        this.setState({image : url})
                        this.createMessage()
                    })
            })
    }

    handleChange = (event) => {
        const message = event.target.value

        const length = this.props.length - message.length

        this.setState({message, length})
    }

    handleKeyPress = (event) => {
        if ( event.key === 'Enter')
            this.sendMessage()
    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.sendMessage()
    }

    sendMessage = () => {
        this.enterLoading()

        if (this.state.image){
            this.uploadImage()
        }
        else {
            this.createMessage()
        }
    }

    handleUpload = (event) => {

        if (event.target.files[0]) {
            const image = event.target.files[0]

            this.setState({image})

            let input = event.target;

            let reader = new FileReader();
            reader.onload = function(){
                let dataURL = reader.result;
                return fileDisplay(dataURL)
            };

            let fileDisplay = (file) => {
                this.setState({imagePreview : file})
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    render () {

        let imagePreview

        if (this.state.imagePreview ) {
            imagePreview = (
                <img src={this.state.imagePreview} width="50" alt="preview" />
            )
        }

        return (
            <div className='chatForm' >
                <form className="form" onSubmit={this.handleSubmit}>

                    <div>
                        <Row>
                            <Col span={3}>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile"  onChange={this.handleUpload} />
                                    <Button type="primary" className="button-form custom-file-label" icon="picture" />
                                </div>
                                <div className="preview">{imagePreview}</div>
                            </Col>
                            <Col span={18}>

                            <textarea
                                name="message" required
                                maxLength={this.props.length}
                                value={this.state.message}
                                onKeyUp={this.handleKeyPress}
                                onChange={this.handleChange} />
                            </Col>
                            <Col span={3}>
                                <div className="send-button-bloc">
                                    <Button type="primary" className="button-form" onClick={this.handleSubmit} icon={this.state.icon} style={{marginTop : 10}} />
                                    <div className="info" >{this.state.length}</div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </form>
            </div>
        )
    }
}

export default Formulaire
