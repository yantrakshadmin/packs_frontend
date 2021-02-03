import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'antd';
import Server from 'icons/Server';

const App = ({children, width, record}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '1px',
        }}
        onClick={showModal}>
        <Server />
      </Button>
      <Modal
        width={width}
        title="Flows and Kits"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

export default App;
