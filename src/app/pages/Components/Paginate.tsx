
const Paginate = ({ pages, updateParams, params }: any) => {

    let rows = [];
    for (let i = 0; i < pages; i++)
      rows.push(<li className={"page-item " + (params.page - 1 == i ? 'active' : '')}><button className="page-link" onClick={() => updateParams({ page: i + 1 })}>{i + 1}</button></li>)
  
  
    return (
      <nav aria-label="Page navigation">
        <div className="row">
          <div className="col-md-6">
            {params?.page}/{pages} - {params?.total} registos
          </div>
          <div className="col-md-6">
  
            <ul className="pagination justify-content-end">
              <li className="page-item disabled">
                <button className="page-link" >Previous</button>
              </li>
              {rows}
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
  
  
          </div>
        </div>
      </nav>)
  }

export default Paginate;