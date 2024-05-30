import styles from "./EditExperienceForm.module.css";

function EditComments({ comment, selectedCommentId, onCommentSelect }) {
  const { id, content } = comment;

  return (
    <li className={styles.listItem}>
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
