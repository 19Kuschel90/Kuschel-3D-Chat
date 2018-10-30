var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

var Login = require('./parts/Login');
var Editor = require('./parts/Editor');
var Chat = require('./parts/Chat');
var Offline = require('./parts/Offline');

module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
     
       }
        // console.log(Login);
    }
    
  

   
    
    render(){
    
        return(
            <div>

            <BrowserRouter>
                <Switch > 
                <Route exact path="/Chat" render={() => {
        window.react360Helper();

              return (<Chat></Chat>);
              
            }} />
                    <Route path="/EDITOR" component={Editor} />
                    <Route path="/" component={Login} />
                    {/* <Route  component={Offline} /> */}
                    
                </Switch > 
            </BrowserRouter>
            </div>
        );
    }
}