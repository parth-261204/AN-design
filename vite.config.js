import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { productCards } from './src/data/products.js'

const normalizeProductText = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const searchProducts = (query) => {
  const cleanedQuery = normalizeProductText(query.trim())
  if (!cleanedQuery) return productCards

  return productCards
    .map((product) => ({
      product,
      normalizedLabel: normalizeProductText(product.label),
      normalizedAlt: normalizeProductText(product.alt),
    }))
    .filter(({ normalizedLabel, normalizedAlt }) => (
      normalizedLabel.startsWith(cleanedQuery)
      || normalizedAlt.startsWith(cleanedQuery)
      || normalizedLabel.includes(cleanedQuery)
      || normalizedAlt.includes(cleanedQuery)
    ))
    .sort((first, second) => {
      const firstStartsWithQuery = first.normalizedLabel.startsWith(cleanedQuery)
      const secondStartsWithQuery = second.normalizedLabel.startsWith(cleanedQuery)
      if (firstStartsWithQuery === secondStartsWithQuery) {
        return first.product.label.localeCompare(second.product.label)
      }
      return firstStartsWithQuery ? -1 : 1
    })
    .map(({ product }) => product)
}

const productApiPlugin = () => ({
  name: 'an-designs-product-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url?.startsWith('/api/products')) {
        next()
        return
      }

      const url = new URL(req.url, 'http://localhost')
      const products = searchProducts(url.searchParams.get('search') ?? '')

      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ products }))
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [productApiPlugin(), react(), tailwindcss()],
})
