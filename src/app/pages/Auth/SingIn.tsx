import axios from "axios";
import React, { useRef, useEffect, useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useAxiosFetch, { Api, services } from "../../app/api/Api";
import { useLoginMutation } from "../../app/api/auth/authApiSlice";
import { useAuthenticationHandlerData } from "../../app/api/auth/authentication";
import { setCredentials } from "../../app/api/auth/authSlice";
import AuthContext from "../../app/provider/AuthProvider";

export const SingIn = () => {
  const userRef: any = useRef()
  const errorRef: any = useRef()

  const [user, setuser] = useState('')
  const [pwd, setPwd] = useState('')
  const [res, setRes] = useState({})
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState(false)

  const { post, data, loading, error } = useAuthenticationHandlerData();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === 200) { navigate('/') }
  }, [data])

  const handleSubmit = (e: any) => {
    let credentials = { email: user, password: pwd }

    post(credentials)

    e.preventDefault();
  };


  return <div className="az-column-signup">
    <h1 className="az-logo">az<span>i</span>a</h1>
    <div className="az-signup-header">
      <h2>Sing In</h2>
      <h4>It's free to signup and only takes a minute.</h4>
      <hr />
      <hr />
      <form >
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            onChange={(e: any) => setuser(e.target.value)}
            className="form-control"
            id="username"
            value={user}
            placeholder="Enter your email"
            required
          />
        </div>{/*<!-- form-group -->*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            onChange={(e: any) => setPwd(e.target.value)}
            id="password"
            value={pwd}
            required
          />
        </div>{/*<!-- form-group -->*/}
        {error ?
          <Alert key={'danger'} variant={'danger'}>
            {String(error)}
          </Alert>
          : null}
        <button type="button"
          onClick={handleSubmit}
          className="btn btn-az-primary btn-block"
        >Login</button>
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