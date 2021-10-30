const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const campSchema = new Schema({
    cmpname: { type: String, required: true },
    tempid: { type: String, required: true },
    listid: { type: String, required: true },
    status: { type: Boolean, required: true },
    size: { type: Number, required: false },
    sended: { type: Number, required: false }

  }, {
    timestamps: false,
  });
  
  const Camp = mongoose.model('Camp', campSchema);
  
  module.exports = Camp;