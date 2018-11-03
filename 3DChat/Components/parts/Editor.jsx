var React = require('react');


module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
            src: ['static_assets/Pony.svg','static_assets/drawing.svg','static_assets/drawing-1.svg'],
            index: 0,
            userImg: 'static_assets/irre2.svg'
        }
        this.nextImg = this.nextImg.bind(this);
        this.newUserImg = this.newUserImg.bind(this);
        this.forwordMy = this.forwordMy.bind(this);
        this.backMy = this.backMy.bind(this);
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
                             <img alt="not" src={this.state.userImg}  width="500px" height="500px" className="editor"   id="img"></img>
                             <div className="editorAusWahl">
                                <button className="editorButtonLeft" onClick={this.forwordMy}>left</button>
                             <img alt="not" src={this.state.src[this.state.index]}  width="500px" height="500px" className="editor editorAusWahlPic"  onClick={this.newUserImg} id="img"></img>
                                <button className="editorButtonRight" onClick={this.backMy}>right</button>
                             </div>
                             <input type="file" name="sampleFile"   src="#" id="input"/>
                             <input type='submit' value='Upload! And Start' onClick={this.ifInputNull}/>

                 </div>
        );
    }
}