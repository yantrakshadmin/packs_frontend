import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Menu, Dropdown, Button, Divider, Spin, notification} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PFEP_DATA, STOP_STEP_LOADING} from 'common/actions';
import {PREPSolutionRequiredFormFields} from 'common/formFields/PFEP/PFEPSolutionRequired.formFields';
import {ArrowRightOutlined, DownOutlined, CloseOutlined} from '@ant-design/icons';

const {Item} = Menu;

export const PFEPSolutionRequiredForm = ({onCancel, active, onNext}) => {
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.pfepData);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({type: ADD_PFEP_DATA, data});
    setLoading(false);
    if (active === 4) {
      onNext();
    }
  };

  useEffect(() => {
    if (active !== 4) {
      form.submit();
      dispatch({type: STOP_STEP_LOADING});
    }
  }, [active]);
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === 'close') {
          setDropdownVisible(false);
        }
      }}>
      <Item key="close">
        <div className="row justify-between align-center">
          Close
          <CloseOutlined />
        </div>
      </Item>
      {PREPSolutionRequiredFormFields.slice(0, 8).map((item, idx) => (
        <Item key={idx.toString()}>
          <div className="row justify-between">
            <div style={{flexWrap: 'wrap', marginRight: '5px'}}>{item.customLabel} </div>
            {formItem(item)}
          </div>
        </Item>
      ))}
    </Menu>
  );
  return (
    <Spin spinning={loading}>
      <Divider orientation="left">Solution Required</Divider>
      <Form
        onFinish={submit}
        form={form}
        initialValues={state}
        layout="vertical"
        // hideRequiredMark
        autoComplete="off">
        <Row style={{justifyContent: 'left'}}>
          {PREPSolutionRequiredFormFields.slice(9, 10).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className="p-2">
                {item.customLabel}
              </div>
            </Col>
          ))}
          {PREPSolutionRequiredFormFields.slice(10, 14).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className="p-2">
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {PREPSolutionRequiredFormFields.slice(9, 10).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          {PREPSolutionRequiredFormFields.slice(10, 14).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {PREPSolutionRequiredFormFields.slice(14, 15).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className="p-2">
                {item.customLabel}
              </div>
            </Col>
          ))}
          <Col span={5} />
          {PREPSolutionRequiredFormFields.slice(15, 16).map((item, idx) => (
            <Col span={4}>
              <div key={idx.toString()} className="p-2">
                {item.customLabel}
              </div>
            </Col>
          ))}
        </Row>
        <Row style={{justifyContent: 'left'}}>
          {PREPSolutionRequiredFormFields.slice(14, 15).map((item, idx) => (
            <Col span={5}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
          <Col span={5}>
            <div className="p-2">
              <Dropdown
                trigger={['click']}
                overlay={menu}
                onVisibleChange={(e) => {
                  setDropdownVisible(e);
                }}
                visible={dropdownVisible}>
                <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  Solution Required <DownOutlined />
                </Button>
              </Dropdown>
            </div>
            <br />
            <br />
            <br />
          </Col>
          {PREPSolutionRequiredFormFields.slice(15, 16).map((item, idx) => (
            <Col span={4}>
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

export default PFEPSolutionRequiredForm;
