import http from 'k6/http';
import { sleep } from 'k6';

export const  runner =  () => {
  http.get('https://test.k6.io');
  sleep(1);
}
