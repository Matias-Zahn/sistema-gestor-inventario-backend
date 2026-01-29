import { AuthDataSource, RegisterDTO, UserEntity } from "../../domain";

export class MongoAuthDatasource implements AuthDataSource {
    register(registerDto: RegisterDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }
    login(registerDto: RegisterDTO): Promise<UserEntity> {
        throw new Error("Method not implemented.");
    }




}