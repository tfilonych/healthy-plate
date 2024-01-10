import wrapPromise from './wrapPromise'
import $api from '../http';

const fetchData = (url, options = null) => {
  const promise = $api.get(url, options);

  return wrapPromise(promise)
}

export default fetchData