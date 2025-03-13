'use strict';

const UserService = use('App/Services/UserService');

class UserController {
  async index({ response }) {
    try {
      console.log('Buscando todos os usuários...');
      const users = await UserService.getAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async store({ request, response }) {
    try {
      const data = request.only(['username', 'email', 'password']);
      console.log('Recebendo dados para criação de usuário:', data);
      const user = await UserService.createUser(data);
      console.log('Usuário criado com sucesso:', user);
      return response.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  async login({ request, auth, response }) {
    try {
      const { email, password } = request.only(['email', 'password']);
      console.log('Tentativa de login para:', email);
      const token = await UserService.login({ email, password, auth });
      console.log('Usuário autenticado com sucesso:', token);
      return response.status(200).json(token);
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      return response.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;
