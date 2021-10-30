const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const listSchema = new Schema({
    listname: { type: String, required: true },
    list: []
  }, {
    timestamps: false,
  });
  
  const List = mongoose.model('List', listSchema);
  
  module.exports = List;