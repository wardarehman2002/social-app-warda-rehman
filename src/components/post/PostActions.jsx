import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';

/**
 * Like + comment-count row, reused on PostCard and PostDetailPage.
 * Guests clicking Like are redirected to /login instead of being allowed to interact.
 */
export default function PostActions({
  isLiked,
  likeCount,
  commentCount,
  onToggleLike,
  onCommentClick,
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLikeClick(e) {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }
    onToggleLike();
  }

  function handleCommentClick(e) {
    e.stopPropagation();
    onCommentClick?.();
  }

  return (
    <div className="flex items-center gap-5 border-t border-gray-100 pt-3 text-sm dark:border-gray-700">
      <button
        onClick={handleLikeClick}
        className={clsx(
          'flex items-center gap-1.5 font-medium transition-colors',
          isLiked ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600 dark:text-gray-300'
        )}
      >
        <span>{isLiked ? '❤️' : '🤍'}</span>
        <span>{likeCount}</span>
      </button>

      <button
        onClick={handleCommentClick}
        className="flex items-center gap-1.5 font-medium text-gray-500 hover:text-primary-600 dark:text-gray-300"
      >
        <span>💬</span>
        <span>{commentCount}</span>
      </button>
    </div>
  );
}
