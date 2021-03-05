import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';
import {changePage} from 'common/actions/changePage';
import {connect} from 'react-redux';

const cols = [
  {
    title: 'Client',
    key: 'client',
    dataIndex: 'client',
  },
  {
    title: 'Kit',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ExpandTable = ({data, loading}) => {
  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table
            dataSource={data}
            columns={cols}
            size="small"
            pagination={{
              // pageSize: pageSize || 10,
              position: ['bottomRight'],
              onChange(current) {
                changePage(current);
              },
            }}
          />
        )}
      </Col>
    </Row>
  );
};

export default connect(null, {changePage})(ExpandTable);
