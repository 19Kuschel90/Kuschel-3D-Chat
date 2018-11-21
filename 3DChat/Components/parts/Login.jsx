var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: ''
       }

        this.changeUserName = this.changeUserName.bind(this);
        this.setUserNameINLocalStorage = this.setUserNameINLocalStorage.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
    }
    
    setUserNameINLocalStorage(){
        window.localStorage.setItem('UserName', this.state.UserName);
    }
    
    render(){
    
        return(
            <div>
                 <div className="logo">
            <img src="/img/drawing.svg" class="editor editorAusWahlPic "></img>
        </div>
        <form>

                    <div>
                        <p className="LoginText">Nick Name</p>
                       
                        <div>
                        <input type="text" value={this.state.UserName} className="LoginImput" onChange={this.changeUserName} placeholder="User Name" name="UserName" required/>
                        </div>
                    </div>
                    <a href="/EDITOR" className="LoginInputButtonText" onClick={this.setUserNameINLocalStorage}>  
                      <div type='submit' className="LoginInputButton"> 

           Go to Chat
                  </div></a>
        </form>

                     </div>
        );
    }
}