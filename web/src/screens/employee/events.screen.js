import React,{ useState ,useEffect} from 'react';

import { Row, Col ,Select,Modal, List, Spin } from 'antd'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

// const x={ "4": "2020-02-01T05:14:29.615Z", "5": "2020-02-01T05:15:12.122Z", "6": "2020-02-01T05:17:39.598Z", "7": "2020-02-01T05:18:13.224Z", "13": "2020-02-12T06:19:01.808Z", "2122": "2020-01-06T11:42:44.144Z", "2124": "2020-01-08T06:12:48.746Z", "2125": "2020-01-10T06:13:12.561Z", "2127": "2020-01-16T06:15:39.868Z", "2128": "2020-01-23T06:16:17.273Z", "2129": "2020-01-25T06:16:45.446Z", "2130": "2020-02-01T06:17:54.141Z", "2131": "2020-02-07T06:18:10.354Z", "2132": "2020-02-07T05:19:06.856Z", "2133": "2020-02-07T05:19:42.451Z", "2235": "2020-02-14T06:19:32.898Z", "2236": "2020-02-19T06:20:30.039Z", "2237": "2020-02-21T06:20:50.174Z", "2238": "2020-07-24T06:21:12.861Z", "2239": "2020-02-24T05:20:44.326Z", "2240": "2020-02-24T05:21:36.147Z", "2241": "2020-02-24T05:22:59.249Z", "2242": "2020-02-24T05:24:19.595Z", "2243": "2020-02-24T05:25:11.876Z", "2244": "2020-02-24T05:25:21.285Z", "2245": "2020-02-29T06:21:26.754Z", "2246": "2020-03-02T05:28:28.497Z", "2247": "2020-03-02T05:28:52.907Z", "2248": "2020-03-02T05:29:30.783Z", "2249": "2020-03-02T05:30:22.059Z", "2250": "2020-03-03T06:22:50.133Z", "2251": "2020-03-04T06:23:21.913Z", "2252": "2020-03-09T06:23:37.019Z", "2253": "2020-03-14T06:24:05.020Z", "2255": "2020-03-16T06:24:40.637Z", "2256": "2020-03-18T06:25:20.639Z", "2257": "2020-03-20T07:20:01.219Z", "2258": "2020-03-20T05:48:29.860Z", "2260": "2020-03-20T07:20:34.650Z", "2261": "2020-03-16T07:19:28.003Z", "2262": "2020-03-20T06:26:06.129Z", "2263": "2020-06-08T07:22:09.644Z", "2264": "2020-06-08T07:22:46.319Z", "2265": "2020-06-08T07:23:10.968Z", "2266": "2020-06-08T07:23:42.234Z", "2267": ",2020-06-11T09:58:58.184Z", "2268": "2020-06-13T07:24:17.200Z", "2269": "2020-06-13T07:24:35.314Z", "2270": "2020-06-17T07:26:26.036Z", "2271": "2020-06-17T07:25:42.664Z", "2272": "2020-06-17T07:25:14.301Z", "2273": "2020-06-22T06:27:34.081Z", "2274": "2020-06-22T07:28:16.302Z", "2275": "2020-06-23T05:37:44.467Z", "2276": "2020-06-23T05:36:51.164Z", "2277": "2020-06-25T05:40:49.693Z", "2278": "2020-06-25T05:40:09.028Z", "2279": "2020-06-25T05:41:25.579Z", "2280": "2020-06-25T05:38:24.471Z", "2281": "2020-06-25T05:41:56.455Z", "2282": "2020-06-25T05:39:07.206Z", "2283": "2020-06-25T05:42:37.404Z", "2284": "2020-06-25T05:39:33.291Z", "2285": "2020-06-25T06:28:12.682Z", "2286": "2020-06-30T07:28:49.139Z", "2287": "2020-07-03T05:57:09.779Z", "2288": "2020-07-03T05:57:49.914Z", "2289": "2020-07-06T06:01:48.764Z", "2290": "2020-07-06T06:01:05.311Z", "2291": "2020-07-06T06:00:21.026Z", "2292": "2020-07-06T05:59:55.988Z", "2293": "2020-07-06T05:59:25.371Z", "2294": "2020-07-06T06:02:24.993Z", "2295": "2020-07-06T05:58:51.479Z", "2296": "2020-07-06T05:58:29.113Z", "2297": "2020-07-03T08:21:56.039Z", "2298": "2020-07-03T08:22:24.739Z", "2299": "2020-07-07T08:24:46.405Z", "2300": "2020-07-07T08:25:12.076Z", "2301": "2020-07-06T06:28:44.649Z", "2302": "2020-07-06T10:00:13.144Z", "2303": "2020-07-06T08:23:02.344Z", "2304": "2020-07-06T08:23:26.411Z", "2305": "2020-07-07T08:26:08.569Z", "2306": "2020-07-07T08:26:24.220Z", "2307": "2020-07-08T06:29:09.335Z", "2308": "2020-07-08T08:26:55.899Z", "2309": "2020-07-08T08:27:26.905Z", "2310": "2020-07-11T06:29:25.147Z", "2311": "2020-07-14T08:31:56.146Z", "2312": "2020-07-18T06:41:07.107Z", "2313": "2020-07-18T08:33:02.288Z", "2314": "2020-07-18T08:33:25.374Z", "2315": "2020-07-22T06:08:19.740Z", "2316": "2020-07-22T06:38:02.512Z", "2317": "2020-07-27T04:42:46.356Z", "2318": "2020-07-30T07:24:46.324Z", "2319": "2020-08-04T04:14:37.383Z", "2320": "2020-08-01T07:08:27.943Z", "2321": "2020-08-01T09:19:37Z", "2322": "2020-08-08T05:06:40.401Z", "2323": "2020-08-10T09:58:59.694Z", "2324": "2020-08-11T04:40:34.876Z", "2325": "2020-08-14T06:50:31.504Z", "2326": "2020-08-19T05:33:50.096Z", "2327": "2020-08-19T07:12:52.645Z", "2328": "2020-08-22T07:55:08.415Z", "2329": "2020-08-24T07:00:53.383Z", "2330": "2020-08-26T17:39:47.695Z", "2331": "2020-08-27T06:03:23.649Z", "2332": "2020-08-28T11:15:38.309Z", "2333": "2020-08-31T07:23:32.085Z", "2334": "2020-08-31T11:03:44.574Z", "2335": "2020-09-02T05:49:26.657Z", "2336": "2020-09-02T13:20:31.897Z", "2337": "2020-09-02T03:38:55.090Z", "2338": "2020-09-04T07:00:11.035Z", "2339": "2020-09-07T05:21:24.155Z", "2340": "2020-09-07T05:36:44.194Z", "2342": "2020-09-08T09:42:11.409Z", "2343": "2020-09-08T12:33:11.138Z", "2344": "2020-09-09T07:33:05.506Z", "2345": "2020-09-09T07:38:08.572Z", "2346": "2020-09-10T07:04:36.925Z", "2348": "2020-09-15T05:12:33.875Z", "2349": "2020-09-14T05:12:01.292Z", "2350": "2020-09-16T05:06:00.453Z", "2352": "2020-09-16T08:02:42.279Z", "2353": "2020-09-18T03:25:42.109Z", "2356": "2020-09-21T09:24:59.454Z", "2357": "2020-09-22T04:19:17.877Z", "2358": "2020-09-22T08:37:20.044Z", "2359": "2020-09-24T04:08:45.384Z", "2360": "2020-09-25T05:21:47.459Z", "2361": "2020-09-28T04:55:43.903Z", "2362": "2020-09-28T09:47:35.514Z", "2363": "2020-09-30T10:55:38.324Z", "2364": "2020-09-28T14:05:57.318Z", "2365": "2020-09-30T06:51:16.536Z", "2366": "2020-09-30T10:13:01.738Z", "2367": "2020-09-30T12:12:29.689Z" }

