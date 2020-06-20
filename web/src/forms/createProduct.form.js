import React from 'react';
import {Form, Col, Row, Button, Divider, Spin} from 'antd';
import {formItem} from '../hocs/formItem.hoc';
import {productFormFields} from 'common/formFields/product.formFields';
import {categoryOptions} from 'common/formFields/categoryOptions';

// import {useAPI} from '@app/common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createProduct, retrieveProduct, editProduct} from 'common/api/auth';
// import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

export const ProductForm = ({id, onCancel, onDone}) => {
  //   const [items, setItems] = useState([]);
  const {form, submit, loading} = useHandleForm({
    create: createProduct,
    edit: editProduct,
    retrieve: retrieveProduct,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
    done: onDone,
    close: onCancel,
    id,
  });

  const others = {selectOptions: categoryOptions};
  console.log(others);
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Product Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout="vertical"
        // onFieldsChange={()=>{setItems(form.getFieldsValue(['packages']).packages);}}
        hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {productFormFields.slice(0, 3).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item.key, item.rules, item.kwargs, item.type, item.label)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {productFormFields.slice(3, 6).map((item, idx) => (
            <Col span={8}>
              <div key={idx} className="p-2">
                {formItem(item.key, item.rules, item.kwargs, item.type, others, item.label)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {productFormFields.slice(6, 11).map((item, idx) => (
            <Col span={4}>
              <div key={idx} className="p-2">
                {formItem(item.key, item.rules, item.kwargs, item.type, item.label)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'space-between'}}>
          {productFormFields.slice(11, 14).map((item, idx) => (
            <Col span={4}>
              <div key={idx} className="p-2">
                {formItem(item.key, item.rules, item.kwargs, item.type, item.label)}
              </div>
            </Col>
          ))}
          <Col span={4}></Col> <Col span={4}></Col>
        </Row>
        {/* <Divider orientation="left">Items Details</Divider> */}

        {/* <Form.List name="packages">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    <Col span={7}>
                      {salesOrderItemFormField.slice(0, 1).map((item) => (
                        <div className="p-2">
                          {formItem(
                            item.key,
                            item.rules,
                            item.kwargs,
                            item.type,
                            {
                              ...item.others,
                              formOptions: {
                                ...field,
                                name: [field.name, 'prod_name'],
                                fieldKey: [field.fieldKey, 'prod_name'],
                              },
                            },
                            item.label,
                          )}
                        </div>
                      ))}
                    </Col>
                    {salesOrderItemFormField.slice(1, 2).map((item) => (
                      <Col span={2}>
                        <div className="p-2">
                          {formItem(
                            item.key,
                            item.rules,
                            item.kwargs,
                            item.type,
                            {
                              ...item.others,
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                            item.label,
                          )}
                        </div>
                      </Col>
                    ))}
                    {salesOrderItemFormField.slice(2, 3).map((item) => (
                      <Col span={4}>
                        <div className="p-2">
                          {formItem(
                            item.key,
                            item.rules,
                            item.kwargs,
                            item.type,
                            {
                              ...item.others,
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                            item.label,
                          )}
                        </div>
                      </Col>
                    ))}
                    {salesOrderItemFormField.slice(3, 7).map((item) => (
                      <Col span={2}>
                        <div className="p-2">
                          {formItem(
                            item.key,
                            item.rules,
                            item.kwargs,
                            item.type,
                            {
                              ...item.others,
                              formOptions: {
                                ...field,
                                name: [field.name, item.key],
                                fieldKey: [field.fieldKey, item.key],
                              },
                            },
                            item.label,
                          )}
                        </div>
                      </Col>
                    ))}
                    <Button
                      type="danger"
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
        </Form.List> */}
        {/* {error ? (
          <Row align="top">
            <Col>
              <div className="p-2">
                <Text type="danger">{error}</Text>
              </div>
            </Col>
          </Row>
        ) : null} */}
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
