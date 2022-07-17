import httpClient from './httpClient';
import serverErrors from './serverErrors';

const baseURL = '/api/posts';

const paramsToFormData = params => {
  const formData = new FormData();

  Object.entries(params || {}).forEach(([key, value]) => {
    if (key === 'picture') {
      value.forEach(item => {
        formData.append(key, item || '');
      });
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
};

/**
 * Создаёт новый пост.
 * @param {{author: string, title: string, content: string, [picture]: file}} data
 * @return {Promise<object>}
 */
export const createPost = async data => {
  try {
    const body = data?.picture ? paramsToFormData(data) : data;

    const response = await httpClient.post(`${baseURL}/`, body);

    return response.data || {};
  } catch (error) {
    serverErrors(error, 'При создании поста произошла ошибка');

    throw new Error(`Create post. ${error}`);
  }
};

/**
 * Получает список постов.
 * @param {{author: string, title: string, content: string}} [query={}]
 * @return {Promise<object[]>}
 */
export const fetchPosts = async (query = {}) => {
  try {
    const response = await httpClient.get(`${baseURL}/`, {
      params: query,
    });

    return response.data || [];
  } catch (error) {
    serverErrors(error, 'При получении списка постов произошла ошибка');

    throw new Error(`Fetch posts. ${error}`);
  }
};

/**
 * Получает пост по ID.
 * @param {string} ID
 * @return {Promise<object>}
 */
export const fetchPostByID = async ID => {
  try {
    const response = await httpClient.get(`${baseURL}/${ID}/`);

    return response.data || {};
  } catch (error) {
    serverErrors(error, 'При получении поста произошла ошибка');

    throw new Error(`Fetch post by ID. ${error}`);
  }
};

/**
 * Обновляет текущий пост.
 * @param {{id: string, [author]: string, [title]: string, [content]: string, [picture]: file}} data
 * @return {Promise<object>}
 */
export const updatePost = async data => {
  try {
    const body = data?.picture ? paramsToFormData(data) : data;

    const response = await httpClient.put(`${baseURL}/`, body);

    return response.data || {};
  } catch (error) {
    serverErrors(error, 'При обновлении поста произошла ошибка');

    throw new Error(`Update post. ${error}`);
  }
};

/**
 * Удаляет пост по ID.
 * @param {string} ID
 */
export const removePost = async ID => {
  try {
    await httpClient.delete(`${baseURL}/${ID}/`);
  } catch (error) {
    serverErrors(error, 'При удалении поста произошла ошибка');

    throw new Error(`Remove post. ${error}`);
  }
};
