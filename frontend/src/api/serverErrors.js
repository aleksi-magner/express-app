import { $error } from 'purejs-notify';

const serverErrors = (error, alternativeText = 'Произошла ошибка') => {
  const data = error?.response?.data || {};

  if (data?.detail) {
    $error(data.detail);
  } else if (data?.field_errors) {
    if (Array.isArray(data.field_errors)) {
      data.field_errors.map(err => {
        $error(err);
      });
    } else {
      $error(data.field_errors);
    }
  } else if (data?.error?.message) {
    $error(data.error.message);
  } else {
    $error(alternativeText);
  }

  if (error.response?.status >= 500) {
    $error('Ошибка на сервере. Повторите попытку позже');
  }
};

export default serverErrors;
