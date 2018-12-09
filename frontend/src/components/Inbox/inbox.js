import React,{Component} from 'react';
import NavBar from '../NavBar/NavBar';
import UserToolbar from '../UserToolbar/UserToolbar';
import MessageThread from '../Messages/messages';
//import cookie from 'react-cookies';
import {connect} from "react-redux";
import {receiveMsgs} from "../../actions/users_action";

class Inbox extends Component{
    constructor(props){
        super(props);

        this.state = {
            messages: [],
            messageThreads: []
        };

        this.props.receiveMsgs((res) => {
            if(res.status === "SUCCESS"){
                console.log("*** Messages fetched for the user:" + JSON.stringify(res.userMessages) +".*** ");
                this.setState({
                    messages: res.userMessages
                });

                var messageThreads = {};
                for(var i=0; i<this.state.messages.length; i++){

                    var other_userID = this.state.messages[i].senderID;
                    if(this.state.messages[i].senderID === this.props.user.id)
                        other_userID = this.state.messages[i].recipientID;

                    if(!messageThreads[this.state.messages[i].propertyID + ":" + other_userID])
                        messageThreads[this.state.messages[i].propertyID + ":" + other_userID] = []
                    messageThreads[this.state.messages[i].propertyID + ":" + other_userID].push(this.state.messages[i]);
                }

                this.setState({
                    messageThreads: messageThreads
                });
                console.log("Message Threads: " + JSON.stringify(messageThreads));
            }
        });
    }

    render(){
        let message_threads = [];
        for(var thread in this.state.messageThreads){
            message_threads.push(<MessageThread other_userID={thread.split(":")[1]} property_id={thread.split(":")[0]} messages={this.state.messageThreads[thread]}/>)
        }
        
        return(
            <div className = "container">
                <NavBar location="inbox" />
                <UserToolbar tab="inbox"/>
                <div className="d-block w-100">
                    <h3 className="mt-3 font-weight-bold text-info">My Inbox</h3>
                    <div id="my_msg" className="container">
                        {message_threads}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.users.token,
    user: state.users.user,
    name: state.users.name,
    user_type: state.users.user_type,
    messages: state.users.messages,
});


export default connect(mapStateToProps, {receiveMsgs})(Inbox);