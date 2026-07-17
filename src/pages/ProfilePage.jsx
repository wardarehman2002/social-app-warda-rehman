import { Navigate, useParams } from 'react-router-dom';
import { storage } from '../utils/storage';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import ProfileHeader from '../components/profile/ProfileHeader';
import PostCard from '../components/post/PostCard';

export default function ProfilePage() {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const { getPublicPostsByUser } = usePosts();

  const user = storage.getUserById(userId);

  if (!user) {
    return <Navigate to="/404" replace />;
  }

  const posts = getPublicPostsByUser(userId);
  const isOwner = currentUser?.id === userId;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <ProfileHeader user={user} isOwner={isOwner} />

      <h2 className="mb-3 mt-6 font-semibold text-gray-900 dark:text-gray-100">Posts</h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No public posts yet</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
