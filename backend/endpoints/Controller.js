import Service from '#endpoints/Service.js';
import { defaultConfig, messageCodes } from '#root/dictionaries.js';

/**
 * @param {object} options
 * @param {object} options.schema
 * @param {string} options.fileField
 * @param {string} options.url
 * @param {array} options.pluralText
 */
class Controller {
  constructor(options = {}) {
    this.schema = options.schema || {};
    this.fileField = options.fileField || '';
    this.url = options.url || '';
    this.pluralText = options.pluralText || [];
  }

  async create(request, response) {
    if (!this?.url) {
      return;
    }

    try {
      const requiredKeys = Object.keys(this.schema).filter(key => !key.includes('?'));

      const invalidFields = [];

      requiredKeys.forEach(key => {
        if (request.body[key] === undefined) {
          invalidFields.push({
            [key]: messageCodes.required,
          });
        }
      });

      if (invalidFields.length) {
        response.status(400).json({
          message: messageCodes.invalid_required_fields,
          field_errors: invalidFields,
        });

        return;
      }

      const fileField = this.fileField || defaultConfig.imageField;

      const result = await Service.create(
        this.url,
        request.body,
        request.files?.[fileField] || null,
        fileField,
      );

      response.json(result);
    } catch (error) {
      const errorTemplate = messageCodes.create_failed;
      const pluralText = this.pluralText?.[0] || '';
      const message = errorTemplate.replace('$1', pluralText);

      response.status(500).json({
        error: error.message,
        message,
      });
    }
  }

  async getAll(request, response) {
    if (!this?.url) {
      return;
    }

    try {
      const result = await Service.getAll(this.url, request.query);

      response.json(result);
    } catch (error) {
      const errorTemplate = messageCodes.get_failed;
      const pluralText = this.pluralText?.[1] || '';
      const message = errorTemplate.replace('$1', pluralText);

      response.status(500).json({
        error: error.message,
        message,
      });
    }
  }

  async getByID(request, response) {
    if (!this?.url) {
      return;
    }

    try {
      const { id } = request.params;

      if (!id) {
        response.status(400).json({
          message: messageCodes.no_id,
        });

        return;
      }

      const result = await Service.getByID(this.url, id);

      if (!Object.keys(result).length) {
        response.status(400).json({
          message: messageCodes.object_with_id_not_found,
        });

        return;
      }

      response.json(result);
    } catch (error) {
      const errorTemplate = messageCodes.get_failed;
      const pluralText = this.pluralText?.[0] || '';
      const message = errorTemplate.replace('$1', pluralText);

      response.status(500).json({
        error: error.message,
        message,
      });
    }
  }

  async update(request, response) {
    if (!this?.url) {
      return;
    }

    try {
      if (!request.body?.id) {
        response.status(400).json({
          message: messageCodes.no_id,
        });

        return;
      }

      const fileField = this.fileField || defaultConfig.imageField;

      const result = await Service.update(
        this.url,
        request.body,
        request.files?.[fileField] || null,
        fileField,
      );

      if (!Object.keys(result).length) {
        response.status(400).json({
          message: messageCodes.object_with_id_not_found,
        });

        return;
      }

      response.json(result);
    } catch (error) {
      const errorTemplate = messageCodes.update_failed;
      const pluralText = this.pluralText?.[0] || '';
      const message = errorTemplate.replace('$1', pluralText);

      response.status(500).json({
        error: error.message,
        message,
      });
    }
  }

  async remove(request, response) {
    if (!this?.url) {
      return;
    }

    try {
      const { id } = request.params;

      if (!id) {
        response.status(400).json({
          message: messageCodes.no_id,
        });

        return;
      }

      const fileField = this.fileField || defaultConfig.imageField;

      const done = await Service.remove(this.url, id, fileField);

      if (!done) {
        response.status(400).json({
          message: messageCodes.object_with_id_not_found,
        });

        return;
      }

      response.json(messageCodes.remove_success);
    } catch (error) {
      const errorTemplate = messageCodes.remove_failed;
      const pluralText = this.pluralText?.[0] || '';
      const message = errorTemplate.replace('$1', pluralText);

      response.status(500).json({
        error: error.message,
        message,
      });
    }
  }
}

export default new Controller();
