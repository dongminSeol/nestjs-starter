import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'app_logger',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class AppLoggerEntity extends Document {
  @Prop({ required: true, type: String })
  level: string;

  @Prop({ required: false, type: String })
  action: string;

  @Prop({ required: false, type: String })
  path?: string;

  @Prop({ required: false, type: Object })
  params?: Record<string, any>;

  @Prop({ required: false, type: Number })
  statusCode?: number;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: Date })
  createdAt?: string;
}

export const AppLoggerSchema = SchemaFactory.createForClass(AppLoggerEntity);
