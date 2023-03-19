import axios from "axios";
import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../../App";
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

  const { setLoading }: any = useContext(LoadingContext);
  const { post, data, loading, error } = useAuthenticationHandlerData();

  const navigate = useNavigate();
  useMemo(() => setLoading(loading), [loading])
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
      <h2>Autenticar-se </h2>
      <br />
      <br />
      ...{JSON.stringify(loading)}...
      <p>Se és um utilizador ja registado da nova, então preencha o formulário abáixo para acessar o sistema.</p>

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
            placeholder="insira o seu E-mail"
            required
          />
        </div>{/*<!-- form-group -->*/}
        <div className="form-group">
          <label htmlFor="password">Palavra-passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Insira a sua palavra-passe"
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
          className="btn btn-primary btn-block"
        >Entrar</button>

      </form>
    </div>{/*<!-- az-signup-header -->*/}
    <div className="az-signup-footer">

      <p>Esqueceu-se da palavra passe? <Link to="/auth/forgot-password">clique aqui</Link></p>
    </div>{/*<!-- az-signin-footer -->*/}
  </div>
}