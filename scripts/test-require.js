import {runner} from './wrapped-runner.js';
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
