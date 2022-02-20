import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status || 500,
    },
  });
});
const { MONGO_URL, PORT, DB_NAME } = process.env;
mongoose
  .connect(MONGO_URL, {
    dbName: DB_NAME,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on ${PORT}..... `);
    });
  })
  .catch((error) => {
    console.log(error);
    console.log("Backend failed isn't running.....");
  });

mongoose.connection.on(() => {
  console.log("Backend is running very successfully");
});
