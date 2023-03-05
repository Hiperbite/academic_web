import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom"

const menuItems: any = {
    pedagogical: [
        {
            text: "Menu Pedagogico", to: "/pedagogical", childs: [
                { to: 'classy', text: 'Turmas' },
                { to: 'class-rooms', text: 'Salas' },
                { to: 'periods', text: 'Periodo' },
                { to: 'students', text: 'Periodo Academico' },]
        },
        {
            text: "...", to: "/pedagogical", childs: [
                { to: 'disciplines', text: 'Disciplinas' },
                { to: 'courses', text: 'Cursos' },
            ]
        }

    ],
    students: [
        {
            text: "Estudantes", to: "/students", childs: [
                { to: '', text: 'Inicio' },
                { to: 'list', text: 'Lista' },
            ]
        }, {
            text: "Candidatos", to: "/students", childs: [
                { to: '', text: 'Inicio' },
                { to: 'candidates', text: 'Lista' },
            ],
        },
        {
            text: "..", to: "/students", childs: [
                { to: 'all', text: 'Todos registos' },
            ],
        }
    ]
};
const Menu = ({ menu }: any) => {

    const [activeMenu, setActiveMenu] = useState<any>()
    //const [currentMenuItem, setCurrentMenuItem] = useState<any>()

    const currentMenuItem = menuItems[`${menu}`] ?? []
    useEffect(() => {
        setActiveMenu(
            currentMenuItem.filter((x: any) => window.location.href.indexOf(x.to) > -1)[0] ??
            currentMenuItem[0]
        )
    }, [currentMenuItem])
    const classNames = ["nav-link active", "nav-link"];
    return (
        <div className="component-item">
            {currentMenuItem?.map(({ text, childs, to }: any) => <>
                <label>{text}</label>
                <nav className="nav flex-column">
                    {childs === undefined ? null : childs.map((menuItem: any) =>
                        <Link
                            to={`${to}/${menuItem?.to}`}
                            className={classNames[activeMenu?.to === menuItem?.to ? 0 : 1]}
                            onClick={() => setActiveMenu(menuItem)}
                        >{menuItem?.text}</Link>
                    )}
                </nav>
            </>)
            }
        </div>
    )
}

export const Page = ({ type }: any) => {
    return (
        <div className="az-content pd-y-20 pd-lg-y-30 pd-xl-y-40">
            <div className="container">
                <div className="az-content-left az-content-left-components">

                    <Menu menu={type} />
                </div>
                <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export const Blank = () => {

    return (
        <Outlet />

    )
}
