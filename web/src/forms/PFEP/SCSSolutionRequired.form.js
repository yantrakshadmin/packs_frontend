import React, {useEffect, useState, useCallback} from 'react';
import {Form, Col, Row, Button, Divider, Spin, Menu, notification, Dropdown, message} from 'antd';
import formItem from 'hocs/formItem.hoc';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_PFEP_DATA, STOP_STEP_LOADING} from 'common/actions';
import {CloseOutlined, DownOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {createPFEP, editPFEP} from 'common/api/auth';
import {Row01FF, Row02FF} from 'common/formFields/PFEP/SCSSolutionRequired.formFields';

const {Item} = Menu;

export const PFEPStatusForm = ({id, onCancel, active, onDone}) => {
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const state = useSelector((e) => e.data.pfepData);

  const toFormData = useCallback((data) => {
    const req = new FormData();
    for (const key in data) {
      if (key === 'insert_types') {
        req.append('insert_types', JSON.stringify(data.insert_types));
      } else if (key === 'sks') {
        req.append('sks', JSON.stringify(data.sks));
      } else if (key === 'date') {
        req.append(key.toString(), data[key].format());
      } else if (key === 'fileA') {
        if (data[key]) {
          const newFileList = data[key].fileList.map((f) => {
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
            } else {
              return f.originFileObj;
            }
          });
          data[key] = newFileList;
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`fileA${c}`, el);
            c = c + 1;
          });
          req.set('no_of_fileA_files', c);
        }
      } else if (key === 'fileB') {
        if (data[key]) {
          const newFileList = data[key].fileList.map((f) => {
            if (f.status !== 'done') {
              message.error(`${f.name} has not been uploaded yet!`);
            } else {
              return f.originFileObj;
            }
          });
          data[key] = newFileList;
          let c = 0;
          req.append(key.toString(), data[key]);
          data[key].forEach((el) => {
            req.append(`fileB${c}`, el);
            c = c + 1;
          });
          req.set('no_of_fileB_files', c);
        }
      } else {
        req.append(key.toString(), data[key]);
      }
    }
    return req;
  }, []);

  const submit = async (data) => {
    setLoading(true);
    await dispatch({type: ADD_PFEP_DATA, data});
    setLoading(false);
    if (active === 3) {
      if (id) {
        const {error} = await editPFEP(id, toFormData({...state, ...data}));
        if (error) {
          notification.warning({
            message: 'Unable To Edit.',
            description: 'Something went wrong PFEP editing failed.',
          });
          onCancel();
        } else {
          onDone();
        }
      } else {
        const {error} = await createPFEP(toFormData({...state, ...data}));
        if (error) {
          notification.warning({
            message: 'Unable To Create.',
            description: 'Something went wrong PFEP creation failed.',
          });
          onCancel();
        } else {
          onDone();
        }
      }
    }
  };
  useEffect(() => {
    if (active !== 3) {
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
      {Row01FF.map((item, idx) => (
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
          <Col span={6}>
            <div className="p-2">
              <Form.Item label={'Solution Required'}>
                <Dropdown
                  trigger={['click']}
                  overlay={menu}
                  onVisibleChange={(e) => {
                    setDropdownVisible(e);
                  }}
                  visible={dropdownVisible}>
                  <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()} block>
                    Select <DownOutlined />
                  </Button>
                </Dropdown>
              </Form.Item>
            </div>
          </Col>
          {Row02FF.map((item, idx) => (
            <Col span={6}>
              <div key={idx.toString()} className="p-2">
                {formItem(item)}
              </div>
            </Col>
          ))}
        </Row>
        <Row justify="space-between">
          <div className="row">
            <Button type="primary" htmlType="submit">
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

export default PFEPStatusForm;
