import React, {useState, useCallback} from 'react';
import {Modal, Button, Calendar, Alert, Form, Row, Col} from 'antd';
import {PlusOutlined, CloseOutlined, CalendarOutlined} from '@ant-design/icons';
import moment from 'moment';

import formItem from '../hocs/formItem.hoc';

const Cal = ({demandModuleFlowFormCalFields}) => {
  const [value, setValue] = useState(moment(new Date()));
  const [selectedValue, setSelectedValue] = useState(moment(new Date()));

  const onSelect = useCallback(
    (value) => {
      setValue(value);
      setSelectedValue(value);
    },
    [value, selectedValue],
  );

  const onPanelChange = useCallback(
    (value) => {
      setValue(value);
    },
    [value],
  );

  return (
    <>
      <Alert
        message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
      />
      <br />
      <Form.List name="cals">
        {(fields, {add, remove}) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row align="middle">
                  {demandModuleFlowFormCalFields.map((item) => (
                    <Col span={item.col_span}>
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
                  <Col span={1}>
                    <Button
                      type="danger"
                      title="Delete"
                      onClick={() => {
                        remove(field.name);
                      }}>
                      <CloseOutlined />
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

      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </>
  );
};

const DmCalModal = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, [isModalVisible]);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, [isModalVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, [isModalVisible]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <CalendarOutlined />
      </Button>
      <Modal
        title="Add Events"
        width={800}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Cal props={props} />
      </Modal>
    </>
  );
};

export default DmCalModal;
