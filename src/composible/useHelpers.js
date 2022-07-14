export default function () {
  const getInputGroup = (parent) =>
    ['input', 'textarea', 'select'].reduce((array, tag) => {
      Array.from(
        document.getElementById(parent).getElementsByTagName(tag)
      ).forEach((item) => item.type === 'file' ? 1 : array.push(item))
      return array
    }, [])

  const validateImageUrl = (url) => {
    if (!url) {
      return false
    }
    return (
      url.startsWith('http') &&
      (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg'))
    )
  }

  const parseObject = (object) => {
    const keys = Object.keys(object)
    const max = keys.sort((a, b) => (object[a] < object[b] ? -1 : 1))
    const array = object[max[0]].reduce((array, number, index) => {
      const obj = {}
      keys.forEach(
        (key) => (obj[key] = object[key][index] ? object[key][index] : '')
      )
      array.push(obj)
      return array
    }, [])
    return array
  }

  const formatTime = (ts) => {
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'full', timeStyle: 'short' }).format(ts)
  }

  return {
    formatTime,
    validateImageUrl,
    getInputGroup,
    parseObject
  }
}
