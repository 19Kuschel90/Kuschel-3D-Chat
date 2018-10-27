var React = require('react');


module.exports =  class Editor extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: '',
        birthday: '',
        password: ''
       }

        this.changeUserName = this.changeUserName.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
      }


    
    render(){
    
        return(
            <div>
                             <form ref='uploadForm' id='uploadForm' action="/CHAT"  method='post' encType="multipart/form-data">
                             <img alt="not" src="img/Luna_57x55_f1v1.png"  width="500px" height="500px" className="notSelect imgTemp Select"  onClick={this.select} id="img"></img>
                             <input type="file" name="sampleFile"   src="#" id="input"/>
                             <input type='submit' value='Upload! And Start' onClick={this.ifInputNull}/>

                    </form>
                 </div>
        );
    }
}