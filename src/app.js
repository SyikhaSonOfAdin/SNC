require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { isometricRouter } = require('./routes/isometric');
const { companyRouter } = require('./routes/company');
const { projectRouter } = require('./routes/project');
const { drawingRouter } = require('./routes/drawing');
const { jointRouter } = require('./routes/joint');
const { userRouter } = require('./routes/user');

const app = express();
const port = 3000;

const corsOptions = {
    origin: '*' || 'https://snc.syikha.com', 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

app.use("/isometric", isometricRouter)
app.use("/company", companyRouter)
app.use("/drawing", drawingRouter)
app.use("/project", projectRouter)
app.use("/joint", jointRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Server berjalan di port ${port} on http://localhost:${port}`);
});

