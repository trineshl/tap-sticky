import React from 'react'

function LoadingDiv(p_objProps) {
  return (
    <span key={'emptyText1'}
      style={{ fontStyle: 'italic', margin: '80px', fontSize: 14, textAlign: 'center' }}
      className='CenterAndMiddle' >
      {p_objProps.text}
    </span>
  )
}

export default LoadingDiv