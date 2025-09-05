import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
