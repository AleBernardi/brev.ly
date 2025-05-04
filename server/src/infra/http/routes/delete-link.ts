import { deleteLink } from "@/app/services/delete-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from 'zod';

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
    server.delete('/links', {
        schema: {
            summary: 'Delete a link',
            tags: ['links'],
            querystring: z.object({
                shortUrl: z.string(),
            }),
            response: {
                201: z.object({ message: z.string() }),
                400: z.object({ message: z.string() })
            }
        }
    }, async (request, reply) => {

        const { shortUrl } = request.query;

        const result = await deleteLink(shortUrl);

        if (isRight(result)) {
            const success = unwrapEither(result)
            return reply.status(201).send({ message: success.message })
        }

        const error = unwrapEither(result)

        return reply.status(400).send({ message: error.message })
    })
}