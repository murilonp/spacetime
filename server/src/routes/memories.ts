import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export const memoriesRoutes = async (app: FastifyInstance) => {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
    return memories.map(memory => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      };
    });
  });

  app.get('/memories/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    /* Encontra a memoria com esse id, se não ele dispara um erro */
    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    });
    return memory;
  });

  app.post('/memories', async request => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: 'cdea01a7-0a24-4384-82b5-7016b3d2194d',
      },
    });
    return memory;
  });

  app.put('/memories/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    });
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    });
    return memory;
  });

  app.delete('/memories/:id', async request => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);
    const memory = await prisma.memory.delete({
      where: {
        id,
      },
    });
    return memory;
  });
};
