var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');


module.exports =  class chat extends React.Component {
    constructor(props){
        super(props);   
        this.state = {
            text: '',
            userName: "No Name",
            UploadState: "Ready"
        }
        this.changeMessage = this.changeMessage.bind(this);
        this.send = this.send.bind(this);
        this.uploadState =this.uploadState.bind(this);
    }
    
    componentDidMount(){
        var othis = this;
        var io = require('socket.io-client');
        this.socket = io('/Chat');
        
        this.socket.emit('connection', {

          });
  this.socket.on('connectionOK', (data)=>{console.log(data)});// fix handchack

            this.siofu = new SocketIOFileUpload(this.socket);

        this.siofu.listenOnSubmit(document.getElementById("my_button"), document.getElementById("file_input"));
        this.siofu.addEventListener("progress", function(event){
       let temp = ((event.bytesLoaded / event.file.size) * 100);
            temp = String(Math.round(temp)) + "%";
            othis.setState({UploadState:  temp});
        });
        setInterval(()=> {
            othis.socket.emit('One',{msg: "One"})
        }, 500);
        this.socket.on('Two',(data) => {
            // console.log(data.msg)
        });

        this.siofu.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file.name);
            othis.setState({UploadState: "Ready"});

            // Video
            if (event.file.name.match(/.mp4/)) {
                othis.send("Video", null, event.detail.newName);
            }                    // image
        else if (event.file.name.match(/.svg/) ||
        event.file.name.match(/.png/) ||
        event.file.name.match(/.bmp/) ||
        event.file.name.match(/.jpg/)
    ) {
        othis.send("image", event.detail.newName);
    }

        });
        this.siofu.addEventListener("error", function(event){
            othis.setState({UploadState: "Upload fail, try it again"});
        });
    }
    

    
    send(_type, imageName, MP4Name){
        console.log('Type', _type , imageName,MP4Name );
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


      uploadState(){
        if( this.state.UploadState === "Ready" || this.state.UploadState ===  "Upload fail, try it again"){
            return(
                <button id="my_button" className="sendButton">Upload</button>   
                );
            }else{
                return(
                    <button id="my_button" className="sendButton" disabled>Upload</button>   
                );
        }
      }

    
    render(){
    
        return(
            <div>
               <a href="/">
                    <div className="sendBackButton">Back</div>
                   </a>
                <div className="sendChatPostion sendChatPanel">

               

                 {this.uploadState()}
                 <label> <input type="file" id="file_input" className="sendFileInput" /></label>
                 <div>
                                    Upload State: {this.state.UploadState}
                                    </div>
                <span>
                 <textarea rows="2" cols="20" onChange={this.changeMessage}></textarea>
                </span>
                <span>
                <button onClick={() => this.send("text")} className="sendButton">Send</button>

                </span>
                </div>
            </div>
        );
    }
}

