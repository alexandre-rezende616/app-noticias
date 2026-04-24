import express from 'express';
import cors from 'cors';
import { db } from './db';
import { noticias } from './db/schema';
import { eq } from 'drizzle-orm';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Listar todas as notícias
app.get('/noticias', async (req, res) => {
  try {
    const todasNoticias = await db.select().from(noticias).orderBy(noticias.id);
    res.json(todasNoticias);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notícias' });
  }
});

// Criar uma notícia
app.post('/noticias', async (req, res) => {
  const { titulo, conteudo } = req.body;
  try {
    const novaNoticia = await db.insert(noticias).values({ titulo, conteudo }).returning();
    res.status(201).json(novaNoticia[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar notícia' });
  }
});

// Editar uma notícia existente
app.put('/noticias/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo } = req.body;
  try {
    const noticiaEditada = await db
      .update(noticias)
      .set({ titulo, conteudo })
      .where(eq(noticias.id, Number(id)))
      .returning();
      
    res.json(noticiaEditada[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar notícia' });
  }
});

// Excluir uma notícia
app.delete('/noticias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.delete(noticias).where(eq(noticias.id, Number(id)));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar notícia' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
