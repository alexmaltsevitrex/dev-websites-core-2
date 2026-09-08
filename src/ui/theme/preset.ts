/**
 * JS Tailwind preset — use when the app drives theme via `tailwind.config.ts`
 * (`@config` / `presets`), not only CSS `@theme`.
 *
 * Usage in the app:
 *
 *   import uiPreset from '@tetherto/dev-websites-core/ui/theme/preset'
 *
 *   export default {
 *     presets: [uiPreset],
 *     content: [
 *       // app sources + package dist (see README for globs)
 *     ],
 *   }
 *
 * Import tokens.css (or theme.css) so the CSS variables exist, then override
 * brand values in the app :root.
 *
 * WDK / QVAC already define these utilities themselves — optional for them.
 */

const hsl = (name: string) => `hsl(var(${name}) / <alpha-value>)`

const preset = {
  theme: {
    extend: {
      colors: {
        'background': hsl('--background'),
        'surface': {
          DEFAULT: hsl('--surface'),
          elevated: hsl('--surface-elevated'),
        },
        'surface-elevated': hsl('--surface-elevated'),
        'card': {
          DEFAULT: hsl('--card'),
          elevated: hsl('--card-elevated'),
        },
        'card-elevated': hsl('--card-elevated'),
        'foreground': hsl('--foreground'),
        'secondary': hsl('--secondary'),
        'muted': hsl('--muted'),
        'accent': {
          DEFAULT: hsl('--accent'),
          foreground: hsl('--accent-foreground'),
          hover: hsl('--accent-hover'),
          dim: hsl('--accent-dim'),
        },
        'border': {
          DEFAULT: hsl('--border'),
          subtle: hsl('--border-subtle'),
        },
        'destructive': hsl('--destructive'),
        'success': hsl('--success'),
        'warning': hsl('--warning'),
        'ring': hsl('--ring'),
      },
      borderRadius: {
        btn: 'var(--btn-radius)',
        control: 'var(--control-radius)',
        card: 'var(--card-radius)',
      },
      height: {
        'btn': 'var(--btn-h)',
        'btn-sm': 'var(--btn-h-sm)',
      },
      size: {
        'btn-sm': 'var(--btn-h-sm)',
      },
      padding: {
        'btn': 'var(--btn-px)',
        'btn-sm': 'var(--btn-px-sm)',
      },
    },
  },
}

export default preset
