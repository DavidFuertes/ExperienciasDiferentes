function EditComments ({comment}) {
    const {id, content} = comment;
    return (
        <li>
            <p>ID: {id}</p>
            <label>
                <input type="radio" name="comment" />
                {content}
            </label>
        </li>
    );

}

export default EditComments;