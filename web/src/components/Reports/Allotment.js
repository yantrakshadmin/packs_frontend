import React, {useState} from 'react';
import formItem from '../../hocs/formItem.hoc';
import {connect} from 'react-redux';
import moment from 'moment';
import {useAPI} from 'common/hooks/api';
import {Row, Col, Form, Button} from 'antd';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import {retrieveAllotmentReport} from 'common/api/auth';
import allotmentColumns from 'common/columns/Allotment.column';
import TableWithTabHoc from 'hocs/TableWithTab.hoc';
import {useEffect} from 'react';

const AllotmentReport = ({currentPage}) => {
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reqAllotments, setReqAllotments] = useState(null);
  const [form] = Form.useForm();

  const {data: clients} = useAPI('/clients/', {});

  const onSubmit = async (data) => {
    setLoading(true);
    data['to'] = moment(data['to']).format('DD-MM-YYYY');
    data['from'] = moment(data['from']).format('DD-MM-YYYY');
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
        transaction_no: alt.transaction_no,
        parent_name: alt.sales_order.owner.first_name + ' ' + alt.sales_order.owner.last_name,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse.name,
        model: alt.model,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by.name,
        is_delivered: alt.is_delivered,
      }));
      setReqAllotments(reqD);
    }
  }, [reportData]);

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
        csvdata={reqAllotments}
        csvname="Allotments.csv"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentReport);
