import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, message, Alert, Card} from 'antd';
import {
  groupFormFields,
  groupModelChoices,
  groupModelChoicesGrouped,
} from 'common/formFields/group.formFields';
import {useAPI} from 'common/hooks/api';
import {useHandleForm} from 'hooks/form';
import {createGroup, editGroup, retrieveGroup} from 'common/api/auth';
import {PlusOutlined, MinusCircleOutlined} from '@ant-design/icons';
import {useControlledSelect} from '../hooks/useControlledSelect';
import formItem from '../hocs/formItem.hoc';
import {FORM_ELEMENT_TYPES} from '../constants/formFields.constant';

import {ifNanReturnZero} from 'common/helpers/mrHelper';

import moment from 'moment';

import _ from 'lodash';
import {filterActive} from 'common/helpers/mrHelper';

export const GroupForm = ({id, onCancel, onDone, isEmployee}) => {
  const {data: employees} = useAPI('/employees/', {});

  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    console.log(selectedModels);
  }, [selectedModels]);

  const {form, submit, loading} = useHandleForm({
    create: createGroup,
    edit: editGroup,
    retrieve: retrieveGroup,
    success: 'Group created/edited successfully',
    failure: 'Error in creating/editing Group.',
    done: onDone,
    close: onCancel,
    id,
    dates: ['invoice_date'],
  });

  useEffect(() => {
    if (id && !loading) {
      const temp = form.getFieldValue('models');
      const smTemp = selectedModels;
      temp.forEach((m) => {
        const k = _.findKey(groupModelChoicesGrouped, (o) => o.includes(m.model));
        if (!smTemp.includes(k)) {
          smTemp.push(k);
          form.setFieldsValue({
            [k]: true,
          });
        }
      });
      setSelectedModels(smTemp);
    }
  }, [id, loading]);

  const preProcess = useCallback(
    (data) => {
      const {name, emp} = data;
      const temp = {};
      temp.name = name;
      temp.emp = emp;
      let s = [];
      selectedModels.forEach((i) => {
        groupModelChoicesGrouped[i].forEach((j) => {
          s.push({model: j});
        });
      });
      //temp.models = selectedModels.map((sm) => ({model: sm}));
      temp.models = s;
      console.log(temp);
      submit(temp);
    },
    [selectedModels],
  );

  const handleFieldsChange = useCallback((data) => {
    if (data[0]) {
      if (data[0].name) {
        const thisField = data[0].name[0];
        //console.log(thisField);
      }
    }
  }, []);

  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Group Details</Divider>
      <Form
        onFinish={preProcess}
        initialValues={{status: 'Hold', gst: 0}}
        form={form}
        layout="vertical"
        hideRequiredMark
        autoComplete="off"
        onFieldsChange={handleFieldsChange}>
        <Row style={{justifyContent: 'left'}}>
          {groupFormFields.slice(0, 1).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {groupFormFields.slice(1, 2).map((item, idx) => (
            <Col span={item.colSpan}>
              <div key={idx} className="p-2">
                {formItem({
                  ...item,
                  others: {
                    ...item.others,
                    selectOptions: employees || [
                      {
                        user: 2,
                        employee_name: 'Yantraksh',
                        employee_email: '0',
                        employee_phone: '0',
                        employee_city: '0',
                        employee_role: 'callrahul',
                      },
                    ],
                    key: 'user',
                    dataKeys: ['employee_email'],
                    customTitle: 'employee_name',
                  },
                })}
              </div>
            </Col>
          ))}
        </Row>

        <Divider orientation="left">Model Details</Divider>

        <Row style={{justifyContent: 'left'}}>
          {_.keys(groupModelChoicesGrouped).map((modelName, modelIdx) => (
            <Col span={8} key={modelIdx}>
              <Card>
                <Row gutter={10}>
                  <Col span={18}>{modelName}</Col>
                  <Col span={6}>
                    {formItem({
                      key: modelName,
                      type: FORM_ELEMENT_TYPES.SWITCH,
                      kwargs: {
                        onChange: (val) => {
                          if (val) {
                            setSelectedModels(_.concat(selectedModels, [modelName]));
                          } else {
                            setSelectedModels(_.remove(selectedModels, (i) => i !== modelName));
                          }
                        },
                      },
                      others: {
                        defaultValue: false,
                        formOptions: {noStyle: true},
                      },
                      customLabel: modelName,
                    })}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>

        <br />

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
