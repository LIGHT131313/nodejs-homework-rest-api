import contactService from "../models/contacts/index.js";

import { HttpError } from "../helpers/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contact-schemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactService.listContacts();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactService.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, add, updateById, deleteById };
