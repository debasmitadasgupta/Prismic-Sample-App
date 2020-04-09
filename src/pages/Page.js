import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'
import NotFound from './NotFound'
import './Page.css'

const Page = ({ match }) => { 
  const [doc, setDocData] = useState(null)
  const [notFound, toggleNotFound] = useState(false)
  let history = useHistory();


  const uid = match.params.uid
 function onSubmit(e){
  history.push("/home");
  }

 function onUsernameChanged(e){
   console.log(e.target.value)

 }

 function onPasswordChanged(){

 }
  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID('page', uid)
      console.log("result",result)

      if (result) {
        // We use the State hook to save the document
        return setDocData(result)
      } else {
        // Otherwise show an error message
        console.warn('Page document not found. Make sure it exists in your Prismic repository')
        toggleNotFound(true)
      }
    }
    fetchData()
  }, [uid]) // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (

      <div style={{ height: '100%', overflowY: "hidden" }}>
        <div className="left-portion shadow logoArea" style={{ float: "left", width: "50%", height: "100%" }}>
          <div className="main-logo text-center">
          <img src={doc.data.image1.url} alt={doc.data.image1.alt} width="700"/>
             </div>
        </div>
         <div className="container login-box" style={{ float: "right" }}>
           <div className="shadow p-3 mb-5 bg-white rounded" style={{ marginLeft: "5%", marginRight: "5%", height:'50%' }}>
             <div className="">
               <h2 className="card-header" style={{ fontWeight: "700", color: "#343a40", backgroundColor: "#fff" }}>LogIn</h2>
               <div className="card-body">
                 <form className="form-signin" onSubmit={onSubmit.bind(this)}>
                   <span id="reauth-email" className="reauth-email"></span>
                   {/* Username */}
                   <input type="text" id="inputEmail" onChange={onUsernameChanged.bind(this)} className="form-control" placeholder="Username" required autoFocus />
                   {/* Password */}
                   <input type="password" style={{ marginTop: "2%" }} id="inputPassword" className="form-control" onChange={onPasswordChanged.bind(this)} placeholder="Password" required />
                   {/* Dockets */}
                
                   <button style={{ backgroundColor: "#343a40", marginTop: "2%" }} className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
                 </form>
               </div>
             </div>
       </div>

     </div>
       </div>
    )
  } else if (notFound) {
    return <NotFound />
  }
  return null
}

export default Page