'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const users = await User.find();
    response.status(200).json(users)
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const user = request.only(['name', 'lastName', 'email', 'password', 'confirmPassword']);

    // Compare Passwords
    if(user.password !== user.confirmPassword) return response.status(400).send({ msg: 'Las contraseñas no concuerdan' });

    delete user['confirmPassword'];

    const newUser = new User(user);

    await newUser.save();

    return response.status(201).json(newUser);

  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const user = await User.findById(params.id);

    if(!user) return response.status(404).json({ msg: 'Usuario no encontrado' });
    
    return response.json(user);
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const userInfo = request.only(['name', 'lastName', 'email', 'picture', 'country', 'city', 'phone']);

    const user = await User.findById(params.id);

    if(!user) return response.status(404).json({ msg: 'Usuario no encontrado' });

    user.name = userInfo.name || user.name;
    user.lastName = userInfo.lastName || user.lastName;
    user.email = userInfo.email || user.email;
    user.picture = userInfo.picture || user.picture;
    user.city = userInfo.city || user.city;
    user.phone = userInfo.phone || user.phone;
    user.country = userInfo.country || user.country;

    const savedUser = await user.save();

    return response.status(201).json(savedUser);
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = await User.findById(params.id);
    await user.remove();
    return response.json({ msg: 'Usuario eliminado satisfactoriamente' });
  }
}

module.exports = UserController
