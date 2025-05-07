import { getLinks } from '@/app/services/get-links'
import { db } from '@/infra/db'
import { isRight, unwrapEither } from '@/shared/either'
import { desc } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/infra/db', () => ({
  db: {
    select: vi.fn(),
  },
}))

describe('getLinks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return a list of links ordered by id descending', async () => {
    const mockLinks = [
      {
        id: '2',
        originalUrl: 'https://g1.globo.com/',
        shortUrl: 'g1',
        accessCount: 8,
      },
      {
        id: '1',
        originalUrl: 'https://www.google.com.br',
        shortUrl: 'google',
        accessCount: 3,
      },
    ]

    const mockOrderBy = vi.fn().mockResolvedValueOnce(mockLinks)
    const mockFrom = vi.fn().mockReturnValue({ orderBy: mockOrderBy })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const sut = await getLinks()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({ links: mockLinks })
    expect(mockOrderBy).toHaveBeenCalledWith(desc(expect.anything()))
  })
})
