import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_CREATE_CP_DATA, STOP_STEP_LOADING} from 'common/actions';
import {basicDetailCreateCPFormFields} from 'common/formFields/createCP/basicDetailsCreateCP.formFields';

import _ from 'lodash';

export const BasicDetailsCreateCPForm = ({id, onCancel, scsData, onNext, active}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.createCPData);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({type: ADD_CREATE_CP_DATA, data: {...data}});
    setLoading(false);
    if (active === 0) {
      onNext();
    }
  };

  const handleFieldsChange = useCallback(
    (data) => {
      if (data[0]) {
        if (data[0].name) {
          const currentInputField = data[0].name[0];
          console.log(currentInputField);

          if (currentInputField === 'sender_client') {
            const temp = _.find(
              scsData.sks,
              (i) => `${i.sender} - ${i.receiver}` === data[0].value,
            );
            form.setFieldsValue({
              volume_pm: temp.peak_volume,
              yantra_cycle: temp.total_cycle_time,
            });
          }

          if (form.getFieldValue('volume_pm') && form.getFieldValue('component_perkit')) {
            form.setFieldsValue({
              kit_pm: _.ceil(
                form.getFieldValue('volume_pm') / form.getFieldValue('component_perkit'),
              ),
            });
          } else {
            form.setFieldsValue({
              kit_pm: 0,
            });
          }

          if (form.getFieldValue('yantra_cycle')) {
            form.setFieldsValue({
              kit_usage_ratio: _.round(30 / form.getFieldValue('yantra_cycle'), 2),
            });
          } else {
            form.setFieldsValue({
              kit_usage_ratio: 0,
            });
          }

          if (
            form.getFieldValue('kit_pm') &&
            form.getFieldValue('kit_usage_ratio') &&
            form.getFieldValue('buffer')
          ) {
            form.setFieldsValue({
              kit_based_on_usage_ratio: _.ceil(
                (form.getFieldValue('kit_pm') / form.getFieldValue('kit_usage_ratio')) *
                  (1 + parseInt(form.getFieldValue('buffer')) / 100),
              ),
            });
          } else {
            form.setFieldsValue({
              kit_based_on_usage_ratio: 0,
            });
          }
        }
      }
    },
    [form, scsData],
  );

  useEffect(() => {
    if (active !== 0) {
      form.submit();
      dispatch({type: STOP_STEP_LOADING});
    }
  }, [active]);

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={{...state}}
        onFinish={submit}
        form={form}
        layout="vertical"
        onFieldsChange={handleFieldsChange}
        // hideRequiredMark
        autoComplete="off">
        <Divider orientation="left">Basic Details</Divider>
        <Row style={{justifyContent: 'left'}}>
          {basicDetailCreateCPFormFields.slice(0, 1).map((item, idx) => (
            <Col span={24}>
              <div key={idx.toString()} className="p-2">
                {formItem({
                  ...item,
                  customLabel: 'Sender - Receiver',
                  kwargs: {
                    ...item.kwargs,
                    showSearch: true,
                    filterOption: (input, option) =>
                      option.search.toLowerCase().indexOf(input.toLowerCase()) >= 0,
                  },
                  others: {
                    selectOptions: scsData.sks
                      ? scsData.sks.map((i) => ({...i, new_id: `${i.sender} - ${i.receiver}`}))
                      : [],
                    key: 'new_id',
                    customTitle: 'new_id',
                  },
                })}
              </div>
            </Col>
          ))}
          {/* {basicDetailCreateCPFormFields.slice(2, 3).map((item, idx) => (
            <Col span={12}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))} */}
        </Row>
        <Divider orientation="left">Part Details</Divider>
        <Row style={{justifyContent: 'left'}}>
          {basicDetailCreateCPFormFields.slice(4, 14).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row justify="space-between">
          <div className="row">
            <Button type="primary" htmlType="submit" disabled>
              Submit
            </Button>
            <div className="p-2" />
            <Button type="primary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          <Button type="link" htmlType="submit">
            <ArrowRightOutlined style={{fontSize: 30}} />
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default BasicDetailsCreateCPForm;
