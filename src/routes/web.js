const express = require("express");
const listController = require("../controller/listController");
const router = express.Router();
const initWebRouter = (app) => {
  router.get("/api/list", listController.handleGetAll);
  router.post("/api/create-todo", listController.handleCreateTodo);
  router.put("/api/edit-todo", listController.handleEditTodo);
  router.delete("/api/delete-todo", listController.handleDeleteTodo);
  return app.use("/", router);
};
module.exports = initWebRouter;
