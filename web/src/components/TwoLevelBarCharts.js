// TwoLevelBarCharts| const { data,title } = this.props;
import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis,ResponsiveContainer, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const dateAsKey = (p) => {
  const tmp={};
  for (const key in p) {
    if (p.hasOwnProperty(key)) {
      // console.log(key + " -> " + p[key]);
      if(tmp[p[key].substr(0,10)]===undefined)
        tmp[p[key].substr(0,10)]=[]
      tmp[p[key].substr(0,10)].push(key)
    }
  }
  return tmp;
}
const parseCalData = (_data,type) => {
// alert(allotements)
  const tmpdata=dateAsKey(_data);
  const data=[];
  for (const key in tmpdata) {
    data.push(
      { // this object will be "parsed" into an Event Object
        title: `${tmpdata[key].length} Allotment${(tmpdata[key].length>1)?"s":""}`, // a property!
        start: key, // a property!
        data:tmpdata[key],
        type,
        color:"#CB4335"
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

export default class TwoLevelBarCharts extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

  render() {
    const { data,type } = this.props;
    return (
      <ResponsiveContainer width='100%' aspect={4.0/3.0}>
        <BarChart
          height={300}
          data={parseData(parseDataMonthly(parseCalData(data,type)),type)}
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
          }}
      >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={type} fill='#20a8d8' />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
