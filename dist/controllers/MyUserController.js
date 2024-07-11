"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
/**
 * Creates a new user or returns an existing user based on the provided auth0Id.
 * @param req - The request object containing the auth0Id in the request body.
 * @param res - The response object used to send the response back to the client.
 */
const createCurrentUSer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const doesUserExist = yield user_1.default.findOne({
            auth0Id: auth0Id,
        });
        if (doesUserExist) {
            res.status(200).send();
        }
        else {
            const newUser = new user_1.default(req.body);
            yield newUser.save();
            res.status(201).json(newUser.toObject());
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating user" });
    }
});
const updateCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, addressLine1, country, city } = req.body;
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.addressLine1 = addressLine1;
        user.country = country;
        user.city = city;
        yield user.save();
        res.send(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        // const response = {
        //   email: user?.email,
        //   name: user?.name,
        //   addressLine1: user?.addressLine1,
        //   city: user?.city,
        //   country: user?.country,
        // };
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error in fetching user data" });
    }
});
exports.default = {
    createCurrentUSer,
    updateCurrentUser,
    getCurrentUser,
};
