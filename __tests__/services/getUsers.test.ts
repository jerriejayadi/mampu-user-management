import { getUsers } from '@/services/users/getUsers'
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
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [mockUser],
  } as Response)
})

afterEach(() => jest.resetAllMocks())

it('fetches users from jsonplaceholder', async () => {
  const users = await getUsers()
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
  expect(users).toEqual([mockUser])
})
