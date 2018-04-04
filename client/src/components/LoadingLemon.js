import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faLemon from '@fortawesome/fontawesome-free-solid/faLemon'

function LoadingLemon() {
  const toggleFruit = () => {
    return new Promise (resolve => {
      setTimeout(() => {
        const fruit = document.querySelector("div.contentLemon")
        if (fruit) fruit.classList.toggle("lime");
        resolve();
      }, 1000)
    })
  }

  toggleFruit()
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())
  .then(() => toggleFruit())

  return (
    <div className='contentLemon'>
      <FontAwesomeIcon icon={faLemon} size="2x" />
    </div>
  );
}

export default LoadingLemon;
