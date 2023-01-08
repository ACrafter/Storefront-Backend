import React from 'react';
import ReactDom from 'react-dom';
import "./product_page.css"
import About from './about';
//import Search from './search';
//import "./index.css";
//import App from "./App";
//import Cart from "./test"
//import "./cart.css";

const constantProduct = {
  img: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/51p2SDOCV9L._SX482_BO1,204,203,200_.jpg",
  title: 'I Love You to the Moon and Back',
  price: 500,
  des: "The sun rises, and a bear and cub begin their day together. They splash in the water, climb mountains, watch the colorful lights in the shimmering sky, and play with friends. They show their love for each other by touching noses, chasing each other, and, of course, hugging and snuggling before bed. A sweet, gentle rhyme, perfect for sharing with a special little one that also includes a “To” and “From” personalization page in the front of the book, making this heartwarming book an ideal gift."
}

function ProductPage() {
  return (<section className='productlist'>
    <Product img={constantProduct.img} title={constantProduct.title} price={constantProduct.price} des={constantProduct.des} />
  </section>);
}

const Product = ({ img, title, price, des }) => {
  ///const {img, title, author}=props;
  return (
    <article className='product'>
      <img src={img} alt='' class="img" height="450" width="450" />
      <h1 class="size1">{title}</h1>
      <h2 class="size1">{price}</h2>
      <p class="size2">{des}</p>
      <button class="button" type="button" onclick="alert('You will Successfully created a button')">
        Add To Cart
      </button>
    </article>);
};

ReactDom.render(<ProductPage />, document.getElementById('root')
);