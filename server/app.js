import express from 'express'
import cors from 'cors'
import applicationRoutes from './routes/applicationRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js'
import dashboardRoutes from "./routes/dashboardRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// const allowedOrigin =
//     process.env.NODE_ENV === "production"
//         ? process.env.CLIENT_URL
//         : "http://localhost:5173";

// // Middleware
// app.use(
//     cors({
//         origin: allowedOrigin,
//         credentials: true,
//     })
// );

const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL,
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin)
            ) {
                callback(null, true);
            } else {
                callback(
                    new Error("CORS blocked")
                );
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/applications", applicationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Routes
app.get('/', (req, res) => {
    res.send('API is running...')
})
app.use(errorMiddleware);

export default app