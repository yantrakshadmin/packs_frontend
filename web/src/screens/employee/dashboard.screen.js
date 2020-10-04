import React,{ useState } from 'react';
import { Row, Col,Select, Card, Form } from 'antd';
import { useAPI } from 'common/hooks/api';
import TwoLevelBarCharts from 'components/TwoLevelBarCharts';
import { Cal } from './events.screen';
import { Map } from './map.screen';
import formItem from '../../hocs/formItem.hoc';
import { FORM_ELEMENT_TYPES } from '../../constants/formFields.constant';
// import TwoLevelPieCharts from 'components/TwoLevelPieCharts';
// import { useFilterPieChartData } from 'hooks/filterPieChart';

const { Option } = Select;
// const dummy = {
//   'FSS001': 1936,
//   'FIN1196A': 1,
//   'FIN1196B': 1,
//   'FIN1196C': 1,
//   'FIN1196D': 1,
//   'FIN1151A': 518,
//   'FIN1151B': 90,
//   'FIN1182A': 113,
//   'FIN1182B': 87,
//   'FIN1182C': 14,
//   'FIN1187': 111,
//   'PB1162': 12,
//   'FIN1184A': 1,
//   'FIN1162A1': 133,
//   'FIN1162A2': 67,
//   'FIN1162B1': 124,
//   'FIN1162B2': 42,
//   'FIN1198A': 151,
//   'CIN1198A': 67,
//   'CIN1198B': 97,
//   'CIN1198C': 163,
//   'CIN1199A': 35,
//   'FIN1199A': 36,
//   'CSS001': 501,
//   'PB1198': 213,
//   'FIN1199B': 30,
//   'FIN1162E': 40,
//   'CIN1199B': 1,
//   'CIN1199C': 1,
//   'CIN1198D': 1,
//   'CIN1216A': 1,
//   'PL001': 220,
//   'PS001': 80,
//   'PS002': 140,
//   'PP001': 220 };

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
const parseCalData = (allotements,returns) => {
  // alert(allotements)
  const tmpallotements=dateAsKey(allotements);
  const tmpreturns=dateAsKey(returns);
  const data=[];
  for (var key in tmpallotements) {
    data.push(
      { // this object will be "parsed" into an Event Object
        title: `${tmpallotements[key].length} Allotment${(tmpallotements[key].length>1)?"s":""}`, // a property!
        start: key, // a property!
        data:tmpallotements[key],
        type:'Allotment',
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
        type:'Return'
      }
    )
  }
  // callback(data)
  window.k=data;
  return data
}

const countfromdata = (data,key) =>{
  let count=0;
  for(const i in data){
    if(data[i].type==key){
      count++;
    }
  }
  return count;
}

const parseData = (data,type) => {
  const tmp=[];
  for (const key in data) {
    // for (var key2 in data[key]) {
    tmp.push(
      {
        name: key, [type]: countfromdata(data[key],type),
      }
    )
    // }

  }
  window.tmp=tmp
  window.data=data
  return tmp;
}


const parseDataMonthly = (data) => {
  // console.log(data);
  window.x=data
  const tmp=[]
  for(const key in data){
    if(tmp[data[key].start.substr(0,7)]===undefined)
      tmp[data[key].start.substr(0,7)]=[]
    tmp[data[key].start.substr(0,7)].push(
      data[key]
    )
  }
  return tmp;
}

export const DashboardScreen = () => {
  const [allotmentClient,setAllotmentClient] = useState(null);
  const [returnClient,setReturnClient] = useState(null);
  // const [ filterKey,setFilterKey ] = useState(null);
  // const[transactionHistory,settransactionHistory]=useState([])
  // const { data,filteredData } = useFilterPieChartData(dummy,filterKey)
  const { data: allotments } = useAPI('/cal/', {});
  const { data: returns } = useAPI('/cal-r/', {});
  const { data: clients } = useAPI('/clients/', {});
  const [form] = Form.useForm();

  const onChangeAllotment = () =>{
    setAllotmentClient(form.getFieldValue('allotmentClient'))
  }
  const onChangeReturn = () =>{
    setReturnClient(form.getFieldValue('returnClient'))
  }

  return (
    <>
      <Card type='inner' title='Allotment and Return Stats'>
        <Row justify='center' gutter={32}>
          <Col span={12}>
            <Form
              onFieldsChange={onChangeAllotment}
              form={form}
              layout='horizontal'
              hideRequiredMark
              autoComplete='off'>
              {formItem({
                key: 'allotmentClient',
                kwargs: {
                  placeholder: 'Select',
                },
                others: {
                  selectOptions: clients || [],
                  key: 'user',
                  customTitle: 'client_name',
                  dataKeys: ['client_shipping_address'],
                },
                type: FORM_ELEMENT_TYPES.SELECT,
                customLabel: 'Client',
              })}
            </Form>
            <TwoLevelBarCharts data={allotments} type='Allotment' />
          </Col>
          <Col span={12}>
            <Form
              onFieldsChange={onChangeReturn}
              form={form}
              layout='horizontal'
              hideRequiredMark
              autoComplete='off'>
              {formItem({
                key: 'returnClient',
                kwargs: {
                  placeholder: 'Select',
                },
                others: {
                  selectOptions: clients || [],
                  key: 'user',
                  customTitle: 'client_name',
                  dataKeys: ['client_shipping_address'],
                },
                type: FORM_ELEMENT_TYPES.SELECT,
                customLabel: 'Client',
              })}
            </Form>
            <TwoLevelBarCharts data={returns} type='Return' />
          </Col>
        </Row>
      </Card>
      <br />
      <br />
      <Card type='inner' title='Location and Planning'>
        <Row>
          <Col span={12}>
            <Cal allotements={allotments} returns={returns} />
          </Col>
          <Col span={12}>
            <Map  />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashboardScreen;
