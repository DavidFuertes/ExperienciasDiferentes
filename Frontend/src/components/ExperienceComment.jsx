import styles from "./ExperienceData.module.css"

export const ExperienceComment = (props) => {
  //lo paso como props porque también podemos usar el id de usuario si queremos para enlazarlo al perfil del usuario que comentó en un futuro
  const { comment, commenter_name } = props;
  return (
    <div className={styles.userComment}>
      <p className={styles.userNameInfo}>{commenter_name}</p>
      <p className={styles.userCommentInfo}>{comment}</p>
    </div>
  );
};
