const listService = require("../services/listServices");
const handleGetAll = async (req, res) => {
  const id = req.query;
  console.log(id);
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parameter",
      lists: {},
    });
  }
  const lists = await listService.getAllList(id);
  console.log(lists);

  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    lists,
  });
};
const handleCreateTodo = async (req, res) => {
  const data = req.body;
  console.log(data);

  if (!data) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }

  await listService.createNewTodo(data);

  return res.status(201).json({
    errCode: 0,
    errMessage: "Done",
  });
};
const handleEditTodo = async (req, res) => {
  const data = req.body;
  console.log(data);
  await listService.updateList(data);
  return res.status(200).json({
    errCode: 0,
    errMessage: "done",
  });
};

const handleDeleteTodo = async (req, res) => {
  const id = req.query.id;
  console.log(id);
  await listService.deleteTodoById(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "done",
  });
};
module.exports = {
  handleGetAll: handleGetAll,
  handleCreateTodo: handleCreateTodo,
  handleEditTodo: handleEditTodo,
  handleDeleteTodo: handleDeleteTodo,
};
