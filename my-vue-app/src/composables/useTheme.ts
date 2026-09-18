import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem('liuyao-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // Storage can be disabled; the theme must still work in memory.
  }
  return 'dark'
}

const theme = ref<Theme>(getInitialTheme())

function applyTheme() {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme.value === 'dark')
}

applyTheme()

watch(theme, (newTheme) => {
  applyTheme()
  try {
    localStorage.setItem('liuyao-theme', newTheme)
  } catch {
    // Persisting a preference is optional.
  }
})

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
