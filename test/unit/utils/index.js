import { createHmac } from 'crypto';
import { equal, deepEqual } from 'assert/strict';

import { hashPassword, getSalt, i18next } from '../../../lib/utils/index.js';
import { afterEachTest, beforeEachTest } from "../../lib/mock.js";

describe('utils', () => {

    beforeEach(async() => {
        await beforeEachTest();
    });

    afterEach(async() => {
        await afterEachTest();
    });

    describe('getSalt', () => {
        it('should create an sha256 hash of our secret using the provided password as a salt', () => {
            const expected = createHmac('sha256', 'password').update('secret').digest('hex');
            const actual = getSalt('password', 'secret');
            equal(actual, expected);
        });
    });

    describe('hashPassword', () => {
        it('should create an sha256 hash of the provided password using the provided salt', () => {
            const expected = createHmac('sha256', 'salt').update('password').digest('hex');
            const actual = hashPassword('password', 'salt');
            equal(actual, expected);
        });
    });

    describe('i18next', () => {
        let i18n;
        before(async() => {
            const fooResource = { en: { foo: { hello: 'Hello' } }, es: { foo: { hello: 'Hola' } } };
            const barResource = { en: { bar: { world: 'World' } }, es: { bar: { world: 'Mundo' } } };
            i18n = await i18next({ defaultNS: 'foo' }, fooResource, barResource);
        });

        it('should set fallback language to english if none is provided', async() => {
            deepEqual(i18n.options.fallbackLng, ['en']);
        });

        it('should pass in i18next configuration values', async() => {
            equal(i18n.options.defaultNS, 'foo');
        });

        it('should use the default language and namespace', async() => {
            equal(i18n.t('hello'), 'Hello');
        });

        it('should recognize other namespaces', async() => {
            equal(i18n.t('bar:world'), 'World');
        });

        it('should recognize other languages', async() => {
            await i18n.changeLanguage('es');

            equal(i18n.t('hello'), 'Hola');
        });

        it('should recognize other languages\' namespaces', async() => {
            await i18n.changeLanguage('es');

            equal(i18n.t('bar:world'), 'Mundo');
        });
    });
});
