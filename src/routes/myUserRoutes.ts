import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/", jwtCheck, MyUserController.createCurrentUSer);
//First Checks if the token is valid or not then parse the token retrieves the auth id and user id in headers as next and then it validates the input
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

router.get("/",jwtCheck,jwtParse,MyUserController.getCurrentUser)

export default router;
