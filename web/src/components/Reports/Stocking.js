import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {Row, Col, Form, Button, Typography} from 'antd';
import {FORM_ELEMENT_TYPES} from '../../constants/formFields.constant';
import _ from 'lodash';

import formItem from '../../hocs/formItem.hoc';

const {Title} = Typography;
const StockingReport = ({currentPage}) => {
  const [client, setClient] = useState('');
  const [kit, setKit] = useState('');
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [form] = Form.useForm();

  const {data: clients} = useAPI('/clients/', {});
  const {data: kits} = useAPI('/kits/', {});
  const [selectedClientID, setSelectedClientID] = useState(null);
  const [selectedKits, setSelectedKits] = useState([]);
  const [selectAllKits, setSelectAllKits] = useState(false);
  const [selectAllClients, setSelectAllClients] = useState(false);

  useEffect(() => {
    if (selectedClientID) {
      try {
        setSelectedKits(_.filter(kits, (k) => k.kit_client.user === selectedClientID));
      } catch (err) {
        setSelectedKits([]);
      }
    }
  }, [selectedClientID]);

  const onChange = async () => {
    const tempFrom = moment(form.getFieldValue('dateFrom')).format('YYYY-MM-DD+HH:MM');
    const tempTo = moment(form.getFieldValue('dateTo')).format('YYYY-MM-DD+HH:MM');
    setToDate(tempTo);
    setFromDate(tempFrom);
    setClient(form.getFieldValue('cname'));
    if (!selectAllKits) {
      setKit(form.getFieldValue('kit'));
    } else {
      setKit('0');
    }
  };

  return (
    <>
      <Title level={3}>Floating Reports</Title>
      <Form
        onFieldsChange={onChange}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        <Row gutter={10}>
          <Col span={2}>
            {formItem({
              key: 'select_all_clients',
              kwargs: {
                onChange: (val) => {
                  setSelectAllClients(val);
                },
              },
              type: FORM_ELEMENT_TYPES.SWITCH,
              customLabel: 'All Clients',
            })}
          </Col>
          {!selectAllClients ? (
            <Col span={10}>
              {formItem({
                key: 'cname',
                kwargs: {
                  placeholder: 'Select',
                  onChange: (val) => {
                    setSelectedClientID(val);
                  },
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
          ) : null}
        </Row>

        {!selectAllClients ? (
          selectedKits.length > 0 ? (
            <Row gutter={10}>
              <Col span={2}>
                {formItem({
                  key: 'select_all_kits',
                  kwargs: {
                    onChange: (val) => {
                      setSelectAllKits(val);
                    },
                  },
                  type: FORM_ELEMENT_TYPES.SWITCH,
                  customLabel: 'All Kits',
                })}
              </Col>
              {!selectAllKits ? (
                <Col span={8}>
                  {formItem({
                    key: 'kit',
                    kwargs: {
                      placeholder: 'Select',
                    },
                    others: {
                      selectOptions: selectedKits || [],
                      key: 'kit_name',
                      dataKeys: ['kit_info', 'components_per_kit'],
                      customTitle: 'kit_name',
                    },
                    type: FORM_ELEMENT_TYPES.SELECT,
                    customLabel: 'Kit',
                  })}
                </Col>
              ) : null}
            </Row>
          ) : null
        ) : null}

        <Row gutter={10}>
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
        </Row>
        <Row>
          <Button
            href={
              !selectAllClients
                ? !selectAllKits
                  ? `${DEFAULT_BASE_URL}/floating-report/?to=${toDate}&from=${fromDate}&cname=${client}&kit=${kit}`
                  : `${DEFAULT_BASE_URL}/floating-report/?to=${toDate}&from=${fromDate}&cname=${client}`
                : `${DEFAULT_BASE_URL}/floating-report/?to=${toDate}&from=${fromDate}&cname=${'all'}`
            }
            rel="noopener noreferrer"
            target="blank">
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
