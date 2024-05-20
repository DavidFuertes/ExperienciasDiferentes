export const ExperienceComment = (props) => {
  //lo paso como props porque también podemos usar el id de usuario si queremos para enlazarlo al perfil del usuario que comentó en un futuro
  const { comment, commenter_name } = props;
  return (
    <>
      <p>{commenter_name}</p>
      <p>{comment}</p>
    </>
  );
};
