

```bash
# Run script 
docker run -i loadimpact/k6 run - <test-k6.js

# Run for 30 seconds with 10 users
docker run -i loadimpact/k6 run --vus 10 --duration 30s - <script.js
```



Default parameters in javascript 

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}
```

Ramp up and ramp down 

```javascript
export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};
```

