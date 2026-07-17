import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fileToBase64 } from '../../utils/helpers';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

const MAX_CHARS = 500;

/**
 * Shared form for both Create Post and Edit Post.
 * onSave(data, { isDraft }) is called with { description, image, isPublic }.
 */
export default function PostForm({ initialData = null, onSave, isSaving = false }) {
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [visibility, setVisibility] = useState(
    initialData?.isPublic === false ? 'private' : 'public'
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: initialData?.description || '',
    },
  });

  const description = watch('description') || '';
  const charCount = description.length;
  const counterColor =
    charCount >= MAX_CHARS ? 'text-red-500' : charCount >= 400 ? 'text-orange-500' : 'text-gray-400';

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setImagePreview(base64);
  }

  function handleRemoveImage() {
    setImagePreview(null);
    setValue('image', null);
  }

  function submitWith(isDraft) {
    return handleSubmit((data) => {
      onSave(
        {
          description: data.description,
          image: imagePreview,
          isPublic: visibility === 'public',
        },
        { isDraft }
      );
    });
  }

  return (
    <form className="space-y-5">
      <div>
        <Textarea
          label="Description"
          placeholder="What's on your mind?"
          rows={5}
          maxLength={MAX_CHARS}
          error={errors.description?.message}
          {...register('description', {
            required: 'Description is required',
            minLength: { value: 10, message: 'Minimum 10 characters' },
            maxLength: { value: MAX_CHARS, message: `Maximum ${MAX_CHARS} characters` },
          })}
        />
        <p className={`mt-1 text-right text-xs font-medium ${counterColor}`}>
          {charCount} / {MAX_CHARS} characters
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Image (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100 dark:text-gray-300"
        />
        {imagePreview && (
          <div className="relative mt-3 inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-64 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-white shadow hover:bg-gray-900"
              aria-label="Remove image"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          Visibility
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'public'}
              onChange={() => setVisibility('public')}
            />
            Public
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
            <input
              type="radio"
              name="visibility"
              checked={visibility === 'private'}
              onChange={() => setVisibility('private')}
            />
            Private
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          isLoading={isSaving}
          disabled={charCount > MAX_CHARS}
          onClick={submitWith(true)}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          variant="primary"
          isLoading={isSaving}
          disabled={charCount > MAX_CHARS}
          onClick={submitWith(false)}
        >
          Publish
        </Button>
      </div>
    </form>
  );
}
