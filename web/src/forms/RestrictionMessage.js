import React from 'react'

function RestrictionMessage({ title }) {
  return (
      <div style={{display:'flex', alignItems: 'center', justifyContent:'center', marginTop:'10px', fontSize:'18px'}}>
          <p> {title} Already been <strong> Used</strong>. No changes can be made. </p>
      </div>
  )
}

export default RestrictionMessage;