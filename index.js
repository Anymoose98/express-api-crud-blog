const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;
const dolciRouter = require("./routers/dolciRouters.js")


// Pagina iniziale
app.get('/', (req, res) => {
    res.send('<h1>Pagina iniziale</h1>')
})

app.use('/dolci', dolciRouter)

app.listen(3000, () => {
    console.log(`Server http://localhost:3000`);
});