import {
  CreateUserResponse,
  GetAllUsersResponse,
  UserDetailsResponse,
} from "@/types/type";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { UserService } from "../services/user.services";

export class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const userDetails = await this.userService.getUserDetails(userId);

      const response: UserDetailsResponse = {
        message: "User details retrieved successfully.",
        userDetails,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void | Response> {
    try {
      await body("email")
        .isEmail()
        .withMessage("Please provide a valid email address.")
        .run(req);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validationErrorResponse = {
          errors: errors.array(),
        };
        return res.status(400).json(validationErrorResponse);
      }

      const { email } = req.body;
      const savedUser = await this.userService.createUser(email);

      const response: CreateUserResponse = {
        user: savedUser,
        message: "User created successfully!",
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        error: "An error occurred while creating the user. Please try again.",
      });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      const response: GetAllUsersResponse = {
        message: "User list retrieved successfully",
        users,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        error: "An error occurred while fetching the user list.",
      });
    }
  }
}
