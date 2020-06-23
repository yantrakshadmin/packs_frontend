import React, {useState, useEffect} from 'react';
import {Table, Row, Col} from 'antd';
import productsColumns from 'common/columns/Products.column';

const ProductTable = ({loading, products}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let temp = [];
    temp = products.map((prod) => prod.product);
    setData(temp);
  }, products);

  return <Table dataSource={data} columns={productsColumns} size="small" pagination={false} />;
};

export default ProductTable;
