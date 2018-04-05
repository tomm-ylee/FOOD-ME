import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

function LoadingLemon() {
  const toggleFruit = () => {
    setTimeout(() => {
      const fruit = document.querySelector("div.contentLemon")
      if (fruit) {
        fruit.classList.toggle("lime");
        toggleFruit()
      }
    }, 1500)
  }

  toggleFruit()


  return (
    <div className='contentLemon'>
      <FontAwesomeIcon icon={faSpinner} size="2x" />
    </div>
  );
}

export default LoadingLemon;
