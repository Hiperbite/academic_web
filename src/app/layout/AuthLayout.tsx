import { Outlet } from "react-router-dom"
import './Authlayout.scss'
export const AuthLayout = () => {

  return (
    <>
      <div className="az-signup-wrapper">
        <div className="az-column-signup-left">
          <div>
            <i className="typcn typcn-chart-bar-outline"></i>
            <h1 className="az-logo">nova</h1>
            <h5>Responsive Modern Dashboard &amp; Admin </h5>
            <p>We are excited to launch our new company and product Azia. After being featured in too many magazines to mention and having created an online stir, we know that BootstrapDash is going to be big. We also hope to win Startup Fictional Business of the Year this year.</p>
            <p>Browse our site and see for yourself why you need Azia.</p>
            <a href="index.html" className="btn btn-outline-indigo">Learn More</a>
          </div>
        </div>{/*<!-- az-column-signup-left -->*/}
        <Outlet/>
      </div>

    </>)
}