'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.get('/', () => {
    return { greeting: 'Hello world in JSON' }
  })
  
  Route.get('/hello', async () => {
    return { name: 'Hello World form Docker With AdonisJS'}
  })

  Route
    .resource('users', 'UserController')
    .validator(new Map([
      ['users.store', 'StoreUser'],
      ['users.show', 'ShowUser'],
      ['users.update', 'UpdateUser'],
      ['users.destroy', 'ShowUser']
    ]))
}).prefix('api/v1')