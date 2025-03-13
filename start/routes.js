'use strict';

const Route = use('Route');

Route.group(() => {
  Route.get('users', 'UserController.index'); // Listar usuários
  Route.post('users', 'UserController.store'); // Criar usuário
  Route.post('login', 'UserController.login'); // Autenticar usuário
}).prefix('api');
