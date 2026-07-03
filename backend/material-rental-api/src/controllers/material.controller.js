const materialService = require('../services/material.service');
const { createMaterialSchema, updateMaterialSchema } = require('../validators/material.validator');
const { ZodError } = require('zod');

exports.create = async (req, res, next) => {
  try {
    const validatedData = createMaterialSchema.parse(req.body);
    const material = await materialService.create(validatedData);
    res.status(201).json({
      success: true,
      message: "Material created successfully",
      data: material
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    if (error.message === 'Material already exists') {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const materials = await materialService.findAll();
    res.status(200).json({
      success: true,
      data: materials
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const material = await materialService.findById(req.params.id);
    res.status(200).json({
      success: true,
      data: material
    });
  } catch (error) {
    if (error.message === 'Material not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const validatedData = updateMaterialSchema.parse(req.body);
    const material = await materialService.update(req.params.id, validatedData);
    res.status(200).json({
      success: true,
      message: "Material updated successfully",
      data: material
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    if (error.message === 'Material not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === 'Material with this name already exists' || error.message.includes('Quantity cannot be reduced')) {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await materialService.delete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Material deleted successfully"
    });
  } catch (error) {
    if (error.message === 'Material not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message === 'Material cannot be deleted because it is currently rented.') {
      return res.status(409).json({ success: false, message: error.message });
    }
    next(error);
  }
};
