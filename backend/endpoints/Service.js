import Db from '#db';
import FileService from '#endpoints/FileService.js';
import { messageCodes } from '#root/dictionaries.js';

class Service {
  async create(url, body, file, fileField) {
    if (!url) {
      throw new Error(messageCodes.no_url);
    } else if (!body) {
      throw new Error(messageCodes.object_not_found_for_create);
    }

    const value = {
      ...body,
    };

    const fileName = await FileService.saveFile(file);

    if (fileName) {
      value[fileField] = fileName;
    }

    return await Db.create(url, value);
  }

  async getAll(url, query = {}) {
    if (!url) {
      throw new Error(messageCodes.no_url);
    }

    return await Db.getAll(url, query);
  }

  async getByID(url, id) {
    if (!url) {
      throw new Error(messageCodes.no_url);
    } else if (!id) {
      throw new Error(messageCodes.no_id);
    }

    return await Db.getByID(url, id);
  }

  async update(url, body, file, fileField) {
    if (!url) {
      throw new Error(messageCodes.no_url);
    } else if (!body) {
      throw new Error(messageCodes.update_data_not_found);
    }

    const value = {
      ...body,
    };

    if (file && fileField) {
      const fileName = await FileService.replaceFile(file, value[fileField]);

      if (fileName) {
        value[fileField] = fileName;
      }
    }

    return await Db.update(url, value);
  }

  async remove(url, id, fileField) {
    if (!url) {
      throw new Error(messageCodes.no_url);
    } else if (!id) {
      throw new Error(messageCodes.no_id);
    }

    const removedItem = await Db.remove(url, id);

    if (removedItem) {
      if (fileField && removedItem?.[fileField]) {
        await FileService.removeFile(removedItem[fileField]);
      }

      return true;
    }

    return false;
  }
}

export default new Service();
