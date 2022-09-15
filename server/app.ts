import appRoot from 'app-root-path';
import express from "express";
import bodyParser from "body-parser";
import routes from './routes';
import cookieParser from 'cookie-parser';
import config from './config';
import { cache } from './services/cache';

// bootstrap user data
const userSeed = {
  email: 'frodo@baggins.com',
  fullName: 'Frodo Baggins',
  id: 1,
  password: '75d673cc8d9065a3629d9ab3f3ebbe62' // baggins1001
};

cache.set(`user-${userSeed.email}`, userSeed);

const app = express();

app.set("port", process.env.SERVER_PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  express.static(`${appRoot}/public`, {
    index: false
  })
);

app.use(
  express.static(`${appRoot}/dist/client`, {
    index: false
  })
);

app.use(cookieParser(config.cookieSecret));

routes(app);

app.listen(app.get("port"), () => {
  console.log(
    "App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("Press CTRL-C to stop\n");
});

export default app;
