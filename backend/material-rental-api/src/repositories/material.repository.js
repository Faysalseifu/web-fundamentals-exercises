const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class MaterialRepository {
  async create(data) {
    return prisma.material.create({
      data
    });
  }

  async findAll() {
    return prisma.material.findMany();
  }

  async findById(id) {
    return prisma.material.findUnique({
      where: { id: parseInt(id, 10) }
    });
  }

  async findByNameEn(nameEn) {
    return prisma.material.findUnique({
      where: { nameEn }
    });
  }

  async update(id, data) {
    return prisma.material.update({
      where: { id: parseInt(id, 10) },
      data
    });
  }

  async delete(id) {
    return prisma.material.delete({
      where: { id: parseInt(id, 10) }
    });
  }
}

module.exports = new MaterialRepository();
