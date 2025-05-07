import { exportLinks } from '@/app/services/export-links'
import * as storage from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { randomUUID } from 'node:crypto'
import { PassThrough } from 'node:stream'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/infra/db', async () => {
  const { schema } = await import('@/infra/db/schemas')

  return {
    db: {
      select: () => ({
        from: () => ({
          orderBy: () => ({
            toSQL: () => ({
              sql: 'SELECT * FROM links',
              params: [],
            }),
          }),
        }),
      }),
    },
    pg: {
      unsafe: vi.fn(() => ({
        cursor: vi.fn(() => {
          const stream = new PassThrough({ objectMode: true })
          setImmediate(() => {
            stream.write([
              {
                id: 1,
                original_url: 'https://www.google.com.br',
                short_url: 'google',
                access_count: 42,
                created_at: new Date().toISOString(),
              },
              {
                id: 2,
                original_url: 'https://g1.globo.com/',
                short_url: 'g1',
                access_count: 10,
                created_at: new Date().toISOString(),
              },
            ])
            stream.end()
          })
          return stream
        }),
      })),
    },
  }
})

describe('exportLinks', () => {
  it('should be able to export links', async () => {
    const mockUpload = vi
      .spyOn(storage, 'uploadFileToStorage')
      .mockImplementationOnce(async ({ contentStream }) => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://www.teste.com.br/links.csv',
        }
      })

    const sut = await exportLinks()

    const generatedCSVStream = mockUpload.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map((row) => row.split(';'))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://www.teste.com.br/links.csv')
    expect(csvAsArray).toEqual([
      ['ID', 'Original URL', 'Short URL', 'Access Count', 'Created at'],
      ['1', 'https://www.google.com.br', 'google', '42', expect.any(String)],
      ['2', 'https://g1.globo.com/', 'g1', '10', expect.any(String)],
    ])
  })
})
