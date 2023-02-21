function setLocalStorage() {
  const LSBase = !localStorage.getItem('history') ? '{"history": []}' : localStorage.getItem('history')
  localStorage.setItem('history', LSBase)
}

function addCityInLS(city) {
  const curLS = getCurrentLS()
  curLS.history.push(city)
  localStorage.setItem('history', JSON.stringify(curLS))
}

function getCurrentLS() {
  const curLS = JSON.parse(localStorage.getItem('history'))
  return curLS
}

export { setLocalStorage, addCityInLS, getCurrentLS }

