import { Link } from 'react-router-dom';
import { formatJoinDate } from '../../utils/helpers';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

export default function ProfileHeader({ user, isOwner }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div
        className="h-40 w-full bg-gradient-to-r from-primary-400 to-primary-600 sm:h-56"
        style={
          user.coverImage
            ? {
                backgroundImage: `url(${user.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      />

      <div className="relative px-6 pb-6">
        <div className="-mt-10 mb-3">
          <Avatar
            src={user.avatar}
            name={user.name}
            size="lg"
            className="border-4 border-white dark:border-gray-800"
          />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
            {user.location && (
              <p className="text-sm text-gray-500 dark:text-gray-400">📍 {user.location}</p>
            )}
            <p className="text-xs text-gray-400">{formatJoinDate(user.joinedAt)}</p>
          </div>

          {isOwner && (
            <Link to="/dashboard/settings">
              <Button variant="secondary" size="sm">
                Edit Profile
              </Button>
            </Link>
          )}
        </div>

        {user.bio && (
          <p className="mt-3 whitespace-pre-line text-gray-700 dark:text-gray-200">{user.bio}</p>
        )}
      </div>
    </div>
  );
}
