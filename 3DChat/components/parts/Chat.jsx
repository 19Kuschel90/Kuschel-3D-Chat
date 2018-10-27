var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');
module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            message: '',
            fileInput: ( <input type="file" id="this.siofu_input" />)
        }
        
        this.changeMessage = this.changeMessage.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.send = this.send.bind(this);
    }
    
    componentWillMount(){
        var io = require('socket.io-client');
        this.socket = io('/Chat');
        this.socket.emit('connection', {});
        this.siofu = new SocketIOFileUpload(this.socket);
        document.getElementById("upload_btn").addEventListener("click", this.siofu.prompt, false);
        this.siofu.listenOnInput(document.getElementById("upload_input"));
        this.siofu.listenOnDrop(document.getElementById("file_drop"));
     
        // Do something on upload progress:
        this.siofu.addEventListener("progress", function(event){
            var percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
        });
     
        // Do something when a file is uploaded:
        this.siofu.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file);
        });
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
               {this.state.fileInput}
                

            </div>
        );
    }
}