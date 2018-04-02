import React from 'react';

function PageNumber(props) {
  const { page } = props
  return (
    <div className="pageNumber flexContainer">
      <p>Page</p>
      <small>
        {page > 1 ? <span>{'<- '}</span> : null}
        <span>{page}</span>
        <span>{' ->'}</span>
      </small>
    </div>
  )
}

export default PageNumber
