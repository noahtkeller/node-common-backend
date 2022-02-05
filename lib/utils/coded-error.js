import errorFactory from 'error-factory';
import { internal_server_error } from '@noahtkeller/common-strings/i18n/keys/errors';

export default errorFactory('CodedError', { code: 500, message: internal_server_error });
