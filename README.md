### Todo

- [ ] How to get vues/duration in tests ?
- [ ] How to import signal r in a test ?





Create a simple script 

```javascript
// test-k6.js

import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

```bash

docker run -i loadimpact/k6 run - <test-k6.js

# Output : 
# 
#      data_received..................: 17 kB 7.8 kB/s
#      data_sent......................: 693 B 321 B/s
#      http_req_blocked...............: avg=883.78ms min=883.78ms med=883.78ms max=883.78ms p(90)=883.78ms p(95)=883.78ms
#      http_req_connecting............: avg=842.1µs  min=842.1µs  med=842.1µs  max=842.1µs  p(90)=842.1µs  p(95)=842.1µs
#      http_req_duration..............: avg=270.52ms min=270.52ms med=270.52ms max=270.52ms p(90)=270.52ms p(95)=270.52ms
#        { expected_response:true }...: avg=270.52ms min=270.52ms med=270.52ms max=270.52ms p(90)=270.52ms p(95)=270.52ms
#      http_req_failed................: 0.00% ✓ 0   ✗ 1
#      http_req_receiving.............: avg=762.6µs  min=762.6µs  med=762.6µs  max=762.6µs  p(90)=762.6µs  p(95)=762.6µs
#      http_req_sending...............: avg=1.08ms   min=1.08ms   med=1.08ms   max=1.08ms   p(90)=1.08ms   p(95)=1.08ms
#      http_req_tls_handshaking.......: avg=873.81ms min=873.81ms med=873.81ms max=873.81ms p(90)=873.81ms p(95)=873.81ms
#      http_req_waiting...............: avg=268.67ms min=268.67ms med=268.67ms max=268.67ms p(90)=268.67ms p(95)=268.67ms
#      http_reqs......................: 1     0.463458/s
#      iteration_duration.............: avg=2.15s    min=2.15s    med=2.15s    max=2.15s    p(90)=2.15s    p(95)=2.15s
#      iterations.....................: 1     0.463458/s
#      vus............................: 1     min=1 max=1
#      vus_max........................: 1     min=1 max=1
```



Create a new scripts with some optinos 

```javascript
//test-k6-options.js

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```



```bash
docker run -i loadimpact/k6 run - <scripts/test-k6-options.js
```





Generate output 

```bash
docker run --rm -i -v "$PWD:/work" loadimpact/k6 run --out json=/work/out.json /work/test-k6.js
```



Test plan

- Scenarios 
  - open market (x users)
  - closed market (y users)
- open market
  - Have some users streaming in realtime (10 users)
- Several users just create snapshot (simulate closed market)

### Todo

- Two kind of tests : 

  - Stress test

    > Run tests till requests start to fail

  - Benchmarking tests

    > How can we make pods run at 70% of CPU utilization

    

- Simulate in user for stgo watchlist

  - [ ] Create a streaming connection
  - [ ] Get a watchlist id where `50+ instruments, marketOpen`
  - [ ] Create a watchlist 
  - [ ] `after 5 seconds` till the test ends
    - [ ] scroll to bottom
    - [ ] scroll 10 items up
    - [ ] scroll 5 items down
    - [ ] scroll back to top