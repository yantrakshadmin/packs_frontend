import React, {useState} from 'react';
import {Row, Col, Typography, Table, Spin} from 'antd';

import './docket.styles.scss';
import {useEffect} from 'react';
import {retrieveAllotments} from 'common/api/auth';

const {Title} = Typography;

const Docket = ({location}) => {
  const [allotment, setAllotment] = useState(null);

  useEffect(() => {
    const fetchAllotment = async () => {
      const {data} = await retrieveAllotments();
      const reqData = data.filter((d) => d.id === location.state.id);
      if (reqData) setAllotment(reqData[0]);
      console.log(reqData[0]);
    };
    fetchAllotment();
  }, [location]);

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
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Transaction No. :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                {allotment.transaction_no}
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Transaction Date :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Dispatch Date :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Transaction Type :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <p style={{fontWeight: 'bold'}}>KIT ID :</p>
              </Col>
              <Col span={18} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col
            span={10}
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
        <Row className="main-data">
          <Col span={12}>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Sender's Name :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Sender's Address :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>GST :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Receiver's Name :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>Receiver's Address :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{fontWeight: 'bold'}}>GST :</p>
              </Col>
              <Col span={12} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="table">
          <Table />
        </Row>
        <Row className="final">
          <Col span={12}>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Amount in Words :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                Thirty Thousand Four Hundred And Fifty Six Thousand Lakhs
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>SO No. :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Transporter Name :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Driver Name :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                _____________
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Driver No. : </p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                _____________
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Grand Total :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Creation Date :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
            <br /> <br />
            <Row>
              <Col span={8}>
                <p style={{fontWeight: 'bold'}}>Vehicle No. :</p>
              </Col>
              <Col span={14} style={{wordWrap: 'break-word'}}>
                10010101010
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  return (
    <Spin spinning={true} style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />
  );
};

export default Docket;
