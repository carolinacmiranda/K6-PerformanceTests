import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 1,
    duration: '1m',
    thresholds: {
        http_req_duration: ['p(95)<5000'], // 95% das requisições devem responder em até 1s
        http_req_failed: ['rate<0.01'] // 1% das requisições podem ocorrer erro
    }
}

export default function () {
  const url = 'https://app.smarttbot.com/api/v2/strategies/scoreboards/placar-unificado'

  const res = http.get(url)

  check(res, {
    'status should be 200': (r) => r.status === 200
  })

  console.log(res.body)
  
  sleep(1)
}


// https://api2.ontick.com.br/v1/products/list-v4/12589?page=12
// https://api2.ontick.com.br/v1/preferences/marketplace
// https://api2.ontick.com.br/v1/products/categories
// https://api2.ontick.com.br/v1/strategies/info/193?account_id=12589
// https://api2.ontick.com.br/v1/strategies/operations/193