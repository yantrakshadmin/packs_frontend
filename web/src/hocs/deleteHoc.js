import { notification } from 'antd';

export const deleteHOC = ({ record, api, success, failure, reload }) => async () => {
  try {
    const { id } = record;
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
