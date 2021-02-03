import React, {useState} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message} from 'antd';
import {productFormFields} from 'common/formFields/product.formFields';
import {categoryOptions} from 'common/formFields/categoryOptions';

import {useHandleForm} from 'hooks/form';
import {createProduct, retrieveProduct, editProduct} from 'common/api/auth';
import formItem from '../hocs/formItem.hoc';

export const ProductForm = ({id, onCancel, onDone}) => {
  const [reqFile, setFile] = useState(null);

  const {form, submit, loading} = useHandleForm({
    create: createProduct,
    edit: editProduct,
    retrieve: retrieveProduct,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
    done: onDone,
    close: onCancel,
    id,
    document: true,
  });

  const preProcess = (data) => {
    if (reqFile) {
      data.document = reqFile.originFileObj;
    } else delete data.document;
    const req = new FormData();
    for (const key in data) {
      req.append(key.toString(), data[key]);
    }
    submit(req);
  };

  const others = {selectOptions: categoryOptions};
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Product Details</Divider>
      <Form
        initialValues={{active: true}}
        onFinish={preProcess}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {productFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {productFormFields.slice(3, 6).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem({...item, others})}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {productFormFields.slice(6, 10).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {productFormFields.slice(10, 14).map((item, idx) => (
            <Col span={6}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={6} />
        </Row>
        <Row justify="center">
          <Col span={24} style={{justifyContent: 'center', display: 'flex'}}>
            <div key={13} className="p-2">
              {formItem({
                ...productFormFields[14],
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
            </div>
          </Col>
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
