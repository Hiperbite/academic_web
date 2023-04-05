import React from 'react'
import { Button } from 'react-bootstrap'

export const ProfileSettings = () => {
    return (<>
        <h3>Inicio</h3>

        <article className="sc-31a65873-0 faEzkt">
            <h4>Terminar sessão em todo o lado</h4>
            <p>Esta ação termina a tua sessão do Spotify onde quer que tenhas sessão iniciada, seja nas apps do telemóvel, tablet e PC ou no leitor Web. Isto não inclui dispositivos de parceiros (por exemplo, colunas, consolas de jogos e televisões), pelo que nesses casos deves <a href="/account/apps" target="_blank" className="signout-panel-link">ir à página das tuas apps</a> e selecionar "Remover acesso".</p>
            <div >
                <div className="sc-d3320a26-1 kZjEeh">
                    <span>
                        Nota: após terminares sessão, a ação pode demorar até 1 hora a ser aplicada ao leitor Web.
                    </span>
                </div>
            </div>
            <div className="sc-31a65873-4 eaqkZG">
                <Button variant='outline-danger'  size="lg" >Terminar sessão em todo o lado</Button>
            </div>
        </article>

    </>)
}
