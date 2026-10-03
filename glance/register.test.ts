import { expect, test } from 'claude-code/testing'

import { headingSvg, register, splitBlocks } from './hooks/register'

const FE0F = '️'

test('splitBlocks: 24 个标记 emoji 都认，⚠ ⚙ ↩ 带不带 FE0F 一样', () => {
  for (const e of ['🔴', '⚠', '✅', '📊', '💡', '❓', '🔧', '⏳', '👉', '📎', '🛡', '📤', '🔍', '💬', '🧪', '🐛', '⚙', '📁', '🎨', '💰', '📅', '🤖', '🔗', '↩']) {
    expect(splitBlocks(`${e} x`)).toEqual([{ icon: e, heading: false, md: 'x' }])
    expect(splitBlocks(`${e}${FE0F} x`)).toEqual([{ icon: e, heading: false, md: 'x' }])
  }
  expect(splitBlocks(`⚠${FE0F} x`)[0]!.icon).toBe('⚠')
  expect(splitBlocks('⚠ x')[0]!.icon).toBe('⚠')
  expect(splitBlocks('🛡 钱路径')[0]).toEqual({ icon: '🛡', heading: false, md: '钱路径' })
  expect(splitBlocks('👉 你来点')[0]!.icon).toBe('👉')
  expect(splitBlocks('🐛 复现了')[0]).toEqual({ icon: '🐛', heading: false, md: '复现了' })
})

test('splitBlocks: # 重点行 → heading + 图标', () => {
  expect(splitBlocks('# ✅ **标题**')).toEqual([{ icon: '✅', heading: true, md: '**标题**' }])
})

test('splitBlocks: 空行分段，无 emoji 的相邻段并回一块', () => {
  expect(splitBlocks('前言\n\n再一段\n\n🔧 改了 a\n\n⏳ 等')).toEqual([
    { heading: false, md: '前言\n\n再一段' },
    { icon: '🔧', heading: false, md: '改了 a' },
    { icon: '⏳', heading: false, md: '等' },
  ])
})

test('splitBlocks 反例: 代码块里的 emoji 不动、空行不拆', () => {
  const t = '```\n🔴 x\n\n⚠️ y\n```'
  expect(splitBlocks(t)).toEqual([{ heading: false, md: t }])
  expect(splitBlocks('```\n🔍 x\n```')).toEqual([{ heading: false, md: '```\n🔍 x\n```' }])
  const mixed = splitBlocks('🔴 真的\n\n```\n\n✅ z\n```\n\n后文')
  expect(mixed).toHaveLength(2)
  expect(mixed[1]!.md).toBe('```\n\n✅ z\n```\n\n后文')
})

test('splitBlocks 反例: 句中、列表里、表格里的 emoji 不动', () => {
  for (const t of ['这是 🔴 句中', '- ✅ 列表项', '| a | ✅ |\n|---|---|', ' ✅ 前面有空格', '看 🔍 句中', '这里 🐛 句中', '改 ⚙️ 句中', '- 🔗 列表项']) {
    expect(splitBlocks(t).every(b => b.icon === undefined)).toBe(true)
  }
})

for (const surface of ['desktop', 'vscode'] as const) {
  test(`${surface}: 命中的段画成 Svg + Markdown`, async ($, on) => {
    on('ui.render', () => ({ type: 'engine', ref: 0 }) as any)
    register(on as any, {} as any)
    const ui = await $.ui.mount({
      plugin: 'glance', surface, component: 'AssistantMessage',
      props: { text: '# ✅ **好了**\n\n⚠️ 注意\n\n普通段 🔴 句中', isFirstOfReply: true },
    })
    const drawn = JSON.stringify(await ui.drawn())
    expect(drawn).toContain('"Svg"')
    // the heading is drawn as one picture whose text is the heading
    expect(drawn).toContain('"alt":"好了"')
    expect(drawn).not.toContain('# **好了**')
    expect(drawn).toContain('普通段 🔴 句中')
    expect(drawn).not.toContain('"engine"')
    await ui.unmount()
  })
}

test('回归: 没有 emoji 的文本、terminal 上，都走 next(e) 原样', async ($, on) => {
  on('ui.render', () => ({ type: 'engine', ref: 0 }) as any)
  register(on as any, {} as any)
  for (const [surface, text] of [['desktop', '普通回复，句中 ✅ 不动'], ['terminal', '✅ 有 emoji 但在终端'], ['terminal', '# ✅ **x**']] as const) {
    const ui = await $.ui.mount({
      plugin: 'glance', surface, component: 'AssistantMessage',
      props: { text, isFirstOfReply: false },
    })
    const drawn = JSON.stringify(await ui.drawn())
    expect(drawn).toContain('"engine"')
    expect(drawn).not.toContain('"Svg"')
    await ui.unmount()
  }
})

// 回归: 桌面上图标在左、文字在右，同一行（横排），图标在前，文字不绕到图标下方
test('desktop: 命中段的容器横排，第一个子元素是图标，文字在后', async ($, on) => {
  on('ui.render', () => ({ type: 'engine', ref: 0 }) as any)
  register(on as any, {} as any)
  const ui = await $.ui.mount({
    plugin: 'glance', surface: 'desktop', component: 'AssistantMessage',
    props: { text: '# ✅ **好了**\n\n⚠️ 注意\n\n普通段', isFirstOfReply: true },
  })
  const root: any = await ui.drawn()
  // blocks are spaced apart, and every block (plain ones too) is an icon-column row,
  // so all text shares one left edge
  expect(root.props.gap).toBe(1)
  // row 0 is the heading picture: one Svg, icon and text in it
  expect(root.children[0].children).toHaveLength(1)
  expect(root.children[0].children[0].type).toBe('Svg')
  expect(root.children[0].children[0].props.source).toContain('font-size="22"')
  const rows = root.children.slice(1).filter((c: any) => c.type === 'Box')
  expect(rows).toHaveLength(2)
  for (const row of rows) {
    expect(row.props.flexDirection).toBe('row')
    expect(row.children[0].children[0].type).toBe('Svg')
    expect(row.children[0].props.flexShrink).toBe(0)
    expect(row.children[1].children[0].type).toBe('Markdown')
  }
  // the plain paragraph's column holds the blank spacer, not an icon
  expect(rows[1].children[0].children[0].props.alt).toBe('')
  expect(rows[0].children[0].children[0].props.alt).not.toBe('')
  await ui.unmount()
})

test('headingSvg: 画出图标和文字，宽度随字数变，特殊字符转义', () => {
  const short = headingSvg('✅', '**好了**')!
  const long = headingSvg('✅', '**4 个新 mod 都装成全局了，现在一共 10 个**')!
  expect(short.alt).toBe('好了')
  expect(short.source).toContain('>好了</text>')
  expect(long.width).toBeGreaterThan(short.width)
  expect(headingSvg('🔴', 'a < b & c')!.source).toContain('a &lt; b &amp; c')
})

test('headingSvg 反例: 多行、超长、空标题 → null，退回小标题', () => {
  expect(headingSvg('✅', '第一行\n第二行')).toBeNull()
  expect(headingSvg('✅', '长'.repeat(41))).toBeNull()
  expect(headingSvg('✅', '****')).toBeNull()
})
