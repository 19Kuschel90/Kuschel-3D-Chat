var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: ''
       }
    //    console.log('gi');

        this.changeUserName = this.changeUserName.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
        console.log(window.userName);
        
        location.hash = this.state.UserName;
      }


    
    render(){
    
        return(
            <div>
                <form  method='post' action={"/EDITOR" +location.hash }>
                    <div>
                        <p className="LoginText">Nick Name</p>
                        <div>
                        <input type="text" value={this.state.UserName} className="LoginImput" onChange={this.changeUserName} placeholder="User Name" name="UserName" required/>
                        </div>
                    </div>
                  
                 
                    <input type="submit" value="Log In" className="LoginInputButton"  />

                </form>
                 </div>
        );
    }
}