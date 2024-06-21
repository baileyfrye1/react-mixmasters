import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CocktailCard = ({ image, name, id, info, glass }) => {
  return (
    <Wrapper>
      <div className='img-container'>
        <img src={image} alt={name} className='img' />
      </div>
      <div className='footer'>
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className='btn'>
          Details
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--white);
  box-shadow: var(--shadow-2);
  transition: var(--transition);
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: var(--borderRadius);
  &:hover {
    box-shadow: var(--shadow-4);
  }

  img {
    height: 15rem;
    border-radius: var(--borderRadius) var(--borderRadius) 0 0;
  }

  .footer {
    padding: 1.5rem;
    h4,
    h5 {
      margin-bottom: 0.5rem;
    }
    h4 {
      font-weight: 700;
    }
    p {
      margin-bottom: 1rem;
      color: var(--grey-500);
    }
  }
`;
export default CocktailCard;
