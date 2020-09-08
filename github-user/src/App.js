import React from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardText, CardTitle, Button } from "reactstrap";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = { // this sets the initial state
      user: [],
      userText: "",
      error: "",
      followers: []
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/dskinner24") // this is the api call that pulls the given user's information and assigns it to the state of user
      .then(res => {
        this.setState({
          user: res.data
        });
      })
      .catch(err => console.log(err));

    axios
      .get("https://api.github.com/users/dskinner24/followers") // this is the api call that pulls the given user's followers and assigns it to the state of followers
      .then(res => {
        this.setState({
          followers: res.data
        });
      })
      .catch(err => console.log(err));
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value  // this is setting the user input from the search field as userText
    })
  }

  fetchUser = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userText}`) // this is fetching the user that was inputted in the search field and setting that user to user and renders the searched user as long as it's a valid username
      .then(res => {
        this.setState({
          user: res.data,
          error: ""
        });
      })
      .catch(err => {
        this.setState({
          user: [],
          error: 'Invalid Username'
        });
      });
  };

  render() {
    return (
      <div style={{ background: 'purple'}} className='App'>
        <Card style={{ margin: '3%'}}>
          <CardTitle style={{fontSize: '25px', color: 'white', marginBottom: '15px' }}>Github User Finder</CardTitle>
          <input 
            style={{ width: '20%', borderRadius: '15px'}}
            type='text'
            placeholder='Github Username'
            value={this.userText}
            onChange={this.handleChanges}
          />
          <Button style={{borderRadius: '15px', marginLeft: '10px'}} onClick={this.fetchUser}>Search</Button>
          {this.state.error && (
            <p>{this.state.error}</p>
          )}
        </Card>
        <div>
          {!this.state.error && (
            <>
            <CardBody>
              <CardTitle style={{ fontSize:"25px", fontWeight: 'bold', color: 'white'}}>{this.state.user.login}</CardTitle>
              <CardImg style={{ marginTop: '20px', borderRadius: '250px'}} src={this.state.user.avatar_url} alt='Profile Avatar' />
              <CardText style={{ fontSize: '20px' }}>{this.state.user.name}</CardText>
              <CardText style={{ fontSize: '20px' }}>Bio: {this.state.user.bio}</CardText>
              <CardText style={{ fontSize: '20px' }}>Twitter: {this.state.user.twitter_username}</CardText>
              <CardText style={{ fontSize: '20px' }}>Followers: {this.state.user.followers}</CardText>
              {this.state.followers.map((follower) => (
                <a href={`https://api.github.com/users/${follower.login}`} key={follower.id}>{follower.login}<br /></a>
              ))}
              <CardText>Following: {this.state.user.following}</CardText>
            </CardBody>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App;