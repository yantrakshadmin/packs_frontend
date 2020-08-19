import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import TableWithoutTabHoc from 'hocs/TableWithoutTab.hoc';
import {RetProdsTable} from 'components/RetProdsTable';

export const RetKitTable = ({loading, kits}) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Kit Name',
      key: 'kit_name',
      dataIndex: 'kit_name',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
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
    if (kits) {
      let temp = [];
      temp = kits.map((k) => {
        return {...k, kit_name: k.kit, products: k.items};
      });
      setData(temp);
    }
  }, [kits]);

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
            ExpandBody={RetProdsTable}
            expandParams={{loading}}
            expandHandleKey="items"
          />
        </Col>
      </Row>
    </Spin>
  );
};
