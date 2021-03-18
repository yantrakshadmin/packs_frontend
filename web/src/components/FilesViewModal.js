import React, {useEffect, useState, useCallback} from 'react';
import {Modal, Button, Card, Row, Col, Image} from 'antd';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {yantraColors} from '../helpers/yantraColors';

const getUrlExtension = (url) => {
  return url.split(/[#?]/)[0].split('.').pop().trim();
};

const FilesViewModal = ({documentAvail, getDocuments}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fD = async () => {
      if (isModalVisible) {
        const d = await getDocuments();
        if (d) setDocuments(d);
      }
    };
    fD();
  }, [isModalVisible]);

  const showModal = (e) => {
    e.stopPropagation();
    setIsModalVisible(true);
  };

  const handleOk = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsModalVisible(false);
  };

  const renderThumbnail = useCallback(
    (url) => {
      const fType = getUrlExtension(url).toLowerCase();
      if (fType === 'png' || fType === 'jpg' || fType === 'jpeg') {
        return <Image width="100%" src={url} />;
      }
      if (fType === 'pdf') {
        return <object width="100%" height="400" data={url} type="application/pdf" />;
      }
      if (fType === 'ppt' || fType === 'pptx') {
        return (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
            width="100%"
            height="500"
            frameBorder="0"
          />
        );
      }
      return (
        <a target="_blank" href={url}>
          {url}
        </a>
      );
    },
    [getUrlExtension],
  );

  return (
    <>
      <Button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '1px',
        }}
        onClick={showModal}
        disabled={documentAvail ? false : true}>
        <FontAwesomeIcon
          icon={documentAvail ? faEye : faEyeSlash}
          style={{fontSize: 20, color: yantraColors['primary']}}
        />
      </Button>
      <Modal
        width={1300}
        title="Documents"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Row gutter={10} justify="center">
          {documents.map((d) => {
            return (
              <Col span={d.span ? d.span : 12} style={{marginBottom: '10px'}}>
                <Card>{renderThumbnail(d.document)}</Card>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
};

export default FilesViewModal;
