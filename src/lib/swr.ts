import useSWR, { type SWRConfiguration, type Key } from 'swr'

export function useQuery<T>(
  key: Key,
  fetcher: () => Promise<T>,
  config?: SWRConfiguration<T>
) {
  return useSWR<T>(key, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000,
    ...config,
  })
}
