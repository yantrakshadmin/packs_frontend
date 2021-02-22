import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Spin} from 'antd';
import {Table} from 'react-bootstrap';
import moment from 'moment';

import {retrieveReturnDocket, retrieveReturnDocketCaleder} from 'common/api/auth';

import './returndocket.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const {Title} = Typography;

const ReturnDocket = ({location, isClient}) => {
  const [reqReturn, setReqReturn] = useState(null);
  const [total, setTotal] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    console.log(isClient);
    const fetchReturn = async () => {
      if (location.state) {
        console.log(location.state);
        if (location.state.id) {
          const {data} = await retrieveReturnDocket(location.state.id);
          if (data) setReqReturn(data);
        }
      } else {
        const len = location.pathname.length;
        const id = location.pathname.slice(24, len);
        const {data} = await retrieveReturnDocketCaleder(id);
        if (data) setReqReturn(data);
      }
    };
    fetchReturn();
  }, [location]);

  useEffect(() => {
    const calcTotal = () => {
      let tot = 0;
      let wt = 0;
      if (reqReturn) {
        reqReturn.kits.map((k) => {
          k.items.map((item) => {
            tot += item.quantity * item.product.priceperunit;
            wt += item.product.volumetric_weight * item.quantity;
            console.log(item.product);
          });
        });
      }
      setWeight(wt);
      setTotal(tot);
    };
    calcTotal();
  }, [reqReturn]);

  const a = [
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
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    const n = `000000000${num}`.substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str += n[1] != 0 ? `${a[Number(n[1])] || `${b[n[1][0]]} ${a[n[1][1]]}`}crore ` : '';
    str += n[2] != 0 ? `${a[Number(n[2])] || `${b[n[2][0]]} ${a[n[2][1]]}`}lakh ` : '';
    str += n[3] != 0 ? `${a[Number(n[3])] || `${b[n[3][0]]} ${a[n[3][1]]}`}thousand ` : '';
    str += n[4] != 0 ? `${a[Number(n[4])] || `${b[n[4][0]]} ${a[n[4][1]]}`}hundred ` : '';
    str +=
      n[5] != 0
        ? `${(str != '' ? 'and ' : '') + (a[Number(n[5])] || `${b[n[5][0]]} ${a[n[5][1]]}`)}only `
        : '';
    return str;
  }

  if (reqReturn)
    return (
      <div className="container-docket">
        <div className="header-docket">
          <div className="logo-docket">
            <img src={`${process.env.PUBLIC_URL}/home-logo.png`} alt="Yantraksh" />
          </div>
          <div className="heading-docket">
            <Title level={2} style={{fontWeight: 'bold'}}>
              DELIVERY CHALLAN
            </Title>
          </div>
        </div>
        <hr />
        <Row className="meta-docket">
          <Col span={12} className="left">
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction No. : </p>
                <p style={{display: 'inline'}}>{reqReturn.transaction_no}</p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Date : </p>
                <p style={{display: 'inline'}}>
                  {moment(reqReturn.transaction_date).format('DD/MM/YYYY')}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Dispatch Date : </p>
                <p style={{display: 'inline'}}>
                  {moment(reqReturn.transaction_date).format('DD/MM/YYYY')}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Transaction Type : Return</p>
              </Col>
            </Row>
          </Col>
          <Col span={5} />
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
        <div className="main-data-docket">
          <Row>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Sender's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.receiver_client.name}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Name : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.warehouse.name}
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
                  {`${reqReturn.receiver_client.address}, ${reqReturn.receiver_client.city}`}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>Receiver's Address : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {`${reqReturn.warehouse.address}, ${reqReturn.warehouse.city}, ${reqReturn.warehouse.state}, ${reqReturn.warehouse.pincode}`}
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
                  {reqReturn.receiver_client.gst}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10}>
                  <p style={{fontWeight: 'bold'}}>GST : </p>
                </Col>
                <Col span={12} style={{wordWrap: 'break-word'}}>
                  {reqReturn.warehouse.gst}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Row className="table-docket">
          <Table bordered>
            <thead>
              <tr>
                <th>Kit ID</th>
                <th>Quantity</th>
                {/* <th>HSN/SAC</th> */}
                <th>Product Code</th>
                <th>Product Name</th>
                <th>Product Qty</th>
              </tr>
            </thead>
            <tbody>
              {reqReturn.kits.map((kit) => {
                return (
                  <tr>
                    <td>{kit.kit}</td>
                    <td>{kit.quantity}</td>
                    {/* <td>
                      {kit.items.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.hsn_code}</p>
                        </div>
                      ))}
                    </td> */}
                    <td>
                      {kit.items.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.short_code}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {kit.items.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.product.name}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {kit.items.map((prod) => (
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                          <p>{prod.quantity}</p>
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row className="final-docket">
          <Col span={12}>
            <Row>
              <Col span={7}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Amount in Words : </p>
              </Col>
              <Col span={16}>
                <p style={{display: 'inline', wordWrap: 'break-word', textTransform: 'capitalize'}}>
                  {`${String.fromCharCode(0x20b9)} ${inWords(total)}`}
                </p>
              </Col>
              <br />
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Charged Weight : </p>
                <p style={{fontWeight: 'bold', display: 'inline'}}>{weight} Kg</p>
              </Col>
            </Row>
            {!isClient ? (
              <Row>
                <Col span={24}>
                  <p style={{fontWeight: 'bold', display: 'inline'}}>Transporter Name : </p>
                  <p style={{display: 'inline', wordWrap: 'break-word'}}>
                    {reqReturn.transport_by}
                  </p>
                </Col>
              </Row>
            ) : null}
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver Name : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{reqReturn.driver_name}</p>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Driver No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>{reqReturn.driver_number}</p>
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Grand Total : </p>
                <p style={{fontWeight: 'bold', display: 'inline', wordWrap: 'break-word'}}>
                  {`${String.fromCharCode(0x20b9)} ${total}`}
                </p>
              </Col>
            </Row>
            {/* <Row> */}
            {/*  <Col span={24}> */}
            {/*    <p style={{fontWeight: 'bold', display: 'inline'}}>Creation Date : </p> */}
            {/*    <p style={{display: 'inline', wordWrap: 'break-word'}}> */}
            {/*      {new Date().getDate().toString() +*/}
            {/*        '/' +*/}
            {/*        new Date().getMonth().toString() +*/}
            {/*        '/' +*/}
            {/*        new Date().getFullYear().toString()} */}
            {/*    </p> */}
            {/*  </Col> */}
            {/* </Row> */}
            <Row>
              <Col span={24}>
                <p style={{fontWeight: 'bold', display: 'inline'}}>Vehicle No. : </p>
                <p style={{display: 'inline', wordWrap: 'break-word'}}>
                  {reqReturn.vehicle_number}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <table style={{pageBreakInside: 'avoid'}}>
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
        </table>

        <hr />
        <table style={{pageBreakInside: 'avoid', width: '90vw'}}>
          <div className="footer">
            <Row>
              <Col span={1} />
              <Col span={11} style={{fontWeight: 'bold'}}>
                For Sending Location :
              </Col>
              <Col span={6} />
              <Col span={6} style={{fontWeight: 'bold'}}>
                For Receiving Location :
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={1} />
              <Col span={11} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
              <Col span={6} />
              <Col span={6} style={{fontWeight: 'bold'}}>
                Authorized Signature
              </Col>
            </Row>
            <Row>
              <Col span={1} />
              <Col span={11}>(Company Seal & Signature)</Col>
              <Col span={6} />
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
              <p style={{fontSize: '26px', color: '#034efc'}}>
                Yantraksh Logistics Private Limited
              </p>
              <p>CIN No: U74999GJ2018PTC105552</p>
            </div>
          </div>
        </table>
      </div>
    );
  return <Spin spinning style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />;
};

export default ReturnDocket;
