var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');
module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            text: '',
            fileInput: ( <input type="file" id="this.siofu_input" />),
            userName: "test"
        }
        
        this.changeMessage = this.changeMessage.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
        this.send = this.send.bind(this);
    }
    
    componentDidMount(){
        var io = require('socket.io-client');
        this.socket = io('/Chat');
        this.socket.emit('connection', {});
        ////////////////
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
        this.socket.emit('message', {
            user: this.state.userName,
            text: this.state.text,
            image: '',
            Video: {
                name: "",
                play: false
            }
        });

    }
    
    changeMessage(event) {
        this.setState({text: event.target.value});
      }


    
    render(){
    
        return(
            <div>
                <div>
                Message:<input typ="text" onChange={this.changeMessage} ></input>
                </div>
                <button onClick={this.send}>Send</button>
               {this.state.fileInput}
               <p><button id="upload_btn">Prompt for File</button></p>
        <p><label>Choose File: <input type="file" id="upload_input"/></label></p>
        <div id="file_drop" dropzone="copy" title="drop files for upload">Drop File</div>
        

            </div>
        );
    }
}