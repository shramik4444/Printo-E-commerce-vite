require("dotenv").config();
const express = require("express");
const cors = require("cors");

const AdminproductRoutes = require("./Routes/Admin/AdminProductRoutes");
const authRoutes = require("./Routes/Auth.routes");
const publicproductRoutes = require('./Routes/Public/PublicProductRoutes');

//const getCart = require('../Backend/Routes/CartRoutes');




const app = express();

app.use(cors());
app.use(express.json()); // ❗ THIS WAS MISSING
app.use(express.urlencoded({ extended: true }));



app.use("/admin", AdminproductRoutes);
app.use('/apparel', publicproductRoutes);
app.use("/auth", authRoutes);
app.use("/cart", require('./Routes/CartRoutes'));






//app.use("/orders", require('./Routes/OrdersRoutes'));





const PORT = 5002;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});