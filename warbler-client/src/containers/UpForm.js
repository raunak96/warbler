import React, { Component } from "react";
import { connect } from "react-redux";
import { updateMessage } from "../store/actions/messages";

class UpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:this.props.location.text
    };
  }

  handleNewMessage = event => {
    event.preventDefault();
    this.props.updateMessage(this.state.message,this.props.match.params.id,this.props.match.params.message_id);
    this.setState({message:""});
    this.props.history.push("/");
  };

  render() {
    return (
      <form onSubmit={this.handleNewMessage}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <input
          type="text"
          className="form-control"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <button type="submit" className="btn btn-success float-right">
          Add my message!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { updateMessage })(UpForm);
