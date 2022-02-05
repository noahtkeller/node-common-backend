import * as sinon from 'sinon';

export const sandbox = sinon.createSandbox();

export const SECRET_SALT = 'secret';

export const config = {
    get: sandbox.stub(),
};

export async function beforeEachTest() {
    config.get.withArgs('secrets:salt').returns(SECRET_SALT);
}

export async function afterEachTest() {
    sandbox.reset();
}

const { MONGO_HOST = 'localhost:27017' } = process.env;

export const mongoUrl = `mongodb://${MONGO_HOST}/test`;
export const mongoOpts = { useUnifiedTopology: true, useNewUrlParser: true };
