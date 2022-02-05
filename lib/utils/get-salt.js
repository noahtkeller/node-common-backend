import { createHmac } from 'crypto';

export default function getSalt(password, secret) {
    return createHmac('sha256', password).update(secret).digest('hex');
}
