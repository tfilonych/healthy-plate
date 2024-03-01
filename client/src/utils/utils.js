export const transformDate = (timestampString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const date = new Date(timestampString);

  return date.toLocaleDateString('en-US', options);
}