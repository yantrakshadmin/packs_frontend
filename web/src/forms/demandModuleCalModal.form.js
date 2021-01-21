import React, {useState, useCallback, useEffect} from 'react';
import {Modal, Button, Calendar, Badge, Input, Alert} from 'antd';
import {PlusOutlined, MinusOutlined, CalendarOutlined} from '@ant-design/icons';
import moment from 'moment';

import _ from 'lodash';

import formItem from '../hocs/formItem.hoc';

const Cal = (props) => {
  const [value, setValue] = useState(moment(new Date()));
  const [selectedValue, setSelectedValue] = useState(moment(new Date()));
  const [eventText, setEventText] = useState(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log(props);
  }, [events]);

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
    setEvents([
      ...events,
      {
        key: events.length,
        date: selectedValue,
        event: eventText,
      },
    ]);
    setEventText(null);
  }, [selectedValue, eventText, events]);

  const deleteEvent = useCallback(
    (key) => {
      setEvents(_.remove(events, (el) => el.key !== key));
    },
    [events],
  );

  const renderAddButton = useCallback(() => {
    if (eventText && selectedValue) {
      return (
        <Button style={{width: '10%'}} onClick={addEvent} type="primary">
          <PlusOutlined />
        </Button>
      );
    } else {
      return (
        <Button disabled style={{width: '10%'}} type="primary">
          <PlusOutlined />
        </Button>
      );
    }
  }, [eventText, selectedValue]);

  const renderEventsList = useCallback(() => {
    const evs = _.filter(events, (ev) => ev.date.format('L') === selectedValue.format('L'));
    if (evs.length > 0) {
      return evs.map((item, idx) => {
        return (
          <span key={idx}>
            <Input.Group compact>
              <Input disabled style={{width: '90%'}} value={item.event} />
              <Button onClick={() => deleteEvent(item.key)} style={{width: '10%'}} type="danger">
                <MinusOutlined />
              </Button>
            </Input.Group>
            <br />
          </span>
        );
      });
    }
    return null;
  }, [events, selectedValue]);

  const dateCellRender = useCallback(
    (value) => {
      const valueDate = value.format('L');
      const today = moment().format('L');
      const selectedDate = selectedValue.format('L');
      const evs = _.filter(events, (ev) => ev.date.format('L') === valueDate);
      if (evs.length > 0 && valueDate === today && valueDate === selectedDate) {
        return (
          <Badge dot>
            <Button type="primary" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (evs.length > 0 && valueDate === today) {
        return (
          <Badge dot>
            <Button type="dashed" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (evs.length > 0 && valueDate === selectedDate) {
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
      } else if (evs.length > 0) {
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
    [events, selectedValue],
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
      {renderEventsList()}
      <Input.Group compact>
        <Input
          style={{width: '90%'}}
          placeholder="Add Event"
          onChange={handleChange}
          value={eventText}
        />
        {renderAddButton()}
      </Input.Group>
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
      <Modal title="Add Events" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Cal props={props} />
      </Modal>
    </>
  );
};

export default DmCalModal;
