// const redis = require("./../../utilitie/Redis/RedisRepository");
// const { OkObjectResult } = require("./../../core/api/ApiRespose");


// export default new class RedisMiddllware {
//   Cache(req, res, next) {

//     redis.Get(req.path).then((response) => {
//       if (response !== null) {
//         new OkObjectResult(response).Send(res);
//       } else {
//         next();
//       }
//     }).catch((error) => {
//       throw new Error(error)
//     })
//   }

// };
