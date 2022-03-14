import React, {useEffect, useState} from 'react';

import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const cols = [
  {
    title: 'Product Name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Short Code',
    key: 'short_code',
    dataIndex: 'short_code'
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
];

const ExpandTable = ({items}) => {

  console.log(items)

  const [data, setData] = useState([]);

  const {data: products, loading} = useAPI(`/products/`);  

    useEffect(() => {
        if(products){

            let arr=  []

            items.forEach((it) => {
                console.log(it)
                products.forEach((prod) => {
                    console.log(prod.id, it.item)
                    if(prod.id == it.item){
                        arr.push({name: prod.name, short_code: prod.short_code, quantity: it.item_quantity})
                    }
                });
            })

            setData(arr)

        }
    }, [products])

//   useEffect(() => {
//     if (!loading) {
//       console.log(data);
//     }
//   }, [loading]);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table dataSource={data} columns={cols} size="small" pagination={false} />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
