export const objToArray = (obj) => (
  Object.keys(obj).map(function (key) {
    return obj[key]
  })
)