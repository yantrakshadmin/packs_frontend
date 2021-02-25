import React, {useEffect} from 'react';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const getCols = (tt) => {
  return [
    {
      title: 'Transaction No',
      key: tt === 'Allot' ? 'a_t_no' : 'r_t_no',
      dataIndex: tt === 'Allot' ? 'a_t_no' : 'r_t_no',
    },
    {
      title: 'First Mile',
      key: 'f_mile',
      dataIndex: 'f_mile',
    },
    {
      title: 'Last Mile',
      key: 'l_mile',
      dataIndex: 'l_mile',
    },
    {
      title: 'Long Haul',
      key: 'long_haul',
      dataIndex: 'long_haul',
    },
    {
      title: 'Labour',
      key: 'labour',
      dataIndex: 'labour',
    },
    {
      title: 'Others',
      key: 'others',
      dataIndex: 'others',
    },
  ];
};

const ExpandTable = (props) => {
  const {data, loading} = useAPI(`expenses-exp/?id=${props.id}`);

  useEffect(() => {
    if (!loading) {
      console.log(data);
    }
  }, [loading]);

  return (
    <Row align="center" style={{margin: '3vh'}}>
      <Col span={24}>
        {loading ? (
          <Spin spinning={loading} />
        ) : (
          <Table
            dataSource={data[0].transactions}
            columns={getCols(data[0].transaction_type)}
            size="small"
            pagination={false}
          />
        )}
      </Col>
    </Row>
  );
};

export default ExpandTable;
