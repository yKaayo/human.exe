import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Título é obrigatório"],
    trim: true,
    maxlength: [200, "Título não pode ter mais que 200 caracteres"],
  },
  description: {
    type: String,
    required: [true, "Descrição é obrigatória"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Preço é obrigatório"],
    min: [0, "Preço não pode ser negativo"],
  },
  type: {
    type: String,
    required: [true, "Tipo é obrigatório"],
  },
  image: {
    type: String,
    required: [true, "Imagem é obrigatória"],
  },
  producerId: {
    type: Number,
    required: [true, "ID do produtor é obrigatório"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

export const ProductModel = mongoose.model("Product", ProductSchema);

class Product {
  constructor(body) {
    this.body = body;
    this.product = null;
  }

  validate() {
    const errors = [];

    if (!this.body.title || this.body.title.trim() === "") {
      errors.push("Título é obrigatório");
    }

    if (this.body.title && this.body.title.length > 200) {
      errors.push("Título não pode ter mais que 200 caracteres");
    }

    if (!this.body.description || this.body.description.trim() === "") {
      errors.push("Descrição é obrigatória");
    }

    if (this.body.price == null || isNaN(this.body.price)) {
      errors.push("Preço é obrigatório e deve ser numérico");
    } else if (this.body.price < 0) {
      errors.push("Preço não pode ser negativo");
    }

    if (!this.body.type || this.body.type.trim() === "") {
      errors.push("Tipo é obrigatório");
    }

    if (!this.body.image || this.body.image.trim() === "") {
      errors.push("Imagem é obrigatória");
    }

    if (!this.body.producerId || isNaN(this.body.producerId)) {
      errors.push("ID do produtor é obrigatório e deve ser numérico");
    }

    return errors;
  }

  async create() {
    try {
      const validationErrors = this.validate();
      if (validationErrors.length > 0) {
        throw new Error(`Dados inválidos: ${validationErrors.join(", ")}`);
      }

      this.product = await ProductModel.create({
        title: this.body.title.trim(),
        description: this.body.description.trim(),
        price: this.body.price,
        type: this.body.type,
        image: this.body.image.trim(),
        producerId: this.body.producerId,
      });

      return {
        success: true,
        data: this.product,
        message: "Produto criado com sucesso!",
      };
    } catch (err) {
      if (err.name === "ValidationError") {
        const mongooseErrors = Object.values(err.errors).map((e) => e.message);
        throw new Error(`Erro de validação: ${mongooseErrors.join(", ")}`);
      }

      if (err.code === 11000) {
        throw new Error("Já existe um produto com esse ID");
      }

      throw new Error(`Erro ao criar produto: ${err.message}`);
    }
  }

  static async findAll() {
    try {
      const products = await ProductModel.find().sort({ createdAt: -1 }).lean();

      return {
        success: true,
        data: products,
        count: products.length,
      };
    } catch (err) {
      throw new Error(`Erro ao buscar produtos: ${err.message}`);
    }
  }

  static async findById(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido");
      }

      const product = await ProductModel.findById(id).lean();

      if (!product) {
        throw new Error("Produto não encontrado");
      }

      return {
        success: true,
        data: product,
      };
    } catch (err) {
      throw new Error(`Erro ao buscar produto: ${err.message}`);
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

      this.product = await ProductModel.findByIdAndUpdate(
        id,
        {
          title: this.body.title.trim(),
          description: this.body.description.trim(),
          price: this.body.price,
          type: this.body.type,
          image: this.body.image.trim(),
          producerId: this.body.producerId,
          updatedAt: new Date(),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!this.product) {
        throw new Error("Produto não encontrado");
      }

      return {
        success: true,
        data: this.product,
        message: "Produto atualizado com sucesso!",
      };
    } catch (err) {
      throw new Error(`Erro ao atualizar produto: ${err.message}`);
    }
  }

  static async delete(id) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("ID inválido");
      }

      const deletedProduct = await ProductModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        throw new Error("Produto não encontrado");
      }

      return {
        success: true,
        message: "Produto deletado com sucesso!",
      };
    } catch (err) {
      throw new Error(`Erro ao deletar produto: ${err.message}`);
    }
  }
}

export default Product;
