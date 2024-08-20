import fs from 'node:fs/promises';

/**
 * Lit un fichier json selon le chemin donnée
 *
 * @param path {String} Chemin vers le fichier à lire
 * @return {
 *  status: String,
 *  data: String
 * }
 * */
async function readFile(path) {
    try {
        const data = await fs.readFile(path, { encoding: 'utf8' });
        return {
            status: "OK",
            data: JSON.parse(data),
        };
    } catch (err) {
        return {
            status: "ERROR",
            error: err,
        };
    }
}

/**
 * Ecrit un fichier json selon le chemin donnée
 *
 * @param path {String} Chemin vers le fichier à lire
 * @param data {{}} Donnée à écrire dans le fichier JSON
 * @return {
 *  status: String,
 *  error: String
 * }
 * */
async function writeFile(path, data) {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 4), {
            encoding: 'utf8',
        });
        return {
            status: "OK",
        };
    } catch (err) {
        return {
            status: "ERROR",
            error: err,
        };
    }
}

export { readFile, writeFile };