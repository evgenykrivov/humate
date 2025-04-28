/**
 * Сервис для управления прокруткой экрана к определенным элементам
 */

/**
 * Плавно прокручивает страницу к секции CTA (форма подписки)
 */
export const scrollToCTA = (): void => {
  const ctaSection = document.getElementById('contact');

  if (ctaSection) {
    ctaSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * Плавно прокручивает страницу к любому элементу по его id
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
