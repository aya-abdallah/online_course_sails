/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */




module.exports = {

  attributes: {
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    email: { type: 'string', unique: true, required: true },
    isAdmin: { type: 'boolean', defaultsTo: false },
    isActive: { type: 'boolean', defaultsTo: true },
    password: { type: 'string', required: true },

    courses: {
      collection: 'course',
      via: 'users'
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password'])
  }
  
};
