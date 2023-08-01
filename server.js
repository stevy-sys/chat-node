const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const {sequelize ,Conversation,Membre,Message,User} = require('./models')
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
// require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(express.json());
app.use(cors(corsOptions));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// jwt
app.use("*", checkUser); // pour tout route
// app.get("/jwtid", requireAuth, (req, res) => {
//   res.status(200).send(res.locals.user._id);
// })



// app.post("/all-conversation", async (req, res) => {
//     res.status(200).send({data});
// });

// app.post("/verif-conversation", async (req, res) => {
//     res.status(200).send({data});
// });

// routes
app.use("/api/user",requireAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat",requireAuth, chatRoutes);

// server
app.listen(process.env.PORT, async () => {
    await sequelize.sync({force:false})
    console.log(`Listening on port ${process.env.PORT}`);
});
