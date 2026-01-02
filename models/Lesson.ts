import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILesson extends Document {
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // в секундах
  order: number;
  courseId: mongoose.Types.ObjectId;
  resources: Array<{
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'file';
  }>;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Lesson description is required'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    order: {
      type: Number,
      required: [true, 'Lesson order is required'],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    resources: [{
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['pdf', 'link', 'file'],
        required: true,
      },
    }],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Индекс для сортировки уроков в курсе
LessonSchema.index({ courseId: 1, order: 1 });

const Lesson: Model<ILesson> =
  mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', LessonSchema);

export default Lesson;

