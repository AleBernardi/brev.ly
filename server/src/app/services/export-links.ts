import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { Either, makeRight } from "@/shared/either";
import { stringify } from 'csv-stringify';
import { desc } from "drizzle-orm";
import { PassThrough, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

type ExportLinksOutput = {
    reportUrl: string
}

export async function exportLinks(): Promise<Either<never, ExportLinksOutput>> {
    const { sql, params } = db
        .select({
            id: schema.links.id,
            originalUrl: schema.links.originalUrl,
            shortUrl: schema.links.shortUrl,
            accessCount: schema.links.accessCount,
            createdAt: schema.links.createdAt
        })
        .from(schema.links)
        .orderBy(desc(schema.links.id))
        .toSQL();

    const cursor = pg.unsafe(sql, params as string[]).cursor(2);

    const csv = stringify({
        delimiter: ';',
        header: true,
        columns: [
            { key: 'id', header: 'ID' },
            { key: 'original_url', header: 'Original URL' },
            { key: 'short_url', header: 'Short URL' },
            { key: 'access_count', header: 'Access Count' },
            { key: 'created_at', header: 'Created at' },
        ]
    });

    const uploadToStorageStream = new PassThrough()

    const convertToCSVPipeline = pipeline(
        cursor,
        new Transform({
            objectMode: true,
            transform(chunks: unknown[], encoding, callback) {
                for (const chunk of chunks) {
                    this.push(chunk)
                }

                callback()
            },
        }),
        csv,
        uploadToStorageStream
    )

    const uploadToStorage = uploadFileToStorage({
        contentType: 'text/csv',
        fileName: `${new Date().toISOString()}-links.csv`,
        contentStream: uploadToStorageStream,
    })

    const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

    return makeRight({ reportUrl: url })
}