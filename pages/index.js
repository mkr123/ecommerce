import React from "react";
import { client } from "../lib/client"
import  { Product, FooterBanner, HeroBanner }from '../components';

const Home = ({products, bannerData}) => {
  return <>
          <HeroBanner heroBanner={bannerData.length && bannerData[1]}/>
          <div className= "products-heading">
            <h2>Best Selling Products</h2>
            <p>Products you might be interested in</p>
          </div>
          <div className= "products-container">
            {
            products?.map((product)=> <Product key={product._id} product={product}/>)
            }
          </div>


          <FooterBanner footerBanner = {bannerData && bannerData[0]}/>
         </>;
};
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  console.log(bannerData);
  return {
    props: { products, bannerData }
  }
}
export default Home;
