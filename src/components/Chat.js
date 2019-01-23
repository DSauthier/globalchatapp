
import React from "react";
import io from "socket.io-client";
import "./chat.css"

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: []
    };

    this.socket = io('localhost:8080');
  
    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: '' });
    }

    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }
  // $(document).ready(function() {
  //   $('#TextBoxId').keypress(function (e) {
  //     if (e.keyCode == 13)
  //       $('#linkadd').click();
  //   });
  // });
  render() {
    return (
      <div className="container">
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                    <nav className="navBar">Global Chat</nav>
                    
                    <div className="messages">
                      {this.state.messages.map(message => {
                        return (<div>

                          <div>User {message.author} Said: {message.message}</div>
                        <p></p>
                        </div>
                        )
                      })}
                          <p></p>
                    </div>
                    <p>Hello</p>
                <form>

                <div className="createMsg">
                  <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                  <br />
                  <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                  <br />
                  <button type="submit" onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;