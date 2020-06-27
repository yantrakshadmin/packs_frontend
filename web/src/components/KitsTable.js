import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import expandedKitColumns from 'common/columns/expandedKit.column';

const ProductTable = ({loading, kits}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = kits.map((kitty) => ({
      ...kitty.kit,
      quantity: kitty.quantity,
      trip_cost: kitty.trip_cost,
      component_pm: kitty.component_pm,
    }));
    setData(temp);
  }, [kits]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={expandedKitColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default ProductTable;
