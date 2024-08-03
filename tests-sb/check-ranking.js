import http from 'k6/http'
import { sleep, check } from 'k6'

export default function () {
  const res = http.get('https://app.smarttbot.com/api/v2/strategies/scoreboards/placar-unificado')

  check(res, {
    'status should be 200': (r) => r.status === 200
  })

  console.log(res.body)

  sleep(1)
}
