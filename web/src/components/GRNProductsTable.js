import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import GRNProductsColumns from 'common/columns/GRNProduct.column';

export const ProductTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = products.map((prod) => ({
      ...prod.item,
      quantity: prod.item_quantity,
      price: prod.item_price,
    }));
    setData(temp);
  }, [products]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={GRNProductsColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};
