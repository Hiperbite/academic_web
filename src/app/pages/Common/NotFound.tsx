import { Link } from 'react-router-dom';
import './NotFound.scss'
export const NotFound =()=>{
return (
    <div className="az-signin-wrapper">
      <div className="az-card-signin">
        <h1 className="az-logo">az<span>i</span>a</h1>
        <div className="az-signin-header">
          <h2>4 0 4</h2>
          <h4>this page was notfound</h4>

          
        </div>{/* az-signin-header */}
        <div className="az-signin-footer">
          <p><Link to="/">Go to the Homepage</Link></p>
          <p>or Report an issue</p>
        </div>{/* az-signin-footer */}
      </div>{/* az-card-signin */}
    </div>
)
};