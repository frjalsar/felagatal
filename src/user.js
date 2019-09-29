import { getCookie } from 'tiny-cookie'
import { Base64 } from 'js-base64'

export function getUser () {
  const cookie = getCookie('FRI_FELAGATAL')
  if (cookie) {
    const user = JSON.parse(Base64.decode(cookie))
    return user
  } else {
    return undefined
  }
}

export function handle401 (e) {
  if (e.status === 401) {
    return {
      type: 'danger',
      msg: 'Þú hefur ekki réttindi til að breyta.'
    }
  } else {
    return {
      type: 'warning',
      msg: 'Ekki tókst að vista.'
    }
  }
}

export function hasAccess (entityId, value) {
  const user = getUser()
  if (entityId) {
    if (user && user.admin) {
      return true
    }

    if (user && user[entityId] === value) {
      return true
    }
  }

  return false
}
