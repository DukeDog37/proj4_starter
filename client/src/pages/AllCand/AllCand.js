import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import DelBtn from "../../components/DelBtn";
import ReviewBtn from "../../components/ReviewBtn";
import Modal from "../../components/Modal";
import Jumbotron from "../../components/Jumbotron";
import candidateAPI from "../../utils/candidateAPI";
import reviewAPI from "../../utils/reviewAPI";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";




class Candidates extends Component {
  state = {
    candidates: [],
    resume_text: ""
   
    };

  componentDidMount() {
    //this.loadCandidates();
  }

  loadCandidates = () => {
    candidateAPI.getCandidates()
      .then(res =>
        this.setState({ candidates: res.data, resume_text: "" })
      )
      .catch(err => console.log(err));
  };

  deleteCandidate = id => {
    candidateAPI.deleteCandidate(id)
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));
  };

  reviewCandidate = id => {
    
    reviewAPI.saveReview(id)
      .then(res => this.loadCandidates())
      .catch(err => console.log(err));

  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.resume_text) {
      candidateAPI.textsearchCandidate({resume_text: this.state.resume_text})
        .then(res => this.loadCandidates())
        .catch(err => console.log(err));
    }
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Enter New Candidate</h1>
            </Jumbotron>
            <form>
              
              <Input
                value={this.state.resume_text}
                onChange={this.handleInputChange}
                name="resume_text"
                placeholder="Enter Text to Search"
              />
              
             
              <FormBtn
                disabled={!(this.state.resume_text)}
                onClick={this.handleFormSubmit}
              >
                Search Candidates
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Candidates in Database</h1>
            </Jumbotron>
            {this.state.candidates.length ? (
              <List>
                {this.state.candidates.map(candidate => (
                  <ListItem key={candidate._id}>
                    <Link to={"/candidates/" + candidate._id}>
                      <strong>
                        {candidate.position_type}: {candidate.firstname} {candidate.lastname}
                      </strong>
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteCandidate(candidate._id)} />
                    <ReviewBtn onClick={() => this.reviewCandidate(candidate._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Candidates Available</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Candidates;
