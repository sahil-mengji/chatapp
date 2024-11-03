import express from "express";

import Auth from "../middleware/AuthMiddleware.js";
import { SearchContact } from "../controllers/contact.controllers.js";

const contactRouter = express.Router();

contactRouter.post("/search", SearchContact);
export default contactRouter;
