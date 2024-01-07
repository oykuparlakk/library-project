import { getRepository, Repository } from "typeorm";
import { User } from "../entity/User";

export class UserService {
  async getUserDetails(userId: number) {
    const userRepository = getRepository(User);
  
    const userLoans = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.loans", "loan")
      .leftJoinAndSelect("loan.book", "book")
      .where("user.id = :userId", { userId })
      .groupBy("user.id, loan.returnedAt, book.id, loan.id")
      .addSelect("COUNT(loan.id) as loanCount")
      .addSelect("MAX(loan.returnedAt) as lastReturnDate")
      .getOne();
  
    const currentLoans =
      userLoans?.loans.filter((loan) => loan.returnedAt === null) || [];
    const pastLoans =
      userLoans?.loans.filter((loan) => loan.returnedAt !== null) || [];
  
    return {
      currentLoans,
      pastLoans,
    };
  }
  
  async createUser(email: string): Promise<User> {
    const userRepository = getRepository(User);
    const userData = { email };
    const newUser = userRepository.create(userData);
    return await userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    const userRepository = getRepository(User);
    return await userRepository.find();
  }
}
