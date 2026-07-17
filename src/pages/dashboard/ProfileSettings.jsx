import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { fileToBase64 } from '../../utils/helpers';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

const MAX_BIO = 150;

export default function ProfileSettings() {
  const { currentUser, updateCurrentUser } = useAuth();
  const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio || '',
      location: currentUser.location || '',
    },
  });

  const bio = watch('bio') || '';

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setAvatarPreview(base64);
  }

  function onSubmit(data) {
    updateCurrentUser({
      name: data.name,
      bio: data.bio,
      location: data.location,
      avatar: avatarPreview,
    });
    setSuccessMessage('Profile updated successfully');
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Profile Settings
      </h1>

      {successMessage && (
        <p className="mb-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-4">
          <Avatar src={avatarPreview} name={currentUser.name} size="lg" />
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="block text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-700 hover:file:bg-primary-100 dark:text-gray-300"
            />
          </div>
        </div>

        <Input
          label="Full Name"
          error={errors.name?.message}
          {...register('name', { required: 'Full name is required' })}
        />

        <div>
          <Textarea
            label="Bio"
            rows={3}
            maxLength={MAX_BIO}
            {...register('bio', { maxLength: MAX_BIO })}
          />
          <p className="mt-1 text-right text-xs text-gray-400">
            {bio.length} / {MAX_BIO} characters
          </p>
        </div>

        <Input label="Location" {...register('location')} />

        <Button type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
