import { Card } from "react-bootstrap"

export const Disabled = ({ text }: any) => {
    return (<>
        <Card>
            <Card.Body style={{height:'50vh'}} className="vertical-center"><h4>{text}</h4></Card.Body>
        </Card>
    </>)
}