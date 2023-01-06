import { data } from '../products';


function Test() {
    let data;
    async () => { data = fetch("http://storefront-env.eba-qcpsqmqz.us-east-1.elasticbeanstalk.com").then((res) => res.json()); }
    return (
    
    );
}

export default Test;