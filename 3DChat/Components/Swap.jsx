var React = require('react');
var BrowserRouter = require('react-router-dom').BrowserRouter;
var Route = require('react-router-dom').Route;
var Switch = require('react-router-dom').Switch;

var Login = require('./parts/Login');
var Editor = require('./parts/Editor');

module.exports =  class App extends React.Component {
    constructor(props){
        super(props);   
       this.state = {
        userName: "No userName"
       }
    }
    
  

   
    
    render(){
    
        return(
            <div className="animate-opacity-FadeIN">

            <BrowserRouter>
                <Switch > 
           
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