import client from '@/apis/client'

function setToken(token: string) {
  client.updateHeaders({
    Authorization: `Bearer ${token}`,
  })
}

export default setToken
