const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const retiroRoutes = require("./routes/retiroRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express(); // ✅ Primero creamos 'app'

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/retiros", retiroRoutes);
app.use("/api/users", userRoutes);

// Conexión a MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => console.log("Error de conexión:", error));

