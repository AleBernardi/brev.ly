import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { z } from "zod";

const insertLinkInput = z.object({
    originalUrl: z.string(),
    shortUrl: z.string()
})

type InsertLinkInput = z.input<typeof insertLinkInput>

export async function insertLink (input: InsertLinkInput): Promise<Either<{ type: string, message: string }, {
    id: string,
    originalUrl: string,
    shortUrl: string,
    accessCount: number,
    createdAt: Date
}>> {
    const { originalUrl, shortUrl } = insertLinkInput.parse(input)
    
    try {
        const result = await db.insert(schema.links).values({
            originalUrl: originalUrl,
            shortUrl: shortUrl
        }).returning();

        return makeRight({
            id: result[0].id,
            originalUrl: result[0].originalUrl,
            shortUrl: result[0].shortUrl,
            accessCount: result[0].accessCount,
            createdAt: result[0].createdAt,
        });
    } catch (error: any) {
      // Postgres: código de erro 23505 = unique_violation
      if (error.code === "23505" && error.code === "links_short_url_unique") {
        return makeLeft({
          type: "DUPLICATE_SHORT_URL",
          message: `The short URL ${shortUrl} already exists.`
        });
      }
  
      return makeLeft({
        type: "UNKNOWN",
        message: "Unexpected error when inserting the link."
      });
    }
}