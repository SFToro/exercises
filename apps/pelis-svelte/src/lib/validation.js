
export function isSearchValid ({ query, lastSearch }) {
  if (!query) return false
  if (query === lastSearch) return false
  if (query.trim() === '') return false
  return true
}
