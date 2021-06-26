import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  stages: [
    { duration: '5s', target: 20 },
    { duration: '20s', target: 10 },
    { duration: '5s', target: 0 },
  ],
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
