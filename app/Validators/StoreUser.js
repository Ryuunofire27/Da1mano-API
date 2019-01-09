'use strict'

class StoreUser {
  get rules () {
    return {
      name: 'required',
      lastName: 'required',
      email: 'required|email|uniqueMongo:users,email',
      password: 'required|min:8',
      confirmPassword: 'required|min:8'
    }
  }

  get messages () {
    return {
      'name.required': 'El nombre es requerido',
      'lastName.required': 'El apellido es requerido',
      'email.required': 'El correo es requerido',
      'email.email': 'El correo ingresado no es valido',
      'email.uniqueMongo': 'El correo ingresado ya ha sido registrado por otro usuario',
      'password.required': 'La contraseña es requerida',
      'password.min': 'La contraseña debe tener mas de 8 digitos',
      'confirmPassword.required': 'La contraseña de confirmación es requerida',
      'confirmPassword.min': 'La contraseña de confirmación debe tener mas de 8 digitos'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.json({ msg: errorMessages[0].message })
  }
}

module.exports = StoreUser
