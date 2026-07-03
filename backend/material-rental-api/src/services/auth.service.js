const userRepository = require('../repositories/user.repository');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

class AuthService {
  async register(userData) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    // Hash the password
    const hashedPassword = await hashPassword(userData.password);

    // Create user
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword
    });

    // Remove password before returning
    const { password, ...userWithoutPassword } = newUser;

    // Generate JWT
    const token = generateToken({
      userId: newUser.id,
      role: newUser.role,
      email: newUser.email
    });

    return { user: userWithoutPassword, token };
  }

  async login(email, password) {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Remove password before returning
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT
    const token = generateToken({
      userId: user.id,
      role: user.role,
      email: user.email
    });

    return { user: userWithoutPassword, token };
  }
}

module.exports = new AuthService();
