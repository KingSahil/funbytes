import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { useUserStore } from '../store/useUserStore';
import { FeedResponse } from '@funbytes/types';

export function useFeed(activeTopic: string) {
  const { selectedInterests, feedStyle } = useUserStore();

  return useInfiniteQuery<FeedResponse, Error>({
    queryKey: ['feed', activeTopic, feedStyle, selectedInterests],
    queryFn: ({ pageParam = 1 }) =>
      api.getFeed({
        topic: activeTopic,
        style: feedStyle,
        interests: selectedInterests,
        page: pageParam as number,
        limit: 15,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
}

