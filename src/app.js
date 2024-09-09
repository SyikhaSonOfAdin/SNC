require('dotenv').config();
const { companyRouter } = require('./routes/company');
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
    origin: 'https://snc.syikha.com', 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.send('<h1>Hi Your API is Available🚀</h1>')
})
app.use("/company", companyRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Server berjalan di port ${port} on http://localhost:${port}`);
});

