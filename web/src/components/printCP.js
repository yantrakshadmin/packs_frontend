import React from 'react';
import { Row,Col,Typography,Table } from 'antd'

const { Title,Paragraph } = Typography

export const PrintCp = ({ location }) => {
  const { state } = location;
  console.log(state,'data CP')
  const columns = [
    {
      // width:'40vw',
      title: 'Part Name',
      key: 'part_name',
      render:(record)=>(
        <div className='px-2'>
          info
        </div>
      )
    },
    {
      // width:'40vw',
      title: 'Receiver Location',
      dataIndex: 'value',
      key: 'value',
    },{
      // width:'40vw',
      title: 'Proposed Packaging Solution',
      key: 'part_name',
      render:(record)=>(
        <div className='px-2'>
          Info
        </div>
      )
    },
    {
      // width:'40vw',
      title: 'No. of Component per Solution',
      dataIndex: 'value',
      key: 'value',
    },
    {
      // width:'40vw',
      title: 'Price Per Component',
      dataIndex: 'value',
      key: 'value',
    },{
      // width:'40vw',
      title: 'Total Trip Cost Per FLC',
      key: 'part_name',
      render:(record)=>(
        <div className='px-2'>
          Info
        </div>
      )
    },
    {
      // width:'40vw',
      title: 'Parts Volume/Month',
      dataIndex: 'value',
      key: 'value',
    },
    {
      // width:'40vw',
      title: 'Cycle Time (Days)',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = [
    {
      key: '1',
      field: 'Emitter (Supplier):',
      value: state.pfep.sender_client ,
    },
    {
      key: '2',
      field: 'Location:',
      value: state.pfep.sender_location,
    },
    {
      key: '3',
      field: 'State:',
      value: state.pfep.sender_location,
    },
    {
      key: '4',
      field: 'Contact Person:',
      value: state.pfep.contact_person,
    },
    {
      key: '5',
      field: 'Contact Number:',
      value: state.pfep.contact_no,
    },
    {
      key: '6',
      field: 'Email ID:',
      value: state.pfep.email,
    },
  ];
  const table3  = [
    { field:'Flow implementation timeline:' ,
      key:'flowImpementation',
      value:'25-30 working days from day contract is signed.'
    },
    { field:'Agreement Status:' ,
      key:'agreementStatus',
      value:'Agreement to be signed'
    },
  ]

  const CreateTable = ({ left,right })=>(
    <Row className='print-cp-border'>
      <Col span={11} className='py-1'>
        {left}
      </Col>
      <div className='row align-center justify-center'>
        <div className='print-cp-divider' />
      </div>
      <Col span={11} className='py-1'>
        {right}
      </Col>
    </Row>
  )
  return (
    <div className='print-cp-container'>
      <Row>
        <Col span={24}>
          <div className='row justify-between align-center'>
            <div className='print-cp-logo'>
              <img src={`${process.env.PUBLIC_URL  }/home-logo.png`} className='' alt='Yantraksh' />
            </div>
            <div>
              <text>
                <b>Date : </b>
                1/12/20
                <br />
                <b>YNT/CP/1216</b>
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
            className='row align-center justify-center print-cp-gray print-cp-border'>
            Proposal for Lumax Mannoh
          </Title>
        </Col>
      </Row>
      <br />
      <CreateTable
        left={(dataSource.map((i,key)=>(
          <Row key={i.key}>
            <Col span={24} className='px-2'>
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        )))}
        right={(
        dataSource.map((i,key)=>(
          <Row key={i.key}>
            <Col span={24} className='px-2'>
              {i.value}
            </Col>
          </Row>
        ))
      )}
      />
      <br />
      <CreateTable
        left={([{ field:'Receiver details :' ,key:'reveiverDetails' }].map((i,key)=>(
          <Row key={i.key}>
            <Col span={24} className='px-2'>
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        )))}
        right={(
        [{ value:state.pfep.receivers.length>0?state.pfep.receivers[0].name:''
          ,key:'reveiverDetails' }].map((i,key)=>(
            <Row key={i.key}>
              <Col span={24} className='px-2'>
                {i.value}
              </Col>
            </Row>
        ))
      )}
      />
      <br />
      <CreateTable
        left={(table3.map((i,key)=>(
          <Row key={i.key}>
            <Col span={24} className='px-2'>
              <b key={i.key}>{i.field}</b>
            </Col>
          </Row>
        )))}
        right={(
          table3.map((i,key)=>(
            <Row key={i.key}>
              <Col span={24} className='px-2'>
                <b>
                  {i.value}
                </b>
              </Col>
            </Row>
          ))
      )}
      />
      <br />
      <Table
        size='small'
        pagination={false}
        bordered
        dataSource={dataSource}
        columns={columns} />
      <br />
      <Paragraph>
        * Cycle time to be revisited after regular intervals, pricing may vary if cycle time varies.
        <br />
        YANTRA Packs will not be responsible for Loading &
        Unloading activities at Lumax Mannoh and Mahindra & Mahindra.
        <br />
        YANTRA Packs will be responsible for reverse logistics from Destination to Origin.
        <br />
        The Commercial Offer is Valid for 30 days.
      </Paragraph>
    </div>
  );
};

export default PrintCp
