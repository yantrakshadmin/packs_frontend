import {notification} from 'antd';

export const deleteHOC = ({row, api, success, failure, reload}) => async () => {
  try {
    const {id} = row;
    await api(id);
    notification.success({
      message: success,
    });
    reload();
  } catch (e) {
    notification.error({
      message: failure,
      description: e.toString(),
    });
  }
};
