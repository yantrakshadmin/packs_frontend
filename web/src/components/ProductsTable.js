import React, {useState, useEffect} from 'react';
import {Table, Row, Col} from 'antd';
import productsColumns from 'common/columns/Products.column';
import Title from 'antd/lib/skeleton/Title';

const ProductTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = products.map((prod) => prod.product);
    setData(temp);
  }, [products]);

  return (
    <>
      <Row align="stretch">
        <h1>Products</h1>
      </Row>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={productsColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </>
  );
};

export default ProductTable;
