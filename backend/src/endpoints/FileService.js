import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { unlink } from 'fs/promises';
import { defaultConfig } from '#root/dictionaries.js';

class FileService {
  async saveFile(file) {
    if (!file) {
      return '';
    }

    try {
      const guid = uuid();

      // Получаем исходное расширение и имя файла
      const splitFileName = (file.name || '').split('.');
      const fileName = splitFileName.slice(0, splitFileName.length - 1).join('.');
      const fileExt = splitFileName[splitFileName.length - 1].toLowerCase();

      const uniqueFileName = `${fileName}-${guid}.${fileExt}`;
      const filePath = path.resolve(defaultConfig.static, uniqueFileName);

      await file.mv(filePath);

      return uniqueFileName;
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeFile(fileName) {
    if (!fileName) {
      return;
    }

    try {
      await unlink(`${defaultConfig.static}/${fileName}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  async replaceFile(newFile, oldFileName = '') {
    if (!newFile) {
      return;
    }

    try {
      const fileName = await this.saveFile(newFile);
      await this.removeFile(oldFileName);

      return fileName;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new FileService();
