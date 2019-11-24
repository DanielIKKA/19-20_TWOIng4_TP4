import React, {Component} from 'react'
import {Col} from "react-bootstrap";

class FeatureMovie extends Component {

    render() {
        return (
            <Col id={'wrapper-feature-'+ this.props.key}
                 xs={4}
                 className={"p-3"}
            >
                <Col as={'img'}
                     src={this.props.movie.poster}
                     alt={"pic"}
                     xs={{span: 8, offset: 2}}
                     className={"img-thumbnail"}
                />
                <Col>
                    <h1>{this.props.movie.movie}</h1>
                    <h2>{this.props.movie.yearOfRelease}</h2>
                </Col>
            </Col>
        );
    }
}

export default FeatureMovie;