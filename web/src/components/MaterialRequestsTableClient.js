import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import requestsTableColumns from 'common/columns/requestsTable.column';

const MaterialRequestsTable = ({loading, flows}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = flows.map((record) => ({
      quantity: record.quantity,
      flow_name: record.flow.flow_name,
      kit_name: record.kit.kit_name,
    }));
    setData(temp);
  }, [flows]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={requestsTableColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default MaterialRequestsTable;
