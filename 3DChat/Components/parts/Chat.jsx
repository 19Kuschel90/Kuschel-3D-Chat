var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');
module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            text: '',
            fileInput: ( <input type="file" id="this.siofu_input" />),
            userName: "No Name"
        }
        console.log(localStorage.getItem('Avatar'));
        console.log(localStorage.getItem('UserName'));
        this.changeMessage = this.changeMessage.bind(this);
        this.send = this.send.bind(this);
        
    }
    
    componentDidMount(){

        var othis = this;
        var io = require('socket.io-client');
        this.socket = io('/Chat');
        this.socket.emit('connection', {});
  
    }
    

    
    send(){
        this.socket.emit('message', {
            user: localStorage.getItem("UserName") || this.state.userName,
            text:  this.state.text,
            image: '',
            Video: {
                name: "",
                play: false
            }
        });

    }
    
    changeMessage(event) {
        this.setState({
            text: event.target.value
        });
      }


    
    render(){
    
        return(
            <div>
               <a href="/">
                    <div className="sendBackButton">Back</div>
                   </a>
                <div className="sendChatPostion">

                 <textarea rows="4" cols="40" onChange={this.changeMessage}></textarea>
           
                <button onClick={this.send} className="sendButton">Send</button>
                </div>
            </div>
        );
    }
}