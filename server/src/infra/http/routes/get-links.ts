import { getLinks } from "@/app/services/get-links";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from 'zod';

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
    server.get('/links', {
        schema: {
            summary: 'Get links',
            tags: ['links'],
            response: {
                201: z.object({ 
                    links: z.array(
                        z.object({
                            id: z.string(), 
                            originalUrl: z.string(), 
                            shortUrl: z.string(), 
                            accessCount: z.number(), 
                        })
                    )
                })
            }
        }
    }, async (request, reply) => {
        const result = await getLinks()

        if (isRight(result)) {
            const { links } = unwrapEither(result)
            return reply.status(201).send( { links } )
        }
    })
}