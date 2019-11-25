import React, {Component} from 'react'
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";

class FeatureMovie extends Component {

    render() {
        return (
            <Col id={'wrapper-feature'}
                 xs={3}
                 className={"p-3 my-3 mx-2 border rounded-lg"}
            >
                <Col as={'img'}
                     src={this.props.movie.poster}
                     alt={"pic"}
                     xs={{span: 8, offset: 2}}
                     className={"img-fluid mb-3"}
                />
                <Row className={"d-flex align-items-center"}>
                    <Col as={'h1'} className={"m-0 text-right"}>{this.props.movie.movie}</Col>
                    <Col as={'h2'} className={"m-0"}>{this.props.movie.yearOfRelease}</Col>
                </Row>
            </Col>
        );
    }
}

export default FeatureMovie;