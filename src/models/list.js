var mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");

const list = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    time: { type: Date, default: Date.now },
    status: { type: Number },
    image: { type: String },
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);
mongoose.plugin(slug);

module.exports = mongoose.model("List", list);
