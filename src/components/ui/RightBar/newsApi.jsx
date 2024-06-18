import React from 'react'

const newsApi = ({end}) => {
  return (
    <>
          <li>
                <div className="newsBox">
                <h5 className='newsFont'>News Header</h5>
                <p className='sideFont'>This is description</p>
                { end != true ?  <div className='sepLineNews'/> : null  }
               </div>
          </li>

    </>
  )
}

export default newsApi