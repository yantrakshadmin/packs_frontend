import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Spin} from 'antd';
import {Table} from 'react-bootstrap';
import {useAPI} from 'common/hooks/api';
import moment from 'moment';
import {useParams} from '@reach/router';
import {printPurchaseOrders} from 'common/api/auth';
import '../../../components/Docket/docket.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const {Title} = Typography;

const Docket = ({location, match}) => {
  const [allotment, setAllotment] = useState(null);
  const [total, setTotal] = useState(0);
  const {id} = useParams();

  useEffect(async () => {
    const fetchAllotment = async () => {
      if (id) {
        const {data} = await printPurchaseOrders(id);
        if (data) {
          setAllotment(data);
        }
      }
    };
    fetchAllotment();
  }, [id]);

  useEffect(() => {
    if (allotment) {
      let sum = 0;
      allotment.items.forEach((i) => {
        sum += i.item_price * i.item_quantity;
      });
      setTotal(sum);
    }
  }, [allotment]);

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

  if (allotment) {
    return (
      <div className="container-docket">
        <div className="header-docket">
          <div className="logo-docket">
            <img src={`${process.env.PUBLIC_URL}/home-logo.png`} alt="Yantraksh" />
          </div>
          <div className="heading-docket">
            <Title level={2} style={{fontWeight: 'bold'}}>
              PURCHASE ORDER
              <br />
              {`#${allotment.po_number}`}
            </Title>
          </div>
        </div>
        <hr />
        <Row>
          <Col>
            <p>
              <strong>YANTRAKSH LOGISTICS PRIVATE LIMITED</strong>
              <br />
              11 Rama Twins
              <br />
              Mission Road
              <br />
              Anand Gujarat
              <br />
              388325
              <br />
              India
              <br />
              GSTIN: {allotment.gst}
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          {allotment.material_vendor && (
            <Col span={17}>
              <p>
                Vendor Address
                <br />
                <strong>{allotment.material_vendor.name}</strong>
                <br />
                {allotment.material_vendor.street.split(',').map((s) => {
                  return (
                    <>
                      {s.trim()} <br />
                    </>
                  );
                })}
                {allotment.material_vendor.pincode}
                {allotment.material_vendor.city}
                <br />
                {allotment.material_vendor.state}
                <br />
                India
                <br />
              </p>
            </Col>
          )}
          {allotment.delivered_to && (
            <Col>
              <p>
                Delivered to
                <br />
                <strong>{allotment.delivered_to.name}</strong>
                <br />
                {allotment.delivered_to.address.split(',').map((s) => {
                  return (
                    <>
                      {s.trim()} <br />
                    </>
                  );
                })}
                {allotment.delivered_to.pincode}
                {allotment.delivered_to.city}
                <br />
                {allotment.delivered_to.state}
                <br />
                India
                <br />
              </p>
            </Col>
          )}
        </Row>
        <br />
        <Row align="end">
          <Col span={7}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Data: </p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Delivery Date:</p>
              <p>{`${allotment.expected_delivery.split('T')[0].split('-')[2]}/${
                allotment.expected_delivery.split('T')[0].split('-')[1]
              }/${allotment.expected_delivery.split('T')[0].split('-')[0]}`}</p>
            </div>
          </Col>
        </Row>
        )}
        <br />
        <Row>
          <Table bordered size="sm">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Item & Description</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {allotment.items.map((item) => {
                if (item.item_quantity > 0) {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>
                        {item.item.name} - {item.item.description}
                      </td>
                      <td>{item.item_price}</td>
                      <td>{item.item_quantity}</td>
                      <td>{item.item_quantity * item.item_price}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={7}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>Sub Total: </p>
              <p>{total}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <p>IGST (18%): </p>
              <p>{(total * parseInt(allotment.billing_gst)) / 100}</p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <strong>Total: </strong>
              <strong>{total + (total * parseInt(allotment.billing_gst)) / 100}</strong>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col span={23}>
            <h4>Terms & Conditions</h4>
            <ol>
              <li>
                elivery Period: All the material must be delivered from your works within 1 week
                from the date of Purchase Order.
              </li>
              <li>P & F Charges: Included within the price.</li>
              <li>Payment Terms: 30 Days from Invoice submission through NEFT or Cheque</li>
              <li>
                Inspection & Testing: Inspection and quality check to be carried out by Yantraksh
                designated executive during material Dispatch.
              </li>
              <li>Statutory Requirements: NA</li>
            </ol>
            <br />
            <p>Authorized Signature _________________________________</p>
          </Col>
        </Row>
      </div>
    );
  }

  return <Spin spinning style={{position: 'absolute', marginLeft: '49vw', marginTop: '49vh'}} />;
};

export default Docket;
