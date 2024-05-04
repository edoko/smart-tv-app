const getOS = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const w = window as any
  if (w.tizen) {
    return 'tizen'
  } else if (w.webOSSystem) {
    return 'webOS'
  } else {
    return 'browser'
  }
}

export default getOS
