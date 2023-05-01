const express = require("express");
const axios = require("axios");
const cors = require("cors");

const { sequelize } = require("./database/sequelize");
const { User } = require("./database/Models/User");
const { formatDate, generateAccessToken } = require("./utils");
const { authenticateToken } = require("./middlewares");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const baseApiUrl = process.env.BASE_API_URL;
const apikey = process.env.API_KEY;

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/users", async (req, res) => {
  const { login, password } = req.body;

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { login: login },
      defaults: { login: login, password: password },
    });

    if (!isCreated && user.password != password) {
      return res.status(403).send("Wrong password!");
    }

    res.send({ ...user, token: generateAccessToken(login) });
  } catch (error) {
    res.status(500).send("Internal error");
    console.log(error);
  }
});

app.get("/users/checkToken", authenticateToken, async (req, res) => {
  res.sendStatus(200);
});

app.get("/convert/:from/:to", authenticateToken, async (req, res) => {
  const { from, to } = req.params;
  try {
    let config = {
      headers: { apikey: apikey },
      params: {
        base_currency: from.toUpperCase(),
        currencies: to.toUpperCase(),
      },
    };

    const convertRes = await axios.get(`${baseApiUrl}latest`, config);

    res.send(convertRes.data.data);
  } catch (error) {
    res.status(500).send("Internal error");
    console.log(error);
  }
});

app.get("/todayrates/:from", authenticateToken, async (req, res) => {
  const { from } = req.params;
  try {
    const defaultCurrencies = "EUR,GBP,CAD,MXN,JPY";
    const currencies =
      from.toUpperCase() == "USD"
        ? defaultCurrencies
        : defaultCurrencies.replace(from.toUpperCase(), "USD");

    let config = {
      headers: { apikey: apikey },
      params: {
        base_currency: from.toUpperCase(),
        currencies: currencies,
      },
    };

    const ratesRes = await axios.get(`${baseApiUrl}latest`, config);

    res.send(ratesRes.data.data);
  } catch (error) {
    res.status(500).send("Internal error");
    console.log(error);
  }
});

app.get(
  "/historyrates/:from/:to/:span",
  authenticateToken,
  async (req, res) => {
    const { from, to, span } = req.params;
    try {
      const dateTo = new Date();
      const dateFrom = new Date();

      dateTo.setDate(new Date().getDay() - 1);

      dateFrom.setMonth(new Date().getMonth() - span);
      dateFrom.setDate(new Date().getDay() - 1);

      const dateToFormatted = formatDate(dateTo);
      const dateFromFormatted = formatDate(dateFrom);
      let config = {
        headers: { apikey: apikey },
        params: {
          date_from: dateFromFormatted,
          date_to: dateToFormatted,
          base_currency: from.toUpperCase(),
          currencies: to.toUpperCase(),
        },
      };

      const historyRes = await axios.get(`${baseApiUrl}historical`, config);

      res.send(historyRes.data.data);
    } catch (error) {
      res.status(500).send("Internal error");
      console.log(error);
    }
  }
);

app.listen(port, async () => {
  await sequelize.sync({ force: false });
  console.log(`App listening on port ${port}`);
});
