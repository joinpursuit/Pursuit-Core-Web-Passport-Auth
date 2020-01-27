import React, { Component } from "react";
import axios from 'axios';

class Users extends Component {
  constructor() {
    super()

    this.state = {
      userlist: []
    }
  }

  componentDidMount() {
    axios.get('/users/').then(res => {
      console.log(res)
      this.setState({userlist: res.data})
    })
    .catch(err => {
      console.error(err)
    })
  }
  
  render() {
    return (
      this.state.userlist.map((user, i) => {
        return (
          <div className="user-item" key={i}>
            <p><span>id: </span>{user.id}</p>
            <p><span>user: </span>{user.username}</p>
            <p><span>password: </span>{user.password_digest}</p>
          </div>
          )
        })
      )
    }
}

export default Users;
