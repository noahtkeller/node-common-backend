import hashPasswordUtil from '../../../../utils/hash-password.js';

export default function hashPassword(password) {
    const salt = this.getSalt(password);
    return hashPasswordUtil(password, salt);
}
