import { salt } from '@noahtkeller/common-strings/config/secrets';

import getSaltUtil from '../../../../utils/get-salt.js';

export default function getSalt(password) {
    const secret = this.config.get(salt);
    return getSaltUtil(password, secret);
}
