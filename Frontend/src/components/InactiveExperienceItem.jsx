import Comment from "./Comment.jsx";
import styles from "../components/ExperienceData.module.css";
function InactiveExperiencesItem({ inactiveExperience }) {
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
    } = inactiveExperience;

    const rate = parseFloat(average_rate);
    const rating = rate.toFixed(1);

    const active = 0;
    const experienceId = inactiveExperience.id;

    let printRating;


    if (rating <= 0) {
        printRating = <><strong>Aún no hay valoraciones.</strong></>;
    } else {
        printRating = <>{rating}</>;
    }


    return (
            <div className={styles.myExperienceInside}>
                <h3>{title}</h3>
                <div className={styles.imageRate}>
                <img src={image} className={styles.experienceImgDetails}/>
                <p className={styles.experienceRateDetails}>{printRating}</p>
                </div>
                <p className={styles.experienceDescriptionDetails}>{description}</p>
                <section className={styles.sectionData}>
                <div className={styles.leftInfo}>
                    
                    <p className={styles.experienceCityDetails}> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>{" "}{city}</p>
                  <p className={styles.experienceFreeDetails}>{formatted_date}</p>
                </div>
                <div className={styles.rightInfo}>
                <p className={styles.experienceLevelDetails}>{type}</p>
                <p className={styles.experiencePriceDetails}> {price} €</p> 
                </div>
                </section>
                 <section className={styles.commentSectionMyExperiences}>
                 <Comment active = {active} experienceId = {experienceId} comments = {comments}/>
             </section>
            </div>
    );
}

  
export default InactiveExperiencesItem;