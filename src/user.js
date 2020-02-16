import agent from 'superagent'

export function getUser () {
  const userSession = sessionStorage.getItem('FRI_FELAGATAL')
  if (userSession) {
    const user = JSON.parse(userSession)
    return Promise.resolve(user)
  } else {
    return agent
      .get(process.env.FRI_API_URL + '/user')
      .withCredentials()
      .then(res => {
        if (res.body && res.body.id) {
          sessionStorage.setItem('FRI_FELAGATAL', JSON.stringify(res.body))
          return res.body
        }
      })
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
