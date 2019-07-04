import React,{Component} from "react";
import {connect} from "react-redux";
import {fetchMessages,deleteMessage} from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component{
    componentDidMount(){
        this.props.fetchMessages();     //as soon as this component mounts,fetch the message from api
    }
    render() {
        const { messages,deleteMessage,currentUser } = this.props;
        let messageList = messages.map(m => (
          <MessageItem key={m._id} isCorrectUser={currentUser===m.user._id} currentUser={currentUser} id={m._id} deleteMessage={deleteMessage.bind(this,m.user._id,m._id)} date={m.createdAt} text={m.text} username={m.user.username} profileImageUrl={m.user.profileImageUrl} />
        ));
        return (
          <div className="col-md-8 col-xs-12">
            <div className="col-offset-1">
              <ul className="list-group" id="messages">
                {messageList}
              </ul>
            </div>
          </div>
    );
  }
}

function mapStateToProps(reduxState){
    return {
      messages:reduxState.messages,
      currentUser:reduxState.currentUser.user.id
    };
}
export default connect(mapStateToProps,{fetchMessages,deleteMessage})(MessageList);