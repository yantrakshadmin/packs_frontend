import React, { useState } from 'react';
import { Popover, Button,Typography } from 'antd';

const {Title} = Typography;


export const ActionsPopover= ({buttonList,title,icon,triggerTitle}) => {
 const [popover, setPopover]=useState(false)

  const hide = () => {
    setPopover(
      false
    );
  };

  const handleVisibleChange = visible => {
     setPopover( visible );
  };
  const content =()=> (
    <div>
    {(buttonList || []).map(Item => (<Button size="small" icon=<Item.icon /> style={{margin:'5px'}} type={Item.type || 'primary'} onClick={Item.onClick}>{Item.title}</Button>))}
    
    </div>
    )

    return (
      <Popover
        content={content}
        title={<div className={'row justify-between align-center'} >
          <Title level={4}>{title|| 'Actions'}</Title>
          <Button type="link" onClick={hide} style={{float:"right"}}>Cancel</Button>
          </div>}
        trigger="click"
        visible={popover}
        onVisibleChange={handleVisibleChange}
      >
        <Button 
        type="primary"
        style={{
          padding:"3px",
        }}
        >
        {triggerTitle}
        </Button>
      </Popover>
    );
}
