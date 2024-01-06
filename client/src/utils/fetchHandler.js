import wrapPromise from './wrapPromise'
import config from '../config/config';

const fetchData = (url) => {
  const promise = fetch(`${config.BASE_URL}${url}`)
    .then((res) => res.json())
    .then((data) => data)

  return wrapPromise(promise)
}

export default fetchData