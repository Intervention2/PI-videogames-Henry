//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require ('axios');
const { Genre } = require('./src/db.js');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}).then(() => {
  arrancarSv()
}).catch(function(){
  console.log("Ocurrio un error")
})

async function arrancarSv(){
  const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=70b52808113d4969a917920641fadfd9`)
  const genres = genreApi.data.results.map(el => el.name)
  await Promise.all(genres.map(async (el) => {
      return await Genre.findOrCreate({
          where: { name : el}
      })
  }))  
}