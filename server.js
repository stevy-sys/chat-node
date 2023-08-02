const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const { sequelize } = require('./models')
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const chatRoutes = require("./routes/chat.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const corsHandler = require("cors-handler").cors;
// const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://chat-vue-nine.vercel.app",
    "https://chat-vue-git-main-stevy-sys.vercel.app",
    "https://chat-8j9dtnxki-stevy-sys.vercel.app"
  ],
  allowedHeaders: ["Content-Type", "Authorization"],
  // origin:["*"],
  // credentials: true,
  // allowedHeaders: ["sessionId", "Content-Type"],
  // exposedHeaders: ["sessionId"],
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // preflightContinue: false,
  // maxAge: 3600
};
app.use(corsHandler(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://chat-vue-nine.vercel.app"); // Vous pouvez remplacer "*" par les origines autorisées si vous voulez limiter l'accès à certaines origines.
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Spécifiez les méthodes HTTP que vous voulez autoriser ici.
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(cookieParser());

app.use("*", checkUser); // pour tout route


app.get("/test", async (req, res) => {
  res.status(200).json({ data: "coucou" });
});
app.post("/test-post", async (req, res) => {
  res.status(200).json({ data: "post coucou" });
});

// routes
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", requireAuth, chatRoutes);

// server
app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: false })
  console.log(`Listening on port ${process.env.PORT}`);
});
