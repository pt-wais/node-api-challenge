/* eslint-disable linebreak-style */
const db = require('../dbConfig.js');
const mappers = require('./mappers');


function get(id) {
  const query = db('actions');

  if (id) {
    return query
      .where('id', id)
      .first()
      .then((action) => {
        if (action) {
          return mappers.actionToBody(action);
        }
        return null;
      });
  }
  return query.then((actions) => actions.map((action) => mappers.actionToBody(action)));
}

function insert(action) {
  return db('actions')
    .insert(action)
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('actions')
    .where('id', id)
    .del();
}


module.exports = {
  get,
  insert,
  update,
  remove,
};
