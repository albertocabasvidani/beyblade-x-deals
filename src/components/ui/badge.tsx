interface BadgeProps {
  children: React.ReactNode;
  variant?: 'fba' | 'category' | 'default';
}

const variants = {
  fba: 'bg-green-100 text-green-700 border-green-200',
  category: 'bg-slate-100 text-slate-600 border-slate-200',
  default: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
