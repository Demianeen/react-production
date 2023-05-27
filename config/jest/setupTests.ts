import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import { server } from '../../src/app/mocks/server'

// Establish API mocking before all mocks1.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the mocks1, so they don't affect other mocks1.
afterEach(() => server.resetHandlers())

// Clean up after the mocks1 are finished.
afterAll(() => server.close())
