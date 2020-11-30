import React,{ useState ,useEffect } from 'react';

import { Row, Col ,Modal, List, Spin } from 'antd'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


const dateAsKey = (p) => {
  const tmp={};
  for (const key in p) {
    if (p.hasOwnProperty(key)) {
      // console.log(key + " -> " + p[key]);
      if(tmp[p[key].substr(0,10)]==undefined)
        tmp[p[key].substr(0,10)]=[]
      tmp[p[key].substr(0,10)].push(key)
    }
  }
  return tmp;
}
const parseCalData = ({ allotements,returns }) => {
  const tmpallotements=dateAsKey(allotements);
  const tmpreturns=dateAsKey(returns);
  const data=[];
  for (var key in tmpallotements) {
    data.push(
      { // this object will be "parsed" into an Event Object
        title: `${tmpallotements[key].length} Allotment${(tmpallotements[key].length>1)?"s":""}`, // a property!
        start: key, // a property!
        data:tmpallotements[key],
        type:'allotment',
        color:"#CB4335"
      }
    )
  }
  for (var key in tmpreturns) {
    data.push(
      { // this object will be "parsed" into an Event Object
        title: `${tmpreturns[key].length} Return`, // a property!
        start: key, // a property!
        data:tmpreturns[key],
        color:"#27AE60",
        type:'return'
      }
    )
  }
  // callback(data)
  return data
}




export const Cal = (allotments,returns) => {
  const [allotmentData,setallotmentData]=useState();
  const [returnData,setreturnData]=useState();
  const [calData,setcalData]=useState();

  useEffect(() => {
    if (allotments) {
      setcalData(parseCalData(allotments,returns))
    }
  },[allotments,returns])
  const [modalV,setmodalV]=useState(false);
  const [currentAllotmentEvent,setcurrentAllotmentEvent]=useState([]);
  const [currentReturnEvent,setcurrentReturnEvent]=useState([]);
  const onEventClick = (e) => {
    const allotmentData=calData.find(o => (new Date(`${o.start} 00:00`).toString() === e.event.start.toString() && o.type==='allotment'));
    const returnData=calData.find(o => (new Date(`${o.start} 00:00`).toString() === e.event.start.toString() && o.type==='return'));
    setcurrentAllotmentEvent(allotmentData?allotmentData.data:[])
    setcurrentReturnEvent(returnData?returnData.data:[])
    setmodalV(true)
  }
  return (
    <Row>
      <Col span={23}>
        {
              calData?(
                <FullCalendar
                  plugins={[ dayGridPlugin ]}
                  initialView='dayGridMonth'
                  events={calData}
                  eventClick={(e)=>onEventClick(e)}
          />
              ):<Spin spinning />
          }
        {/* {console.log(dummy)} */}

      </Col>
      <Col span={12}>
        <Modal
          title='Transactions'
          visible={modalV}
          onOk={()=>setmodalV(false)}
          onCancel={()=>setmodalV(false)}
        >
          <Row>
            <Col span={12}>
              <p style={{ 'textAlign':'center' }}>Allotments</p>
              <List
                size='small'
                bordered
                dataSource={currentAllotmentEvent}
                renderItem={item => (
                  <List.Item>
                    <a href={`../docket/${item}`} target='_blank' rel='noreferrer'>
                      {item}
                    </a>
                  </List.Item>
                )}
            />
            </Col>
            <Col span={12}>
              <p style={{ 'textAlign':'center' }}>Returns</p>
              <List
                size='small'
                bordered
                dataSource={currentReturnEvent}
                renderItem={item => (
                  <a
                    href={`../return-docket/${item}`}
                    target='_blank'
                    rel='noreferrer'>
                    {item}
                  </a>
                )}
            />
            </Col>
          </Row>
        </Modal>
      </Col>
    </Row>
  );
};

export default Cal;
