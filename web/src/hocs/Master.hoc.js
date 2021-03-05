import React, {useEffect, useState} from 'react';
import {Typography, Button, Divider, Row, Col, Table, Modal} from 'antd';

const {Title} = Typography;

export const MasterHOC = ({
  title,
  data,
  size,
  columns,
  scroll,
  modalParams,
  modalBody: ModalBody,
  hideRightButton,
  tableOptions,
  customModalTitle,
  refresh = () => {},
  customRightButtonLabel,
  loading = false,
  ExtraButtonNextToTitle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onCancel = () => {
    setModalVisible(false);
    if (modalParams) modalParams.setModalParams(undefined);
  };

  const onDone = () => {
    refresh();
    onCancel();
  };

  useEffect(() => {
    if (modalParams) setModalVisible(modalParams.showModal);
  }, [modalParams]);

  return (
    <div>
      {hideRightButton ? null : (
        <Modal
          visible={modalVisible}
          onCancel={onCancel}
          maskClosable={false}
          style={{minWidth: '80vw'}}
          title={customModalTitle || customRightButtonLabel || `Add ${title}`}
          footer={null}>
          <ModalBody
            id={modalParams ? modalParams.id : undefined}
            onCancel={onCancel}
            onDone={onDone}
          />
        </Modal>
      )}
      <Row justify="space-between">
        <Col>
          <Title level={3}>
            {title} {ExtraButtonNextToTitle ? <ExtraButtonNextToTitle /> : null}
          </Title>
        </Col>
        <Col>
          {hideRightButton ? null : (
            <Button
              className="m-2"
              type="primary"
              onClick={() => {
                setModalVisible(true);
              }}>
              {customRightButtonLabel || `Add ${title}`}
            </Button>
          )}
        </Col>
      </Row>
      <Divider style={{margin: 0, padding: 0}} />
      <Row>
        <Col span={24}>
          <Table
            scroll={scroll}
            bordered
            dataSource={data}
            columns={columns}
            loading={loading}
            {...tableOptions}
            size={size}
          />
        </Col>
      </Row>
    </div>
  );
};
