const React = require('react');

module.exports = React.createClass({
  render(){
    return (
      <div className="">
        <div className="col s3">
          <img src={this.props.img} className="img-full circle"/>
        </div>
        <div className="col s9 profile-info">
          <h4>{this.props.name}
            {this.props.occupation && this.props.company?
              <span>, {this.props.occupation} at {this.props.company}</span>
              :''
            }
          </h4>
          <div className="col s6">
            <p>Lives in {this.props.country}</p>
          </div>
          <div className="col s6">
            {/*graduated at here*/}
          </div>
          <div style={{clear:'both'}}></div>
          <span className="experiences">Experiences:</span>
          {this.props.experiences.length > 0?
            <ul>
              {this.props.experiences.map((experience)=>{
                return (
                  <li>{experience.title} at {experience.company}</li>
                );
              })}
            </ul>
            :
            <p>None</p>
          }
        </div>
      </div>
    );
  }
});
