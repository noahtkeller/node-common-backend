import mongoose from 'mongoose';

const { Types: { ObjectId } } = mongoose;

export default async function findById(userId) {
    return this.findOne({ _id: new ObjectId(userId) }).exec();
}
