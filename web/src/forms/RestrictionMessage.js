import React from 'react'

function RestrictionMessage({id, title,name }) {
  return (
      <div style={{display:'flex', alignItems: 'center', justifyContent:'center', marginTop:'10px'}}>
          <p> {title} has already been <strong> Used</strong>. No changes can be made. </p>
      </div>
  )
}

export default RestrictionMessage;