import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";
const router = Router();

router.post("/", userController.createUser);
router.get("/", auth("Contributor", "Maintainer"), userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
export default router;
