import React, {useState, useEffect} from 'react';
import {Table, Row, Col} from 'antd';
import smallProductsColumns from 'common/columns/smallProduct.column';
import Title from 'antd/lib/skeleton/Title';

const ProductTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = products.map((prod) => ({...prod.product, quantity: prod.quantity}));
    setData(temp);
  }, [products]);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        <Table dataSource={data} columns={smallProductsColumns} size="small" pagination={false} />
      </Col>
    </Row>
  );
};

export default ProductTable;
