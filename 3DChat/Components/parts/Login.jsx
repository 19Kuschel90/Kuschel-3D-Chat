var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: '',
        birthday: '',
        password: ''
       }
       console.log('gi');

        this.changeUserName = this.changeUserName.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
      }


    
    render(){
    
        return(
            <div>
                <form  method='post' action="/EDITOR">
                    <div>
                        User Name:
                        <div>
                        <input type="text" value={this.state.UserName} onChange={this.changeUserName} placeholder="User Name" name="UserName" required/>
                        </div>
                    </div>
                  
                    <div>
                    Password:
                        <div>
                        <input type="password" value={this.state.UserName} onChange={this.changeUserName} placeholder="User Name" name="password" required/>
                        </div>
                    </div>        
                    <input type="submit" value="Send" />

                </form>
                 </div>
        );
    }
}