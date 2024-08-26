const { default: mongoose } = require("mongoose");
const List = require("../models/list");
const getAllList = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lists;
      if (id === "ALL") {
        lists = await List.find({});
      } else {
        // Kiểm tra nếu id là một đối tượng, thì trích xuất giá trị id từ đối tượng
        if (typeof id === "object" && id.id === "ALL") {
          lists = await List.find({});
        } else {
          lists = await List.findOne({ _id: id }).exec();
        }
      }
      resolve(lists);
    } catch (error) {
      reject(error);
    }
  });
};

// description: { type: String },
//     time: { type: Date, default: Date.now },
//     status: { type: Number },
//     image: { type: String },
//     slug: { type: String, slug: "title", unique: true },
const createNewTodo = (data) => {
  return new Promise(async (resolve, reject) => {
    const newList = new List({
      title: data.title,
      description: data.description,
      time: data.time,
      status: data.status,
      image: data.image,
      slug: data.name,
    });
    try {
      const saveList = await newList.save();
      resolve(saveList);
    } catch (error) {
      reject(error);
    }
  });
};

const updateList = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedList = await List.findByIdAndUpdate(
        data._id,
        {
          title: data.title,
          description: data.description,
          time: data.time,
          status: data.status,
          image: data.image,
          slug: data.slug, // Kiểm tra lại trường này, có thể sai chính tả "name"
        },
        { new: true }
      );

      if (updatedList) {
        console.log("Updated document:", updatedList);
        resolve(updatedList);
      } else {
        console.log("Document not found.");
        resolve(null); // Trả về null nếu không tìm thấy tài liệu
      }
    } catch (error) {
      console.error("Error updating document:", error);
      reject(error); // Đảm bảo rằng lỗi được trả về nếu có lỗi xảy ra
    }
  });
};

const deleteTodoById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ObjectId.");
      }
      const deleted = await List.findByIdAndDelete(id);
      resolve(deleted);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAllList: getAllList,
  createNewTodo: createNewTodo,
  updateList: updateList,
  deleteTodoById: deleteTodoById,
};
