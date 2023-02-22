import { Link, Outlet } from "react-router-dom"
import { Pedagogical } from "../pages/pedagogical/Pedagogical"

const StudentsMenu = () => {
    return (
        <div className="component-item">
            <label>Estudantes</label>
            <nav className="nav flex-column">
                <Link to="/students" className="nav-link">Matriculados</Link>
                <Link to="/students" className="nav-link">Dropdown</Link>
                <Link to="" className="nav-link">Icons</Link>
            </nav>
            <label>Candidatos</label>
            <nav className="nav flex-column">
                <Link to="/students/list" className="nav-link">Inicio</Link>
            </nav>
            <label>Charts</label>
            <nav className="nav flex-column">
                <a href="chart-chartjs.html" className="nav-link">ChartJS</a>
            </nav>

            <label>Tables</label>
            <nav className="nav flex-column">
                <a href="table-basic.html" className="nav-link">Basic Tables</a>
            </nav>
        </div>
    )
}

const PedagogicalMenu = () => {
    return (
        <div className="component-item">
            <label>Estudantes</label>
            <nav className="nav flex-column">
                <Link to="/students" className="nav-link">Matriculados</Link>
                <Link to="/students" className="nav-link">Dropdown</Link>
                <Link to="" className="nav-link">Icons</Link>
            </nav>
            <label>...</label>
            <nav className="nav flex-column">
                <Link to="/pedagogical/classy" className="nav-link">Turmas</Link>
                <Link to="/students/list" className="nav-link">Salas</Link>
                <Link to="/students/list" className="nav-link">Periodo</Link>
                <Link to="/students/list" className="nav-link">Periodo Academico</Link>
            </nav>
            <label>Charts</label>
            <nav className="nav flex-column">
                <a href="chart-chartjs.html" className="nav-link">ChartJS</a>
            </nav>

            <label>Tables</label>
            <nav className="nav flex-column">
                <a href="table-basic.html" className="nav-link">Basic Tables</a>
            </nav>
        </div>
    )
}

const menus:any = {
    students: StudentsMenu,
    pedagogical: PedagogicalMenu
}
export const Page = ({ type }: any) => {
    const Menu:any = menus[type];
    return (
        <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
            <div className="container">
                <div className="az-content-left az-content-left-components">

                    <Menu />
                </div>
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
