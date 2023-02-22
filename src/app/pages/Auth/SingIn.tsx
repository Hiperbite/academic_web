import React from "react";
import { Link, useNavigate  } from "react-router-dom";
export const SingIn=()=>{
    const navigate = useNavigate();

    return <div className="az-column-signup">
    <h1 className="az-logo">az<span>i</span>a</h1>
    <div className="az-signup-header">
      <h2>Sing In</h2>
      <h4>It's free to signup and only takes a minute.</h4>

      <form action="page-profile.html">
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" placeholder="Enter your email" />
        </div>{/*<!-- form-group -->*/}
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" />
        </div>{/*<!-- form-group -->*/}
        <button type="button" className="btn btn-az-primary btn-block" onClick={()=>navigate("/")}>Login</button>
        <div className="row row-xs">
          <div className="col-sm-6"><button className="btn btn-block"><i className="fab fa-facebook-f"></i> Signup with Facebook</button></div>
          <div className="col-sm-6 mg-t-10 mg-sm-t-0"><button className="btn btn-primary btn-block"><i className="fab fa-twitter"></i> Signup with Twitter</button></div>
        </div>{/*<!-- row -->*/}
      </form>
    </div>{/*<!-- az-signup-header -->*/}
    <div className="az-signup-footer">
      
    <p>Already have an account? <Link to="/auth/singon">Sign On</Link></p>
    </div>{/*<!-- az-signin-footer -->*/}
  </div>
}