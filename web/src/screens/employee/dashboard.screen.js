import React,{ useState,useEffect } from 'react';
import { Row, Col,Typography, Card, Button,Menu,Dropdown } from 'antd';
import { useAPI } from 'common/hooks/api';
import { Bar } from 'react-chartjs-2';
import Column from 'common/columns/dashboard.column';
import { FilterOutlined } from '@ant-design/icons'
import { chartConfigs,chartOptions,initialChart } from 'common/constants/dashboardConstants';
import { Cal } from './events.screen';
import { Map } from './map.screen';
import { MasterHOC } from '../../hocs/Master.hoc';

const { Paragraph } = Typography;

export const DashboardScreen = () => {
  const [allotmentChartData,setAllotmentChartData] = useState(initialChart);
  const [returnChartData,setReturnChartData] = useState(initialChart);
  const [clientStatIndex,setClientStatIndex] = useState(0);
  const { data: allotments } = useAPI('/cal/', {});
  const { data: returns } = useAPI('/cal-r/', {});
  const { data: clients } = useAPI('/clients/', {})
  const { data: chartAllot } = useAPI('/allot-graph/', {});
  const { data: chartReturn } = useAPI('/return-graph/', {});
  const { data: clientStats,loading } = useAPI('/cycledays-graph/', {});
  const [clientStatsFiltered,setClientStatsFiltered ]
  = useState([]);
  // const plainOptions = ['Apple', 'Pear', 'Orange'];
  // const defaultCheckedList = ['Apple', 'Orange'];
  // const [checkBox,setCheckBox] =
  //   useState({ checkedList:defaultCheckedList,indeterminate:true,checkAll:false })
  //
  // const onChange = checkedList => {
  //   setCheckBox({
  //     checkedList,
  //     indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
  //     checkAll: checkedList.length === plainOptions.length,
  //   });
  // };
  //
  // const onCheckAllChange = e => {
  //   setCheckBox({
  //     checkedList: e.target.checked ? plainOptions : [],
  //     indeterminate: false,
  //     checkAll: e.target.checked,
  //   });
  // };



  useEffect(()=>{
    const chartAllotData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const chartReturnData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if(chartAllot){
      if(chartAllot.series){
        chartAllot.series[0].data.map(item => {
          const d = new Date(item.name);
          chartAllotData[d.getMonth()] = chartAllotData[d.getMonth()] + item.y
          return null
        });}}
    if(chartReturn){
      if(chartReturn.series){
        chartReturn.series[0].data.map(item => {
          const d = new Date(item.name);
          chartReturnData[d.getMonth()] = chartReturnData[d.getMonth()] + item.y
          return null
        });}}

    setAllotmentChartData(
      {
        labels: ['January',
          'February', 'March',
          'April', 'May', 'June', 'July', 'Aug',
          'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Allotments by Months',
            ...chartConfigs,
            data: chartAllotData,
          },
        ],
      }
    );
    setReturnChartData(
      {
        labels: ['January',
          'February', 'March',
          'April', 'May', 'June', 'July', 'Aug',
          'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Reurns by Months',
            ...chartConfigs,
            data: chartReturnData,
          },
        ],
      }
    );
  },[chartAllot,chartReturn])

  const getFilteredArray = () =>{
    const newArr = []
    if(clientStats){
      const len =  Object.keys(clientStats.Clients).length
      Object.keys(clientStats).map((key)=>{
        for(let i =0 ; i < len ; i+=1){
          newArr[i] = { ...newArr[i],[key]:clientStats[key][i] }
        }
        return null;
      })
    }
    return newArr;
  }

  useEffect(()=>{
    setClientStatsFiltered(getFilteredArray(clientStats))
  },[clientStats])

  const FilterDropdown = ({ menu })=>{
    return(
      <Dropdown overlay={menu}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className='ant-dropdown-link' onClick={e => e.preventDefault()}>
          <FilterOutlined style={{ fontSize:25 }} />
        </a>
      </Dropdown>
    )
  }
  const menuClientStats = clientStats?(
    <Menu>
      {Object.keys(clientStats.Clients).map((key)=>(
        <Menu.Item>
          <Button type='link' onClick={()=>{setClientStatIndex(parseInt(key,0))}}>
            {clientStats.Clients[key]}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ):(
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  )
  return (
    <>
      <Card type='inner' title='Allotment and Return Stats'>
        <Row justify='center' gutter={32}>
          <Col span={12}>
            <Bar
              data={allotmentChartData}
              height={125}
              options={chartOptions}
            />
          </Col>
          <Col span={12}>
            <Bar
              data={returnChartData}
              height={125}
              options={chartOptions}
            />
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
      <br />
      <Card>
        <Row gutter={32} align='bottom' justify='center'>
          <Col span={12}>
            <MasterHOC
              size='small'
              data={clientStatsFiltered}
              title='Clients Stats'
              hideRightButton
              loading={loading}
              columns={Column} />
          </Col>
          <Col span={12}>
            <FilterDropdown menu={menuClientStats} />
            <Bar
              data={
                {
                  labels: ['Allotment','Onsite','Return'],
                  datasets: [
                    {
                      label: 'Client Statistics',
                      ...chartConfigs,
                      data:clientStats?[
                        clientStats.Allotment[clientStatIndex],
                        clientStats.Onsite[clientStatIndex],
                        clientStats.Return[clientStatIndex]
                      ]:[0,0,0],
                    },
                  ],
                }
              }
              height={125}
              options={chartOptions}
            />
            <div className='row justify-center'>
              <Paragraph>
                {clientStatsFiltered.length>0?clientStatsFiltered[clientStatIndex].Clients:null}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashboardScreen;
