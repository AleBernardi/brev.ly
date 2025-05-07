import { deleteLink } from '@/app/services/delete-link'
import { db } from '@/infra/db'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/infra/db', () => ({
  db: {
    select: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('deleteLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should delete an existing short link and return success message', async () => {
    const mockWhere = vi.fn().mockResolvedValueOnce([{ shortUrl: 'google' }])
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const mockDeleteWhere = vi.fn().mockResolvedValueOnce(undefined)
    vi.mocked(db.delete).mockReturnValue({ where: mockDeleteWhere } as any)

    const sut = await deleteLink('google')

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      message: 'Link "google" deletado com sucesso!',
    })
  })

  it('should return error if short link does not exist', async () => {
    const mockWhere = vi.fn().mockResolvedValueOnce([])
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const sut = await deleteLink('erro')

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      message: 'Link encurtado informado não existe.',
    })
  })

  it('should return error if an exception is thrown', async () => {
    const mockWhere = vi.fn().mockRejectedValueOnce(new Error('error'))
    const mockFrom = vi.fn().mockReturnValue({ where: mockWhere })
    vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any)

    const sut = await deleteLink('erro')

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      message: 'Não foi possível deletar o link.',
    })
  })
})
