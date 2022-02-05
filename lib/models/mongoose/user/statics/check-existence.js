import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

export default async function checkExistence(email) {
    const user = await this.findOne({ email }).exec();
    return user !== null;
}
