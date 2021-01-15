import UserModel, { User } from '../models/user';

export const create = async (data: User) => {
    return UserModel.create(data);
}

export const findByEmail = async (email: string) => {
    return UserModel.findOne({ email }).exec();
}

export const findById = async (id: string) => {
    return UserModel.findById(id).exec();
}
