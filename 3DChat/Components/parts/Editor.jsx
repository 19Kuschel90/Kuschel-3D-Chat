var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');

module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
            src: ['AvatarSave/drawing.svg','AvatarSave/Pony.svg','AvatarSave/drawing-1.svg'],
            index: 0,
            userImg: 'AvatarSave/drawing.svg'
        }
        this.nextImg = this.nextImg.bind(this);
        this.newUserImg = this.newUserImg.bind(this);
        this.forwordMy = this.forwordMy.bind(this);
        this.backMy = this.backMy.bind(this);
        
    }
    
    componentDidMount(){
        if(localStorage.getItem('Avatar')  ){ 
            console.log('Avatar');
           if(this.state.src.find(x => x == localStorage.getItem('Avatar'))){
               debugger;
               this.setState({index: this.state.src.indexOf(localStorage.getItem('Avatar')) });
               this.setState({userImg:  this.state.src[ this.state.src.indexOf(localStorage.getItem('Avatar'))]});
            }else{
               debugger;

                this.setState({src:  [...this.state.src, localStorage.getItem('Avatar')]});
                this.setState({index: this.state.src.length });
                this.setState({userImg:  localStorage.getItem('Avatar')});
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
            var percent = event.bytesLoaded / event.file.size * 100;
            console.log("File is", percent.toFixed(2), "percent loaded");
        });
     
        // Do something when a file is uploaded:
        this.siofu.addEventListener("complete", function(event){
            console.log("event.success",event.success);
            console.log("event.file", event.file);
            othis.setState({src: [...othis.state.src, event.file.name]});
            othis.setState({index: othis.state.src.length -1});
            othis.setState({userImg:  event.file.name});
            window.localStorage.setItem('Avatar', othis.state.userImg); 
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
        this.setState({index: temp});
        console.log(this.state.index);
        console.log(this.state.src[this.state.index]);
        console.log(this.state.userImg);
        
    }

    newUserImg()
    {
        this.setState({userImg: this.state.src[this.state.index]});
        window.localStorage.setItem('Avatar', this.state.src[this.state.index]);
        console.log(this.state.userImg);
        // console.log(window.localStorage.getItem('Avatar', event.file.name));
    }

 
    render(){
    
        return(
            <div>
                             <img alt="not" src={"static_assets/" + this.state.userImg}  width="500px" height="500px" className="editor"   id="img"></img>
                             <div className="editorAusWahl">
                                <button className="editorButtonLeft" onClick={this.forwordMy}>left</button>
                             <img alt="not" src={"static_assets/" + this.state.src[this.state.index]}  width="500px" height="500px" className="editor editorAusWahlPic"  onClick={this.newUserImg} id="img"></img>
                                <button className="editorButtonRight" onClick={this.backMy}>right</button>
                                <p><label>Choose File: <input type="file" id="upload_input" accept="image/png, image/jpeg"/></label></p>
                             </div>
                             <div><a href="/CHAT">Go to Chat</a></div>

                 </div>
        );
    }
}