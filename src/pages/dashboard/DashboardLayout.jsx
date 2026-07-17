import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';

const LINKS = [
  { to: '/dashboard/posts', label: 'My Posts' },
  { to: '/dashboard/create', label: 'Create Post' },
  { to: '/dashboard/settings', label: 'Profile Settings' },
];

export default function DashboardLayout() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-6 sm:flex-row">
      <aside className="w-full shrink-0 sm:w-48">
        <nav className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
