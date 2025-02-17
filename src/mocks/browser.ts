// src/mocks/browser.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Set up the mock service worker
export const worker = setupWorker(...handlers)

worker.start({
    onUnhandledRequest: 'bypass', // This bypasses unhandled requests, useful for development
})
