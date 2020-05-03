import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// import {v1 as uuid} from 'uuid';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    FormText,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import { addItem } from '../Actions/itemActions';

class ItemModal extends Component {
    state = {
        modal : false,
        name : '',
        cover:'',
        description:''
    }

    static propTypes = {
        isAuthenticated : PropTypes.bool
    }
    toggle = () => {
        this.setState({
            modal : !this.state.modal
        });
    }
    onChange = (e) => {
        // console.log(e.target.files[0])
        this.setState({ [e.target.name] : e.target.value});
        // this.setState({file:e.target.files[0]})
    }
    onChangep = (e) => {
        // console.log(e.target.files[0])
        // this.setState({ [e.target.name] : e.target.value});
        this.setState({file:e.target.files[0]})
    }
    
    onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('cover',this.state.file);
        formData.append('name',this.state.name);
        formData.append('description',this.state.description);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        // console.log(this.state.cover)
        const newItem = {
            // id : uuid(),
            name: this.state.name,
            cover:this.state.file,
            // cover:this.state.cover,
            description:this.state.description
        }

        //Add Item via addItem Action
        
        // console.log(newItem)
        axios.post("/api/items",formData,config,{
            d:'abc'
        })

        .then((response) => {
            console.log(response);
    //         this.setState({data:response.data});
    // console.log(this.state.data);
            // alert("The file is successfully uploaded");
        }).catch((error) => {
            console.log(error)
        });
        this.props.addItem(newItem);
        this.toggle();
    }

    render() {
        return (
            <div>

                { this.props.isAuthenticated ? 
                <Button
                color="dark"
                style={{marginBottom:'2rem'}}
                onClick={this.toggle}
                >Add Movie </Button> : <h6 style={{color:"red"}}>Please Login to edit Movies list</h6>}  

                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Add to Best Movie List </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} method='POST' enctype="multipart/form-data">
                            <FormGroup>
                                <Label for="item">Movie</Label>
                                <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add Shopping Item"
                                onChange={this.onChange}
                                ></Input>



                                <Label for="coverPic">Poster/Cover of Movie</Label>
                                <Input type="file" name="cover" id="exampleFile" onChange={this.onChangep} />
                                <FormText color="muted">
                                Add a jpg/png file of movie cover.
                                </FormText>
      

                               
                                <Label for="description">Movie Description</Label>

                                <Input
                                type="textarea"
                                name="description"
                                id="description"
                                placeholder="Add Shopping Item"
                                onChange={this.onChange}
                                ></Input>
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                                >Add Movie</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    
    item: state.item,
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{addItem})(ItemModal);