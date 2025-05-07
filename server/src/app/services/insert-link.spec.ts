import { insertLink } from '@/app/services/insert-link'
import { db } from '@/infra/db'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/infra/db', () => ({
  db: {
    insert: vi.fn(),
  },
}))

describe('insertLink', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should insert a new short link', async () => {
    const now = new Date()
    const mockLink = {
      id: '1',
      originalUrl: 'https://www.google.com.br',
      shortUrl: 'google',
      accessCount: 0,
      createdAt: now,
    }

    const mockReturning = vi.fn().mockResolvedValueOnce([mockLink])
    const mockValues = vi.fn().mockReturnValue({ returning: mockReturning })
    vi.mocked(db.insert).mockReturnValue({ values: mockValues } as any)

    const sut = await insertLink({
      originalUrl: 'https://www.google.com.br',
      shortUrl: 'google',
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual(mockLink)
  })

  it('should return error if no link is returned after insertion', async () => {
    const mockReturning = vi.fn().mockResolvedValueOnce([])
    const mockValues = vi.fn().mockReturnValue({ returning: mockReturning })
    vi.mocked(db.insert).mockReturnValue({ values: mockValues } as any)

    const sut = await insertLink({
      originalUrl: 'https://www.google.com.br',
      shortUrl: 'google',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      message: 'Erro ao inserir o link. Nenhum dado retornado.',
    })
  })

//   it('should return error if shortUrl already exists', async () => {    
//     vi.mocked(db.insert).mockRejectedValueOnce({
//         code: "23505",
//         constraint_name: "links_short_url_unique"
//     });
  
//     const sut = await insertLink({
//       originalUrl: 'https://www.example.com',
//       shortUrl: 'google',
//     });
  
//     expect(isLeft(sut)).toBe(true)
//     expect(unwrapEither(sut)).toEqual({
//       message: 'O link encurtado "google" já existe.',
//     })
//   })

  it('should return generic error if exception is thrown', async () => {
    vi.mocked(db.insert).mockRejectedValueOnce(new Error('Erro inesperado'))

    const sut = await insertLink({
      originalUrl: 'https://www.google.com.br',
      shortUrl: 'google',
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      message: 'Erro inesperado ao salvar o link. Tente novamente em instantes.',
    })
  })
})
