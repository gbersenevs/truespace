import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  isActive: boolean;
  maxUses: number;
  currentUses: number;
  expiresAt?: Date;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: [true, 'Promo code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    maxUses: {
      type: Number,
      default: -1, // -1 означает неограниченное количество использований
    },
    currentUses: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: '',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Проверка доступности промокода
PromoCodeSchema.methods.isValid = function (): boolean {
  if (!this.isActive) return false;
  if (this.maxUses !== -1 && this.currentUses >= this.maxUses) return false;
  if (this.expiresAt && this.expiresAt < new Date()) return false;
  return true;
};

const PromoCode: Model<IPromoCode> =
  mongoose.models.PromoCode || mongoose.model<IPromoCode>('PromoCode', PromoCodeSchema);

export default PromoCode;

