import React from "react";
import FeatureMovie from '../Components/FeatureMovie';
import ApiManager from '../models/ApiManager'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies : []
        };
    }


    componentDidMount() {
        console.log('fetch');
        this.requestMovies();
    }

    requestMovies() {
        let manager = new ApiManager();

        manager.fetchAllMovie()
            .then((response) => {
                this.setState({movies : response.data});
            });
    }

    render() {
        return (
            <Col>
                <Row className={"justify-content-center"}>
                    {this.state.movies.map((movie) =>
                        <FeatureMovie key={movie.id} movie={movie}/>
                    )}
                </Row>
            </Col>
        );
    }
}

export default Home;