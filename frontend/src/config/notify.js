import { init } from 'purejs-notify';
import 'purejs-notify/dist/style.min.css';
import '@/assets/styles/notify.css';

init({
  state: {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
  },
  icons: {
    success: 'vi vi-done icon-lg',
    info: 'vi vi-info icon-lg',
    warning: 'vi vi-warning icon-lg',
    error: 'vi vi-error icon-lg',
  },
});
