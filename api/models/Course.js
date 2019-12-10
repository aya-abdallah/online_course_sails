/**
 * Course.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: { type: 'string', required: true },
    description: { type: 'string', required: true },
    photo: { type: 'string' },
    point: { type: 'number', defaultsTo: 0 },
    users: {
      collection: 'user',
      via: 'courses'
    }
  },
};

