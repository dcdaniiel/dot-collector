const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log('PORT: ', process.env.PORT);
});
