const mongoose = require('mongoose');
mongoose.plugin(require('meanie-mongoose-to-json'));

const Schema = mongoose.Schema;

const template = new Schema({
    templatename: { type: String, required: true },
    subject: { type: String, required: true },
    htmlcord: { type: String, required: false }
  }, {
    timestamps: false,
  });
  
  const Template = mongoose.model('Template', template);
  
  module.exports = Template;