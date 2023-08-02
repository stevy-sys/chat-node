const express = require("express");
// require("dotenv").config({ path: "./config/.env" });
// const { sequelize } = require('./models')
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
// require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chat-vue-nine.vercel.app",
    "https://chat-vue-git-main-stevy-sys.vercel.app",
    "https://chat-8j9dtnxki-stevy-sys.vercel.app"
  ],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
// app.use("*", checkUser); // pour tout route
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// })



app.get("/test", async (req, res) => {
  res.status(200).json({ data: "coucou" });
});

// app.post("/verif-conversation", async (req, res) => {
//     res.status(200).send({data});
// });

// routes
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", requireAuth, chatRoutes);

// server
app.listen(5000, () => {
  // await sequelize.sync({ force: false })
  console.log(`Listening on port ${5000}`);
});
