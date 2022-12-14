import { Space } from 'antd'
import React from 'react'

function ReturnRestrictMsg() {
  return (
      <div style={{display:'flex', alignItems:'center', justifyContent: 'center', marginTop:'150px'}} >Return has already been  <strong style={{marginLeft:'5px'}}>Used</strong>. No changes can be made.</div>
  )
}

export default ReturnRestrictMsg;