import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Please provide name'],
    },
  },
  { timestamps: true }
);

const Image = mongoose.models.images || mongoose.model('images', imageSchema);
export default Image;
