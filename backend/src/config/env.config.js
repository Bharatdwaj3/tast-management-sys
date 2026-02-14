import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noblese';

const JWT_REF_SECRECT = process.env.JWT_REF_SECRECT || 'defaultjwtsecret';
const JWT_REF_EXPIRES_IN = process.env.JWT_REF_EXPIRES_IN || '1d';

const JWT_ACC_SECRECT = process.env.JWT_ACC_SECRECT || 'defaultjwtsecret';
const JWT_ACC_EXPIRES_IN = process.env.JWT_ACC_EXPIRES_IN || '15m';


export {
    PORT, MONGO_URI,
    JWT_ACC_EXPIRES_IN, JWT_ACC_SECRECT, JWT_REF_EXPIRES_IN, JWT_REF_SECRECT,
};