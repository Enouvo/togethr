import { notification } from 'antd';

export const showError = (error) => {
  return notification.error({ message: error?.message ?? 'Something went wrong' });
};

export const categories = [{ value: 'Art' }, { value: 'Film' }, { value: 'Game' }, { value: 'Tech' }];
