import { Request, Response } from "express";
import User from "../models/user";

/**
 * Creates a new user or returns an existing user based on the provided auth0Id.
 * @param req - The request object containing the auth0Id in the request body.
 * @param res - The response object used to send the response back to the client.
 */
const createCurrentUSer = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const doesUserExist = await User.findOne({
      auth0Id: auth0Id,
    });
    if (doesUserExist) {
      res.status(200).send();
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser.toObject());
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.userId });
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in fetching user data" });
  }
};

export default {
  createCurrentUSer,
  updateCurrentUser,
  getCurrentUser,
};
