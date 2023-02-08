import {ITodo} from '../types/todos';
import {model, Schema} from 'mongoose';

const todoSchema = new Schema ({
 name:{
    type: String,
    required: true
 },
 description: {
    type: String,
    required: true
 },
 status: {
    type: Boolean,
    required: true
 }
},
{timestamps: true}
)
export default model<ITodo>('Todo', todoSchema);