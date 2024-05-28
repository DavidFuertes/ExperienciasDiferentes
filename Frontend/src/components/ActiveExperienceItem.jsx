import Comment from "./Comment.jsx";
function ActiveExperiencesItem({ activeExperience }) {
    const {
        title,
        description,
        type,
        city,
        image,
        formatted_date,
        price,
        average_rate,
        comments
    } = activeExperience;

    const active = 1;
    const experienceId = activeExperience.id;



    const rate = parseFloat(average_rate);
    const rating = rate.toFixed(1);

    let printRating;
    let printComments;

    if (rating <= 0) {
        printRating = <><strong>Aún no hay valoraciones.</strong></>;
    } else {
        printRating = <><strong>Valoración:</strong> {rating}<strong>★</strong></>;
    }

    if (comments[0].content === null) {
        printComments = <><h3>Comentarios</h3><strong>Aún no hay comentarios.</strong></>;
    } else {
        printComments = <><h3>Comentarios</h3> {comments.map((comment, index) => (<div key={index}><p>{comment.content}</p><p>Por: {comment.username}</p></div>))}</>;
    }
    


    return (
        <li>
            <div className="experience-card">
                <h3>{title}</h3>
                <img src={image} width="300" />
                <p className="description">{description}</p>
                <div className="details">
                    <p><strong>Tipo:</strong> {type}</p>
                    <p><strong>Ciudad:</strong> {city}</p>
                    <p><strong>Fecha:</strong> {formatted_date}</p>
                    <p><strong>Precio:</strong> {price}<strong>€</strong></p>
                    <p>{printRating}</p>
                </div>
                <section className="comments">
                    {printComments}
                </section>
                <section>
                    <Comment active = {active} experienceId = {experienceId} />
                </section>
            </div>
        </li>
    );
  }
  
  export default ActiveExperiencesItem;