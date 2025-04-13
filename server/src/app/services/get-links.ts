import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";
import { desc } from "drizzle-orm";

type getLinksOutput = {
    links: {
        id: string,
        originalUrl: string,
        shortUrl: string,
        accessCount: number,
        createdAt: Date
    }[]
}

export async function getLinks (): Promise<Either<null, getLinksOutput>> {
    
    const links = await db
        .select({
            id: schema.links.id,
            originalUrl: schema.links.originalUrl,
            shortUrl: schema.links.shortUrl,
            accessCount: schema.links.accessCount,
            createdAt: schema.links.createdAt,
        })
        .from(schema.links)
        .orderBy(fields => {
            return desc(fields.id)
        });

    return makeRight({ links });
}