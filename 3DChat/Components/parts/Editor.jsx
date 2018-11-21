var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');

module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
            src: [
                'AvatarSave/drawing.svg',
                'AvatarSave/Pony.svg',
                'AvatarSave/drawing-1.svg',
                 'AvatarSave/magic_Right2.svg',
                 'AvatarSave/Logo_200x200v6.png',
                 'AvatarSave/mapV0.png',
                 'AvatarSave/sketch-1528670047117.png',
                 'AvatarSave/sketch-1528893149916.png'
                ],
            index: 0,
            UploadState: "Ready"
        }
        this.nextImg = this.nextImg.bind(this);
        this.newUserImg = this.newUserImg.bind(this);
        this.forwordMy = this.forwordMy.bind(this);
        this.backMy = this.backMy.bind(this);
        this.getMakeImg = this.getMakeImg.bind(this);
        
    }
    
    componentDidMount(){
        if(localStorage.getItem('Avatar')  ){ 
            console.log('Avatar');
            if(this.state.src.find(x => x == localStorage.getItem('Avatar'))){
                this.setState({index: this.state.src.indexOf(localStorage.getItem('Avatar')) });
                
            }else{
                this.setState({src:  [...this.state.src, localStorage.getItem('Avatar')]});
                this.setState({index: this.state.src.length });
            }
        }else{
            this.newUserImg(this.state.src[this.state.index]);

        }
        let othis = this;
        var io = require('socket.io-client');
        this.socket = io('/uploadEditor');
        this.socket.emit('connection', {});
        ////////////////
        this.siofu = new SocketIOFileUpload(this.socket);
        this.siofu.listenOnInput(document.getElementById("upload_input"));
      
        // Do something on upload progress:
        this.siofu.addEventListener("progress", function(event){
            
            var temp = (event.bytesLoaded / event.file.size) * 100;
            temp = String(Math.round(temp)) + "%";
            console.log(temp);
            othis.setState({UploadState:  temp});
        });   
        // Do something when a file is uploaded:
        this.siofu.addEventListener("complete", function(event){
            console.log(event.detail.newName);
            console.log("event.success",event.success);
            console.log("event.file", event.file);
            othis.setState({src: [...othis.state.src, event.detail.newName]});
            othis.setState({index: othis.state.src.length -1});
            othis.newUserImg(event.file.name);
            othis.setState({UploadState:  "Ready"});

        });
        this.siofu.addEventListener("error", function(event){
            othis.setState({UploadState: "Upload Fail "});
        });
    }

    forwordMy(){
        this.nextImg(1);
    }

    backMy()
    {
        this.nextImg(-1);
    }
    
    nextImg(number){
       let othis = this;
        var temp = this.state.index + number;
        if(temp < 0 )
        {
            temp = this.state.src.length -1;
        }
        if(temp > this.state.src.length -1)
        {
            temp = 0;
        }
        this.setState({index: temp},()=> othis.newUserImg(this.state.src[this.state.index]));
    
    }

    newUserImg(srcName)
    {
        window.localStorage.setItem('Avatar', srcName);
    }

 
    getMakeImg(){
        return (
            <img alt="not" src={"static_assets/" + this.state.src[this.state.index]}  className="editor editorAusWahlPic"  onClick={this.newUserImg} ></img>
        
            );
    }

    render(){
    
        return(
            <div >
                  <a href="/">
                    <div className="sendBackButton">Back</div>
                   </a>
                             <div className="editorAvatar">
                                <p>Your Avatar:</p>
                                <div>
                                <div>

                                {this.getMakeImg()}
                                </div>
                                <button className="editorButtonLeft" onClick={this.forwordMy}>left</button>
                                <button className="editorButtonRight" onClick={this.backMy}>right</button>
                                </div>
                                <p><label>Choose File: <input type="file" id="upload_input" accept="image/png, image/jpeg"/></label></p>
                                <div>
                                    Upload State: {this.state.UploadState}
                                    </div>
                             </div>

                                          
                    <a href="/CHAT" className="LoginInputButtonText" >  
                      <div type='submit' className="LoginInputButton"> 
                      Go to Chat
                  </div></a>

                 </div>
        );
    }
}