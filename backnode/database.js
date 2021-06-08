/* const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true
})
.then(db=>console.log('DB conectada'))
.catch(err=>console.error(err));


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.6wt76.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e)) */

const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin_db',
    host: 'localhost',
    database: 'postgres_db',
    password: 'admin_12345678',
    port: 5432,
});

const getPerson = (request, response) => {
    pool.query('SELECT * FROM person ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM person WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPerson = (request, response) => {
    const { fullname, birth } = request.body

    pool.query('INSERT INTO person (fullname, birth) VALUES ($1, $2)', [fullname, birth], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`persona agregada con ID: ${result.insertId}`)
    })
}

const getPersonFather = (request, response) => {
    pool.query('SELECT * FROM person_father ORDER BY id_father ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonFatherById = (request, response) => {
    const id_father = parseInt(request.params.id_father)

    pool.query('SELECT * FROM person_father WHERE id_father = $1', [id_father], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPersonFather = (request, response) => {
    const { id_child, id_father } = request.body

    pool.query('INSERT INTO person_father VALUES ($1, $2)', [id_child, id_father], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`padre agregado con ID: ${result.insertId}`)
    })
}

const getPersonMother = (request, response) => {
    pool.query('SELECT * FROM person_mother ORDER BY id_mother ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonMotherById = (request, response) => {
    const id_mother = parseInt(request.params.id)

    pool.query('SELECT * FROM person_mother WHERE id_mother = $1', [id_mother], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPersonMother = (request, response) => {
    const { id_child, id_mother } = request.body

    pool.query('INSERT INTO person_mother (fullname, birth) VALUES ($1, $2)', [id_child, id_mother], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Madre agregada con ID: ${result.insertId}`)
    })
}

const getPersonChildren = (request, response) => {
    pool.query('SELECT * FROM person_children ORDER BY id_child ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getPersonChildrenById = (request, response) => {
    const id_child = parseInt(request.params.id)

    pool.query('SELECT * FROM person_children WHERE id_child = $1', [id_child], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPersonChildren = async (request, response) => {
    const { birth, id_mother, id_father, fullname } = request.body
    await pool.query('SELECT id_child FROM person_children INNER JOIN person ON person.id=person_children.id_child WHERE person_children.id_father=$1 AND person_children.id_mother=$2 AND person.fullname=$3 AND person.birth=$4', [id_father, id_mother, fullname, birth], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rowCount > 0) {
            return response.status(400).json({ error: 'Hijo creado' })
        }else{
            pool.query('INSERT INTO person (fullname, birth) VALUES ($1, $2) RETURNING id', [fullname, birth], (error, results) => {
                if (error) {
                    throw error
                }
                pool.query('INSERT INTO person_children VALUES ($1, $2, $3)', [results.rows[0].id, id_mother, id_father], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(200).json({ success: 'Hijo agregado' });
                })
            })
        }
    })

    

    /*  pool.query('INSERT INTO person_children VALUES ($1, $2, $3)', [id_child, id_mother, id_father], (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send(`Hijo agregado con ID: ${result.insertId}`)
     }) */
}

module.exports = {
    getPerson,
    getPersonById,
    createPerson,
    getPersonFather,
    getPersonFatherById,
    createPersonFather,
    getPersonMother,
    getPersonMotherById,
    createPersonMother,
    getPersonChildren,
    getPersonChildrenById,
    createPersonChildren
}