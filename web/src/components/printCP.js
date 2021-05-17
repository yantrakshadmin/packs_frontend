import React from 'react';
import {Row, Col, Typography, Table} from 'antd';
import _ from 'lodash';

const {Title, Paragraph} = Typography;

export const PrintCp = ({location}) => {
  const {state} = location;
  // const { receiverDetails} = state;
  console.log(state, 'data CP');
  const columns = [
    {
      title: 'Part Name',
      key: 'part_name',
      dataIndex: 'part_name',
    },
    // {
    //   title: 'Receiver Location',
    //   dataIndex: 'receiver_location',
    //   key: 'receiver_location',
    // },
    {
      title: 'Proposed Packaging Solution',
      key: 'proposed_solution_proposal',
      dataIndex: 'proposed_solution_proposal',
      render: (solution) => (
        <Row>
          {Object.keys(solution).map((key) => (
            <Col span={24}>
              {solution[key]} {key}
              <br />
            </Col>
          ))}
        </Row>
      ),
    },
    {
      title: 'No. of Component per Solution',
      dataIndex: 'component_per_solution',
      key: 'component_per_solution',
    },
    {
      title: 'Price Per Component',
      dataIndex: 'price_per_component',
      key: 'price_per_component',
    },
    {
      title: 'Total Trip Cost Per Solution',
      key: 'trip_cost',
      dataIndex: 'trip_cost',
    },
    {
      title: 'Parts Volume/Month',
      dataIndex: 'parts_volume_per_month',
      key: 'parts_volume_per_month',
    },
    {
      title: 'Cycle Time (Days)',
      dataIndex: 'cycle_days',
      key: 'cycle_days',
    },
  ];

  const dataSource = [
    {
      key: '1',
      field: 'Sender - Receiver:',
      value: state.sender_client || '-',
    },
    {
      key: '2',
      field: 'Contact Person:',
      value: state.scs_id.contact_person || '-',
    },
    {
      key: '3',
      field: 'Contact Number:',
      value: state.scs_id.contact_no || '-',
    },
    {
      key: '4',
      field: 'Email ID:',
      value: state.scs_id.email || '-',
    },
  ];
  const table3 = [
    {
      field: 'Flow implementation timeline:',
      key: 'flowImpementation',
      value: '25-30 working days from day contract is signed.',
    },
    {field: 'Agreement Status:', key: 'agreementStatus', value: 'Agreement to be signed'},
  ];

  const CreateTable = ({left, right}) => (
    <Row className="print-cp-border">
      <Col span={11} className="py-1">
        {left}
      </Col>
      <div className="row align-center justify-center">
        <div className="print-cp-divider" />
      </div>
      <Col span={11} className="py-1">
        {right}
      </Col>
    </Row>
  );
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const nd = new Date(utc + 3600000 * +5.5);
  const ist = nd.toLocaleString();
  return (
    <div className="print-cp-container">
      <Row>
        <Col span={24}>
          <div className="row justify-between align-center">
            <div className="print-cp-logo">
              <img src={`${process.env.PUBLIC_URL}/home-logo.png`} className="" alt="Yantraksh" />
            </div>
            <div>
              <text>
                <b>Date : </b>
                {ist.split(',')[0]}
                <br />
                <b>
                  YNT/CP/
                  {state.id}
                </b>
              </text>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col span={24}>
          <Title
            level={4}
            className="row align-center justify-center print-cp-gray print-cp-border">
            Proposal for {state.sender_client}
          </Title>
        </Col>
      </Row>
      <br />
      <CreateTable
        left={dataSource.map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        ))}
        right={dataSource.map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              {i.value}
            </Col>
          </Row>
        ))}
      />
      <br />
      {/* <CreateTable
        left={[{field: 'Receiver details :', key: 'reveiverDetails'}].map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        ))}
        right={[
          {
            value: state.receiverDetails.length > 0 ? state.receiverDetails[0].receiver_name : '',
            key: 'reveiverDetails',
          },
        ].map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              {state.receiverDetails.length > 1 ? state.receiverDetails[0].receiver_name : i.value}
            </Col>
          </Row>
        ))}
      /> */}
      <br />
      <CreateTable
        left={table3.map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        ))}
        right={table3.map((i, key) => (
          <Row key={i.key}>
            <Col span={24} className="px-2">
              <b>{i.value}</b>
            </Col>
          </Row>
        ))}
      />
      <br />
      <Table
        size="small"
        pagination={false}
        bordered
        dataSource={state.receiverDetails || []}
        columns={columns}
      />
      <br />
      <Paragraph>
        * Cycle time to be revisited after regular intervals, pricing may vary if cycle time varies.
        <br />
        YANTRA Packs will not be responsible for Loading & Unloading activities at{' '}
        {state.sender_client}
        {/* and{' '}
        {state.receiverDetails.length > 1
          ? 'Multiple Receivers'
          : state.receiverDetails[0].receiver_name} */}
        <br />
        YANTRA Packs will be responsible for reverse logistics from Destination to Origin.
        <br />
        The Commercial Offer is Valid for 30 days.
      </Paragraph>
    </div>
  );
};

export default PrintCp;
