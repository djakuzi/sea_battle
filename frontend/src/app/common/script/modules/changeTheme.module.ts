type typeSet = 'set' | 'toggle';

export default function changeTheme(typeSet: typeSet): void {
  const root = document.documentElement;
  const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  switch (typeSet) {
    case 'set':
        if (currentTheme || root.getAttribute('data-theme') == 'dark') {
          root.setAttribute('data-theme', 'dark');
        }
        break;
    case 'toggle':
        if (root.getAttribute('data-theme') == 'dark') {
          root.setAttribute('data-theme', 'light');
        } else {
          root.setAttribute('data-theme', 'dark');
        }
        break;
  }
}
