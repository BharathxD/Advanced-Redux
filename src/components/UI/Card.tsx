import classes from "./Card.module.css";

interface ICardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<ICardProps> = ({ className, children }) => {
  return (
    <section className={`${classes.card} ${className ? className : ""}`}>
      {children}
    </section>
  );
};

export default Card;
