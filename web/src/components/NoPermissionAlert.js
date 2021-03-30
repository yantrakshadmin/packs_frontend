import React from 'react';
import {Alert} from 'antd';

const NoPermissionAlert = (props) => {
  if (!props.hasPermission) {
    return <Alert message="You do not have permissions to access this module" type="error" />;
  }
  return props.children;
};

export default NoPermissionAlert;
