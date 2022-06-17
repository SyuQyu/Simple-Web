import express from "express";
import db from "./config/database.js";
import bodyParser from "body-parser"
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();
import dotenv from 'dotenv'

dotenv.config();
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

// app.use(cors());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// //NOTE PRODUCT TEMPLATE ROUTER
// import productRoutes from "./routes/productRoute.js";
// app.use('/products', productRoutes);

//NOTE ORDER ROUTER
import orderRoutes from "./routes/orderRoute.js";
app.use('/orders', orderRoutes);

//NOTE MEMBER ROUTER
import memberRoutes from "./routes/memberRoute.js";
app.use('/members', memberRoutes);

//NOTE TRANSAKSI ROUTER
import pembayaranRoutes from "./routes/pembayaranRoute.js";
app.use('/pembayaran', pembayaranRoutes);

//NOTE PAKET ROUTER
import paketRoutes from "./routes/paketRoute.js";
app.use('/paket', paketRoutes);

//NOTE LOGIN ROUTER
import loginRoutes from "./routes/loginRoute.js";
app.use('/login', loginRoutes);

//NOTE JENIS LAUNDRY ROUTER
import jenisLaundryRoutes from "./routes/jenisLaundryRoute.js";
app.use('/jenisLaundry', jenisLaundryRoutes);

app.listen(5000, () => console.log('Server running at port 5000'));