import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../../components/post/PostForm';

export default function EditPost() {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const { getPostById, updatePost } = usePosts();
  const navigate = useNavigate();

  const post = getPostById(postId);

  // Post doesn't exist, or belongs to someone else -> bounce back to the dashboard.
  if (!post || post.authorId !== currentUser.id) {
    return <Navigate to="/dashboard/posts" replace />;
  }

  function handleSave(data, { isDraft }) {
    updatePost(postId, {
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft,
    });
    navigate('/dashboard/posts');
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Edit Post</h1>
      <PostForm initialData={post} onSave={handleSave} />
    </div>
  );
}
