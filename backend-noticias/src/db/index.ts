import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Cria o arquivo SQLite localmente na raiz do projeto
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });
