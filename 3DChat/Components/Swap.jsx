var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

var Login = require('./parts/Login');
var Editor = require('./parts/Editor');
var Chat = require('./parts/Chat');

module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        userName: "No userName"
       }
       console.log("this.state.userName",this.state.userName);
    }
    
  

   
    
    render(){
    
        return(
            <div>

            <BrowserRouter>
                <Switch > 
                <Route  path="/CHAT" render={() => {
        window.react360Helper();

              return (<Chat ></Chat>);
              
            }} />
            <Route path="/EDITOR" component={Editor} />
                    <Route path="/"  render={() => {
              return (<Login UserName={this.state.userName}></Login>);
            }} />
                    
                </Switch > 
            </BrowserRouter>
            </div>
        );
    }
}