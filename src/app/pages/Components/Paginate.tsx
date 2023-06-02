
const Paginate = ({ pages, updateParams, params, total=0 }: any) => {

    let rows = [];
    for (let i = 0; i < pages; i++)
      rows.push(<li className={"page-item " + (params.page - 1 == i ? 'active' : '')}><button className="page-link" onClick={() => updateParams({ page: i + 1 })}>{i + 1}</button></li>)
  
  
    return (
      <nav aria-label="Page navigation">
        <div className="row">
          <div className="col-md-6">
            {params?.page}/{pages} - {total} registos
          </div>
          <div className="col-md-6">
  
            <ul className="pagination justify-content-end">
              <li className={"page-item "+ (Number(params?.page)===1 ? 'disabled': '')}>
                <button onClick={() => updateParams({ page: params?.page - 1 })} className="page-link" ><i className="fa fa-chevron-left"></i></button>
              </li>
              {rows}
              <li className={"page-item "+ (Number(params?.page)===pages ? 'disabled': '')}>
                <button onClick={() => updateParams({ page: params?.page + 1 })} className="page-link"><i className="fa fa-chevron-right"></i></button>
              </li>
            </ul>
  
  
          </div>
        </div>
      </nav>)
  }

export default Paginate;