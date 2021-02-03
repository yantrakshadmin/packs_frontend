import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {receiverFormFields} from 'common/formFields/Receiver.formFields.js';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createReceiverClient, editReceiverClient, retrieveReceiverClient} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const ReceiverForm = ({id, onCancel, onDone}) => {
  const {data} = useAPI('/clients/');

  const {form, submit, loading} = useHandleForm({
    create: createReceiverClient,
    edit: editReceiverClient,
    retrieve: retrieveReceiverClient,
    success: 'Receiver Client created/edited successfully.',
    failure: 'Error in creating/editing receiver client.',
    done: onDone,
    close: onCancel,
    id,
  });

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Receiver Client Details</Divider>
      <Form
        initialValues={{active: true}}
        onFinish={submit}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {receiverFormFields.slice(0, 2).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {receiverFormFields.slice(2, 3).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {receiverFormFields.slice(3, 4).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    selectOptions: filterActive(_, data) || [],
                    key: 'user',
                    customTitle: 'client_name',
                    dataKeys: ['client_shipping_address'],
                  },
                  kwargs: {
                    placeholder: 'Select',
                    type: 'number',
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {receiverFormFields.slice(4, 7).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
