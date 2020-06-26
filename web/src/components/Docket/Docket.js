import React from 'react';
import {Row, Col, Divider, Grid, Typography} from 'antd';

import './docket.styles.scss';

const {Text, Title} = Typography;

const Docket = () => {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src="home-logo.png" alt="Yantraksh" />
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
            <Title level={4}>Transaction No. :</Title>
            <p>Data</p>
          </Row>
          <Row>
            <Title level={4}>Transaction Date : </Title>
            <p> Data</p>
          </Row>
          <Row>
            <Title level={4}>Dispatch Date : </Title>
            <p>Data</p>
          </Row>
          <Row>
            <Title level={4}>Transaction Type : Data</Title>
          </Row>
          <Row>
            <Title level={4}>KIT ID : Data</Title>
          </Row>
        </Col>
        <Col span={12} style={{fontSize: '3vh', fontFamily: 'Arial, Helvetica, sans-serif'}}>
          <p>
            [ &nbsp;] Original for Consignee <br /> [ &nbsp;] Duplicate for Transporter <br />[
            &nbsp;] Triplicate for Consignor
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Docket;
