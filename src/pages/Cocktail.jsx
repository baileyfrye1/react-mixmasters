import { useLoaderData, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

const singleCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};

const singleCocktailUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();

  const { data } = useQuery(singleCocktailQuery(id));

  if (!data?.drinks?.[0]) return <Navigate to='/' />;

  const singleDrink = data.drinks[0];

  const ingredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith('strIngredient') && singleDrink[key] !== null,
    )
    .map((key) => singleDrink[key])
    .join(', ');

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>
          Back Home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className='drink'>
        <img src={image} alt={name} className='img' />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>Category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>Info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>Glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>Ingredients: </span>
            {ingredients}
          </p>
          <p>
            <span className='drink-data'>Instructions: </span>
            {instructions}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  header {
    text-align: center;
    margin-bottom: 3rem;

    .btn {
      margin-bottom: 1rem;
    }
  }

  .img {
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-3);
  }

  .drink-info {
    margin-top: 2rem;

    p {
      font-weight: 700;
      line-height: 2;
      margin-bottom: 1rem;
    }
  }

  .drink-data {
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: var(--primary-300);
    color: var(--primary-700);
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
  }

  @media (min-width: 992px) {
    .drink {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 3rem;
      align-items: center;
    }

    .drink-info {
      margin-top: 0;
    }
  }
`;
export default Cocktail;
