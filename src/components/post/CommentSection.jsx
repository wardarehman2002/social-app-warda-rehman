import { useState } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { formatDate } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function CommentSection({ postId }) {
  const { currentUser, isAuthenticated } = useAuth();
  const { getCommentsForPost, addComment, deleteComment } = usePosts();

  const [comments, setComments] = useState(() => getCommentsForPost(postId));
  const [text, setText] = useState('');
  const [confirmingId, setConfirmingId] = useState(null);

  function refresh() {
    setComments(getCommentsForPost(postId));
  }

  function handleAddComment(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    addComment(postId, currentUser.id, trimmed);
    setText('');
    refresh();
  }

  function handleDelete(commentId) {
    deleteComment(commentId);
    setConfirmingId(null);
    refresh();
  }

  return (
    <div className="mt-6">
      <h3 className="mb-3 font-semibold text-gray-900 dark:text-gray-100">
        {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
      </h3>

      <div className="space-y-4">
        {comments.map((comment) => {
          const author = storage.getUserById(comment.authorId);
          const isOwnComment = currentUser?.id === comment.authorId;

          return (
            <div key={comment.id} className="flex gap-3">
              <Link to={`/profile/${comment.authorId}`}>
                <Avatar src={author?.avatar} name={author?.name} size="sm" />
              </Link>
              <div className="flex-1 rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/60">
                <div className="flex items-center justify-between">
                  <Link
                    to={`/profile/${comment.authorId}`}
                    className="text-sm font-semibold text-gray-900 hover:underline dark:text-gray-100"
                  >
                    {author?.name || 'Unknown user'}
                  </Link>
                  <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200">{comment.text}</p>

                {isOwnComment && (
                  <div className="mt-1">
                    {confirmingId === comment.id ? (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 dark:text-gray-300">Are you sure?</span>
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="font-semibold text-red-500 hover:underline"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="font-semibold text-gray-500 hover:underline"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(comment.id)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isAuthenticated ? (
        <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
          <Button type="submit" size="sm">
            Post
          </Button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/login" className="font-medium text-primary-600 hover:underline">
            Login
          </Link>{' '}
          to comment
        </p>
      )}
    </div>
  );
}
