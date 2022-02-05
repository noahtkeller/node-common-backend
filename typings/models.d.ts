interface IUserModel {
    checkExistence(email: string): Promise<boolean>;
    findById(userId: string): Promise<any>;
    findByUsername(username: string): Promise<any>;
    getSalt(password: string): string;
    hashPassword(password: string): string;
}

interface Models {
    user: IUserModel
}

export const models: Models;

interface Config {
    get(value: string): any
}

export const config: Config;
