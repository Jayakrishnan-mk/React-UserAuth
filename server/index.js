const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/AuthRoutes');

const adminAuthRoutes = require('./Routes/Ad_AuthRoutes');

const app = express();

app.listen(3001, () => {
    console.log("Server started on 3001");
})

mongoose
.connect("mongodb://localhost:27017/jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB Connected Successfully...");
})
    .catch(err => {
        console.log(err.message);
    })

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json());
app.use('/', authRoutes)
app.use('/admin', adminAuthRoutes)