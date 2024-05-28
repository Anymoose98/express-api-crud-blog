const express = require('express');
const app = express();
app.use(express.static('public'));
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h1>Pagina iniziale</h1>')
})

app.listen(3000, () => {
    console.log(`Server http://localhost:3000`);
});