import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import { server } from '../../src/app/mocks/server'

// Establish API mocking before all mocks.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the mocks, so they don't affect other mocks.
afterEach(() => server.resetHandlers())

// Clean up after the mocks are finished.
afterAll(() => server.close())
