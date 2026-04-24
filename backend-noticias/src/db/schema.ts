import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const noticias = sqliteTable('noticias', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  titulo: text('titulo').notNull(),
  conteudo: text('conteudo').notNull(),
  dataCriacao: text('data_criacao').default(sql`CURRENT_TIMESTAMP`),
});
