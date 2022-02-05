export default async function findByEmail(email) {
    return this.findOne({ email }).exec();
}
