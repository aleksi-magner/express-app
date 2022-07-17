export const defaultConfig = {
  port: 8000,
  static: 'static',
  imageField: 'picture',
  results_limit: 1000,
};

export const messageCodes = {
  required: 'Обязательно',
  invalid_required_fields: 'Заполнены не все обязательные поля',
  create_failed: 'Не удалось создать $1',
  get_failed: 'Не удалось получить $1',
  update_failed: 'Не удалось обновить $1',
  remove_failed: 'Не удалось удалить $1',
  remove_success: 'Успешно удалено',
  no_id: 'ID не указан',
  no_url: 'URL не указан',
  object_with_id_not_found: 'Объект с таким ID не найден',
  object_not_found_for_create: 'Отсутствует объект для создания',
  update_data_not_found: 'Данные для обновления не переданы',
};

export const pluralTexts = {
  posts: ['пост', 'посты'],
};
