const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: String,
  picType: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  uploader: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const ModelClass = mongoose.model('File', fileSchema);

module.exports = ModelClass;
