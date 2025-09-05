import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("card", className)} {...props}>{children}</div>;
}
export function CardBody({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-6", className)} {...props}>{children}</div>;
}
