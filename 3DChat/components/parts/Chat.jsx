var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            message: ''
        }
        
        this.changeMessage = this.changeMessage.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.send = this.send.bind(this);
    }
    
    componentWillMount(){
        var io = require('socket.io-client');
        this.socket = io('/Chat');
        this.socket.emit('connection', {});
        
    }
    
    send(){
        this.socket.emit('message', {message: this.state.message});

    }
    
    changeMessage(event) {
        this.setState({message: event.target.value});
      }


    
    render(){
    
        return(
            <div>
                <div>
                Message:<input typ="text" onChange={this.changeMessage} ></input>
                </div>
                <button onClick={this.send}>Send</button>

            </div>
        );
    }
}