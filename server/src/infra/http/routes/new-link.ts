import { insertLink } from "@/app/services/insert-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from 'zod';

export const newLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post('/links', {
        schema: {
            summary: 'Save a new link',
            tags: ['links'],
            body: z.object({
                originalUrl: z.string(),
                shortUrl: z.string()
            }),
            response: {
                201: z.object({ id: z.string(), originalUrl: z.string(), shortUrl: z.string(), accessCount: z.number(), createdAt: z.date() }),
                400: z.object({ message: z.string() })
            }
        }
    }, async (request, reply) => {

        const data = request.body;

        if(!data.originalUrl) {
            return reply.status(400).send({ message: 'Original URL is required.'})
        }

        if(!data.shortUrl) {
            return reply.status(400).send({ message: 'Short URL is required.'})
        }

        const result = await insertLink({
            originalUrl: data.originalUrl,
            shortUrl: data.shortUrl
        })

        if (isRight(result)) {
            const { id, originalUrl, shortUrl, accessCount, createdAt } = unwrapEither(result)
            return reply.status(201).send({ id, originalUrl, shortUrl, accessCount, createdAt })
        }

        const error = unwrapEither(result)

        return reply.status(400).send({ message: error.message })
    })
}