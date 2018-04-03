import React from 'react';

function PageNumber(props) {
  const { page, goUpPage = () => {}, goDownPage = () => {} } = props
  const handleUp = event => {
    event.preventDefault();
    goUpPage();
  }

  const handleDown = event => {
    event.preventDefault();
    goDownPage();
  }

  return (
    <div className="pageNumber flexContainer">
      <p>Page</p>
      <small>
        {page > 1 ? <a href="" onClick={handleDown}>{'<- '}</a> : null}
        <span>{page}</span>
        <a href="" onClick={handleUp}>{' ->'}</a>
      </small>
    </div>
  )
}

export default PageNumber
