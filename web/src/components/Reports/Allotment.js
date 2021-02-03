import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {Row, Col, Form, Button} from 'antd';
import {retrieveAllotmentReport, retrieveClients} from 'common/api/auth';
import allotmentColumns from 'common/columns/AllotmentReport.column';
import {AllotFlowTable} from 'components/AllotFlowExp';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';

import formItem from '../../hocs/formItem.hoc';

const AllotmentReport = ({currentPage}) => {
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [reqAllotments, setReqAllotments] = useState(null);
  const [client, setClient] = useState('');
  const [clientName, setClientName] = useState(null);
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [form] = Form.useForm();

  const {data: clients} = useAPI('/clients/', {});

  const onSubmit = async (data) => {
    setLoading(true);
    if (!data.cname) {
      data.cname = '';
      setClient(data.cname);
    } else {
      setClient(data.cname);
      let reqC = null;
      const {data: clients} = await retrieveClients();
      clients.forEach((c) => {
        if (c.user === data.cname) reqC = c.client_name;
      });
      setClientName(reqC);
    }
    data.to = moment(data.to).format('YYYY-MM-DD HH:MM');
    data.from = moment(data.from).format('YYYY-MM-DD HH:MM');
    setTo(data.to);
    setFrom(data.from);
    const {data: report} = await retrieveAllotmentReport(data);
    if (report) {
      console.log(report);
      setLoading(false);
      setReportData(report);
    }
  };

  useEffect(() => {
    if (reportData) {
      const reqD = reportData.map((alt) => ({
        id: alt.id,
        owner: alt.owner,
        vehicle_type: alt.vehicle_type,
        transaction_no: alt.transaction_no,
        dispatch_date: alt.dispatch_date,
        material_request_id: alt.sales_order,
        warehouse_name: alt.send_from_warehouse,
        flows: alt.flows,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
      }));
      setReqAllotments(reqD);
    }
  }, [reportData]);

  useEffect(() => {
    if (reqAllotments) {
      const csvd = [];
      reqAllotments.forEach((d) => {
        const temp = {...d, is_delivered: [d.is_delivered ? 'Yes' : 'No']};
        delete temp.flows;
        csvd.push(temp);
        d.flows.forEach((f) => {
          const kit = f.kit.kit_name;
          const aq = f.alloted_quantity;
          // let s = '';
          // for (let i = 1; i <= aq; i++) {
          //   s += `${d.transaction_no}-${kit}-${i}, `;
          // }
          // s = s.slice(0, -2);
          const temp1 = {
            ...f,
            kit: f.kit.kit_name,
            // 'kits assigned': s
          };
          csvd.push(temp1);
          f.kit.products.forEach((p) => {
            const temp2 = {...p, quantity: p.quantity * aq};
            csvd.push(temp2);
          });
        });
      });
      setCsvData(csvd);
    }
  }, [reqAllotments]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...allotmentColumns,
  ];

  const tabs = [
    {
      name: 'Allotment Dockets',
      key: 'Allotment Dockets',
      data: reqAllotments || [],
      columns,
      loading,
    },
  ];

  return (
    <>
      <Form onFinish={onSubmit} form={form} layout="vertical" hideRequiredMark autoComplete="off">
        <Row>
          <Col span={10}>
            {formItem({
              key: 'cname',
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
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            {formItem({
              key: 'from',
              rules: [{required: true, message: 'Please select From date!'}],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'From',
            })}
          </Col>
          <Col span={4} />
          <Col span={3}>
            {formItem({
              key: 'to',
              rules: [{required: true, message: 'Please select To date!'}],
              kwargs: {
                placeholder: 'Select',
                type: 'number',
              },
              type: FORM_ELEMENT_TYPES.DATE,
              others: null,
              customLabel: 'To',
            })}
          </Col>
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
      <br />
      <TableWithTabHoc
        tabs={tabs}
        size="middle"
        title="Allotment Dockets"
        hideRightButton
        downloadLink={`${DEFAULT_BASE_URL}/allotment-reportsdownload/?cname=${client}&to=${to}&from=${from}`}
        downloadLink2={`${DEFAULT_BASE_URL}/billing-annexure/?id=${client}&to=${to}&from=${from}`}
        rowKey="id"
        expandHandleKey="flows"
        ExpandBody={AllotFlowTable}
        expandParams={{loading}}
        // csvdata={csvData}
        // csvname={'Allotments' + clientName + '.csv'}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentReport);
