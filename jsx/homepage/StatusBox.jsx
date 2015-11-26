const React = require('react');

module.exports = React.createClass({
  getInitialState(){
    return {
      count: 2
    };
  },
  addPost(e){
    e.preventDefault();

    this.props.addPost({
      id: this.state.count,
      img: "img/003.jpg",
      url: "#",
      name: "Peter Bernard M. Rupa",
      action: "says:",
      body: $('#status').val()
    });

    this.setState({
      count: this.state.count + 1
    });

    $('#status').val('');
  },
  render(){
    return (
      <div className="card-panel">
        <form className="status-form" onSubmit={this.addPost}>
          <div className="row valign-wrapper no-margin">
            <div className="col s12 m12 l10">
              <div className="input-field no-margin">
                <input id="status" className="no-margin" type="text" placeholder="Say something" autoComplete="off"/>
              </div>
            </div>
            <div className="col s12 m12 l2">
              <button className="btn waves-effect waves-light valign blue" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});
