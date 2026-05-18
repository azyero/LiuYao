import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem('liuyao-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

function applyTheme() {
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}

applyTheme()

watch(theme, (newTheme) => {
  localStorage.setItem('liuyao-theme', newTheme)
  applyTheme()
})

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
