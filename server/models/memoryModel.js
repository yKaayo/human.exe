import mongoose from "mongoose";

const MemorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: [true, "Título é obrigatório"],
    trim: true,
    maxlength: [200, "Título não pode ter mais que 200 caracteres"],
  },
  memory: {
    type: String,
    required: [true, "Memória é obrigatória"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const MemoryModel = mongoose.model("Memory", MemorySchema);

class Memory {
  constructor(body) {
    this.body = body;
    this.memoryItem = null;
  }

  validate() {
    const errors = [];

    if (!this.body.id || isNaN(this.body.id)) {
      errors.push("ID é obrigatório");
    }

    if (!this.body.title || this.body.title.trim() === "") {
      errors.push("Título é obrigatório");
    }

    if (!this.body.memory || this.body.memory.trim() === "") {
      errors.push("Memória é obrigatória");
    }

    if (this.body.title && this.body.title.length > 200) {
      errors.push("Título não pode ter mais que 200 caracteres");
    }

    return errors;
  }

  async create() {
    try {
      const validationErrors = this.validate();
      if (validationErrors.length > 0) {
        throw new Error(`Dados inválidos: ${validationErrors.join(", ")}`);
      }

      this.memoryItem = await MemoryModel.create({
        id: this.body.id,
        title: this.body.title.trim(),
        memory: this.body.memory.trim(),
      });

      return {
        success: true,
        data: this.memoryItem,
        message: "Memória criada com sucesso!",
      };
    } catch (err) {
      if (err.name === "ValidationError") {
        const mongooseErrors = Object.values(err.errors).map((e) => e.message);
        throw new Error(`Erro de validação: ${mongooseErrors.join(", ")}`);
      }

      if (err.code === 11000) {
        throw new Error("Já existe uma memória com esses dados");
      }

      throw new Error(`Erro ao criar memória: ${err.message}`);
    }
  }

  static async findAll() {
    try {
      const memories = await MemoryModel.find().sort({ createdAt: -1 }).lean();

      return {
        success: true,
        data: memories,
        count: memories.length,
      };
    } catch (err) {
      throw new Error(`Erro ao buscar memórias: ${err.message}`);
    }
  }

  async findById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido");
      }

      const memory = await MemoryModel.findById(id).lean();

      if (!memory) {
        throw new Error("Memória não encontrada");
      }

      return {
        success: true,
        data: memory,
      };
    } catch (err) {
      throw new Error(`Erro ao buscar memória: ${err.message}`);
    }
  }

  async update(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido");
      }

      const validationErrors = this.validate();
      if (validationErrors.length > 0) {
        throw new Error(`Dados inválidos: ${validationErrors.join(", ")}`);
      }

      this.memoryItem = await MemoryModel.findByIdAndUpdate(
        id,
        {
          title: this.body.title.trim(),
          memory: this.body.memory.trim(),
          updatedAt: new Date(),
        },
        {
          new: true, // Retorna o documento atualizado
          runValidators: true, // Executa as validações do schema
        }
      );

      if (!this.memoryItem) {
        throw new Error("Memória não encontrada");
      }

      return {
        success: true,
        data: this.memoryItem,
        message: "Memória atualizada com sucesso!",
      };
    } catch (err) {
      throw new Error(`Erro ao atualizar memória: ${err.message}`);
    }
  }

  async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido");
      }

      const deletedMemory = await MemoryModel.findByIdAndDelete(id);

      if (!deletedMemory) {
        throw new Error("Memória não encontrada");
      }

      return {
        success: true,
        message: "Memória deletada com sucesso!",
      };
    } catch (err) {
      throw new Error(`Erro ao deletar memória: ${err.message}`);
    }
  }
}

export default Memory;
