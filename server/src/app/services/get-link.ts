import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { eq } from 'drizzle-orm';

type getLinksOutput = {
    link: {
        originalUrl: string,
        shortUrl: string,
    }
}

export async function getLink (url: string): Promise<Either<null, getLinksOutput>> {
    
    const links = await db
        .select({
            id: schema.links.id,
            originalUrl: schema.links.originalUrl,
            shortUrl: schema.links.shortUrl,
            accessCount: schema.links.accessCount,
        })
        .from(schema.links)
        .where(eq(schema.links.shortUrl, url));
        
    if (links.length === 0) {
        return makeLeft(null)
    }

    const link = links[0];
    
    await db.update(schema.links)
        .set({
            accessCount: link.accessCount + 1
        })
        .where(eq(schema.links.id, link.id));

    return makeRight({
        link: { 
            originalUrl: link.originalUrl,
            shortUrl: link.shortUrl
        }
    });
}