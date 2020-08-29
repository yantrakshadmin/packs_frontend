import React, {useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import formItem from '../hocs/formItem.hoc';
import {leadsFormFields, leadsContactFormFields} from 'common/formFields/leads.formFields';
import {useHandleForm} from 'hooks/form';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {editLead, retrieveLead, createLead} from 'common/api/auth';

export const LeadsForm = ({id, onCancel, onDone}) => {
  //   const [reqFile, setFile] = useState(null);

  const {form, submit, loading} = useHandleForm({
    create: createLead,
    edit: editLead,
    retrieve: retrieveLead,
    success: 'Lead created/edited successfully.',
    failure: 'Error in creating/editing lead.',
    done: onDone,
    close: onCancel,
    id,
  });

  //   const preProcess = (data) => {
  //     if (reqFile) {
  //       data.annexure = reqFile.originFileObj;
  //     } else delete data['annexure'];
  //     const req = new FormData();
  //     for (var key in data) {
  //       req.append(key.toString(), data[key]);
  //     }
  //     submit(req);
  //   };

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Lead Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        // onFieldsChange={handleFieldsChange}
      >
        {/* <Row align="center">
          <Col span={24}>{formItem(leadsFormFields[0])}</Col>
        </Row> */}
        <Row style={{justifyContent: 'left'}}>
          {leadsFormFields.slice(0, 4).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {leadsFormFields.slice(4, 8).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {leadsFormFields.slice(8, 10).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        {/* <Row align="center">
          {formItem({
            ...leadsFormFields[20],
            kwargs: {
              onChange(info) {
                const {status} = info.file;
                if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                  setFile(info.file);
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              },
            },
          })}
        </Row> */}
        <Divider orientation="left">Contact Details</Divider>

        <Form.List name="contact">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {leadsContactFormFields.slice(0, 2).map((item) => (
                      <Col span={10}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
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
                    <Button
                      type="danger"
                      style={index != 0 ? {top: '-2vh'} : null}
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <MinusCircleOutlined /> Delete
                    </Button>
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block>
                    <PlusOutlined /> Add Item
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
        <Row>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <div className="p-2" />
          <Button type="primary" onClick={onDone}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
