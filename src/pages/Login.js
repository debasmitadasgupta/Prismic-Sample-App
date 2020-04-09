import React from 'react';
import { client, linkResolver } from '../prismic-configuration'
// import './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
        loginpage:{}
    }
  }

  
  onUsernameChanged(e) {
    this.setState({ username: e.target.value });
  }
  onPasswordChanged(e) {
    this.setState({ password: e.target.value });
  }
  

  // ===> Field Change event end

  // ===> LogIn
  onSubmit(e) {
   
  }

  async fetchData()   {
    const doc = await client.getByUID('page')
    console.log("the document",doc)
    this.setState(
        {
            loginpage: doc.data
        }
    )
  }

  getLogoImg(){
      if(this.state.loginpage.image){
          return( <img scr={this.state.loginpage.image.url} style={{ borderRadius: "20%", boxShadow: "0 0.5rem 0.6rem red", position: "relative", top: "25%" }} height="420" width="420"/>)
      }
  }
  

  render() {
    return (
      <div style={{ height: '100%', overflowY: "hidden" }}>
        <div className="left-portion shadow logoArea" style={{ float: "left", width: "50%", height: "100%" }}>
          <div className="main-logo text-center">
               {this.getLogoImg()}
             </div>
        </div>
         <div className="container login-box" style={{ float: "right" }}>
           <div className="shadow p-3 mb-5 bg-white rounded" style={{ marginLeft: "5%", marginRight: "5%", height:'50%' }}>
             <div className="">
               <h2 className="card-header" style={{ fontWeight: "700", color: "#343a40", backgroundColor: "#fff" }}>LogIn</h2>
               <div className="card-body">
                 <form className="form-signin" onSubmit={this.onSubmit.bind(this)}>
                   <span id="reauth-email" className="reauth-email"></span>
                   {/* Username */}
                   <input type="text" id="inputEmail" onChange={this.onUsernameChanged.bind(this)} className="form-control" placeholder="Username" required autoFocus />
                   {/* Password */}
                   <input type="password" style={{ marginTop: "2%" }} id="inputPassword" className="form-control" onChange={this.onPasswordChanged.bind(this)} placeholder="Password" required />
                   {/* Dockets */}
                
                   <button style={{ backgroundColor: "#343a40", marginTop: "2%" }} className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                 </form>
                 {/* <div className="col-md-12 text-center" style={{ marginTop: '2rem' }}>
                   <a href="#" data-toggle="modal" data-target="#forgotModal" onClick={() => {
                     this.setState({
                      forgotEmail: ""
                     })
                   }}>Forgot Password</a>
                 </div> */}
               </div>
             </div>
       </div>

     </div>
       </div>
    )
  }

  componentWillMount(){
    this.fetchData()
    // doc contains the document content
  }

//   componentDidMount() {
//     if (cookies.get('status') === "true") {
//       this.props.history.push("/Home");
//     } else {
//       this.props.getDockets();

//     }
  }

  


const mapStateToProps = (state) => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default Login;
