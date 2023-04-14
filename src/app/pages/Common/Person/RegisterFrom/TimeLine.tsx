import { ProgressBar } from "react-bootstrap"
import { useSelector } from "react-redux"


export const TimeLine = () => {

    const { step } = useSelector((state: any) => state)
    return (<>
        <h1>{step}. {['Dados Pessoais','Contactos','Documentos','Dados Adicionais', 'Endereços','Confirmar e gravar'][step-1]}</h1>
        <ProgressBar now={100 * step / 6} /><br />
    </>
    )
}