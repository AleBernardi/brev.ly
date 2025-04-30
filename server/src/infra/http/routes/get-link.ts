import { getLink } from "@/app/services/get-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from 'zod';

export const getLinkRoute: FastifyPluginAsyncZod = async server => {
    server.get('/:url', {
        schema: {
            summary: 'Get link',
            tags: ['link'],
            response: {
                200: z.object({ 
                    link: z.object({
                        originalUrl: z.string(), 
                        shortUrl: z.string(),
                    })
                }),
                400: z.object({
                    message: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { url } = request.params as { url: string };
        const result = await getLink(url)

        if (isRight(result)) {
            const { link } = unwrapEither(result)
            return reply.status(200).send( { link } )
        }

        return reply.status(400).send({
            message: 'Link não encontrado',
        });
    })
}