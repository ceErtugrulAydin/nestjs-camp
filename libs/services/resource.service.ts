import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose'; // 1. InjectModel import edildi.
import { AuditModel } from 'tools/models/audit.model';

export class ResourceService<
  T extends object,
  C extends object,
  U extends Partial<T>,
> {
  constructor(
    @InjectModel('ModelName') private readonly mongoModel: Model<T>,
  ) {}

  async create(model: C): Promise<T> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();

    // Spread operatörü için model ve audit artık object tipinde.
    const createdModel = new this.mongoModel({ ...model, ...audit });

    // Kaydetmeden sonra dokümanı plain objeye dönüştürüyoruz.
    const saved = await createdModel.save();
    return saved.toObject() as T;
  }

  async findAll(): Promise<T[]> {
    const docs = await this.mongoModel.find().lean().exec();
    return docs as T[];
  }

  async findOne(id: string): Promise<T | null> {
    return await this.mongoModel.findById(id).lean<T>().exec();
  }

  async delete(id: string): Promise<T | null> {
    return await this.mongoModel.findByIdAndDelete(id).lean<T>().exec();
  }

  async update(id: string, dto: U): Promise<T | null> {
    // dto'nun tipi artık U extends Partial<T> olduğundan UpdateQuery ile uyumlu hale geliyor.
    const updatedDto = await this.mongoModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean<T>()
      .exec();
    return updatedDto;
  }
}
