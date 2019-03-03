import { toast } from 'react-toastify';

export const toastError = (message, error) => {
  toast.error(message + error.message, {
    autoClose: false
  });
};
