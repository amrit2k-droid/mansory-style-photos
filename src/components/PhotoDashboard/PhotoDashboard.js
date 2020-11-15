import React, { Component } from 'react';
import Photo from '../../containers/Photo/Photo';
import axios from 'axios';
import './PhotoDashboard.css';
import LazyLoad from 'react-lazyload';

class PhotoDashboard extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            isOpen: false,
            presentPhoto: null,
            ifLeftIndexInvalid: false,
            ifRightIndexInvalid: false
        }
    }

    componentDidMount() {
        const accessKey = "6AZzySWIarOZS4Vtpq2XWhldv5OUPJDXvGVxY_iu4TY";
        axios.get("https://api.unsplash.com/photos/?client_id=" + accessKey)
            .then(res => {
                console.log("[RESULT] ", res.data);
                this.setState({
                    photos: res.data
                })
            })
    }

    showImgHandler = (id) => {

        let presentPhoto = null;
        const size = this.state.photos.length
        for(let i = 0; i < this.state.photos.length; i++) {
            if(this.state.photos[i].id === id) {
                presentPhoto = this.state.photos[i];
            }
        }
        let ifLeftIndexInvalid = false;
        let ifRightIndexInvalid = false;
        if(presentPhoto.id === this.state.photos[0].id) {
            ifLeftIndexInvalid = true
        }
        else {
            ifLeftIndexInvalid = false
        }

        if(presentPhoto.id === this.state.photos[size - 1].id) {
            ifRightIndexInvalid = true;
        }
        else {
            ifRightIndexInvalid = false;
        }

        this.setState({
            isOpen:true,
            presentPhoto: presentPhoto,
            ifLeftIndexInvalid: ifLeftIndexInvalid,
            ifRightIndexInvalid: ifRightIndexInvalid
        })
        
    }

    closeModalHandler = () => {
        this.setState({
            isOpen: false
        })
    }

    showPrevImgHandler = () => {
        let prevPhoto = null;
        for(let i = 0; i < this.state.photos.length; i++) {
            if(this.state.presentPhoto.id === this.state.photos[i].id) {
                prevPhoto = this.state.photos[i - 1];
            }
        }
        let ifLeftIndexInvalid = false;
        if(this.state.presentPhoto.id === this.state.photos[1].id) {
            ifLeftIndexInvalid = true
        }

        this.setState({
            presentPhoto: prevPhoto,
            ifLeftIndexInvalid: ifLeftIndexInvalid,
            ifRightIndexInvalid: false
        })
    }

    showNextImgHandler = () => {
        let nextPhoto = null;
        const size = this.state.photos.length;
        for(let i = 0; i < this.state.photos.length; i++) {
            if(this.state.presentPhoto.id === this.state.photos[i].id) {
                nextPhoto = this.state.photos[i + 1];
            }
        }
        let ifRightIndexInvalid = false;
        if(this.state.presentPhoto.id === this.state.photos[size - 2].id) {
            ifRightIndexInvalid = true
        }

        this.setState({
            presentPhoto: nextPhoto,
            ifLeftIndexInvalid: false,
            ifRightIndexInvalid: ifRightIndexInvalid
        })
    }

    render() {
       
        //modal
        let showModal = null;
        if(this.state.isOpen) {
            showModal =  <div className="modal fade" id="myModal" role="dialog">
                            <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Photo</h4>
                                </div>
                                <div className="modal-body">
                                    {
                                      !this.state.ifLeftIndexInvalid ?
                                      <span className="glyphicon glyphicon-circle-arrow-left"  id="left" onClick={() => this.showPrevImgHandler()}></span> :
                                      ''
                                    }
                                    
                                    <img src={this.state.presentPhoto.urls.small} />
                                    {
                                        !this.state.ifRightIndexInvalid ?
                                        <span className="glyphicon glyphicon-circle-arrow-right"  id="right" onClick={() => this.showNextImgHandler()}></span> :
                                        ''
                                    }
                                    
                                </div>
                                <div className="modal-footer">
                                <button type="button" /* className="btn btn-default"  */data-dismiss="modal" onClick={() => this.closeModalHandler()}>Close</button>
                                </div>
                            </div>
                            </div>
                        </div>
        }


        let photos = [];
        if(this.state.photos) {
            photos = this.state.photos.map(photo => {
                return <LazyLoad key={photo.id}>
                        <Photo 
                            key={photo.id} 
                            photo={photo}
                            clicked={() => this.showImgHandler(photo.id)} 
                        />
                    </LazyLoad>;
            })
        }
        return (
        <div className="photo-list">
            {photos}
            {showModal}
        </div>
        )
    }
}

export default PhotoDashboard
