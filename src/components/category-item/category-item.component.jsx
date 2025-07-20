import { useNavigate } from 'react-router-dom';

import { CategoryItemContainer, BackgroundImage, Body } from './category-item.styles';

const CategoryItem = ({ category }) => {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate()
  const onNavigatorHandler = () => navigate(route)

  return (
    <CategoryItemContainer onClick={onNavigatorHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </CategoryItemContainer>
  );
};

export default CategoryItem;
