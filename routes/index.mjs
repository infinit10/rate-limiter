import { readdir } from "node:fs/promises";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadRoutes(app) {
    const routeFiles = (await readdir(__dirname)).filter(file => (file !== 'index.mjs' && file.endsWith('routes.mjs')));
    
    for (const fileName of routeFiles) {
        const router = await import(path.join(__dirname, fileName));
        app.use(router.default);
    }
}
