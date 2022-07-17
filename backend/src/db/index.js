// https://github.com/appy-one/acebase
import { AceBase } from 'acebase';
import { defaultConfig } from '#root/dictionaries.js';

const db = new AceBase('local_db', {
  storage: {
    path: './db',
  },
  logLevel: 'warn', // 'verbose', 'log' (default), 'warn' and 'error' (only errors are logged)
});

class Db {
  async connect() {
    await db.ready();
  }

  async setSchema(type, schema) {
    await db.schema.set(type, schema);
  }

  async create(path, value) {
    const reference = await db.ref(path).push(value);
    const snapshot = await reference.get();

    return {
      id: reference.key,
      ...snapshot.val(),
    };
  }

  async getAll(path, query) {
    let result = db.query(path);

    if (Object.keys(query).length) {
      Object.entries(query).forEach(([key, value]) => {
        const compare = new RegExp(String(value), 'i');

        result = result.filter(key, 'matches', compare);
      });
    }

    const snapshots = await result.take(defaultConfig.results_limit).sort('title').get();

    return snapshots.map(snap => ({
      id: snap.ref.key,
      ...snap.val(),
    }));
  }

  async getByID(path, id) {
    const snapshot = await db.ref(`${path}/${id}`).get();

    if (snapshot.exists()) {
      return {
        id: snapshot.ref.key,
        ...snapshot.val(),
      };
    }

    return {};
  }

  async update(path, newValue) {
    const { id, ...value } = newValue;

    const reference = db.ref(`${path}/${id}`);
    const snapshot = await reference.get();

    if (snapshot.exists()) {
      const updatedReference = await reference.update({
        ...snapshot.val(),
        ...value,
      });

      const updatedSnapshot = await updatedReference.get();

      return {
        id,
        ...updatedSnapshot.val(),
      };
    }

    return {};
  }

  async remove(path, id) {
    const reference = db.ref(`${path}/${id}`);
    const snapshot = await reference.get();

    if (snapshot.exists()) {
      await reference.remove();

      return snapshot.val();
    }

    return false;
  }
}

export default new Db();
