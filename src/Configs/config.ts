// import path from "path";
// import dotenv from "dotenv";

// // Parsing the env file.
// dotenv.config({ path: path.resolve(__dirname, ".env") });
// console.log(process.env)
// // Interface to load env variables
// // Note these variables can possibly be undefined
// // as someone could skip these varibales or not setup a .env file at all

// interface ENV {
//   PORT: number | undefined;
//   MONGO_URI: string | undefined;
//   accountSid: string | undefined;
//   authToken: string | undefined;
//   twilioNumber: string | undefined;
// }

// interface Config {
//   PORT: number;
//   MONGO_URI: string;
//   accountSid: string;
//   authToken: string;
//   twilioNumber: string;
// }

// // Loading process.env as ENV interface

// const getConfig = (): ENV => {
//   return {
//     PORT: process.env.PORT ? Number(process.env.PORT) : 1258,
//     MONGO_URI: process.env.MONGO_URI,
//     accountSid: process.env.accountSid,
//     authToken: process.env.authToken,
//     twilioNumber: process.env.twilioNumber
//   };
// };

// // Throwing an Error if any field was undefined we don't 
// // want our app to run if it can't connect to DB and ensure 
// // that these fields are accessible. If all is good return
// // it as Config which just removes the undefined from our type 
// // definition.

// const getSanitzedConfig = (config: ENV): Config => {
//   for (const [key, value] of Object.entries(config)) {
//     if (value === undefined) {
//       throw new Error(`Missing key ${key} in config.env`);
//     }
//   }
//   return config as Config;
// };

// const config = getConfig();
// console.log(config)
// const sanitizedConfig = getSanitzedConfig(config);

// export default sanitizedConfig;










