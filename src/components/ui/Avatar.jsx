import clsx from 'clsx';
import { getInitial } from '../../utils/helpers';

const SIZE_CLASSES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-base',
  lg: 'h-20 w-20 text-2xl',
};

// A small fixed palette so the same name always gets the same colour.
const COLORS = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-sky-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-pink-400',
];

function colorForName(name = '') {
  const code = name.charCodeAt(0) || 0;
  return COLORS[code % COLORS.length];
}

export default function Avatar({ src, name = '', size = 'md', className = '' }) {
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        className={clsx(sizeClass, 'rounded-full object-cover', className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        sizeClass,
        colorForName(name),
        'flex items-center justify-center rounded-full font-semibold text-white',
        className
      )}
      aria-label={name || 'user'}
    >
      {getInitial(name)}
    </div>
  );
}
