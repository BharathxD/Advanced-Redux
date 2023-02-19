import classes from "./Notification.module.css";

interface INotificationProps {
  status: string;
  title: string;
  message: string;
}

const Notification: React.FC<INotificationProps> = ({
  status,
  title,
  message,
}) => {
  let specialClasses: string = "";

  if (status === "error") {
    specialClasses = classes.error;
  }
  if (status === "success") {
    specialClasses = classes.success;
  }

  return (
    <section className={`${classes.notification} ${specialClasses}`}>
      <h2>{title}</h2>
      <p>{message}</p>
    </section>
  );
};

export default Notification;
