import React from 'react';
import {Row, Col, Typography, Table} from 'antd';

import './docket.styles.scss';

const {Title} = Typography;

const Docket = () => {
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
            <Title level={4} style={{fontWeight: 'bold'}}>
              Transaction No. :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Transaction Date :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Dispatch Date :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Transaction Type :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              KIT ID :
            </Title>
          </Row>
        </Col>
        <Col
          span={12}
          className="right"
          style={{
            fontSize: '18px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            // fontWeight: 'bold',
          }}>
          <p>
            [ &nbsp;] Original for Consignee <br /> [ &nbsp;] Duplicate for Transporter <br />[
            &nbsp;] Triplicate for Consignor
          </p>
        </Col>
      </Row>
      <Row className="main-data">
        <Col span={12}>
          <div className="left-main">
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                Sender's Name :
              </Title>
            </Row>
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                Sender's Address :
              </Title>
            </Row>
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                GST :
              </Title>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          <div className="right-main">
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                Receiver's Name :
              </Title>
            </Row>
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                Receiver's Address :
              </Title>
            </Row>
            <Row>
              <Title level={4} style={{fontWeight: 'bold'}}>
                GST :
              </Title>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="table">
        <Table />
      </Row>
      <Row className="final">
        <Col span={12}>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Amount in Words :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              SO No. :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Transporter Name :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Driver Name : _____________
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Driver No. : _____________
            </Title>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Grand Total :
            </Title>
          </Row>
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Creation Date :
            </Title>
          </Row>
          <br /> <br />
          <Row>
            <Title level={4} style={{fontWeight: 'bold'}}>
              Vehicle No. :
            </Title>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Docket;
