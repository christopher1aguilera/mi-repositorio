const { Pool } = require("pg");
const pool = new Pool({
    user: "chris",
    host: "localhost",
    database: "repertorio",
    password: "chris1997",
    port: 5432,
});
// Paso 1
const insertar = async (datos) => {
const consulta = {
text: "INSERT INTO repertorio (cancion, artista, tono) values($1, $2, $3) RETURNING *",
values: datos,
};
try {
const result = await pool.query(consulta);
return result.rows[0];
} catch (error) {
console.log(error.code);
return error;
}
};

// Paso 2
const consultar = async (datos) => {
    try {
    const result = await pool.query("SELECT * FROM repertorio");
    console.log(result.rows)
    return result.rows;
    } catch (error) {
    console.log(error.code);
    return error;
    }
    };    

// Paso 3
const editar = async (datos) => {
    console.log(datos)
    const consulta = {
        // agregar id para cambiarlo desde ahi
    text: `UPDATE repertorio SET cancion = $1, artista = $2, tono = $3 WHERE cancion = $1 RETURNING *`,
    values: datos,
    };
    try {
    const result = await pool.query(consulta);
    console.log(result.rows);
    return result.rows;
    } catch (error) {
    console.log(error);
    return error;
    }
    };
    
// Paso 4
const eliminar = async (id) => {
    try {
    const result = await pool.query(
    `DELETE FROM repertorio WHERE id = '${id}'`
    );
    return result.rows;
    } catch (error) {
    console.log(error.code);
    return error;
    }
}

module.exports = { insertar, consultar, editar, eliminar };