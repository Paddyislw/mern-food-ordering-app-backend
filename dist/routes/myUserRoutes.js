"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MyUserController_1 = __importDefault(require("../controllers/MyUserController"));
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
router.post("/", auth_1.jwtCheck, MyUserController_1.default.createCurrentUSer);
//First Checks if the token is valid or not then parse the token retrieves the auth id and user id in headers as next and then it validates the input
router.put("/", auth_1.jwtCheck, auth_1.jwtParse, validation_1.validateMyUserRequest, MyUserController_1.default.updateCurrentUser);
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, MyUserController_1.default.getCurrentUser);
exports.default = router;
