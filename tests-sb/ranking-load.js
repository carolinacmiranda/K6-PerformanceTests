import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    {duration: '1m', target: 50},
    {duration: '2m', target: 50},
    {duration: '1m', target: 0}
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // 1% das requisições podem ocorrer erro
    }
}

export default function () {
  const url = 'https://app.smarttbot.com/api/v2/strategies/scoreboards/placar-unificado'

  const res = http.get(url)

  check(res, {
    'status should be 200': (r) => r.status === 200
  })

  sleep(1)
}
