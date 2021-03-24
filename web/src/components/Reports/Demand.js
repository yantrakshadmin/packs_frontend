import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import {Row, Col, Form, Button, Typography, notification} from 'antd';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import _ from 'lodash';

import formItem from '../../hocs/formItem.hoc';

const {Title} = Typography;
const StockingReport = ({currentPage}) => {
  const [client, setClient] = useState('');
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [form] = Form.useForm();

  const [btnLoading, setBtnLoading] = useState(false);

  const {data: clients} = useAPI('/clients/', {});

  const onChange = async () => {
    const tempFrom = moment(form.getFieldValue('dateFrom'))
      .startOf('date')
      .format('YYYY-MM-DD+HH:MM');
    const tempTo = moment(form.getFieldValue('dateTo')).endOf('date').format('YYYY-MM-DD+HH:MM');
    setToDate(tempTo);
    setFromDate(tempFrom);
    setClient(form.getFieldValue('cname'));
  };

  return (
    <>
      <Title level={3}>Volume Plan Reports</Title>
      <Form
        onFieldsChange={onChange}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        <Row gutter={10}>
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

        {/* <Row gutter={10}>
          <Col span={4}>
            {formItem({
              key: 'dateFrom',
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
          <Col span={4}>
            {formItem({
              key: 'dateTo',
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
        </Row> */}
        <Row>
          <Button
            //href={`${DEFAULT_BASE_URL}/demandvallot-report/?cname=${client}`}
            onClick={async () => {
              await setBtnLoading(true);
              const d = await loadAPI(`/demandvallot-report/?cname=${client}`);
              if (d.status === 403) {
                notification.error({
                  message: 'Access Denied',
                  description: 'You do not have permissions to access this module.',
                });
              } else {
                let hiddenElement = document.createElement('a');
                hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(d.data);
                hiddenElement.target = '_blank';
                hiddenElement.download = 'vp-report.csv';
                hiddenElement.click();
              }
              setBtnLoading(false);
            }}
            rel="noopener noreferrer"
            target="blank"
            loading={btnLoading}>
            Download CSV
          </Button>
        </Row>
      </Form>
      <br />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(StockingReport);
