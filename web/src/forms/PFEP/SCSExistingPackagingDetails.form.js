import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PFEP_DATA, STOP_STEP_LOADING} from 'common/actions';
import {
  Row01FF,
  Row02FF,
  Row03FF,
} from 'common/formFields/PFEP/SCSExistingPackagingDetails.formFields';
import {ArrowRightOutlined, PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {FORM_ELEMENT_TYPES} from 'constants/formFields.constant';

export const PFEPProductDetailsForm = ({id, onCancel, active, onNext}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.pfepData);

  const [newPack, setNewPack] = useState(false);
  const [innerPart, setInnerPart] = useState(false);

  useEffect(() => {
    if (state.new_packaging) {
      setNewPack(state.new_packaging);
    }
    if (state.inner_partition) {
      setInnerPart(state.inner_partition);
    }
  }, []);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({type: ADD_PFEP_DATA, data});
    setLoading(false);
    if (active === 2) {
      onNext();
    }
  };
  useEffect(() => {
    if (active !== 2) {
      form.submit();
      dispatch({type: STOP_STEP_LOADING});
    }
  }, [active]);
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Packaging Details</Divider>
      <Form
        onFinish={submit}
        initialValues={{
          ...state,
          current_packaging: state.current_packaging ? state.current_packaging : 'Returnable',
        }}
        form={form}
        layout="vertical"
        // hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {Row01FF.slice(0, 1).map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem({
                  ...item,
                  kwargs: {
                    ...item.kwargs,
                    onChange: (v) => {
                      setNewPack(v);
                    },
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        {!newPack ? (
          <>
            <Row style={{justifyContent: 'left'}}>
              {Row02FF.slice(0, 1).map((item, idx) => (
                <Col span={6}>
                  <div key={idx.toString()} className="p-2">
                    {formItem({
                      ...item,
                      kwargs: {
                        ...item.kwargs,
                        onChange: (v) => {
                          setInnerPart(v);
                        },
                      },
                    })}
                  </div>
                </Col>
              ))}
            </Row>
            {innerPart ? (
              <Form.List name="insert_types">
                {(fields, {add, remove}) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Row align="middle">
                          <Col span={3}>
                            <Button
                              type="danger"
                              style={index !== 0 ? {top: '-2vh'} : null}
                              block
                              disabled>
                              {`Insert Type ${index + 1}`}
                            </Button>
                          </Col>
                          {Row02FF.slice(1).map((item) => (
                            <Col span={item.colSpan}>
                              <div className="p-2">
                                {formItem({
                                  ...item,
                                  noLabel: index !== 0,
                                  form,
                                  others: {
                                    formOptions: {
                                      ...field,
                                      name: [field.name, item.key],
                                      fieldKey: [field.fieldKey, item.key],
                                    },
                                  },
                                })}
                              </div>
                            </Col>
                          ))}
                          <Col span={1}>
                            <Button
                              type="danger"
                              style={index !== 0 ? {top: '-2vh'} : null}
                              onClick={() => {
                                remove(field.name);
                              }}
                              block>
                              <MinusCircleOutlined />
                            </Button>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                          }}
                          block>
                          <PlusOutlined /> Add Insert Type
                        </Button>
                      </Form.Item>
                    </div>
                  );
                }}
              </Form.List>
            ) : null}

            <Divider orientation="left" />

            <Row style={{justifyContent: 'left'}}>
              {Row01FF.slice(1, 2).map((item, idx) => (
                <Col span={6}>
                  <div key={idx.toString()} className="p-2">
                    {formItem(item)}
                  </div>
                </Col>
              ))}
              {Row03FF.map((item, idx) => (
                <Col span={6}>
                  <div key={idx.toString()} className="p-2">
                    {formItem(item)}
                  </div>
                </Col>
              ))}
              <Col span={6}>
                <div className="p-2">
                  {formItem({
                    key: 'fileB',
                    type: FORM_ELEMENT_TYPES.FILE_DRAG_DROP,
                    customLabel: 'Upload Files',
                    //rules: [{required: id ? false : true, message: 'Please upload Files!'}],
                    kwargs: {
                      placeholder: 'Upload',
                      multiple: true,
                      onChange(info) {
                        const {fileList} = info;
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
          </>
        ) : null}

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

export default PFEPProductDetailsForm;
