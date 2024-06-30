const router = require("express").Router();

const authRouter = require("./auth-router");
const uploadRouter = require("./upload-router");
const financeiroRouter = require("./financeiro/financeiro-router");
const user = require("./user-router");
const logs = require("./logs-router");

const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", (req, res) => {
  res.status(200).json({ msg: "Sucesso!" });
});
router.use("/auth", authRouter);

router.use("/", authMiddleware);

router.use("/upload", uploadRouter);
router.use("/financeiro", financeiroRouter);

router.use("/user", user);
router.use("/logs", logs);

module.exports = router;
