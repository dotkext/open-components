import '@open-components/ui-web';
import './styles.css';

const toggle = document.querySelector<HTMLButtonElement>('#theme');

toggle?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
});
