import React, { Component } from 'react';
import {Container, ListGroup, ListGroupItem, Button, Row, Col} from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
// import {v1 as uuid} from 'uuid';
import{connect} from 'react-redux';
import {getItems, deleteItem} from '../Actions/itemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {

    
    static propTypes = {
        isAuthenticated : PropTypes.bool
    }
    componentDidMount(){
        this.props.getItems();
    };

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        const { items } = this.props.item;
        return (
            <Container>
                
                <div className="Header" style={{
                    fontSize:"70px",
                    fontWeight:"900",
                    fontFamily:"sanSerif",
                    paddingLeft:"40px"
                }}>Hollywood's 100 Favorite Films</div>
                <div className="greyText" style={{
                    color:"grey",
                    paddingLeft:"60px"
                }}>9:00 AM 6/25/2014 by THR Staff</div>
                <div className="Content" style={{
                    lineHeight:"40px",
                    fontSize:"30px",
                    padding:"50px",
                    fontWeight:"600"
                }}>Who better to judge the best movies of all time than the people who make them? Studio chiefs, Oscar winners and TV royalty all were surveyed as THR publishes its first definitive entertainment-industry ranking of cinema's most superlative.</div>
                <div className="CoverImage"><img src="https://cdn1.thr.com/sites/default/files/imagecache/675x380/2014/11/5_Pulp_Fiction.jpg" width="90%" style={{paddingLeft:"40px", paddingBottom:"60px"}}></img></div>
                <h2>List of Movies</h2>
                <ListGroup>
                    <TransitionGroup className="movie-list">
                        {items.map(({_id,name,cover,description}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Row>
                                        { this.props.isAuthenticated ? 
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this,_id)}
                                            // onClick={() => {
                                            //     this.setState(state => ({
                                            //         items: state.items.filter(item => item.id !==id)
                                            //     }));
                                            // }}
                                            >&times;
                                            Delete
                                        </Button> :<span></span>}
                                        <Col sm="12" md={{size:12, offset:2}}>
                                        <h2>{name}</h2></Col>
                                    
                                    </Row>
                                    <Row>
                                        <Col sm="12" md={{ size: 10, offset: 1 }}>
                                            <img src={require(`../public/`+`${cover}`) } width="100%" height="500" />
                                            <figCaption>Fig.1 - Trulli, Puglia, Italy.</figCaption>
                                        </Col>
                                        
                                        
                                    
                                    </Row>
                                    <Row><Col sm="12" md={{ size: 10, offset: 1 }}>{description}</Col></Row>
                                    
                                    
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
