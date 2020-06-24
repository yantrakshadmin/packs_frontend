import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import smallProductsColumns from 'common/columns/smallProduct.column';

const ProductTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = products.map((prod) => ({...prod.product, quantity: prod.quantity}));
    setData(temp);
  }, [products]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={smallProductsColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default ProductTable;
