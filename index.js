const http = require("http");
const url = require("url");
const { insertar, consultar, editar, eliminar } =
require("./consultas");
const fs = require("fs");

http
.createServer(async (req, res) => {
if (req.url == "/" && req.method === "GET") {
res.setHeader("content-type", "text/html");
const html = fs.readFileSync("index.html", "utf8");
res.end(html);
}

// Paso 1
if ((req.url == "/cancion" && req.method == "POST")) {
let body = "";
req.on("data", (chunk) => {
body += chunk;
});
req.on("end", async () => {
const datos = Object.values(JSON.parse(body));
console.log(datos)
const respuesta = await insertar(datos);
res.end(JSON.stringify(respuesta));
});
}

// Paso 2
if (req.url == "/canciones" && req.method === "GET") {
    const registros = await consultar();
    fs.writeFileSync("canciones.json",JSON.stringify(registros));
    res.end(JSON.stringify(registros));
    }

// Paso 3
if (req.url == "/cancion" && req.method == "PUT") {
    let body = "";
    req.on("data", (chunk) => {
    body += chunk;
    });
    req.on("end", async () => {
// agregar id para cambiarlo desde ahi
    const datos = Object.values(JSON.parse(body));
    const respuesta = await editar(datos);
    res.end(JSON.stringify(respuesta));
    });
    }

// Paso 4
if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
    const { id } = url.parse(req.url, true).query;
    const respuesta = await eliminar(id);
    res.end(JSON.stringify(respuesta));
    }
})
.listen(3000);
