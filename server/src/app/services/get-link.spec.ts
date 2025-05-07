import { getLink } from '@/app/services/get-link'
import { db } from '@/infra/db'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/infra/db', () => ({
  db: {
    select: vi.fn(),
    update: vi.fn(),
  },
}))

describe('getLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the link and update access count', async () => {
    const mockLink = {
      id: '1',
      originalUrl: 'https://www.google.com.br',
      shortUrl: 'google',
      accessCount: 5,
    }

    const mockWhere = vi.fn().mockResolvedValueOnce([mockLink])
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const mockUpdateWhere = vi.fn().mockResolvedValueOnce(undefined)
    const mockSet = vi.fn().mockReturnValue({ where: mockUpdateWhere })
    vi.mocked(db.update).mockReturnValue({ set: mockSet } as any)

    const sut = await getLink('google')

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      link: {
        originalUrl: 'https://www.google.com.br',
        shortUrl: 'google',
      },
    })
    expect(mockSet).toHaveBeenCalledWith({ accessCount: 6 })
  })

  it('should return null if link is not found', async () => {
    const mockWhere = vi.fn().mockResolvedValueOnce([])
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const sut = await getLink('erro')

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBe(null)
  })
})
