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
                 'AvatarSave/Logo_200x200v6.png'
                ],
            index: 0,
            // userImg: 'AvatarSave/drawing.svg',
            uploadProgress: 100,
            error: "Error:"
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
            //    this.setState({userImg:  this.state.src[ this.state.src.indexOf(localStorage.getItem('Avatar'))]});
            }else{
                this.setState({src:  [...this.state.src, localStorage.getItem('Avatar')]});
                this.setState({index: this.state.src.length });
                // this.setState({userImg:  localStorage.getItem('Avatar')});
            }
        }
        let othis = this;
        var io = require('socket.io-client');
        this.socket = io('/uploadEditor');
        this.socket.emit('connection', {});
        ////////////////
        this.siofu = new SocketIOFileUpload(this.socket);
        // document.getElementById("upload_btn").addEventListener("click", this.siofu.prompt, false);
        this.siofu.listenOnInput(document.getElementById("upload_input"));
     
        // Do something on upload progress:
        this.siofu.addEventListener("progress", function(event){
            othis.setState({error: "Error"});
            
            var temp = (event.bytesLoaded / event.file.size) * 100;
            temp = Math.round(temp);
                othis.setState({uploadProgress: temp});
        });   
        // Do something when a file is uploaded:
        this.siofu.addEventListener("complete", function(event){
            console.log("event.success",event.success);
            console.log("event.file", event.file);
            othis.setState({src: [...othis.state.src, event.file.name]});
            othis.setState({index: othis.state.src.length -1});
            othis.setState({userImg:  event.file.name});
            // window.localStorage.setItem('Avatar', event.file.name); 
            othis.newUserImg(event.file.name);
        });
        this.siofu.addEventListener("error", function(event){
            othis.setState({error: "Upload Fail "});
            // this.setState({uploadProgress: 100});
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
        // console.log(temp);
        // this.setState({index: temp});
        this.setState({index: temp},()=> othis.newUserImg(this.state.src[this.state.index]));
    
        // console.log(this.state.index);
        // console.log(this.state.src[this.state.index]);
        // console.log(this.state.userImg);
        
    }

    newUserImg(srcName)
    {
        console.log(srcName);
        // this.setState({userImg: this.state.src[this.state.index]});
        window.localStorage.setItem('Avatar', srcName);
        // console.log(window.localStorage.getItem('Avatar', event.file.name));
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
                                <p><label>Choose File: <input type="file" id="upload_input" accept="image/png, image/jpeg"/></label>
                                {this.state.error}</p>
                             </div>
                             {/* <div><a href="/CHAT">Go to Chat</a></div> */}
                                    {/* <form> */}

                                          
                    <a href="/CHAT" className="LoginInputButtonText" >  
                      <div type='submit' className="LoginInputButton"> 
                      Go to Chat
                  </div></a>
        {/* </form> */}

                 </div>
        );
    }
}