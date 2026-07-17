import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { storage } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import Avatar from '../components/ui/Avatar';
import PostActions from '../components/post/PostActions';
import CommentSection from '../components/post/CommentSection';

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getPostById, getLikesForPost, getCommentsForPost, hasUserLiked, toggleLike } =
    usePosts();

  const post = getPostById(postId);

  // Hooks must always run in the same order, so call them before any early return,
  // guarding against a missing post with safe fallbacks.
  const [likeCount, setLikeCount] = useState(() =>
    post ? getLikesForPost(post.id).length : 0
  );
  const [liked, setLiked] = useState(() =>
    post ? hasUserLiked(post.id, currentUser?.id) : false
  );

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const author = storage.getUserById(post.authorId);
  const commentCount = getCommentsForPost(post.id).length;

  function handleToggleLike() {
    const nowLiked = toggleLike(post.id, currentUser.id);
    setLiked(nowLiked);
    setLikeCount((c) => (nowLiked ? c + 1 : c - 1));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-4 flex items-center gap-3">
          <Link to={`/profile/${author?.id}`}>
            <Avatar src={author?.avatar} name={author?.name} size="md" />
          </Link>
          <div>
            <Link
              to={`/profile/${author?.id}`}
              className="font-semibold text-gray-900 hover:underline dark:text-gray-100"
            >
              {author?.name || 'Unknown user'}
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        <p className="mb-4 whitespace-pre-line text-gray-800 dark:text-gray-100">
          {post.description}
        </p>

        {post.image && (
          <img
            src={post.image}
            alt="Post attachment"
            className="mb-4 w-full rounded-lg object-cover"
          />
        )}

        <PostActions
          isLiked={liked}
          likeCount={likeCount}
          commentCount={commentCount}
          onToggleLike={handleToggleLike}
        />

        <CommentSection postId={post.id} />
      </article>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm text-gray-500 hover:text-primary-600 dark:text-gray-400"
      >
        ← Back
      </button>
    </div>
  );
}
