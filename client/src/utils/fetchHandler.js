import wrapPromise from './wrapPromise'
import { BASE_URL } from '../config/config';

const fetchData = (url) => {
  const promise = fetch(`${BASE_URL}${url}`)
    .then((res) => res.json())
    .then((data) => data)

  return wrapPromise(promise)
}

export default fetchData