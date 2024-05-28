let dolci = require("../db/db.js");
const path = require("path");
const fs = require ("fs")

// Index
const index = (req, res) => {
    res.format({
        html: () => {
            let html = '<ul>';
            dolci.forEach(p => {
                html += `<li>
                    <div>
                        <a href="http://localhost:3000/dolci/${p.slug}"><h3>${p.title}</h3></a>
                            <img width="200" src="http://localhost:3000/${p.image}" />
                            <p>${p.content}</p>
                            <p><strong>Ingredienti</strong>: ${p.tags.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
                        
                    </div>
                </li>`
            });
            html += '</ul>';
            res.send(html);
        }
    })
}

// Show
const show = (req, res) => {
    const dolce = dolci.find(d => d.slug === req.params.slug);
    if (dolce) {
        const i = dolce;
        let html = `<div>
            <h1>${i.title}</h1>
            <img width="200" src="http://localhost:3000/${i.image}" />
            <p>${i.content}</p>
            <p><strong>Ingredienti</strong>: ${i.tags.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
        </div>`
        res.send(html);
    } else {
        res.status(404).send({ message: 'Dolce non trovato' });
    }
};
module.exports = {
    index,
    show
};