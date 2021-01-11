import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import TableWithoutTabHoc from 'hocs/TableWithoutTab.hoc';
import {AllotProdsTable} from 'components/AllotProdsTable';

export const AllotFlowTable = ({loading, flows, transaction_no}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Kit Name',
      key: 'kit_name',
      dataIndex: 'kit_name',
    },
    {
      title: 'Asked Quantity',
      key: 'asked_quantity',
      dataIndex: 'asked_quantity',
    },
    {
      title: 'Alloted Quantity',
      key: 'alloted_quantity',
      dataIndex: 'alloted_quantity',
    },
    {
      title: 'Flow Name',
      key: 'flow_name',
      dataIndex: 'flow_name',
    },
    // {
    //   title: 'Kits Assigned',
    //   key: 'kits',
    //   render: (text, record) => {
    //     let kit = record.kit_name,
    //       aq = record.alloted_quantity;
    //     let s = '';
    //     for (let i = 1; i <= aq; i++) {
    //       s += `${transaction_no}-${kit}-${i}, `;
    //     }
    //     s = s.slice(0, -2);
    //     return s;
    //   },
    // },
  ];

  useEffect(() => {
    if (flows) {
      let temp = [];
      temp = flows.map((f) => {
        return {...f, kit_name: f['kit'].kit_name, products: f['kit'].products,flow_name : f['flow'].flow_name};
      });
      setData(temp);
    }
  }, [flows]);

  return (
    <Spin spinning={loading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <TableWithoutTabHoc
            rowKey="id"
            tableData={data}
            columns={columns}
            loading={loading}
            size="small"
            pagination={false}
            hideRightButton
            ExpandBody={AllotProdsTable}
            expandParams={{loading}}
            expandHandleKey="products"
          />
        </Col>
      </Row>
    </Spin>
  );
};
