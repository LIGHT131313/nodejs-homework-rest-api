import express from "express";

import contactsControllers from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post("/", isEmptyBody, contactsControllers.add);

contactsRouter.delete("/:id", contactsControllers.deleteById);

contactsRouter.put("/:contactId", isEmptyBody, contactsControllers.updateById);

export default contactsRouter;
