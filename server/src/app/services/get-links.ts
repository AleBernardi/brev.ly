import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/shared/either";
import { desc } from "drizzle-orm";

type GetLinksOutput = {
    links: {
        id: string;
        originalUrl: string;
        shortUrl: string;
        accessCount: number;
    }[];
};

export async function getLinks(): Promise<Either<null, GetLinksOutput>> {
    const links = await db
        .select({
            id: schema.links.id,
            originalUrl: schema.links.originalUrl,
            shortUrl: schema.links.shortUrl,
            accessCount: schema.links.accessCount,
        })
        .from(schema.links)
        .orderBy(desc(schema.links.id));

    return makeRight({ links });
}