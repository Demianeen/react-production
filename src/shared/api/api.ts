import axios from 'axios'
import { AUTH_DATA_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

export const $api = axios.create({
  baseURL: __API__,
})

// set authorization header on each request
const updateAuthorizationHeader = () => {
  $api.defaults.headers.common.authorization =
    localStorage.getItem(AUTH_DATA_LOCALSTORAGE_KEY) ?? ''
}

// call the function initially to set the authorization header
updateAuthorizationHeader()

// listen for changes in the local storage and update the authorization header accordingly
window.addEventListener('storage', (e) => {
  if (e.key === AUTH_DATA_LOCALSTORAGE_KEY) {
    updateAuthorizationHeader()
  }
})
