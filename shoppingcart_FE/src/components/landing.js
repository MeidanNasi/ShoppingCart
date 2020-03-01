import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import first from '../images/first.png';
import mid from '../images/mid.png';
import last from '../images/last.png'
import monitor from '../images/monitor.svg'
import { Button, Modal, ModalBody, ModalHeader, Form, FormInput, FormGroup } from "shards-react";
import { logInUser, logIn } from './actions/authActions'
import { connect } from 'react-redux';



class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        openMadal: false,
        username: '',
        password: 0,
        ok: false
          };
  }
  modalUp() {
    this.setState({
      openMadal: !this.state.openMadal
    });
  }
  handleSubmit =  (usr, psw) => {
    this.props.logInUser(usr,psw)
  }

  render(){
    return (  
      <div className="body">
        <div className="home-container">
          <div id="inner" style={{marginBottom: '100px'}}>
          <h1>Shoppop</h1>
          <p class="subtitle">Welcome buyer!</p>
          <Button style={{margin: "10px"}} onClick={()=> this.modalUp()} size='lg'> Login </Button>
          <Button style={{margin: "10px"}} onClick={()=> this.modalUp()} size='lg'> Signup </Button>

          </div>
          <div id="illustration">
              <img src={last} alt="dash img" id="dash" class="crypto-icons"/>
              <img src={first} alt="iota img" id="iota" class="crypto-icons"/>
              <img src={mid} alt="eth img" id="eth" class="crypto-icons"/>
              <img src={monitor} alt="monitor img" id="monitor"/>
          </div>
        </div>
        <Modal open={this.state.openMadal} toggle={this.modalUp}>
        <ModalBody >
          <div className="box" >
            <Form>
              <FormGroup>
                <label>Username</label>
                <FormInput  placeholder="Username" onChange={(e) => this.setState({ username: e.target.value})}/>
              </FormGroup>
              <FormGroup>
                <label>Password</label>
                <FormInput type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value})}/>
              </FormGroup>
              <Link to="/clientHome">
              <Button style={{margin: "10px"}} onClick={()=> this.handleSubmit(this.state.username, this.state.password)}> submit </Button>
              </Link>
            </Form>
          </div>
        </ModalBody>
        </Modal>
      </div>

    );
  }
}


const mapStateToProps = (state)=>{
  return {
    users: state.users,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    logInUser: (username,password)=>{dispatch(logInUser(username,password))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Landing);

