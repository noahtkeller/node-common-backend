import mongoose from 'mongoose';

import { name as schemaName, definition, options, statics, methods, helpers } from './index.js';

export const schema = new mongoose.Schema(definition, options);
export const name = schemaName;

Object.assign(schema.statics, statics);
Object.assign(schema.methods, methods);

schema.pre('save', helpers.overWritePassword);
