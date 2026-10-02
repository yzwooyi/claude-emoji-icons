import type { Register } from 'claude-code'

type Icon = { color: string; body: string }

// Lucide-style 24x24 line icons, one muted colour each
const ICONS: Record<string, Icon> = {
  '🔴': { color: '#e5534b', body: '<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><path d="M12 8v4M12 16h.01"/>' },
  '⚠': { color: '#d4a72c', body: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>' },
  '✅': { color: '#57ab5a', body: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>' },
  '📊': { color: '#539bf5', body: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9M13 17V5M8 17v-3"/>' },
  '💡': { color: '#e3b341', body: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6M10 22h4"/>' },
  '❓': { color: '#b083f0', body: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>' },
  '🔧': { color: '#9198a1', body: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>' },
  '⏳': { color: '#39c5cf', body: '<path d="M5 22h14M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>' },
  '👉': { color: '#f0883e', body: '<path d="M22 14a8 8 0 0 1-8 8"/><path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1"/><path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10"/><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>' },
  '📎': { color: '#adbac7', body: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>' },
  '🛡': { color: '#c96198', body: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>' },
  '📤': { color: '#6cc644', body: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/>' },
  '🔍': { color: '#7f8cf5', body: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>' },
  '💬': { color: '#5ab8ee', body: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>' },
  '🧪': { color: '#46d19b', body: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094M8.5 2h7"/>' },
  '🐛': { color: '#ff6f91', body: '<path d="m8 2 1.88 1.88M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/>' },
  '⚙': { color: '#c9ab85', body: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>' },
  '📁': { color: '#b9803f', body: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>' },
  '🎨': { color: '#dc6fe0', body: '<path d="M13.5 6.5h.01M17.5 10.5h.01M8.5 7.5h.01M6.5 12.5h.01"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>' },
  '💰': { color: '#c9d34a', body: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>' },
  '📅': { color: '#f28b82', body: '<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>' },
  '🤖': { color: '#2ab5a5', body: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/>' },
  '🔗': { color: '#6aa0c8', body: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' },
  '↩': { color: '#a89cc8', body: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>' },
}

export type Block = { icon?: string; heading: boolean; md: string }

// emoji with or without U+FE0F; then the rest of the paragraph after the emoji
const LEAD = /^(# )?(🔴|⚠|✅|📊|💡|❓|🔧|⏳|👉|📎|🛡|📤|🔍|💬|🧪|🐛|⚙|📁|🎨|💰|📅|🤖|🔗|↩)\uFE0F?[ \t]*([\s\S]*)$/

// Paragraphs are cut at blank lines outside ``` fences; a paragraph that
// opens with one of the 24 emoji becomes an icon block, neighbours that do not
// are merged back into one markdown block, untouched.
export function splitBlocks(text: string): Block[] {
  const paras: string[] = []
  let cur: string[] = []
  let fence = false
  for (const line of text.split('\n')) {
    if (/^\s{0,3}(```|~~~)/.test(line)) fence = !fence
    if (!fence && line.trim() === '' && !/^\s{0,3}(```|~~~)/.test(line)) {
      if (cur.length) paras.push(cur.join('\n'))
      cur = []
    } else cur.push(line)
  }
  if (cur.length) paras.push(cur.join('\n'))

  const out: Block[] = []
  for (const p of paras) {
    const m = LEAD.exec(p)
    if (m) out.push({ icon: m[2]!, heading: m[1] !== undefined, md: m[3]! })
    else if (out.length && out[out.length - 1]!.icon === undefined) out[out.length - 1]!.md += '\n\n' + p
    else out.push({ heading: false, md: p })
  }
  return out
}

// The desktop draws Markdown with a block margin above its first line (~20px,
// measured) and ignores a Box's marginTop there, so the icon is pushed down
// inside its own drawing: `off` blank px above it, to meet the first line.
function svg(icon: string, size: number, off: number): string {
  const i = ICONS[icon]!
  const k = (off * 24) / size
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + off}" viewBox="0 ${-k} 24 ${24 + k}" fill="none" stroke="${i.color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${i.body}</svg>`
}

// A heading is drawn as one picture (icon + 22px bold text): the Markdown element a
// mod can use draws `#` smaller than the transcript's own heading (Jazper 2026-10-02:
// "我要 4 个新 mod 的那样大"). Width is estimated per character; null = fall back.
const H_FONT = 22
export function headingSvg(icon: string, md: string): { source: string; width: number; height: number; alt: string } | null {
  if (md.includes('\n')) return null
  const plain = md.replace(/\*\*|__|`/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').trim()
  if (!plain) return null
  let em = 0
  for (const ch of plain) em += /[\u2e80-\uffef]/.test(ch) ? 1 : ch === ' ' ? 0.3 : 0.62
  if (em > 40) return null
  const i = ICONS[icon]!
  // text starts at x=24, the same left edge as body text beside a 15px icon (Jazper 2026-10-02 "歪歪的")
  const width = Math.ceil(24 + em * H_FONT + 8)
  const height = 36
  const esc = plain.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const source =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<g transform="translate(0 9) scale(0.75)" fill="none" stroke="${i.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${i.body}</g>` +
    `<text x="24" y="26" fill="#ececec" font-size="${H_FONT}" font-weight="700" font-family="-apple-system, 'PingFang SC', 'Helvetica Neue', sans-serif">${esc}</text></svg>`
  return { source, width, height, alt: plain }
}

// A real 15x15 drawing (transparent rect): an empty svg is laid out 0 wide on desktop
const BLANK = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/></svg>'

export const register: Register = on => {
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    try {
      // Only surfaces that draw Svg
      if (e.surface === 'terminal') return next(e)
      const blocks = splitBlocks(e.props.text)
      if (!blocks.some(b => b.icon !== undefined)) return next(e)
      if (blocks.some(b => b.md.length > 9000)) return next(e) // Markdown caps at 10000

      const { Box, Markdown, Svg } = $.ui.resolve(e)
      return (
        <Box flexDirection="column" gap={1}>
          {blocks.map(b => {
            // No icon: a blank of the same width keeps every block's text on one left edge
            if (b.icon === undefined)
              return (
                <Box flexDirection="row" gap={1} alignItems="flex-start">
                  <Box flexShrink={0}>
                    <Svg source={BLANK} alt="" width={15} height={15} />
                  </Box>
                  <Box flexGrow={1} flexShrink={1}>
                    <Markdown text={b.md} />
                  </Box>
                </Box>
              )
            const big = b.heading ? headingSvg(b.icon, b.md) : null
            if (big)
              return (
                <Box flexDirection="row">
                  <Svg source={big.source} alt={big.alt} width={big.width} height={big.height} />
                </Box>
              )
            const size = b.heading ? 20 : 15
            const off = b.heading ? 6 : 3
            return (
              <Box flexDirection="row" gap={1} alignItems="flex-start">
                <Box flexShrink={0}>
                  <Svg source={svg(b.icon, size, off)} alt={b.icon} width={size} height={size + off} />
                </Box>
                <Box flexGrow={1} flexShrink={1}>
                  <Markdown text={b.heading ? '# ' + b.md : b.md} />
                </Box>
              </Box>
            )
          })}
        </Box>
      )
    } catch {
      return next(e)
    }
  })
}
