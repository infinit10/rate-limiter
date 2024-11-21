import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadRoutes } from './routes/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { apiRateLimiter } from './middlewares/ratelimiter.mjs';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    
    app.use(apiRateLimiter())
    
    await loadRoutes(app);
    
    app.listen(PORT, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server started successfully at PORT ${PORT}`);
    });
}

bootstrap()