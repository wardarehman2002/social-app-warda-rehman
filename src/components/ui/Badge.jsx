import clsx from 'clsx';

const VARIANT_CLASSES = {
  draft: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200',
  public: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
  private: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
};

const LABELS = {
  draft: 'Draft',
  public: 'Public',
  private: 'Private',
};

export default function Badge({ variant = 'draft', className = '' }) {
  return (
    <span
      className={clsx(
        'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {LABELS[variant]}
    </span>
  );
}

/** Helper so pages don't repeat the same isDraft/isPublic -> variant logic. */
export function getPostVariant(post) {
  if (post.isDraft) return 'draft';
  return post.isPublic ? 'public' : 'private';
}
