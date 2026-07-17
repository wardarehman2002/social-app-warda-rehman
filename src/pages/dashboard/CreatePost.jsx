import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePosts } from '../../hooks/usePosts';
import PostForm from '../../components/post/PostForm';

export default function CreatePost() {
  const { currentUser } = useAuth();
  const { createPost } = usePosts();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [formKey, setFormKey] = useState(0);

  function handleSave(data, { isDraft }) {
    createPost({
      authorId: currentUser.id,
      description: data.description,
      image: data.image,
      isPublic: data.isPublic,
      isDraft,
    });

    if (isDraft) {
      setSuccessMessage('Post saved as draft');
      setFormKey((k) => k + 1); // remounts PostForm, clearing it
    } else {
      navigate('/');
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Create Post</h1>

      {successMessage && (
        <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
          {successMessage}
        </p>
      )}

      <PostForm key={formKey} onSave={handleSave} />
    </div>
  );
}
