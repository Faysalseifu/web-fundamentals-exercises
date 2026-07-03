const materialRepository = require('../repositories/material.repository');

class MaterialService {
  async create(data) {
    // Check for duplicate name
    const existingMaterial = await materialRepository.findByNameEn(data.nameEn);
    if (existingMaterial) {
      throw new Error('Material already exists');
    }

    // Business rule: availableQty starts equal to quantity
    const materialData = {
      ...data,
      availableQty: data.quantity
    };

    return materialRepository.create(materialData);
  }

  async findAll() {
    return materialRepository.findAll();
  }

  async findById(id) {
    const material = await materialRepository.findById(id);
    if (!material) {
      throw new Error('Material not found');
    }
    return material;
  }

  async update(id, data) {
    // Check if it exists
    const material = await materialRepository.findById(id);
    if (!material) {
      throw new Error('Material not found');
    }

    // Check for duplicate name if nameEn is being changed
    if (data.nameEn && data.nameEn !== material.nameEn) {
      const existingMaterial = await materialRepository.findByNameEn(data.nameEn);
      if (existingMaterial) {
        throw new Error('Material with this name already exists');
      }
    }

    // Optional business rule: if quantity is updated, we might need to adjust availableQty, 
    // but for simple CRUD without rentals yet, we can just let it update quantity.
    // If availableQty is not provided but quantity is, update availableQty relative to the change.
    const updateData = { ...data };
    if (data.quantity !== undefined) {
      const difference = data.quantity - material.quantity;
      updateData.availableQty = material.availableQty + difference;
      
      if (updateData.availableQty < 0) {
        throw new Error('Quantity cannot be reduced below current active rentals');
      }
    }

    return materialRepository.update(id, updateData);
  }

  async delete(id) {
    // Check if it exists
    const material = await materialRepository.findById(id);
    if (!material) {
      throw new Error('Material not found');
    }

    // TODO: Business rule: Check if material has active rentals
    // if (material has active rentals) {
    //   throw new Error('Material cannot be deleted because it is currently rented.');
    // }

    return materialRepository.delete(id);
  }
}

module.exports = new MaterialService();
