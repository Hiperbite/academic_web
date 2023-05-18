import React from 'react'
import { Row } from 'react-bootstrap'
import { renderToString } from 'react-dom/server'
import { HtmlDocument } from '../../../../Components/PDF/HtmlToPdf'
import { StudentData } from './Template/StudentData'
import ReactDOMServer from 'react-dom/server';
const style=`<style>
*{
  font-size: 8px;
}
pre {
  background-color: #eee;
  padding: 8px;
}
</style>`
export const Record = ({ student }: any) => {
    const template = renderToString(<StudentData student={student} />)
    const html = ReactDOMServer.renderToStaticMarkup(<StudentData student={student} />);
    return (<>

        <HtmlDocument>
            {'<html>'+style+'<body>'+html+'</body></html>'}
        </HtmlDocument>

    </>)
}
