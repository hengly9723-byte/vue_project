// Telegram-style avatar colors
const COLORS = ['#e17076', '#faa774', '#a695e7', '#7bc862', '#6ec9cb', '#65aadd', '#ee7aae']

export function avatarColor(seed) {
  const key = String(seed ?? '')
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0 // turn the text into a number
  }
  return COLORS[hash % COLORS.length]             // use the number to pick a color
}