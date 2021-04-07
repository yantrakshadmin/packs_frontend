import React, {useState} from 'react';
import {Button, Input, notification, Space, Popover} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import Delete from '../icons/Delete';

const DeleteWithPasswordContent = ({password, deleteHOC, popoverVisible, setPopoverVisible}) => {
  const [text, setText] = useState('');

  return (
    <Space direction="vertical">
      <Input
        type="password"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="input password"
        iconRender={(show) => (show ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button
        onClick={(e) => {
          if (text === password) {
            setText('');
            setPopoverVisible(!popoverVisible);
            deleteHOC();
          } else {
            notification.error({
              message: 'Invalid Password',
            });
          }
          e.stopPropagation();
        }}>
        Delete
      </Button>
    </Space>
  );
};

const DeleteWithPassword = ({password, deleteHOC}) => {
  const [popoverVisible, setPopoverVisible] = useState(false);

  return (
    <Popover
      content={() => (
        <DeleteWithPasswordContent
          password={password}
          deleteHOC={deleteHOC}
          popoverVisible={popoverVisible}
          setPopoverVisible={setPopoverVisible}
        />
      )}
      title="Verify"
      trigger="click"
      visible={popoverVisible}
      onVisibleChange={(e) => {
        setPopoverVisible(e);
      }}>
      <Button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '1px',
        }}
        onClick={(e) => {
          setPopoverVisible(true);
          e.stopPropagation();
        }}>
        <Delete />
      </Button>
    </Popover>
  );
};

export default DeleteWithPassword;
