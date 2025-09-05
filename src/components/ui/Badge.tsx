import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export default function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx("inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-700 bg-white", className)}
      {...props}
    >
      {children}
    </span>
  );
}
