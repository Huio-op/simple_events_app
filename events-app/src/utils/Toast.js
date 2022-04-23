import { ToastContainer, toast } from 'react-toastify';

class Toast {
  static success = (message) => {
    toast.success(message);
  };

  static error = (message) => {
    toast.error(message);
  };
}

export default Toast;
