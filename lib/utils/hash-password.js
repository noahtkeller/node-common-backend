import { createHmac } from 'crypto';

export default function hashPassword(password, salt) {
    return createHmac('sha256', salt.trim()).update(password.trim()).digest('hex');
}
