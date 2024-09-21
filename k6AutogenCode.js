import http from "k6/http";
import { sleep, check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    vus:1,
    duration: '10s',
    cloud:{
        provider: 'k6cloud',
        user: 'k6user',
        password: 'k6pass',
        region: 'us-east-1',
        zone: 'us-east-1a',
        image: 'ubuntu-18-04-x64',
        type: 'g4dn.xlarge',
        sshkey: 'k6key',
        publicip: true,
        cloudProvider: 'k6cloud', //k6cloud or k6cloud-aws
        cloudProviderRegion: 'us-east-1'
    },
    thresholds: {
        http_req_failed: ['rate<0.02'], // http errors should be less than 2%
        http_req_duration: ['p(95)<2000'], // 95% requests should be below 2s
    }
    
}
export default function () {
    let response = http.get("https://test-api.k6.io/public/crocodiles/");
    sleep(1);
}

export function handleSummary(data) {
    return {
        stdout: htmlReport(data),   
    };
}   
//https://test-api.k6.io/public/crocodiles/
//https://test-api.k6.io/public/crocodiles/1
//https://test-api.k6.io/public/crocodiles/2
//https://test-api.k6.io/public/crocodiles/3
//https://test-api.k6.io/public/crocodiles/4
//https://test-api.k6.io/public/crocodiles/5
//https://test-api.k6.io/public/crocodiles/6
//https://test-api.k6.io/public/crocodiles/7
//https://test-api.k6.io/public/crocodiles/8
//https://test-api.k6.io/public/crocodiles/9
//https://test-api.k6.io/public/crocodiles/10
//https://test-api.k6.io/public/crocodiles/11