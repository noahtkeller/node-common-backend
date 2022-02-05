import * as sinon from 'sinon';
import { default as assert, equal, notEqual } from 'assert/strict';
import { default as mongoose } from 'mongoose';
import { createHmac } from 'crypto';

import { beforeEachTest, afterEachTest, config, SECRET_SALT, mongoUrl, mongoOpts } from '../../../lib/mock.js';
import { userSchema } from '../../../../lib/models/mongoose/index.js';

const { Types: { ObjectId } } = mongoose;

// Add config object to schema statics as expected
Object.assign(userSchema.schema.statics, { config });

const sandbox = sinon.createSandbox();
const UserModel = mongoose.model(userSchema.name, userSchema.schema);

describe('Mongoose User Model', () => {

    before(async() => {
        await mongoose.connect(mongoUrl, mongoOpts);
    });

    after(async() => {
        await mongoose.disconnect();
    });

    beforeEach(async() => {
        await beforeEachTest();
        await UserModel.deleteMany({});
    });

    afterEach(async() => {
        sandbox.restore();
        await afterEachTest();
        await UserModel.deleteMany({});
    });

    describe('Static Methods', () => {
        describe('checkExistence', () => {
            it('should return true if the user exists', async() => {
                const user = new UserModel({ email: 'user', password: 'password' });
                await user.save();

                const actual = await UserModel.checkExistence(user._id);
                equal(actual, true);
            });

            it('should return false if the user does not exist', async() => {
                const userId = new ObjectId().toString();
                const actual = await UserModel.checkExistence(userId);
                equal(actual, false);
            });
        });

        describe('findById', () => {
            it('should return the user if it exists', async() => {
                const user = new UserModel({ email: 'user', password: 'password' });
                await user.save();

                const actual = await UserModel.findById(user._id);
                notEqual(actual, null);
            });

            it('should return null if the user does not exist', async() => {
                const userId = new ObjectId();
                const actual = await UserModel.findById(userId);
                equal(actual, null);
            });
        });

        describe('findByEmail', () => {
            it('should return the user if it exists', async() => {
                const user = new UserModel({ email: 'user', password: 'password' });
                await user.save();

                const actual = await UserModel.findByEmail('user');
                notEqual(actual, null);
            });

            it('should return null if the user does not exist', async() => {
                const userId = new ObjectId();
                const actual = await UserModel.findByEmail('user');
                equal(actual, null);
            });
        });

        describe('getSalt', () => {
            it('should do something', () => {
                const expected = createHmac('sha256', 'password').update(SECRET_SALT).digest('hex');

                const actual = UserModel.getSalt('password');

                equal(actual, expected);
            });
        });

        describe('hashPassword', () => {
            it('should create', () => {
                const salt = createHmac('sha256', 'password').update(SECRET_SALT).digest('hex');
                const expected = createHmac('sha256', salt).update('password').digest('hex');

                const actual = UserModel.hashPassword('password');

                equal(actual, expected);
            });
        });
    });

    describe('Instance Methods', () => {
        describe('verifyPassword', () => {
            it('should return true if the provided raw password is hashed to the document password', async() => {
                const user = new UserModel({ email: 'user', password: 'password' });
                await user.save();

                const verified = user.verifyPassword('password');
                assert(verified);
            });

            it('should return false if the provided raw password is not hashed to the document password', async() => {
                const user = new UserModel({ email: 'user', password: 'password' });
                await user.save();

                const verified = user.verifyPassword('password123');
                assert(!verified);
            });
        });
    });

    describe('Helper Methods', () => {
        describe('overWritePassword', () => {
            it('should over write the raw password with the internal hashPassword method results', async() => {
                sandbox.stub(UserModel.schema.statics, 'hashPassword').callThrough();

                const user = new UserModel({ email: 'user', password: 'password' });

                // Password is plain text before save
                equal(user.password, 'password');
                await user.save();

                sinon.assert.calledOnce(UserModel.schema.statics.hashPassword);
                // Password is altered after sace
                notEqual(user.password, 'password');
            });
        });
    });
});
