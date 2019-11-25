import React, {Component} from 'react'
import ApiManager from "../models/ApiManager"
import {Col, Row} from "react-bootstrap";
import * as _ from "lodash";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";


class Description extends Component{


    constructor(props) {
        super(props);
        this.state = {movie : {}};
    }

    componentDidMount() {
        const manager = new ApiManager();
        manager.fechtMovie(this.props.match.params.id)
            .then((response) => {
                this.setState({movie : response.data});
            });
    }

    render() {

        const {movie} = this.state;

        return (
            <Col className={"description-wrapper py-5"}>
                <Link to={'/'}><Button variant="secondary" className={"mb-5"}>Back to Home</Button></Link>
                <Row>
                    <Col as={'img'}
                         src={movie.poster}
                         className={'img-fluid'}
                         xs={3}
                    />
                    <Col>
                        <Col as={'h1'} className={'mb-0'}>{movie.movie}</Col>
                        <Col as={'h2'} className={"mt-0"}>{movie.yearOfRelease} - {movie.duration}</Col>
                        <Col as={'p'}>
                            <span className={"font-weight-bold"}>Staring: </span>
                            {_.join(movie.actors, ', ')}
                        </Col>
                        <Col/>
                        <Col as={'p'} className={'mb-0'}>
                            <span className={"font-weight-bold"}>Box office: </span>
                            {movie.boxOffice}
                        </Col>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default Description;