import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Наследуем стандартные атрибуты кнопки
  onClick?: () => void; // Делаем onClick необязательным, если используется type="submit"
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  animatedGradient?: boolean; // Новый параметр для анимированного градиента
}

export function Button({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
  animatedGradient = false, // По умолчанию анимация выключена
  ...props // Передаем остальные пропсы на нативный элемент button
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:translate-y-[-1px] active:shadow-lg active:translate-y-[-1px]';

  // Если анимированный градиент включен, меняем классы для варианта
  const variantClasses = animatedGradient
    ? {
        primary: 'btn-gradient-animated primary text-white focus:ring-[#6366f1]',
        secondary: 'btn-gradient-animated secondary text-white focus:ring-[#14b8a6]',
        outline:
          'bg-white hover:bg-[#f9fafb] active:bg-[#f9fafb] text-[#374151] border border-[#d1d5db] focus:ring-[#6366f1] hover:border-[#6366f1] hover:text-[#6366f1] active:border-[#6366f1] active:text-[#6366f1]',
      }
    : {
        primary:
          'bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#6366f1] active:from-[#4f46e5] active:to-[#6366f1] text-white border border-transparent focus:ring-[#6366f1]',
        secondary:
          'bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#0d9488] hover:to-[#14b8a6] active:from-[#0d9488] active:to-[#14b8a6] text-white border border-transparent focus:ring-[#14b8a6]',
        outline:
          'bg-white hover:bg-[#f9fafb] active:bg-[#f9fafb] text-[#374151] border border-[#d1d5db] focus:ring-[#6366f1] hover:border-[#6366f1] hover:text-[#6366f1] active:border-[#6366f1] active:text-[#6366f1]',
      };

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      {...props} // Передаем остальные пропсы
    >
      {children}
    </button>
  );
}
