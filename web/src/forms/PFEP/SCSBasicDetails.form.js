import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {ArrowRightOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
  SCSBasicDetailsFormFields,
  SCSProductDetailsFormFields,
} from 'common/formFields/PFEP/SCSBasicDetails.formFields';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PFEP_BASIC_DATA, ADD_PFEP_DATA, STOP_STEP_LOADING} from 'common/actions';
import moment from 'moment';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';

const SCSBasicDetailsForm = ({id, onCancel, lead, onNext, active}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.pfepData);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({
      type: ADD_PFEP_DATA,
      data: {...data, lead_no: lead},
    });
    setLoading(false);
    if (active === 0) {
      onNext();
    }
  };

  useEffect(() => {
    if (active !== 0) {
      form.submit();
      dispatch({type: STOP_STEP_LOADING});
    }
  }, [active]);

  return (
    <Spin spinning={loading}>
      <Form
        initialValues={{...state, date: state.date ? moment(state.date) : null}}
        onFinish={submit}
        form={form}
        layout="vertical"
        // hideRequiredMark
        autoComplete="off">
        <Divider orientation="left">Basic Details</Divider>
        <Row style={{justifyContent: 'left'}}>
          {SCSBasicDetailsFormFields.slice(0, 1).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {SCSBasicDetailsFormFields.slice(1, 5).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Part Details</Divider>
        <Row style={{justifyContent: 'left'}}>
          {SCSProductDetailsFormFields.map((item, idx) => (
            <Col span={8}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={6}>
            <div className="p-2">
              {formItem({
                key: 'fileA',
                type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
                customLabel: 'Upload Files',
                //rules: [{required: id ? false : true, message: 'Please upload Files!'}],
                kwargs: {
                  placeholder: 'Upload',
                  multiple: true,
                  onChange(info) {
                    const {fileList} = info;
                    console.log(fileList);
                    fileList.forEach((f) => {
                      if (f.status === 'error') {
                        message.error(`${f.name} file upload failed.`);
                      }
                    });
                  },
                },
              })}
            </div>
          </Col>
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

export default SCSBasicDetailsForm;
