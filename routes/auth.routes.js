const { Router } = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const router = Router();

router.post(
  "/register",
  [
    check("email", " Некоректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res
          .status(400)
          .json({ message: `Ошибка при регистрации`, errors: errors.array() });
      }

      const { email, password } = req.body;

      const condidate = await User.findOne({ email });

      if (condidate) {
        return res
          .status(400)
          .json({ message: "Такой email уже зарегистрирован" });
      }

      const hashPassword = await bcryptjs.hash(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (e) {
      res.status(500).send("Что то работает не так, попробуйте снова");
    }
  }
);

router.post(
  "/login",
  [
    check("email", "email должен быть валидынй").isEmail(),
    check("password", "Введите праль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).send(`Ошибка при входе в систему${errors.array()}`);
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Логин или пароль не верен " });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecretKey"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что то работает не так, попробуйте снова" });
    }
  }
);

module.exports = router;
