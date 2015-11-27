const React = require('react');
const Help = require('../helpers.jsx');
const Link = require('react-router').Link;
const update = require('react-addons-update');

module.exports = React.createClass({
  apply(jobid, jobname){
    Materialize.toast('Successfully applied for ' + jobname + '.', 5000, 'green');

    this.setState({
      mayApply: 'applied'
    });

    $.ajax({
      url: '/api/job-applicant/',
      method: 'POST',
      data: {
        jobid,
        username: this.props.username
      }
    });
  },
  close(){
    this.setState({
      job: update(this.state.job, {
        $merge: {
          closedat: new Date()
        }
      })
    });

    $.ajax({
      url: '/api/job-close',
      method: 'POST',
      data: {
        jobid: this.state.job.jobid
      }
    })
  },
  getInitialState: function(){
    return {
      job: {},
      applicants: [],
      mayApply: ''
    };
  },
  componentWillMount: function(){
    var self = this;

    $.ajax({
      url: "/api/job?jobid=" + this.props.params.id,
      method: "GET",
      success: function(res){
        self.setState({
          job: res
        });

        console.log(self.state.job);

        // register view
        $.ajax({
          url: '/api/job-increment',
          method: 'PUT',
          data: {
            jobid: self.state.job.jobid
          }
        });

        $.ajax({
          url: '/api/job-applicant?jobid=' + self.props.params.id,
          method: "GET",
          success: function(res){
            self.setState({
              applicants: res
            });

            if(self.props.username != self.state.job.username){
              // check if it's in appplicant array
              if(self.state.applicants.indexOfAttr('username', self.props.username) == -1){
                self.setState({
                  mayApply: 'y'
                });
              }
              else{
                self.setState({
                  mayApply: 'applied'
                })
              }

              if(self.state.job.closedat){
                self.setState({
                  mayApply: ''
                })
              }
            }
            else{
              self.setState({
                mayApply: 'self'
              });
            }
          }
        });
      }
    });
  },
  render(){
    return (
      <div className="row">
        <div className="card-panel">
          <p className="center-text job-title">{this.state.job.jobname} at {this.state.job.company}</p>
          <p className="center-text job-country">{this.state.job.country}</p>
          <p className="center-text">Posted by <Link to={"/profile/".concat(this.state.job.username)}>{this.state.job.username}</Link></p>

          <strong>Field:</strong>
          <p>{this.state.job.fieldofinterest}</p>
          <strong>Description:</strong>
          <p>{this.state.job.description}</p>

          <br/>
          {!this.state.job.closedat?
            <div>
              {this.state.mayApply == 'applied'?
                <div className="center">
                  <a className="waves-effect waves-light btn blue disabled">Applied</a>
                </div>
                :
                this.state.mayApply == 'y'?
                <div className="center">
                  <a className="waves-effect waves-light btn blue" onClick={this.apply.bind(this, this.state.job.jobid, this.state.job.jobname)}>Apply</a>
                </div>
                :''
              }

              {this.state.job.username == this.props.username?
                <div className="center">
                  <a className="waves-effect waves-light btn red" onClick={this.close}>Close</a>
                </div>
                :''
              }
            </div>
            :''
          }

          {this.state.job.closedat?
            <strong className="red-text job-closed">This job offer is closed.</strong>
            :''
          }

        </div>

        <div className="col s12 l6 offset-l3">
          <div className="card-panel">
            <h5>Applicants <span>({this.state.applicants.length})</span></h5>

            {this.state.applicants.length > 0?
              <div className="collection">
                {this.state.applicants.map(applicant => {
                  var fullName = applicant.fname + ' ' + Help.parseMiddleName(applicant.mname) + ' ' + applicant.lname;

                  return (
                    <Link to={"/profile/".concat(applicant.username)} className="collection-item">{fullName}</Link>
                  );
                })}
              </div>
              :
              <p>No applicants yet.</p>
            }
          </div>
        </div>
      </div>

    );
  }
});
