// Import Mongoose and its types
import { Document } from 'mongoose';

export interface ITodo extends Document {
    name: string;
    description: string;
    status: string;
  }