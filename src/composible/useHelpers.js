export default function () {
  const getInputGroup = (parent) =>
    ['input', 'textarea', 'select'].reduce((array, tag) => {
      Array.from(
        document.getElementById(parent).getElementsByTagName(tag)
      ).forEach((item) => array.push(item))
      return array
    }, [])

  const validateImageUrl = (url) =>
    url.startsWith('http') &&
    (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg'))

  return {
    validateImageUrl,
    getInputGroup
  }
}
