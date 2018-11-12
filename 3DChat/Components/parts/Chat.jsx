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
        
        this.socket.emit('connection', {
            headers: null /* the headers sent as part of the handshake */,
            time: null /* the date of creation (as string) */,
            address: null /* the ip of the client */,
            xdomain: null /* whether the connection is cross-domain */,
            secure: null /* whether the connection is secure */,
            issued: null /* the date of creation (as unix timestamp) */,
            url:  null/* the request URL string */,
            query:null /* the query object */
          });
  this.socket.on('connectionOK', (data)=>{console.log(data)});// fix handchack

            this.siofu = new SocketIOFileUpload(this.socket);

        // this.siofu.listenOnDrop(document.getElementById("file_drop"));
        this.siofu.listenOnSubmit(document.getElementById("my_button"), document.getElementById("file_input"));

        this.siofu.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file.name);
            // Video
            if (event.file.name.match(/.mp4/)) {
                othis.send("Video", null,event.file.name);
            }                    // image
        else if (event.file.name.match(/.svg/) ||
        event.file.name.match(/.png/) ||
        event.file.name.match(/.bmp/) ||
        event.file.name.match(/.jpg/)
    ) {
        othis.send("image",event.file.name);
    }

        });
    }
    

    
    send(_type, imageName, MP4Name){
        console.log('Type', _type , imageName,MP4Name )
        this.socket.emit('message', {
        type: _type || "text",
            user: localStorage.getItem("UserName") || this.state.userName,
            avatar: localStorage.getItem('Avatar') || "No Avatar",
            text:  this.state.text,
            image: imageName || "",
            VideoName: MP4Name || "",
            play: false,
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
               

                 <label>Upload File: <input type="file" id="file_input" /></label>
<button id="my_button">Upload File</button>   
            
                <button onClick={() => this.send("text")} className="sendButton">Send</button>
                </div>
            </div>
        );
    }
}