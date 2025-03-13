'use strict';

const User = use('App/Models/User');

class UserRepository {
  async getAll() {
    return await User.all();
  }

  async create(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findBy('email', email);
  }
}

module.exports = new UserRepository();
