import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import smallProductsColumns from 'common/columns/smallProduct.column';

const cols = [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
  },
];

const GroupExpandTable = ({loading, models}) => {
  //const [data, setData] = useState([]);

  //   useEffect(() => {
  //     let temp = [];
  //     temp = models.map((prod) => ({...prod.product, quantity: prod.quantity, price: prod.price}));
  //     setData(temp);
  //   }, [models]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={models} columns={cols} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default GroupExpandTable;