const dateAsKey = (p) => {
    let tmp={};
    for (var key in p) {
        if (p.hasOwnProperty(key)) {
           // console.log(key + " -> " + p[key]);
           if(tmp[p[key].substr(0,10)]==undefined)
              tmp[p[key].substr(0,10)]=[]
            tmp[p[key].substr(0,10)].push(key)
        }
    }
    return tmp;
}
const parseCalData = ({allotements,returns}) => {
    let tmpallotements=dateAsKey(allotements);
    let tmpreturns=dateAsKey(returns);
    let data=[];
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
        let allotmentData=calData.find(o => (new Date(o.start+" 00:00").toString() === e.event.start.toString() && o.type==='allotment'));
        let returnData=calData.find(o => (new Date(o.start+" 00:00").toString() === e.event.start.toString() && o.type==='return'));
        setcurrentAllotmentEvent(allotmentData?allotmentData.data:[])
        setcurrentReturnEvent(returnData?returnData.data:[])
        setmodalV(true)
    }
  return (
    <Row>
      <Col span={23}>
          {
              calData?<FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              events={calData}
              eventClick={(e)=>onEventClick(e)}
          />:<Spin spinning={true}></Spin>
          }
          {/* {console.log(dummy)} */}
        
      </Col>
      <Col span={12}>
      <Modal
          title="Transactions"
          visible={modalV}
          onOk={()=>setmodalV(false)}
          onCancel={()=>setmodalV(false)}
        >
        <Row>
            <Col span={12}>
            <p style={{'textAlign':'center'}}>Allotments</p>
            {
              <List
                size="small"
                bordered
                dataSource={currentAllotmentEvent}
                renderItem={item => <List.Item>{item}</List.Item>}
            />
            }
            </Col>
            <Col span={12}>
                <p style={{'textAlign':'center'}}>Returns</p>
            {
              <List
              size="small"
              bordered
              dataSource={currentReturnEvent}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            
          }
            </Col>
        </Row>
         
            
          
        </Modal>
      </Col>
    </Row>
  );
};

export default Cal;
