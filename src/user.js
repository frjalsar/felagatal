import { getCookie } from 'tiny-cookie'

export default function () {
  const cookie = getCookie('FRI_FELAGATAL')
  if (cookie) {
    const user = JSON.parse(atob(cookie))
    return user
  } else {
    return undefined
  }
}
