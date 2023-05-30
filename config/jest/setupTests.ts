import '@testing-library/jest-dom'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import { server } from '../../src/app/mocks/server'

// Establish API mocking before all mock.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the mock, so they don't affect other mock.
afterEach(() => server.resetHandlers())

// Clean up after the mock are finished.
afterAll(() => server.close())
