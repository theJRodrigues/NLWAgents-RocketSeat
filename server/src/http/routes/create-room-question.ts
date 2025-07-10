import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'

export const createRoomQuestionRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string(),
          answer: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params
      const { question, answer } = request.body
      try {
        const result = await db
          .insert(schema.questions)
          .values({ roomId, question, answer })
          .returning()

        return reply.status(201).send(`Question Id: ${result[0].id}`)
      } catch (error) {
        return reply.status(500).send(`Error: ${error}`)
      }
    }
  )
}
