import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Card, Button, Menu, Dropdown} from 'antd';
import {useAPI} from 'common/hooks/api';
import {Bar} from 'react-chartjs-2';
import Column from 'common/columns/dashboard.column';
import {FilterOutlined} from '@ant-design/icons';
import {chartConfigs, chartOptions, initialChart} from 'common/constants/dashboardConstants';
import {Cal} from './events.screen';
import {Map} from './map.screen';
import {MasterHOC} from '../../hocs/Master.hoc';

import _ from 'lodash';

const {Paragraph} = Typography;
const kitTypes = ['FLC', 'FSC', 'Crate', 'PP Box'];

export const DashboardScreen = () => {
  const [allotmentChartData, setAllotmentChartData] = useState(
    initialChart('Allotments by Months'),
  );

  const [returnChartData, setReturnChartData] = useState({
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Return by Months',
        ...chartConfigs,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const [clientStatIndex, setClientStatIndex] = useState(0);
  const [rClientSelected, setRClientSelected] = useState('All Clients');
  const [sClientSelected, setSClientSelected] = useState(undefined);

  const [sYears, setSYears] = useState([]);
  const [sYearSelected, setSYearSelected] = useState(undefined);
  const [rYears, setRYears] = useState([]);
  const [rYearSelected, setRYearSelected] = useState(undefined);

  const [sKitType, setSKitType] = useState(undefined);
  const {data: allotments} = useAPI('/cal/', {});
  const {data: returns} = useAPI('/cal-r/', {});
  const [allotCharUrl, setAllotChartUrl] = useState('/allot-graph/');
  const {data: chartAllot} = useAPI(allotCharUrl, {});
  const {data: chartReturn} = useAPI(
    rClientSelected !== 'All Clients' ? `/return-graph/?rc=${rClientSelected}` : '/return-graph/',
    {},
  );
  const {data: rClients} = useAPI('/names-rc/', {});
  const {data: sClients} = useAPI('/names-sc/', {});
  const {data: clientStats, loading} = useAPI('/cycledays-graph/', {});
  const [clientStatsFiltered, setClientStatsFiltered] = useState([]);

  useEffect(() => {
    if (sClientSelected !== undefined && sKitType !== undefined) {
      setAllotChartUrl(`/allot-graph/?sc=${sClientSelected}&type=${sKitType}`);
    } else if (sClientSelected === undefined && sKitType !== undefined) {
      setAllotChartUrl(`/allot-graph/?type=${sKitType}`);
    } else if (sClientSelected !== undefined && sKitType === undefined) {
      setAllotChartUrl(`/allot-graph/?sc=${sClientSelected}`);
    } else {
      setAllotChartUrl(`/allot-graph/`);
    }
  }, [sClientSelected, sKitType]);

  const [yearFilteredChartAllot, setYearFilteredChartAllot] = useState({});

  useEffect(() => {
    if (chartAllot) {
      if (chartAllot.series) {
        let newData = _.groupBy(chartAllot.series[0].data, (el) => {
          const d = new Date(el.name);
          return d.getFullYear();
        });
        let years = [];
        _.forEach(newData, (value, key) => {
          years.push(key);
          const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          value.map((item) => {
            const d = new Date(item.name);
            months[d.getMonth()] = months[d.getMonth()] + item.y;
            return null;
          });
          newData[key] = months;
        });
        setSYears(years);
        if (years.length > 0) {
          setSYearSelected(Math.max.apply(Math, years));
        }

        setYearFilteredChartAllot(newData);

        // chartAllot.series[0].data.map(item => {
        //   const d = new Date(item.name);
        //   chartAllotData[d.getMonth()] = chartAllotData[d.getMonth()] + item.y
        //   return null;
        // });
      }
    }
    // setAllotmentChartData(
    //   {
    //     labels: ['January',
    //       'February', 'March',
    //       'April', 'May', 'June', 'July', 'Aug',
    //       'Sept', 'Oct', 'Nov', 'Dec'],
    //     datasets: [
    //       {
    //         label: 'Allotments by Months',
    //         ...chartConfigs,
    //         data: yearFilteredChartAllot[2021],
    //       },
    //     ],
    //   }
    // )
  }, [chartAllot]);

  useEffect(() => {
    setAllotmentChartData({
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Allotments by Months',
          ...chartConfigs,
          data: yearFilteredChartAllot[sYearSelected],
        },
      ],
    });
  }, [yearFilteredChartAllot, sYearSelected, setSYearSelected]);

  const [yearFilteredChartReturn, setYearFilteredChartReturn] = useState({});

  useEffect(() => {
    if (chartReturn) {
      if (chartReturn.series) {
        let newData = _.groupBy(chartReturn.series[0].data, (el) => {
          const d = new Date(el.name);
          return d.getFullYear();
        });
        let years = [];
        _.forEach(newData, (value, key) => {
          years.push(key);
          const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          value.map((item) => {
            const d = new Date(item.name);
            months[d.getMonth()] = months[d.getMonth()] + item.y;
            return null;
          });
          newData[key] = months;
        });
        setRYears(years);
        if (years.length > 0) {
          setRYearSelected(Math.max.apply(Math, years));
        }
        console.log(newData);
        setYearFilteredChartReturn(newData);
      }
    }
    // const chartReturnData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // if(chartReturn){
    //   if(chartReturn.series){
    //     chartReturn.series[0].data.map(item => {
    //       const d = new Date(item.name);
    //       chartReturnData[d.getMonth()] = chartReturnData[d.getMonth()] + item.y
    //       return null
    //     });}}
    // setReturnChartData(
    //   {
    //     labels: ['January',
    //       'February', 'March',
    //       'April', 'May', 'June', 'July', 'Aug',
    //       'Sept', 'Oct', 'Nov', 'Dec'],
    //     datasets: [
    //       {
    //         label: 'Returns by Months',
    //         ...chartConfigs,
    //         data: chartReturnData,
    //       },
    //     ],
    //   }
    // );
  }, [chartReturn]);

  useEffect(() => {
    setReturnChartData({
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'Allotments by Months',
          ...chartConfigs,
          data: yearFilteredChartReturn[rYearSelected],
        },
      ],
    });
  }, [yearFilteredChartReturn, rYearSelected, setRYearSelected]);

  const getFilteredArray = () => {
    const newArr = [];
    if (clientStats) {
      const len = Object.keys(clientStats.Clients).length;
      Object.keys(clientStats).map((key) => {
        for (let i = 0; i < len; i += 1) {
          newArr[i] = {...newArr[i], [key]: clientStats[key][i]};
        }
        return null;
      });
    }
    return newArr;
  };

  useEffect(() => {
    setClientStatsFiltered(getFilteredArray(clientStats));
  }, [clientStats]);

  const FilterDropdown = ({menu}) => {
    return (
      <Dropdown overlay={menu}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <FilterOutlined style={{fontSize: 25}} />
        </a>
      </Dropdown>
    );
  };

  const menuRClients = rClients ? (
    <Menu>
      <Menu.Item>
        <Button
          type="link"
          onClick={() => {
            setRClientSelected('All Clients');
          }}>
          All Clients
        </Button>
      </Menu.Item>
      {rClients.map((key) => (
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              setRClientSelected(key.replaceAll('&', '%26'));
            }}>
            {key}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  );

  const menuSClients = sClients ? (
    <Menu>
      <Menu.Item>
        <Button
          type="link"
          onClick={() => {
            setSClientSelected(undefined);
          }}>
          All Clients
        </Button>
      </Menu.Item>
      {sClients.map((key) => (
        <Menu.Item>
          <Button
            type="link"
            disabled={key === sClientSelected}
            onClick={() => {
              setSClientSelected(key.replaceAll('&', '%26'));
            }}>
            {key}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  );

  const menuSKits = (
    <Menu>
      <Menu.Item>
        <Button
          type="link"
          onClick={() => {
            setSKitType(undefined);
          }}>
          All Kits
        </Button>
      </Menu.Item>
      {kitTypes.map((key) => (
        <Menu.Item>
          <Button
            type="link"
            disabled={key === sKitType}
            onClick={() => {
              setSKitType(key.replaceAll('&', '%26'));
            }}>
            {key}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  const menuSYears = sYears ? (
    <Menu>
      {sYears.map((key) => (
        <Menu.Item>
          <Button
            type="link"
            disabled={key === sYearSelected}
            onClick={() => {
              setSYearSelected(key);
            }}>
            {key}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  );

  const menuRYears = rYears ? (
    <Menu>
      {rYears.map((key) => (
        <Menu.Item>
          <Button
            type="link"
            disabled={key === rYearSelected}
            onClick={() => {
              setRYearSelected(key);
            }}>
            {key}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  );

  const menuClientStats = clientStats ? (
    <Menu>
      {Object.keys(clientStats.Clients || {}).map((key) => (
        <Menu.Item>
          <Button
            type="link"
            onClick={() => {
              setClientStatIndex(parseInt(key, 0));
            }}>
            {clientStats.Clients[key]}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  ) : (
    <Menu>
      <Menu.Item danger>No Data</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Card type="inner" title="Allotment and Return Stats">
        <Row justify="center" gutter={32}>
          <Col span={12}>
            <div className="row">
              <FilterDropdown menu={menuSClients} />
              <FilterDropdown menu={menuSKits} />
              <FilterDropdown menu={menuSYears} />
            </div>
            <Bar data={allotmentChartData} height={125} options={chartOptions} />
            <div className="row justify-center">
              <Paragraph>
                {sClientSelected ? sClientSelected.replaceAll('%26', '&') : 'All Clients'}
                {/* eslint-disable-next-line no-nested-ternary */}
                {sKitType && sClientSelected
                  ? ` - ${sKitType}`
                  : sKitType
                  ? sKitType.replaceAll('%26', '&')
                  : ' - All Kits'}
                {` - `}
                {sYearSelected ? sYearSelected : ''}
              </Paragraph>
            </div>
          </Col>
          <Col span={12}>
            <FilterDropdown menu={menuRClients} />
            <FilterDropdown menu={menuRYears} />
            <Bar data={returnChartData} height={125} options={chartOptions} />
            <div className="row justify-center">
              <Paragraph>
                {rClientSelected.replaceAll('%26', '&')}
                {` - `}
                {rYearSelected ? rYearSelected : ''}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <br />
      <Card type="inner" title="Location and Planning">
        <Row>
          <Col span={12}>
            <Cal allotements={allotments} returns={returns} />
          </Col>
          <Col span={12}>
            <Map />
          </Col>
        </Row>
      </Card>
      <br />
      <Card>
        <Row gutter={32} align="bottom" justify="center">
          <Col span={12}>
            <MasterHOC
              size="small"
              data={clientStatsFiltered}
              title="Clients Stats"
              hideRightButton
              loading={loading}
              columns={Column}
            />
          </Col>
          <Col span={12}>
            <FilterDropdown menu={menuClientStats} />
            <Bar
              data={{
                labels: ['Allotment', 'Onsite', 'Return'],
                datasets: [
                  {
                    label: 'Client Statistics',
                    ...chartConfigs,
                    data: clientStats
                      ? [
                          clientStats.Allotment[clientStatIndex],
                          clientStats.Onsite[clientStatIndex],
                          clientStats.Return[clientStatIndex],
                        ]
                      : [0, 0, 0],
                  },
                ],
              }}
              height={125}
              options={chartOptions}
            />
            <div className="row justify-center">
              <Paragraph>
                {clientStatsFiltered.length > 0
                  ? clientStatsFiltered[clientStatIndex].Clients
                  : null}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default DashboardScreen;
