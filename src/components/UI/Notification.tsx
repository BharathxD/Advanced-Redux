import classes from "./Notification.module.css";

interface INotificationProps {
  status: string;
  title: string;
  message: string;
}

const Notification: React.FC<INotificationProps> = (props) => {
  let specialClasses = "";

  if (props.status === "error") {
    specialClasses = classes.error;
  }
  if (props.status === "success") {
    specialClasses = classes.success;
  }

  const cssClasses = `${classes.notification} ${specialClasses}`;

  return (
    <section className={cssClasses}>
      <h2>{props.title}</h2>
      <p>
        {props.message}
        <span>
          <button>X</button>
        </span>
      </p>
    </section>
  );
};

export default Notification;
