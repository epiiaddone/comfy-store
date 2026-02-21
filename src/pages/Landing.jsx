import { Hero } from '../components';

import { customFetch } from '../utils';


const url = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  //the api puts the data inside an object called data
  const products = response.data.data;
  return { products };
};


const Landing = () => {
  return (
    <>
      <Hero />
    </>
  );
};
export default Landing;