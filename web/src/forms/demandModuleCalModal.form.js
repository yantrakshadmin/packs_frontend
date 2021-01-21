import React, {useState, useCallback, useEffect} from 'react';
import {Modal, Button, Calendar, Badge, Input, Alert} from 'antd';
import {CheckOutlined, DeleteOutlined, CalendarOutlined} from '@ant-design/icons';
import moment from 'moment';

import _ from 'lodash';

//import formItem from '../hocs/formItem.hoc';

const Cal = ({field, kitQuantities, setKitQuantities}) => {
  const [value, setValue] = useState(moment(new Date()));
  const [selectedValue, setSelectedValue] = useState(moment(new Date()));
  const [eventText, setEventText] = useState(null);

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

  const handleChange = useCallback(
    (ev) => {
      setEventText(ev.target.value);
    },
    [eventText],
  );

  const addEvent = useCallback(() => {
    if (field.fieldKey in kitQuantities) {
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: [
          ...kitQuantities[field.fieldKey],
          {date: selectedValue, event: eventText},
        ],
      });
    } else {
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: [{date: selectedValue, event: eventText}],
      });
    }
    setEventText(null);
  }, [selectedValue, eventText, kitQuantities]);

  const deleteEvent = useCallback(
    (date) => {
      const newThisFieldKitQuantities = _.remove(
        [...kitQuantities[field.fieldKey]],
        (el) => el.date.format('L') !== date.format('L'),
      );
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: newThisFieldKitQuantities,
      });
    },
    [kitQuantities],
  );

  const renderAddButton = useCallback(() => {
    if (eventText && selectedValue) {
      return (
        <Button style={{width: '10%'}} onClick={addEvent} type="primary">
          <CheckOutlined />
        </Button>
      );
    } else {
      return (
        <Button disabled style={{width: '10%'}} type="primary">
          <CheckOutlined />
        </Button>
      );
    }
  }, [eventText, selectedValue]);

  const renderEventInput = useCallback(() => {
    const ev = _.find(
      kitQuantities[field.fieldKey],
      (ev) => ev.date.format('L') === selectedValue.format('L'),
    );
    if (ev) {
      return (
        <Input.Group compact>
          <Input disabled style={{width: '90%'}} value={ev.event} />
          <Button onClick={() => deleteEvent(ev.date)} style={{width: '10%'}} type="danger">
            <DeleteOutlined />
          </Button>
        </Input.Group>
      );
    }
    return (
      <Input.Group compact>
        <Input
          style={{width: '90%'}}
          placeholder="Add Quantity"
          onChange={handleChange}
          value={eventText}
        />
        {renderAddButton()}
      </Input.Group>
    );
  }, [kitQuantities, selectedValue, eventText]);

  const dateCellRender = useCallback(
    (value) => {
      const valueDate = value.format('L');
      const today = moment().format('L');
      const selectedDate = selectedValue.format('L');
      const ev = _.find(kitQuantities[field.fieldKey], (ev) => ev.date.format('L') === valueDate);
      if (ev && valueDate === today && valueDate === selectedDate) {
        return (
          <Badge dot>
            <Button type="primary" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (ev && valueDate === today) {
        return (
          <Badge dot>
            <Button type="dashed" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (ev && valueDate === selectedDate) {
        return (
          <Badge dot>
            <Button type="primary" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (valueDate === selectedDate) {
        return (
          <Button type="primary" danger shape="circle">
            {value.date()}
          </Button>
        );
      } else if (valueDate === today) {
        return (
          <Button type="dashed" danger shape="circle">
            {value.date()}
          </Button>
        );
      } else if (ev) {
        return (
          <Badge dot>
            <Button type="text" shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      }
      return (
        <Button type="text" shape="circle">
          {value.date()}
        </Button>
      );
    },
    [kitQuantities, selectedValue],
  );

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        fullscreen={false}
        onPanelChange={onPanelChange}
        dateFullCellRender={dateCellRender}
      />
      <br />
      <Alert
        style={{textAlign: 'center'}}
        message={`Selected date: ${selectedValue && selectedValue.format('DD MMMM YYYY')}`}
      />
      <br />
      {renderEventInput()}
    </>
  );
};

const DmCalModal = ({field, kitQuantities, setKitQuantities}) => {
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

  useEffect(() => {
    if (!(field.fieldKey in kitQuantities)) {
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: [],
      });
    }
  }, [kitQuantities]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <CalendarOutlined />
      </Button>
      <Modal
        title="Add Quantities"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Cal field={field} kitQuantities={kitQuantities} setKitQuantities={setKitQuantities} />
      </Modal>
    </>
  );
};

export default DmCalModal;
