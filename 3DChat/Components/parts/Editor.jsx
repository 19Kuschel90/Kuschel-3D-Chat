var React = require('react');

var SocketIOFileUpload = require('socketio-file-upload');

module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
            src: ['Pony.svg','drawing.svg','drawing-1.svg'],
            index: 0,
            userImg: 'irre2.svg'
        }
        this.nextImg = this.nextImg.bind(this);
        this.newUserImg = this.newUserImg.bind(this);
        this.forwordMy = this.forwordMy.bind(this);
        this.backMy = this.backMy.bind(this);
        
    }
    
    componentDidMount(){
        if(localStorage.getItem('Avatar')){
            console.log('Avatar');
            this.setState({src:  [...this.state.src, localStorage.getItem('Avatar')]});
            this.setState({index: this.state.src.length });
            this.setState({userImg:  localStorage.getItem('Avatar')});
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
            // console.log("File is", percent.toFixed(2), "percent loaded");
        });
     
        // Do something when a file is uploaded:
        this.siofu.addEventListener("complete", function(event){
            console.log(event.success);
            console.log(event.file);
            othis.setState({src: [...othis.state.src, event.file.name]});
            othis.setState({index: othis.state.src.length -1});
            othis.setState({userImg:  event.file.name});
            window.localStorage.setItem('Avatar', event.file.name);
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
        if(temp > this.state.src.length )
        {
            temp = 0;
        }
        console.log(temp);
        this.setState({index: temp});
    }

    newUserImg()
    {
        this.setState({userImg: this.state.src[this.state.index]});
    }
 
    render(){
    
        return(
            <div>
                             <img alt="not" src={"static_assets/" +this.state.userImg}  width="500px" height="500px" className="editor"   id="img"></img>
                             <div className="editorAusWahl">
                                <button className="editorButtonLeft" onClick={this.forwordMy}>left</button>
                             <img alt="not" src={"static_assets/" + this.state.src[this.state.index]}  width="500px" height="500px" className="editor editorAusWahlPic"  onClick={this.newUserImg} id="img"></img>
                                <button className="editorButtonRight" onClick={this.backMy}>right</button>
                                <p><label>Choose File: <input type="file" id="upload_input" accept="image/*"/></label></p>
                             </div>
                             <div><a href="/CHAT">Go to Chat</a></div>

                 </div>
        );
    }
}