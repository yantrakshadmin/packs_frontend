import React, {useState, useEffect, useCallback} from 'react';
import {Modal, Button, Table, Input} from 'antd';
import _ from 'lodash';
import Server from 'icons/Server';

const App = ({children, width, record, dataSource}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState(dataSource);

  const showModal = () => {
    console.log(form);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dMTableColumns = [
    {
      title: 'Flow',
      key: 'flow',
      dataIndex: 'flow',
      render: (text, record) => (record.flow.flow_name ? record.flow.flow_name : '-'),
    },
    {
      title: 'Product Name',
      key: 'kit',
      dataIndex: 'kit',
      render: (text, record) => (record.kit.part_name ? record.kit.part_name : '-'),
    },
    {
      title: 'Required Kit/Month',
      key: 'monthly_quantity',
      dataIndex: 'monthly_quantity',
    },
    {
      title: 'Required Pool',
      key: 'required_pool',
      dataIndex: 'required_pool',
      render: (text, record) =>
        record.flow.flow_days
          ? _.ceil((record.flow.flow_days / 30) * record.monthly_quantity)
          : '-',
    },
    {
      title: 'Deployed pool',
      key: 'deployed_pool',
      dataIndex: 'deployed_pool',
      render: (text, record) => {
        return <Input size="middle" placeholder="Deployed Pool" />;
      },
    },
  ];

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
        <Table size="middle" dataSource={dataSource} columns={dMTableColumns} pagination={false} />
      </Modal>
    </>
  );
};

export default App;

//   {
//     title: 'Alloted',
//     key: 'alloted',
//     dataIndex: 'alloted',
//     render: (text, record) => (record.alloted ? record.alloted : '-'),
//   },
//   {
//     title: 'Balance',
//     key: 'balance',
//     dataIndex: 'balance',
//     render: (text, record) => (record.balance ? record.balance : '-'),
//   },
