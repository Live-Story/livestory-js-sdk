import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { build } from 'vite'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

let firstRunCounter = 0
const bundles = [
  {
    entry: 'entry.esm.ts',
    formats: ['es'],
    fileName: 'index',
  },
  {
    entry: 'entry.umd.ts',
    formats: ['umd'],
    name: 'LivestoryJSClient',
    fileName: 'index',
  }
]

;(async () => {
  for (const bundle of bundles) {
    await build({
      configFile: 'vite.config.ts',
      build: {
        lib: {
          entry: resolve(__dirname, 'src', bundle.entry),
          formats: bundle.formats,
          name: bundle.name,
          fileName: bundle.fileName,
        },
        emptyOutDir: !firstRunCounter++,
      },
      define: {
        'process.env': {
          npm_package_version: process.env.npm_package_version,
        },
      },
    })
  }
})()
