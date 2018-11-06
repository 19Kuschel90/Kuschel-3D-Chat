var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: ''
       }

        this.changeUserName = this.changeUserName.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
        console.log(window.userName);
        window.localStorage.setItem('UserName', this.state.UserName);
        
        // location.hash = this.state.UserName;
      }


    
    render(){
    
        return(
            <div>
                    <div>
                        <p className="LoginText">Nick Name</p>
                        <div>
                        <input type="text" value={this.state.UserName} className="LoginImput" onChange={this.changeUserName} placeholder="User Name" name="UserName" required/>
                        </div>
                    </div>
                  
                    <a href="/EDITOR">Log In</a>

                     </div>
        );
    }
}