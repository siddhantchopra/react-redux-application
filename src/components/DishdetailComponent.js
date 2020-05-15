
import React, { Fragment, Component } from 'react'
import { Modal, ModalBody, ModalHeader, Button, Label, Row, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
// import moment from 'moment'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

const required = (val) => val && val.length;
const maxLength = (len) => val => !(val) || (val.length <= len)
const minLength = (len) => val => (val) && (val.length >= len)

const RenderDish = ({ dish, comments, postComment, dishId }) => {
    if (dish !== undefined && dish !== null) {
        return (<Fragment>
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            {<RenderComments comments={comments}
                postComment={postComment}
                dishId={dishId}
            />}
        </Fragment>
        )
    } else {
        return (
            <div></div>
        )
    }
}
const RenderComments = ({ comments, postComment, dishId }) => {
    if (comments !== null) {
        return (<div className="col-12 col-md-5 m-1">
            <Card>
                <CardBody>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {
                            comments.map((comment) => {
                                return <li style={{ marginBottom: '10px' }} key={comment.id}>{comment.comment}
                                    <div style={{ marginTop: '10px' }}>--{comment.author},
                                {/* {moment(comment.date).format('MMM DD, YYYY')} */}
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </CardBody>
            </Card>
        </div >
        )
    }
    else {
        return (
            <div></div>
        )
    }

}
const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (props.dish !== null){
        return (
            <Fragment>
                {props.dish &&
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem>
                                    <Link to="/menu">Menu</Link>
                                </BreadcrumbItem>
                                <BreadcrumbItem active>
                                    {props.dish.name}
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <RenderDish dish={props.dish} comments={props.comments}
                                postComment={props.postComment}
                                dishId={props.dish.id}
                            />
                        </div>
                    </div>}
            </Fragment>
        )
    } else {
        return (
            <div></div>
        )
    }
}


class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
    }
    toggleModal = () => {
        this.setState((prevState) => ({
            isModalOpen: !prevState.isModalOpen
        }))
    }

    handleSubmit = (values) => {
        this.toggleModal()
        // alert("Comment State is: " + JSON.stringify(values))
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
    }
    render() {

        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>
                                     Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="container">

                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating"> Rating</Label>

                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>

                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="tname">Your Name</Label>

                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }}
                                    />
                                    <Errors className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>

                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />

                                </Row>
                                <Row className="form-group">

                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>

                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default DishDetail