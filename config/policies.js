/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/
  UserController: {
    destroyOne: ['isAuthenticated', 'isAdmin'],
    delete: ['isAuthenticated', 'isAdmin'],
    find: ['isAuthenticated', 'isAdmin'],
    activeToggle: ['isAuthenticated', 'isAdmin'],
    createAdmin: ['isAuthenticated', 'isAdmin'],
    login: true,
    create: true,
  },
  CourseController: {
    find: true,
    create: ['isAuthenticated', 'isAdmin'],
    destroy: ['isAuthenticated', 'isAdmin'],
    update: ['isAuthenticated', 'isAdmin'],
    remove: ['isAuthenticated', 'isAdmin']
  }

};
