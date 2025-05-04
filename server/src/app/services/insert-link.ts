import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/shared/either";
import { z } from "zod";

const insertLinkInput = z.object({
  originalUrl: z.string(),
  shortUrl: z.string()
})

type InsertLinkInput = z.input<typeof insertLinkInput>

export async function insertLink(input: InsertLinkInput): Promise<Either<{ message: string }, {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: Date;
}>> {
  const { originalUrl, shortUrl } = insertLinkInput.parse(input);

  try {
    const [link] = await db
      .insert(schema.links)
      .values({ originalUrl, shortUrl })
      .returning();

    if (!link) {
      return makeLeft({ message: "Erro ao inserir o link. Nenhum dado retornado." });
    }

    return makeRight({
      id: link.id,
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      accessCount: link.accessCount,
      createdAt: link.createdAt
    });

  } catch (error: any) {
    // Código 23505 = violação de restrição única no PostgreSQL
    if (error.code === "23505" && error.constraint_name === "links_short_url_unique") {
      return makeLeft({ message: `O link encurtado "${shortUrl}" já existe.` });
    }

    console.error("Erro ao inserir link:", error);

    return makeLeft({
      message: "Erro inesperado ao salvar o link. Tente novamente em instantes."
    });
  }
}