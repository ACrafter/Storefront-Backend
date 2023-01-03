import { data } from '../products';


function Test() {
    let data;
    async () => { data = fetch("http://localhost:3000").then((res) => res.json()); }
    return (
    
    );
}

export default Test;