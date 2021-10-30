const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const deliverySchema = new Schema({
    host: { type: String, required: true },
    from: { type: String, required: true },
    port: { type: Number, required: true },
    protocol: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    size: { type: Number, required: true },
  }, {
    timestamps: true,
  });
  
  const Delivery = mongoose.model('Delivery', deliverySchema);
  
  module.exports = Delivery;