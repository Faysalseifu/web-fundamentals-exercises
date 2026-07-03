const authService = require('../services/auth.service');
const { registerSchema, loginSchema } = require('../validators/auth.validator');
const { ZodError } = require('zod');

exports.register = async (req, res) => {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    // Call service
    const { user, token } = await authService.register(validatedData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    // Call service
    const { user, token } = await authService.login(validatedData.email, validatedData.password);

    res.status(200).json({
      success: true,
      token,
      user
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(401).json({ success: false, message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // req.user is populated by the auth middleware
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
