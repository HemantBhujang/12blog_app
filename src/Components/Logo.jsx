import React from 'react'
import mB from "../Images/megaBlog_logo.png"

function Logo({width = '100px'}) {
  return (
    <div className='w-full'>
      <img src={mB} alt="megaBlog" />
    </div>
  )
}

export default Logo