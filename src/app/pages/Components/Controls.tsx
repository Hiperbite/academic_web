import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export const BasicControls = () => {
    const navigate = useNavigate()
    return (
        <>
            <hr className="mg-y-30" />
            <div className='row'>
                <div className='col-md-4 text-left'>
                    <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
                        Cancelar
                    </Button>
                </div>
                <div className='col-md-4'>



                </div>
                <div className='col-md-4 text-right'>
                    <Button variant="primary" type="submit">
                        Registar
                    </Button>
                </div>
            </div>
        </>
    )
}


export const ModalControls = ({handleClose, Addon=<></>}:any) => {
    const navigate = useNavigate()
    return (
        <>
            <hr className="mg-y-30" />
            <div className='row'>
                <div className='col-md-4 text-left'>
                    <Button variant="secondary" type="button" onClick={() => handleClose()}>
                        Cancelar
                    </Button>
                    <Addon/>
                </div>
                <div className='col-md-4'>



                </div>
                <div className='col-md-4 text-right'>
                    <Button variant="primary" type="submit">
                        Registar
                    </Button>
                </div>
            </div>
        </>
    )
}
export const Controls = ({ current, total, onSubmit = null }: any) => {

    const prevStep = () => {
        navigate(`../step${current - 1}`);
    }
    const navigate = useNavigate();
    return (<>
        <hr />
        <div className='row'>
            <div className='col-md-4 text-left'>
                <Button variant="secondary" type="button" onClick={() => navigate('/students/list')}>Cancelar</Button>
            </div>
            <div className='col-md-4'>

                <Button variant="primary" type="button" disabled={current === 1} onClick={() => prevStep()}>
                    Voltar
                </Button>
                {current === total ?
                    <Button variant="success" type="button" onClick={onSubmit}>
                        Salvar
                    </Button> :
                    <Button variant="primary" type="submit">
                        Proximo
                    </Button>
                }
            </div>
            <div className='col-md-4'></div>
        </div>
    </>)
}