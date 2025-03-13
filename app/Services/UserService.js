'use strict';

const UserRepository = use('App/Repositories/UserRepository');
const Hash = use('Hash');

class UserService {
  async getAllUsers() {
    return await UserRepository.getAll();
  }

  async createUser(data) {
    return await UserRepository.create(data);
  }

  async login({ email, password, auth }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    const passwordValid = await Hash.verify(password, user.password);
    if (!passwordValid) {
      throw new Error('Senha incorreta');
    }
    
    return await auth.generate(user);
  }
}

module.exports = new UserService();
