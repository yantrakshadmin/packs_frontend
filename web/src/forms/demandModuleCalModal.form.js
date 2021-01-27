import React, {useState, useCallback, useEffect} from 'react';
import {Modal, Button, Calendar, Badge, Input, Alert} from 'antd';
import {CheckOutlined, DeleteOutlined, CalendarOutlined} from '@ant-design/icons';
import moment from 'moment';

import _ from 'lodash';

//import formItem from '../hocs/formItem.hoc';

const Cal = ({form, field, kitQuantities, setKitQuantities, deliveryMonth, maxInput}) => {
  const [value, setValue] = useState(deliveryMonth);
  const [selectedValue, setSelectedValue] = useState(deliveryMonth);
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
      if (parseInt(ev.target.value) <= parseInt(maxInput)) {
        setEventText(ev.target.value);
      } else {
        if (!parseInt(ev.target.value)) {
          setEventText(null);
        } else {
          setEventText(maxInput);
        }
      }
    },
    [eventText, maxInput],
  );

  useEffect(() => {
    if (!(field.fieldKey in kitQuantities)) {
      const fields = form.getFieldsValue();
      const {demand_flows} = fields;
      if (demand_flows[field.fieldKey]) {
        Object.assign(demand_flows[field.fieldKey], {quantities: []});
        form.setFieldsValue({demand_flows});
      }
    } else {
      const fields = form.getFieldsValue();
      const {demand_flows} = fields;
      if (demand_flows[field.fieldKey]) {
        const quantities = kitQuantities[field.fieldKey];
        Object.assign(demand_flows[field.fieldKey], {quantities: quantities});
        form.setFieldsValue({demand_flows});
      }
    }
  }, [kitQuantities]);

  const addEvent = useCallback(() => {
    if (field.fieldKey in kitQuantities) {
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: [
          ...kitQuantities[field.fieldKey],
          {date: selectedValue, quantity: eventText},
        ],
      });
    } else {
      setKitQuantities({
        ...kitQuantities,
        [field.fieldKey]: [{date: selectedValue, quantity: eventText}],
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
          <Input disabled style={{width: '90%'}} value={ev.quantity} />
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
          type="number"
          min="0"
          max={maxInput}
        />
        {renderAddButton()}
      </Input.Group>
    );
  }, [kitQuantities, selectedValue, eventText, maxInput]);

  const disabledDate = useCallback(
    (value) => {
      if (value.format('MM-YYYY') !== deliveryMonth.format('MM-YYYY')) {
        return true;
      }
      return false;
    },
    [deliveryMonth],
  );

  const dateCellRender = useCallback(
    (value) => {
      const valueDate = value.format('L');
      const selectedDate = selectedValue.format('L');
      const ev = _.find(kitQuantities[field.fieldKey], (ev) => ev.date.format('L') === valueDate);
      if (ev && valueDate === selectedDate) {
        return (
          <Badge dot>
            <Button type="primary" danger shape="circle">
              {value.date()}
            </Button>
          </Badge>
        );
      } else if (!ev && valueDate === selectedDate) {
        return (
          <Button type="primary" danger shape="circle">
            {value.date()}
          </Button>
        );
      } else if (ev && valueDate !== selectedDate) {
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
        headerRender={() => null}
        onPanelChange={onPanelChange}
        dateFullCellRender={dateCellRender}
        disabledDate={disabledDate}
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

const DmCalModal = ({form, field, kitQuantities, setKitQuantities, deliveryMonth}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, [isModalVisible]);

  const handleClose = useCallback(() => {
    setIsModalVisible(false);
  }, [isModalVisible]);

  // useEffect(() => {
  //   if (!(field.fieldKey in kitQuantities)) {
  //     setKitQuantities({
  //       ...kitQuantities,
  //       [field.fieldKey]: [],
  //     });
  //     const fields = form.getFieldsValue();
  //     const {flows} = fields;
  //     if (flows[field.fieldKey]) {
  //       Object.assign(flows[field.fieldKey], {quantities: []});
  //       form.setFieldsValue({flows});
  //     }
  //   } else {
  //     const fields = form.getFieldsValue();
  //     const {flows} = fields;
  //     if (flows[field.fieldKey]) {
  //       const quantities = kitQuantities[field.fieldKey];
  //       Object.assign(flows[field.fieldKey], {quantities: quantities});
  //       form.setFieldsValue({flows});
  //     }
  //   }
  // }, [kitQuantities]);

  const renderModalButton = useCallback(() => {
    const demand_flows = form.getFieldValue('demand_flows');
    if (demand_flows[field.fieldKey]) {
      if (
        deliveryMonth &&
        'flow' in demand_flows[field.fieldKey] &&
        'kit' in demand_flows[field.fieldKey] &&
        'monthly_quantity' in demand_flows[field.fieldKey]
      ) {
        return (
          <Button type="primary" onClick={showModal}>
            <CalendarOutlined />
          </Button>
        );
      }
    }
    return (
      <Button type="primary" disabled>
        <CalendarOutlined />
      </Button>
    );
  }, [form, field, deliveryMonth]);

  const maxInputVal = useCallback(() => {
    const demand_flows = form.getFieldValue('demand_flows');
    if (demand_flows[field.fieldKey]) {
      if ('monthly_quantity' in demand_flows[field.fieldKey]) {
        return demand_flows[field.fieldKey]['monthly_quantity'];
      }
    }
    return 0;
  }, [form]);

  return (
    <>
      {renderModalButton()}
      <Modal
        title="Add Quantities"
        visible={isModalVisible}
        footer={null}
        onOk={handleClose}
        onCancel={handleClose}>
        <Cal
          form={form}
          field={field}
          kitQuantities={kitQuantities}
          setKitQuantities={setKitQuantities}
          deliveryMonth={deliveryMonth}
          maxInput={maxInputVal()}
        />
      </Modal>
    </>
  );
};

export default DmCalModal;
