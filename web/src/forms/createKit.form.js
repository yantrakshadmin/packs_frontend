import React from 'react';
import {Form, Col, Row, Button, Divider, Spin, Typography} from 'antd';
import {formItem} from '../hocs/formItem.hoc';
import {kitFormFields} from 'common/formFields/kit.formFields';
import {kitProductsFormFields} from 'common/formFields/kitProducts.formFields';
// import {useAPI} from '@app/common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createKit, retrieveKit, editKit} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';

const {Text} = Typography;

export const KitForm = ({id, onCancel, onDone}) => {
  //   const [items, setItems] = useState([]);
  const {form, submit, loading} = useHandleForm({
    create: createKit,
    edit: editKit,
    retrieve: retrieveKit,
    success: 'Product created/edited successfully.',
    failure: 'Error in creating/editing product.',
    done: onDone,
    close: onCancel,
    id,
  });

  //   const others = {selectOptions: categoryOptions};
  //   console.log(others);
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Kit Details</Divider>
      <Form
        onFinish={submit}
        form={form}
        layout="vertical"
        // onFieldsChange={()=>{setItems(form.getFieldsValue(['packages']).packages);}}
        hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {kitFormFields.slice(0, 2).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {kitFormFields.slice(2, 4).map((item, idx) => (
            <Col span={12}>
              <div key={idx} className="p-2">
                {formItem({...item})}
              </div>
            </Col>
          ))}
        </Row>
        <Divider orientation="left">Products Details</Divider>

        <Form.List name="products">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field) => (
                  <Row align="middle">
                    {kitProductsFormFields.slice(0, 2).map((item) => (
                      <Col span={8}>
                        <div className="p-2">
                          {formItem({
                            ...item,
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
