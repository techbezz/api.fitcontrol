const router = require("express").Router();

const authRouter = require("./auth-router");
const uploadRouter = require("./upload-router");
const financeiroRouter = require("./financeiro/financeiro-router");
const user = require("./user-router");
const logs = require("./logs-router");

const authMiddleware = require("../middlewares/auth-middleware");
const { db } = require("../../mysql");


function getUsers(vaiDarErro) {
  return new Promise(async function (resolve, reject) {
    try {
      if (vaiDarErro) {
        throw new Error('Deu erro...')
      }

      const [users] = await db.execute(`SELECT * FROM users`)

      resolve(users)
    } catch (error) {
      reject(error)
    }
  })
}

function updateUser(req) {
  return new Promise(async function (resolve, reject) {
    try {
      const {id, nome, email} = req.body

      await db.execute(`UPDATE users SET nome = ?, email = ? WHERE id = ?`, [nome, email, id])

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}
router.post("/update-user", async (req, res) => {
  try {
    await updateUser(req)
    res.status(200).json({ message: 'successo' });
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
  
});

router.get("/", async (req, res) => {
  try {
    const users = await getUsers(false)
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
});

router.post("/", async (req, res) => {
  const users = await getUsers(false)
  res.status(200).json({ users });
});

router.use("/auth", authRouter);

router.use("/", authMiddleware);

router.use("/upload", uploadRouter);
router.use("/financeiro", financeiroRouter);

router.use("/user", user);
router.use("/logs", logs);

module.exports = router;
