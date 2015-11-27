'use strict';

const React = require('react');

const Post = require('../post/Post.jsx');
const ProfileTop = require('./ProfileTop.jsx');
const ProfileMiddle = require('./ProfileMiddle.jsx');
const ControlPanel = require('./ControlPanel.jsx');

module.exports = React.createClass({
  connect(username, name){
    Materialize.toast('You are now connected with '+name+'!', 5000, 'green');

    this.setState({
      isConnected: true
    });

    $.ajax({
      url: '/api/user-connection',
      method: 'POST',
      data: {
        username1: this.props.username,
        username2: username
      }
    });
  },
  edit(fd){
    Materialize.toast('Profile successfully edited.', 5000, 'green');

    $.ajax({
      url: '/api/users',
      method: 'PUT',
      data: fd,
      processData: false,
      contentType: false
    });

    this.props.history.pushState(null, '/');

    $('#modal2').closeModal();
  },
  delete(){
    let username = this.state.username;

    Materialize.toast('User ' + username + ' deleted.', 5000, 'red');

    this.props.history.pushState(null, '/');

    $.ajax({
      url: '/api/users',
      method: 'DELETE',
      data: {username}
    })
  },
  getInitialState(){
    return {
      experiences: [],
      connections: [],
      isConnected: false
    };
  },
  componentWillMount(){
    var self = this;

    $.ajax({
      'url': '/api/users/' + self.props.params.username,
      'method': 'GET',
      'success'(data){
        self.setState(data);

        // check if connected
        if(self.state.username != self.props.username){
          $.ajax({
            url: '/api/user-check-connected?username1='+self.state.username+'&username2='+self.props.username,
            method: 'GET',
            success(res){
              console.log(res);
              if(res.length > 0){
                self.setState({
                  isConnected: true
                });
              }
            }
          });
        }
      },
      'error'(err){
        console.error(err);
      }
    });

    // experiences
    $.ajax({
      'url': '/api/user-experience?username=' + this.props.params.username,
      'method': 'GET',
      'success'(data){
        self.setState({
          experiences: data
        });
      },
      'error'(err){
        console.error(err);
      }
    });

    // connections
    $.ajax({
      url: '/api/user-connection?username=' + this.props.params.username,
      method: 'GET',
      success(connections){
        self.setState({connections});
      }
    });
  },
  render() {
    var name = [this.state.fname, this.state.mname, this.state.lname].join(' ');

    return (
      <div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-top">
            <ProfileTop
              name={name}
              occupation={this.state.occupation}
              college={this.state.college}
              company={this.state.company}
              country={this.state.country}
              img={this.state.picture}
              experiences={this.state.experiences}
            />
          </div>
        </div>
        <div className="row small-margin">
          <ControlPanel
            username={this.props.username}
            isAdmin={this.props.isAdmin}
            profileName={this.state.username}
            isConnected={this.state.isConnected}
            name={this.state.fname}
            connect={this.connect}
            edit={this.edit}
            delete={this.delete}
          />
        </div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-middle">
            <ProfileMiddle
              interest={this.state.fieldofinterest}
              connections={this.state.connections}
            />
          </div>
        </div>
        <div className="row small-margin">
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="is looking for a job."/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="This is a post."/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body=":)"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="is now connected with Procopio. "/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Jireh Lim F. Club" action="says: " body="Hello World!"/>
          </div>
        </div>
      </div>
    );
  }
});
