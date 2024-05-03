const getOS = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const w = window as any
  switch (window as any) {
    case w.tizen:
      return 'tizen'
    case w.webOS:
      return 'webOS'
    default:
      return 'browser'
  }
}

export default getOS
