import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtainExperienceService } from "../../services/index.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import { ExperienceData } from "../../components/ExperienceData.jsx";
import { ExperienceComment } from "../../components/ExperienceComment.jsx";
import styles from "../../components/ExperienceData.module.css"
import Loading from "../../components/Loading.jsx";

export const Experience = () => {
  const { experienceId } = useParams();
  const [data, setData] = useState({
    comments: null,
    experience: null,
    inscribed: null,
    rate: null,
  });

  useEffect(() => {
    const obtainExperience = async () => {
      try {
        const response = await obtainExperienceService(experienceId);
        setData((prevData) => ({
          ...prevData,
          comments: response.comments,
          experience: response.data[0],
          inscribed: response.inscribed,
          rate: response.rate[0],
        }));
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    };
    obtainExperience();
  }, [experienceId]);

  return !data.experience ? (
    <Loading />
  ) : (
    <>
      <ToastContainer />
      <section className="listSection">
        <ExperienceData
          experience={data.experience}
          experienceId={experienceId}
          inscribed={data.inscribed}
          rate={data.rate}
        />
      </section>
      <div className={styles.commentBox}>
      <section className={styles.commentsSection}>
        <h1 className={styles.titleComments}>Comentarios</h1>
          {data.comments.map((comment) => (
            <ExperienceComment
              key={comment.id}
              commenter_name={comment.commenter_name}
              comment={comment.content}
            />
          ))}
      </section>
      </div>
    </>
  );
};
