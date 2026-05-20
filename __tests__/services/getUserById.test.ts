import { getUserById } from '@/services/users/getUserById'
import type { User } from '@/types'

const mockUser: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031',
  website: 'hildegard.org',
  company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' },
  address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: { lat: '-37.3159', lng: '81.1496' } },
}

beforeEach(() => {
  global.fetch = jest.fn()
})

afterEach(() => jest.resetAllMocks())

it('fetches user by id', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => mockUser,
  } as Response)
  const user = await getUserById(1)
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users/1', { next: { revalidate: 60 } })
  expect(user).toEqual(mockUser)
})

it('returns null when user not found (404)', async () => {
  ;(fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 } as Response)
  const user = await getUserById(999)
  expect(user).toBeNull()
})
