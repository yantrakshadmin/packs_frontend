import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message, Alert} from 'antd';
import {
  relocationFormFields,
  relocationFlowFormFields,
} from 'common/formFields/relocation.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createRelocation, editRelocation, retrieveRelocation} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';

import {ifNanReturnZero} from 'common/helpers/mrHelper';

import moment from 'moment';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const RelocationForm = ({id, onCancel, onDone, isEmployee}) => {
  // const [flowId, setFlowId] = useState(null);

  // const {data: flows} = useAPI('/myflows/', {});
  // const {data: kits} = useControlledSelect(flowId);
  const {data: vendors} = useAPI('/vendors-exp/', {});
  const {data: products} = useAPI('/products/', {});
  const {data: warehouses} = useAPI('/warehouse/', {});

  const {form, submit, loading} = useHandleForm({
    create: createRelocation,
    edit: editRelocation,
    retrieve: retrieveRelocation,
    success: 'Relocation created/edited successfully',
    failure: 'Error in creating/editing Relocation.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['transaction_date'],
  });

  useEffect(() => {
    if (id && !loading) {
    }
  }, [loading]);

  const preProcess = useCallback(
    (data) => {
      submit(data);
    },
    [submit],
  );

  const handleFieldsChange = useCallback((data) => {
    if (data[0]) {
      if (data[0].name) {
        const thisField = data[0].name[0];
        console.log(thisField);
      }
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Expense Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{status: 'Hold', gst: 0}}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {relocationFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(1, 3).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: filterActive(_, warehouses) || [],
                    key: 'id',
                    dataKeys: ['address'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(3, 4).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    selectOptions: filterActive(_, vendors) || [],
                    key: 'id',
                    dataKeys: ['code'],
                    customTitle: 'name',
                  },
                })}
              </div>
            </Col>
          ))}
          {relocationFormFields.slice(4, 7).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}

          {relocationFormFields.slice(8).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Products Details</Divider>

        <Form.List name="items">
          {(fields, {add, remove}) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Row align="middle">
                    {relocationFlowFormFields.slice(0, 1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
                        <div className="p-2">
                          {formItem({
                            ...item,
                            noLabel: index != 0,
                            kwargs: {
                              ...item.kwargs,
                              showSearch: true,
                              filterOption: (input, option) =>
                                option.search
                                  .toString()
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0,
                            },
                            others: {
                              ...item.others,
                              selectOptions: filterActive(_, products) || [],
                              key: 'id',
                              customTitle: 'short_code',
                              dataKeys: ['description'],
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
                    {relocationFlowFormFields.slice(1).map((item, idx) => (
                      <Col key={idx} span={item.colSpan}>
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
                    <Col span={2}>
                      <Button
                        // style={{ width: '9vw' }}
                        style={index != 0 ? {top: '-2vh'} : null}
                        type="danger"
                        onClick={() => {
                          remove(field.name);
                        }}>
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
          <Button type="primary" onClick={onCancel}>
            Cancel
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};
