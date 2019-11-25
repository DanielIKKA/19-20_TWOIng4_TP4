import React, {Component} from 'react'
import {Col} from "react-bootstrap";
import '../../Stylesheet/App.css';
import {Link} from "react-router-dom";

class FeatureMovie extends Component {
    render() {
        return (
            <Col id={this.props.movie.id}
                 lg={3}
                 sm={4}
                 xs={6}
                 className={"p-3 my-3 mx-2 border rounded-lg wrapper-feature"}
            >
                <Link to={`/${this.props.movie.id}`}>
                    <Col as={'img'}
                         src={this.props.movie.poster}
                         alt={"pic"}
                         xs={{span: 8, offset: 2}}
                         className={"img-fluid mb-3"}
                    />

                    <Col as={'h1'} className={"m-0"}>{this.props.movie.movie}</Col>
                    <Col as={'h2'} className={"m-0"}>{this.props.movie.yearOfRelease}</Col>
                </Link>
            </Col>
        );
    }
}

export default FeatureMovie;