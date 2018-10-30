var React = require('react');


module.exports =  class Login extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        UserName: '',
        birthday: '',
        password: ''
       }
    //    console.log('gi');

        this.changeUserName = this.changeUserName.bind(this);
    }
    
    changeUserName(event) {
        this.setState({UserName: event.target.value});
      }


    
    render(){
    
        return(
            <div>
                You Offline or Server Down
                 </div>
        );
    }
}