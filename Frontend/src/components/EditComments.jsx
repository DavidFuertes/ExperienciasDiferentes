function EditComments({ comment }) {
  const { id, content } = comment;
  return (
    <li>
      <p>ID: {id}</p>
      <label></label>
      <input type="radio" name="comment" />
      {content}
    </li>
  );
}

export default EditComments;
