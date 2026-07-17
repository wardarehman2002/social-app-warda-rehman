import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Badge, { getPostVariant } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function PostsDashboard() {
  const { currentUser } = useAuth();
  const { getPostsByUser, deletePost, togglePostVisibility, publishPost, getLikesForPost, getCommentsForPost } =
    usePosts();

  const [posts, setPosts] = useState(() => getPostsByUser(currentUser.id));
  const [postToDelete, setPostToDelete] = useState(null);

  function refresh() {
    setPosts(getPostsByUser(currentUser.id));
  }

  function handleToggleVisibility(postId) {
    togglePostVisibility(postId);
    refresh();
  }

  function handlePublish(postId) {
    publishPost(postId);
    refresh();
  }

  function confirmDelete() {
    deletePost(postToDelete.id);
    setPostToDelete(null);
    refresh();
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
        You haven't created any posts yet. Create your first post!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100">My Posts</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <Badge variant={getPostVariant(post)} />
              <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
            </div>
            <p className="truncate text-sm text-gray-800 dark:text-gray-100">
              {post.description}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ❤️ {getLikesForPost(post.id).length} · 💬 {getCommentsForPost(post.id).length}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {post.isDraft && (
              <Button size="sm" variant="primary" onClick={() => handlePublish(post.id)}>
                Publish
              </Button>
            )}
            {!post.isDraft && (
              <Button size="sm" variant="secondary" onClick={() => handleToggleVisibility(post.id)}>
                Make {post.isPublic ? 'Private' : 'Public'}
              </Button>
            )}
            <Link to={`/dashboard/edit/${post.id}`}>
              <Button size="sm" variant="ghost">
                Edit
              </Button>
            </Link>
            <Button size="sm" variant="danger" onClick={() => setPostToDelete(post)}>
              Delete
            </Button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        title="Delete this post?"
      >
        <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
          This action cannot be undone. The post, its comments and likes will be removed
          permanently.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setPostToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
