export default function overWritePassword(next) {
    if (this.isModified('password')) {
        this.password = this.schema.statics.hashPassword(this.password);
    }
    next();
}
