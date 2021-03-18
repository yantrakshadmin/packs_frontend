import React, {useState, useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

import _ from 'lodash';

const dMTableColumns = [
  {
    title: 'Flow',
    key: 'flow',
    dataIndex: 'flow',
  },
  {
    title: 'Product Name',
    key: 'kit',
    dataIndex: 'kit',
  },
  {
    title: 'Required Kit/Month',
    key: 'req_kit_pm',
    dataIndex: 'req_kit_pm',
  },
  {
    title: 'Required Pool',
    key: 'required_pool',
    dataIndex: 'required_pool',
  },
  {
    title: 'Deployed pool',
    key: 'deployed_pool',
    dataIndex: 'deployed_pool',
  },
  {
    title: 'Alloted',
    key: 'alloted',
    dataIndex: 'alloted',
  },
  {
    title: 'Balance',
    key: 'balance',
    dataIndex: 'balance',
  },
];

const DemandModuleTable = ({id, loading, demand_flows}) => {
  const [data, setData] = useState([]);
  const {data: allots, loading: allotLoading} = useAPI(`demand-kit-allotment/?id=${id}`);

  useEffect(() => {
    if (!loading && !allotLoading) {
      let temp = [];
      temp = demand_flows.map((record) => {
        let x;
        allots.every((a) => {
          const t = _.findKey(
            a,
            (o) =>
              parseInt(o[0]) === parseInt(record.kit.id) &&
              parseInt(o[1]) === parseInt(record.flow.id),
          );
          if (t) {
            x = t;
            return false;
          } else {
            return true;
          }
        });
        const a = parseInt(x) || 0;
        const d = parseInt(record.deployed_pool) || 0;
        return {
          ...record,
          req_kit_pm: _.ceil(record.monthly_quantity / record.components_per_kit),
          flow: record.flow.flow_name,
          kit: record.kit.kit_name,
          required_pool: _.ceil(
            (record.flow.flow_days / 30) * (record.monthly_quantity / record.components_per_kit),
          ),
          deployed_pool: d,
          alloted: a,
          balance: d - a,
        };
      });
      setData(temp);
    }
  }, [loading, allotLoading]);

  return (
    <Spin spinning={loading || allotLoading}>
      <Row align="center" style={{margin: '3vh'}}>
        <Col span={24}>
          <Table dataSource={data} columns={dMTableColumns} size="small" pagination={false} />
        </Col>
      </Row>
    </Spin>
  );
};

export default DemandModuleTable;
