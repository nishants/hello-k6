

```bash
# Run script 
docker run -i loadimpact/k6 run - <test-k6.js

# Run for 30 seconds with 10 users
docker run -i loadimpact/k6 run --vus 10 --duration 30s - <script.js

# Run with output
docker run --rm -i -v "$PWD/scripts:/work" loadimpact/k6 run --out json=/work/out.json /work/test-k6.js


docker run -v "$PWD/scripts:/work" loadimpact/k6 run --out json=/work/out.json /work/test-k6.js


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



Scnarios

```javascript
xport let options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'shared-iterations',

      // common scenario configuration
      startTime: '10s',
      gracefulStop: '5s',
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },

      // executor-specific configuration
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    another_scenario: { ... }
  }
}
```



### Importing modules

- NOTE THAT MODULES MUST BE IMPORTED WITH EXTENSION

```
// NOTICE test.js is with extension
import {runner} from './test.js';
export const options = {
  vus: 10,
  stages: [
    { duration: '5s', target: 20 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  runner();
}

```

