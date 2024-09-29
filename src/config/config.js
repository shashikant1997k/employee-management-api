const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB base url'),
    MAIN_DB: Joi.string().required().description('main db name'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    BASE_URL: Joi.string().description('Local base url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoDbUrl: envVars.MONGODB_URL,
  mainDB: envVars.MAIN_DB,
  mongoose: {
    url: `${envVars.MONGODB_URL}/${envVars.MAIN_DB}${envVars.NODE_ENV === 'test' ? '-test' : ''}`,
    options: {
      serverSelectionTimeoutMS: 5000, // Increase this value as needed
    },
  },
  localURL: envVars.BASE_URL
};
