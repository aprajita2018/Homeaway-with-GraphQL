import React, {Component} from 'react';
import {connect} from "react-redux";
import {receiveMsgs, sendMsg, userDetailsByID} from "../../actions/users_action";
import './messages.css';
import {Link} from 'react-router-dom';


class MessageThread extends Component{
    constructor(props){
        super(props);        

        this.state = {
            otherUser: {}
        }

        this.handleSend = this.handleSend.bind(this);
        this.onChange = this.onChange.bind(this);

        let other_userID = this.props.other_userID;

        this.props.userDetailsByID(other_userID, (res) => {
            console.log("***Successfully fetched other user Details.***");
            if(res.status === "SUCCESS"){
                this.setState({
                    otherUser: {...res.user}
                })
            }
            else{
                console.log("ERROR: " + res.message);
            }
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.new_message && nextProps.new_message.recipientID === this.props.other_userID){
            this.props.messages.unshift(nextProps.new_message);
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    handleSend(e) {
        const values = {
            msg: this.state.reply,
            to: this.props.other_userID,
            property_id: this.props.property_id,
            property_title: this.props.messages[0].propertyTitle
        };
        this.props.sendMsg(values, (res) => {
            console.log(res);
            if(res.status === "SUCCESS"){
                console.log("Successsfully sent the message.");
                this.setState({
                    reply: ""
                });
            }
            else{
                console.log("ERROR: Couldn't send msg.");
                document.getElementById("alert_text").innerHTML = "ERROR: " + res.message;
                document.getElementById("alert_snackbar").style.setProperty('display', 'block');
                setTimeout(() => {
                    document.getElementById("alert_snackbar").style.setProperty('display', 'none');
                }, 2000);
            }
        });
    }
    
    render(){
        let msgs = this.props.messages.map( message => {
            return (
                    <ChatMessage mymessage={message.senderID === this.props.user.id? true: false} message={message}/>
            )
        });
        return(
            <div className="container bg-light my-2 py-2 messageCard">
                {/* card containing the message details  */}
                <div className="card" >  
                    <div className="card-header">
                        Conversation with <span className="font-weight-bold">{this.state.otherUser.f_name}</span> about <span className="font-weight-bold"><Link to={"/propertyDetails?id="  + this.props.property_id}>{this.props.messages[0].propertyTitle}</Link></span>
                    </div>                  
                    <div className="card-body px-2 row">
                        <div className="rounded col-md-9" style={{'overflow-y': 'scroll', height: '200px'}}>
                            {msgs}
                        </div>
                        <div className="rounded col-md-3">
                            <textarea rows="5" name = "reply" id ="reply" type ="text" placeholder ="Please write your reply here..." value={this.state.reply} onChange={this.onChange} required></textarea>
                            <button type="submit" className="btn btn-success" onClick={this.handleSend}>Reply</button>
                        </div>                    
                    </div>
                </div>
                <div id="alert_snackbar" className="alert alert-danger snackbar" role="alert" style={{display: 'none'}}>
                    <p id="alert_text"></p>
                </div>
                <div id="success_snackbar" className="alert alert-success snackbar" role="alert" style={{display: 'none'}}>
                    <p id="success_text"></p>
                </div>
            </div>
        )
    }
}


class ChatMessage extends Component{
    render(){
        return(
            <div className={this.props.mymessage === true ? "chat-message my-chat": "chat-message"}>
                <div className="row">
                    <div className="col-md-3 chat-message-timestamp">
                        {this.props.message.timestamp.substring(0,10)}<br />
                        {this.props.message.timestamp.substring(11,16)}
                    </div>
                    <div className = {this.props.mymessage === true ? "col-md-9 chat-message-body order-first" : "col-md-9 chat-message-body "}>
                        {this.props.message.msgBody}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type,
    new_message: state.users.new_message
});

export default connect(mapStateToProps, {receiveMsgs, sendMsg, userDetailsByID})(MessageThread);
