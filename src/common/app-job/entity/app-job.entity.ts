import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'app_job',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class AppJobEntity extends Document {
  @Prop({ required: true, type: String })
  jobLevel: string;


  @Prop({ required: true, type: String })
  jobCode: string;

  @Prop({ required: false, type: String })
  jobName: string;

  @Prop({ required: false, type: String })
  message: string;

  @Prop({ required: false, type: String })
  ipAddress: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: Date })
  createdAt?: string;
}

export const AppJobSchema = SchemaFactory.createForClass(AppJobEntity);
