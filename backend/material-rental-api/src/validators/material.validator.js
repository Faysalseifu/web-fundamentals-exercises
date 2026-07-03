const { z } = require('zod');

const createMaterialSchema = z.object({
  nameEn: z.string().min(3, "English name must be at least 3 characters"),
  nameAm: z.string().optional(),
  nameOr: z.string().optional(),
  nameSo: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionAm: z.string().optional(),
  descriptionOr: z.string().optional(),
  descriptionSo: z.string().optional(),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
  dailyRate: z.number().positive("Daily rate must be positive"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal(''))
});

const updateMaterialSchema = z.object({
  nameEn: z.string().min(3, "English name must be at least 3 characters").optional(),
  nameAm: z.string().optional(),
  nameOr: z.string().optional(),
  nameSo: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionAm: z.string().optional(),
  descriptionOr: z.string().optional(),
  descriptionSo: z.string().optional(),
  quantity: z.number().int().min(0, "Quantity cannot be negative").optional(),
  dailyRate: z.number().positive("Daily rate must be positive").optional(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal(''))
});

module.exports = {
  createMaterialSchema,
  updateMaterialSchema
};
