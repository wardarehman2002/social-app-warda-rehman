import { useMemo, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/post/PostCard';

export default function FeedPage() {
  const { getPublicFeedPosts } = usePosts();
  const [posts] = useState(() => getPublicFeedPosts());
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;
    const lower = query.toLowerCase();
    return posts.filter((p) => p.description.toLowerCase().includes(lower));
  }, [posts, query]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts..."
        className="mb-6 w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      />

      {posts.length === 0 && (
        <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
          No posts yet — be the first to share!
        </p>
      )}

      {posts.length > 0 && filteredPosts.length === 0 && (
        <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
          No results found for "{query}"
        </p>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
