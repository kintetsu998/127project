var React = require('react');

var Post = require('../post/Post.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-top">
            <div className="col s3">
              <img src="/img/003.jpg" className="img-full circle"/>
            </div>
            <div className="col s9 profile-info">
              <h4>Peter Bernard M. Rupa, Student at University of the Philippines</h4>
              <div className="col s6">
                <p>Lives in Philippines</p>
              </div>
              <div className="col s6">
                {/*graduated at here*/}
              </div>
              <div style={{clear:'both'}}></div>
              <span className="experiences">Experiences:</span>
              <ul>
                <li>Cashier at McDonalds</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row small-margin">
          <div className="col s12 card-panel profile-middle">
            <div className="col s6">
              <span className="bold">Interested in:</span>
            </div>
            <div className="col s6">
              <span className="bold">Connections (62):</span>
            </div>
          </div>
        </div>
        <div className="row small-margin">
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
          <div className="profile-post">
            <Post img="/img/003.jpg" url="/" name="Peter Bernard M. Rupa" action="says: " body="Yehey!!"/>
          </div>
        </div>
      </div>
    );
  }
});
