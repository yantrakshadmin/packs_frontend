import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';
import TruckLoading from './TruckLoading';
import _ from 'lodash';

const cols = [
  {
    title: 'Kit Name',
    key: 'kit_name',
    render: (text, record) => {
      return `${record.kit.kit_name} - ${record.kit.kit_info}`;
    },
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
    render: (text, record) => {
      return record.flow;
    },
  },
];

const ExpandTable = (props) => {
  //   const [loading, setLoading] = useState(true);
  const {data, loading} = useAPI(`allotments-table-exp/?id=${props.id}`);

  const [filled, setFilled] = useState(0);

  const {data: limitData, error: limitError, loading: limitLoading} = useAPI(
    `dispatch-allotment-validate/?id=${props.id}`,
  );
  const {data: altData, error: altError, loading: altLoading} = useAPI(
    `dispatch-allotment-fetch/?allot=${props.id}`,
  );

  useEffect(() => {
    if (!limitLoading && !altLoading)
      if (!limitError && !altError) {
        const tempA = altData.barcodes.length;
        const tempB = _.values(limitData).reduce((a, b) => a + b);
        setFilled(_.round((tempA / tempB) * 100, 2));
      } else {
        console.log('NP');
      }
  }, [limitLoading, altLoading]);

  if (loading || limitLoading || altLoading) {
    return <Spin spinning={true} />;
  } else {
    return (
      <Row align="center" gutter={20} style={{margin: '3vh'}}>
        <Col span={21}>
          <Table
            dataSource={data[0] ? data[0].flows || [] : []}
            columns={cols}
            size="small"
            pagination={false}
          />
        </Col>
        <Col span={3} style={{textAlign: 'center'}}>
          <TruckLoading percentage={filled} style={{width: '100%'}} />
        </Col>
      </Row>
    );
  }
};

export default ExpandTable;
