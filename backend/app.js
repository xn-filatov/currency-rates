const express = require("express");
const axios = require("axios");

const { sequelize } = require("./database/sequelize");
const { User } = require("./database/Models/User");
const { formatDate, generateAccessToken } = require("./utils");
const { authenticateToken } = require("./middlewares");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const baseApiUrl = process.env.BASE_API_URL;
const apikey = process.env.API_KEY;

app.post("/users/:login/:password", async (req, res) => {
  const { login, password } = req.params;

  const users = await User.findAll();
  if (users.some((x) => x.login == login))
    return res.status(500).send("User with this login already exists");

  const newUser = await User.create({
    login: login,
    password: password,
  });

  res.send({ ...newUser, token: generateAccessToken(login) });
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

      dateFrom.setMonth(new Date().getMonth() - span);

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
