import { useEffect, useState, useMemo } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom"
import storage from "../app/storage";
import { UserProfile } from "../pages/User/UserProfile";
import "./Page.scss"
const menuItems: any = {
    pedagogical: [
        {
            text: "Menu Pedagogico", to: "/pedagogical", childs: [
                { to: 'classe', text: 'Turmas' },
                { to: 'class-rooms', text: 'Salas' },
                { to: 'periods', text: 'Periodo' },
            
            ]
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
    ],
    staffs: [
        {
            text: "Pessoal", to: "/staffs", childs: [
                { to: '', text: 'Inicio' },
                { to: 'list', text: 'Lista' },
            ]
        },

        {
            text: "..", to: "/staffs", childs: [
                { to: 'list?scope=teacher', text: 'Professores' },
                { to: 'list?scope=supervisor', text: 'Administrativos' },
            ]
        }
    ],
    users: [
        {
            text: "Pessoal", to: "/staffs", childs: [
                { to: '', text: 'Inicio' },
                { to: 'list', text: 'Contactos' },
                { to: 'list', text: 'Privacidade' },
                { to: 'list', text: 'Actividades' },
            ]
        }
    ],
    me: [
        {
            text: "Pessoal", to: "/me", childs: [
                { to: '', text: 'Inicio' },
                { to: 'contacts', text: 'Contactos' },
                { to: 'settings', text: 'Privacidade' },
                { to: 'activities', text: 'Actividades' },
            ]
        }
    ]
};
export const Menu = ({ menu }: any) => {

    const [activeMenu, setActiveMenu] = useState<any>()

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
export const Default = ({ type }: any) => {

    return (
        <>
            <UserProfile />
        </>
    )
}
export const Blank = () => {

    return (
        <Outlet />

    )
}
