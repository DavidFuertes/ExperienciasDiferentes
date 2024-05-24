function EditComments({ comment, selectedCommentId, onCommentSelect }) {
  const { id, content } = comment;

  return (
    <li>
      <label>ID: {id}</label>
      <input
        type="radio"
        name="comment"
        value={id}
        checked={selectedCommentId === id}
        onChange={() => {
          onCommentSelect(id);
        }}
      />
      {content}
    </li>
  );
}

export default EditComments;
