import { roles } from '@noahtkeller/common-strings/system';

export default {
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    publicKey: { type: String },
    totp: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, enum: Object.keys(roles), default: roles.user },
    preferences: {
        mfa: {
            totp: { type: Boolean, default: false },
            gpg: { type: Boolean, default: false },
        }
    }
};
