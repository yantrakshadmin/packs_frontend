import React, {useState} from 'react';
import {Row, Col, Typography, Spin} from 'antd';
import {Table} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './docket.styles.scss';
import {useEffect} from 'react';
import {retrieveAllotments} from 'common/api/auth';

const {Title} = Typography;

const Docket = ({location}) => {
  const [allotment, setAllotment] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAllotment = async () => {
      const {data} = await retrieveAllotments();
      const reqData = data.filter((d) => d.id === location.state.id);
      if (reqData) setAllotment(reqData[0]);
      console.log(reqData[0]);
    };
    fetchAllotment();
  }, [location]);

  useEffect(() => {
    const calcTotal = () => {
      let tot = 0;
      if (allotment) {
        allotment.flows.map((flow) => {
          const alloted = flow.alloted_quantity;
          flow.kit.products.map((prod) => {
            tot += alloted * prod.quantity * prod.product.priceperunit;
            return null;
          });
          return null;
        });
      }
      setTotal(tot);
    };
    calcTotal();
  }, [allotment]);

  var a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str +=
      n[5] != 0
        ? (str != '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only '
        : '';
    return str;
  }

  if (allotment)
    return (
      <div className="container">
        <div className="header">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + '/home-logo.png'} alt="Yantraksh" />
          </div>
          <div className="heading">
            <Title level={2} style={{fontWeight: 'bold'}}>
              DELIVERY CHALLAN
            </Title>
          </div>
        </div>
        <hr />
        <Row className="meta">
          <Col span={12} className="left">
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction No. : </p>
                <p style={{display: 'inline'}}>{allotment.transaction_no}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Date : </p>
                <p style={{display: 'inline'}}>{allotment.dispatch_date.slice(0, 10)}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Dispatch Date : </p>
                <p style={{display: 'inline'}}>{allotment.dispatch_date.slice(0, 10)}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Type : Allot</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{display: 'inline', fontWeight: 'bold'}}>
                  KIT ID : &nbsp;
                  {allotment.flows.map((flow, idx) => {
                    if (idx === allotment.flows.length - 1) return flow.kit.kit_name.slice(3);
                    return flow.kit.kit_name.slice(3) + '/';
                  })}
                </p>
              </Col>
            </Row>
          </Col>
          <Col span={5}></Col>
          <Col
            span={7}
            className="right"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
            }}>
            <p>
              [ &nbsp;] Original for Consignee <br /> [ &nbsp;] Duplicate for Transporter <br />[
              &nbsp;] Triplicate for Consignor
            </p>
          </Col>
        </Row>
        <div className="main-data">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.send_from_warehouse.name}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.flows[0].flow.sender_client.client_name}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.send_from_warehouse.address +
                    ' ' +
                    allotment.send_from_warehouse.city +
                    ' ' +
                    allotment.send_from_warehouse.state +
                    ' ' +
                    allotment.send_from_warehouse.pincode}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.flows[0].flow.sender_client.client_shipping_address +
                    ' ' +
                    allotment.flows[0].flow.sender_client.client_shipping_city +
                    ' ' +
                    allotment.flows[0].flow.sender_client.client_shipping_state +
                    ' ' +
                    allotment.flows[0].flow.sender_client.client_shipping_pincode}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.send_from_warehouse.gst}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {allotment.flows[0].flow.sender_client.client_gst}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="table">
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Kit ID</th>
                <th>Kit Name</th>
                <th>Quantity</th>
                <th>HSN/SAC</th>
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Product Use Qty</th>
              </tr>
            </thead>
            <tbody>
              {allotment.flows.map((flow) => {
                return (
                  <tr>
                    <td>{flow.kit.kit_name}</td>
                    <td>{flow.kit.kit_info}</td>
                    <td>{flow.alloted_quantity}</td>
                    <td>
                      {flow.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.hsn_code}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {flow.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.short_code}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {flow.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {flow.kit.products.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.quantity * flow.alloted_quantity}</p>
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row className="final">
          <Col span={12}>
            <Row>
              <Col span={9}>
                <p style={{fontWeight: 'bold'}}>Amount in Words :</p>
              </Col>
              <Col span={13} style={{wordWrap: 'break-word', textTransform: 'capitalize'}}>
                {String.fromCharCode(0x20b9) + ' ' + inWords(total) + 'Only.'}
              </Col>
            </Row>
            {/* <br /> */}
            <Row>
              <Col span={9}>
                <p style={{fontWeight: 'bold'}}>SO No. :</p>
              </Col>
              <Col span={13} style={{wordWrap: 'break-word'}}>
                {allotment.sales_order.id}
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <p style={{fontWeight: 'bold'}}>Transporter Name :</p>
              </Col>
              <Col span={13} style={{wordWrap: 'break-word'}}>
                {allotment.transport_by.name}
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <p style={{fontWeight: 'bold'}}>Driver Name :</p>
              </Col>
              <Col span={13} style={{wordWrap: 'break-word'}}>
                {allotment.driver_name}
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <p style={{fontWeight: 'bold'}}>Driver No. : </p>
              </Col>
              <Col span={13} style={{wordWrap: 'break-word'}}>
                {allotment.driver_number}
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Grand Total :</p>
              </Col>
              <Col span={14} style={{fontWeight: 'bold', wordWrap: 'break-word'}}>
                {String.fromCharCode(0x20b9) + ' ' + total}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Creation Date :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                {new Date().getDate().toString() +
                  '/' +
                  new Date().getMonth().toString() +
                  '/' +
                  new Date().getFullYear().toString()}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Vehicle No. :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                {allotment.vehicle_number}
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <div className="declaration">
          <p style={{fontWeight: 'bold', display: 'inline'}}>Declaration : </p>
          <p style={{display: 'inline'}}>
            The packaging products given on hire shall always remain the property of Yantraksh
            Logistics Private Limited and shall not be used for the purpose otherwise agreed upon.
            The same shall be returned at the address notified by Yantraksh Logistics Private
            Limited.
          </p>
          <br />
          <p style={{fontWeight: 'bold', display: 'inline'}}>Note : </p>
          <p style={{display: 'inline'}}>
            {' '}
            No E-Way Bill is required for Empty Cargo Containers. Refer, Rule 14 of Central Goods
            and Services Tax (Second Amendment) Rules, 2018.
          </p>
        </div>
        <hr />
        <div className="footer">
          <Row>
            <Col span={1}></Col>
            <Col span={11} style={{fontWeight: 'bold'}}>
              For Sending Location :
            </Col>
            <Col span={6}></Col>
            <Col span={6} style={{fontWeight: 'bold'}}>
              For Receiving Location :
            </Col>
          </Row>
          <br /> <br />
          <br />
          <Row>
            <Col span={1}></Col>
            <Col span={11} style={{fontWeight: 'bold'}}>
              Authorized Signature
            </Col>
            <Col span={6}></Col>
            <Col span={6} style={{fontWeight: 'bold'}}>
              Authorized Signature
            </Col>
          </Row>
          <Row>
            <Col span={1}></Col>
            <Col span={11}>(Company Seal & Signature)</Col>
            <Col span={6}></Col>
            <Col span={6}>(Company Seal & Signature)</Col>
          </Row>
          <br /> <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'Center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '0',
              margin: '0',
            }}>
            <p style={{fontSize: '26px', color: '#034efc'}}>Yantraksh Logistics Private Limited</p>
            <p>CIN No: U74999GJ2018PTC105552</p>
          </div>
        </div>
      </div>
    );
  return (
    <Spin spinning={true} style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />
  );
};

export default Docket;
