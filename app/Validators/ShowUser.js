'use strict'

class ShowUser {
  get rules () {

    const { id } = this.ctx.params;

    return {
      _id: `isValidMongo:users,_id,${id}`
    }
  }

  get messages () {
    return {
      '_id.isValidMongo': 'El usuario ingresado no es valido',
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).json({ msg: errorMessages[0].message })
  }
}

module.exports = ShowUser
