let dolci = require("../db/db.js");
const path = require("path");
const fs = require("fs")

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

// Delete
const deleteDolce = (req, res) => {
    const index = dolci.findIndex(d => d.slug === req.params.slug);
    if (index !== -1) {
        dolci.splice(index, 1);
        res.send({ message: 'Dolce eliminato' });
    } else {
        res.status(404).send({ message: 'Impossibile eliminare il dolce perché non trovato' });
    }
};

// Create
// Aggiungere il file
const updateDolci = (dolci) => {
    const filePath = path.join(__dirname, "../db/db.js");
    const content = `module.exports = ${JSON.stringify(dolci, null, 2)};`;
    fs.writeFileSync(filePath, content, "utf-8");
};

// Cancellare la foto
const deletePublicFile = (filename) => {
    const filePath = path.join(__dirname, "../public", filename);
    if (fs.existsSync(filePath));
}

const create = (req, res) => {
    // Creo il corpo
    const { title, content, image, tags } = req.body;
    // Controllo se NON esistono in tal caso ellimino la foto e i dati
    if (!title || title.replaceAll('/', "").trim().length == 0 || !content || !tags) {
        req.file?.filename && deletePublicfile(req.file.filename);
        return res.status(400).send("Mancano alcuni valori")
        // Controllo se il file esiste e se è una foto
    } else if (!req.file || !req.file.mimetype.includes("image")) {
        return res.status(400).send("immagine non inserita o non adatta")
    }
    // creo uno slug in base al titolo 
    const slug = (title) => {
        const baseSlug = title.replaceAll(' ', '-').toLowerCase().replaceAll('/', '');
        const slugs = dolci.map(p => p.slug);
        let counter = 1;
        let slug = baseSlug;
        while (slugs.includes(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        return slug;
    }

    updateDolci()
    res.send(`Il dolce ${title} è stato aggiunto al seguente link http://localhost:3000/dolci/${slug}`)

}

module.exports = {
    index,
    show,
    deleteDolce,
    create
};