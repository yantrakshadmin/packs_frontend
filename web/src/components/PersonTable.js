import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import PersonColumns from 'common/columns/Person.column';

const PersonTable = ({loading, person}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(person);
  }, [person]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={PersonColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default PersonTable;
