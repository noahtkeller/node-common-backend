export default function verifyPassword(password) {
    return this.password === this.schema.statics.hashPassword(password)
}
