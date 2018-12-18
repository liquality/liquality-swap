import _ from 'lodash'
import localStorage from 'store'
import { store } from '../store'

function update (obj) {
  const link = store.getState().swap.link
  const item = localStorage.get(link)
  if (!item) {
    localStorage.set(link, obj)
  } else {
    const updated = _.clone(item)
    _.merge(updated, obj)
    localStorage.set(link, updated)
  }
}

function get () {
  const link = store.getState().swap.link
  return localStorage.get(link)
}

export default { update, get }
