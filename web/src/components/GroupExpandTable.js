import React from 'react';
import {Table, Row, Col, Spin} from 'antd';

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

const GroupExpandTable = ({loading, groupmodels}) => {
  //const [data, setData] = useState([]);

  //   useEffect(() => {
  //     let temp = [];
  //     temp = groupmodels.map((prod) => ({...prod.product, quantity: prod.quantity, price: prod.price}));
  //     setData(temp);
  //   }, [groupmodels]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={groupmodels} columns={cols} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default GroupExpandTable;
