import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-primary-600">404</h1>
      <p className="mt-3 text-lg text-gray-700 dark:text-gray-200">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
      >
        Go back home
      </Link>
    </div>
  );
}
