import { sleep } from 'k6'
import http from 'k6/http'


// See https://k6.io/docs/using-k6/options
export const options = {
 vus: 1,
 duration: '10s',
 cloud:{
     projectID:3693693,
     name:'k6cloud Test',
 }
};


export default function () {
 http.get('https://test-api.k6.io/public/crocodiles/')
 sleep(1)
}