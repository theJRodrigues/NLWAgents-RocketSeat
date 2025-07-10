import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/room',
    {
      schema: {
        body: z.object({
          name: z.string().min(1, 'O nome é obrigatório'),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body
      try {
        const result = await db
          .insert(schema.rooms)
          .values({ name, description })
          .returning()

        return reply.status(201).send(`Room Id: ${result[0].id}`)
      } catch (error) {
        return reply.status(500).send(`Error: ${error}`)
      }
    }
  )
}
