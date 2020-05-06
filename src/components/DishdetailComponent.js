
import React, { Fragment } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
// import moment from 'moment'
import { Link } from 'react-router-dom'


const RenderDish = ({ dish, comments }) => {
    if (dish !== undefined && dish !== null) {
        return (<Fragment>
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            {<RenderComments comments={comments} />}
        </Fragment>
        )
    } else {
        return (
            <div></div>
        )
    }
}
const RenderComments = ({ comments }) => {
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
                        <RenderDish dish={props.dish} comments={props.comments}/>
                    </div>
                </div>}
        </Fragment>

    )
}

export default DishDetail