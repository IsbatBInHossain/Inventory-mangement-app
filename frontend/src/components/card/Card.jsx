import styles from './Card.module.scss';

// eslint-disable-next-line react/prop-types
const Card = ({ children, cardClasses }) => {
  return <div className={`${styles.card} ${cardClasses}`}>{children}</div>;
};
export default Card;
