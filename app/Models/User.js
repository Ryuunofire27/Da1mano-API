'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class User
 */
class User extends BaseModel {
  /**
   * Exclude created_at and updated_at from the model
   */
  static get timestamps () {
    return false
  }
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UserHook.method')
    // Indexes:
    // this.index({}, {background: true})
    this.addHook('preSave', 'UserHook.hashPassword')
  }
  /**
   * User's schema
   */
  static get schema () {
    return {
      name: { type: String },
      lastName: { type: String },
      email: { type: String },
      country: { type: String },
      city: { type: String },
      phone: { type: String },
      password: { type: String },
      picture: { type: String }
    }
  }
}

module.exports = User.buildModel('User')
