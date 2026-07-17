import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Avatar from '../ui/Avatar';
import PostActions from './PostActions';

/**
 * Renders a single post card. Reused on the Feed page and Profile page.
 * Clicking anywhere on the card opens the Post Detail page.
 * Clicking the author avatar/name opens their Profile page instead.
 */
export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { toggleLike, getLikesForPost, getCommentsForPost, hasUserLiked } = usePosts();

  const author = storage.getUserById(post.authorId);

  const [likeCount, setLikeCount] = useState(getLikesForPost(post.id).length);
  const [liked, setLiked] = useState(hasUserLiked(post.id, currentUser?.id));
  const commentCount = getCommentsForPost(post.id).length;

  function handleToggleLike() {
    const nowLiked = toggleLike(post.id, currentUser.id);
    setLiked(nowLiked);
    setLikeCount((c) => (nowLiked ? c + 1 : c - 1));
  }

  function goToDetail() {
    navigate(`/posts/${post.id}`);
  }

  function handleCommentClick() {
    if (!isAuthenticated) {
      navigate('/login', { state: { message: 'Please login to interact' } });
      return;
    }
    goToDetail();
  }

  function goToProfile(e) {
    e.stopPropagation();
    navigate(`/profile/${post.authorId}`);
  }

  return (
    <article
      onClick={goToDetail}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="mb-3 flex items-center gap-3" onClick={goToProfile}>
        <Avatar src={author?.avatar} name={author?.name} size="md" />
        <div>
          <p className="font-semibold text-gray-900 hover:underline dark:text-gray-100">
            {author?.name || 'Unknown user'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </p>
        </div>
      </div>

      <p className="mb-3 whitespace-pre-line text-gray-800 line-clamp-3 dark:text-gray-100">
        {post.description}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="Post attachment"
          className="mb-3 max-h-96 w-full rounded-lg object-cover"
        />
      )}

      <PostActions
        isLiked={liked}
        likeCount={likeCount}
        commentCount={commentCount}
        onToggleLike={handleToggleLike}
        onCommentClick={handleCommentClick}
      />
    </article>
  );
}
