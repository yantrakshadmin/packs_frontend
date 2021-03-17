import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {adjustmentClientEnvFormFields} from 'common/formFields/adjustmentInventory.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createClientAdjustment} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const AdjustmentClientForm = (props) => {
  const [selectedClientID, setSelectedClientID] = useState(null);
  const [selectedKits, setSelectedKits] = useState([]);

  useEffect(() => {
    if (selectedClientID) {
      try {
        setSelectedKits(_.filter(props.kits, (k) => k.kit_client.user === selectedClientID));
      } catch (err) {
        setSelectedKits([]);
      }
    }
  }, [selectedClientID]);

  const {form, submit, loading} = useHandleForm({
    create: createClientAdjustment,
    success: 'Client Adjustment created successfully',
    failure: 'Error in creating Client Adjustment.',
    close: () => {},
    done: () => {
      form.setFieldsValue({
        client: null,
        kit: null,
        quantity: null,
      });
      props.reload();
    },
  });

  const preProcess = (data) => {
    submit(data);
  };

  const handleFieldsChange = useCallback((data) => {
    if (data[0]) {
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {adjustmentClientEnvFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                    onChange: (val) => {
                      setSelectedClientID(val);
                    },
                  },
                  others: {
                    ...item.others,
                    selectOptions: filterActive(_, props.clients) || [],
                    key: 'user',
                    customTitle: 'client_name',
                    dataKeys: ['client_shipping_address'],
                    searchKeys: ['client_shipping_address'],
                  },
                })}
              </div>
            </Col>
          ))}
          {adjustmentClientEnvFormFields.slice(1, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                    onChange: (val) => {
                      setSelectedClientID(val);
                    },
                  },
                  others: {
                    ...item.others,
                    selectOptions: filterActive(_, selectedKits) || [],
                    key: 'id',
                    customTitle: 'kit_name',
                    dataKeys: ['kit_info', 'components_per_kit'],
                    searchKeys: ['kit_info', 'components_per_kit'],
                  },
                })}
              </div>
            </Col>
          ))}
          {adjustmentClientEnvFormFields.slice(2, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={2}>
            <Button style={{marginTop: '39px'}} type="primary" htmlType="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
