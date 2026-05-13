import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'outline';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  children,
  variant = 'filled',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap cursor-pointer';

  const variantClasses =
    variant === 'filled'
      ? 'bg-arvox-black text-white hover:bg-gray-800'
      : 'border-2 border-arvox-black text-arvox-black bg-transparent hover:bg-arvox-black hover:text-white';

  const combined = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <Link to={href} className={combined}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combined}>
      {children}
    </button>
  );
}