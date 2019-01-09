'use strict'

class UpdateUser {
  get rules () {
    const { id } = this.ctx.params;
    return {
      _id: `isValidMongo:users,_id,${id}`,
      name: 'required',
      lastName: 'required',
      email: `required|email|uniqueMongo:users,email,_id,${id}`,
      country: 'string',
      city: 'string',
      phone: 'number',
      picture: 'url'
    }
  }

  get messages () {
    return {
      'name.required': 'El nombre es requerido',
      'lastName.required': 'El apellido es requerido',
      'email.required': 'El correo es requerido',
      'email.email': 'El correo ingresado no es valido',
      'email.uniqueMongo': 'El correo ingresado ya ha sido registrado por otro usuario',
      'phone.number': 'El telefono debe contener solo numeros',
      'city.string': 'La ciudad debe contener solo letras',
      'country.string': 'El pais debe contener solo letras',
      'picture.url': 'La foto debe ser un url valido'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).json({ msg: errorMessages[0].message })
  }
}

module.exports = UpdateUser
