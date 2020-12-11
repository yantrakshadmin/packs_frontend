import React from 'react';
import { Row,Col,Typography,Table } from 'antd'

const { Title,Paragraph } = Typography
// average_dispatchlotsize: 0
// breadth: 0
// contact_no: "-"
// contact_person: "Anil"
// cp_approved: false
// cp_shared: false
// critical_area: null
// current_packaging: "Returnable"
// date: "2020-02-03T00:00:00.548000Z"
// designation: "Project"
// dispatch_frequency: null
// email: "anil@lumax.com"
// emitter_inv: 0
// esa_signed: false
// flow_started: false
// greasy_oily: false
// height: 0
// highest_mv: 0
// id: 74
// inserts_pm: 0
// key: "1607681298992"
// lead_no: 2022
// length: 0
// lowest_mv: 0
// matrix_details: null
// max_cycle_days: 0
// min_cycle_days: 0
// min_max_margin: null
// mul_parts_single_pocket: null
// not_qualified: false
// np_ef: "New Part"
// on_hold: false
// other_spec: null
// other_storage: 0
// p2p_contact: null
// packaging_breadth: 0
// packaging_height: 0
// packaging_length: 0
// packaging_type: "New Part"
// palletized_sol_details: null
// part_cad_data: null
// part_name: null
// part_number: null
// parts_orientation: null
// parts_per_layer: 0
// parts_per_pocket: 0
// parts_pm: 0
// pfep_dropped: false
// pfep_no: 2023
// pm_loaded_weight: 0
// pocket_breadth: 0
// pocket_breadth1: 0
// pocket_height: 0
// pocket_height1: 0
// pocket_length: 0
// pocket_length1: 0
// price_per_unit: 0
// receiver_inv: 0
// receivers: [{…}]
// remarks: null
// remarks1: null
// remarks2: null
// sender_client: "test"
// sender_location: "Manesar"
// solution_crate: false
// solution_flc: false
// solution_fsc: false
// solution_palletized_box: false
// solution_palletized_crate: false
// solution_pp: false
// solution_ppbox: false
// solution_stacking_nesting: false
// solution_wp: false
// special_measure: null
// spesheet_pm: 0
// stacking_nesting: null
// total_parts_per_pm: 0
// tp: (2) [{…}, {…}]
// tp_approved: false
// tp_shared: false
// transit_time: 0
// transportation_mode: null
// trials_approved: false
// trials_done: false
// trips_per_pm: null
// volume_pm: 0
// wastage_pm: null
// weight: 0
// wh_emitter: 0
// wh_receiver: 0
// yantra_cycle: 0

export const PrintCp = ({ location }) => {
  const { state } = location;
  const columns = [
    {
      // width:'40vw',
      title: 'Part Name',
      key: 'part_name',
      render:(record)=>(
        <div className='px-2'>
          Info
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
