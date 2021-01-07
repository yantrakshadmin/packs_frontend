import React, { useState } from 'react';
import { Popover, Button,Typography } from 'antd';

const { Title } = Typography;


export const ActionsPopover= ({ buttonList,title,icon,triggerTitle,showCancel,disabled }) => {
  const [popover, setPopover] = useState(false)

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
      {(buttonList || []).map(Item => (
        Item.Component?<Item.Component />:(
          <Button
            disabled={disabled}
            size='small'
            icon={Item.Icon?<Item.Icon />:null}
            style={{ margin:'5px' }}
            type={Item.type || 'primary'}
            onClick={Item.onClick}>
            {Item.title}
          </Button>
        )
      ))}
    </div>
  )

  return (
    <Popover
      content={content}
      title={(
        title || showCancel?(
          <div className='row justify-between align-center'>
            {title?<Title level={4}>{title|| ''}</Title>:null}
            {showCancel?(
              <Button type='link' onClick={hide} style={{ float:"right" }}>
                Cancel
              </Button>
            ):null}
          </div>
        ):null
)}
      trigger='hover'
      visible={popover}
      onVisibleChange={handleVisibleChange}
      >
      <Button
        type='primary'
        style={{
          outline: 'none',
          border: 'none',
          borderRadius: '7%',
        }}
      >
        {triggerTitle}
      </Button>
    </Popover>
  );
}
