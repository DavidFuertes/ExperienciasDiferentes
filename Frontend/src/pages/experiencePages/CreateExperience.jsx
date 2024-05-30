import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { createExperienceSchema } from "../../schemas/createExperienceSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import styles from "./CreateExperience.module.css"
const { VITE_BACKEND_URL } = import.meta.env;

export const CreateExperience = () => {
  const { token } = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: joiResolver(createExperienceSchema),
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const rutaTemporalImagen = URL.createObjectURL(file);
    setImagePreview(rutaTemporalImagen);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const fechaString = data.date;
      const fecha = new Date(Date.parse(fechaString));
      const year = fecha.getFullYear();
      const mes = fecha.getMonth() + 1;
      const dia = fecha.getDate();
      const fechaFormateada = `${year}-${mes.toString().padStart(2, "0")}-${dia
        .toString()
        .padStart(2, "0")}`;
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("city", data.city);
      formData.append("date", fechaFormateada);
      formData.append("price", data.price);
      formData.append("min_places", data.min_places);
      formData.append("total_places", data.total_places);
      if (data.newImage) {
        formData.append("newImage", data.newImage[0]);
      }
      const response = await fetch(
        `${VITE_BACKEND_URL}/experiences/newexperience`,
        {
          method: "POST",
          headers: {
            token,
          },
          body: formData,
        }
      );

      const respData = await response.json();
      if (response.ok === true) {
        toast.success("La experiencia se ha creado correctamente", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        reset();
      } else {
        throw new Error(respData.message);
      }
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
  return (
    <>
        <h1 className={styles.h1Create}>Nueva Experiencia</h1>
      <ToastContainer />
      <section className={styles.formSection}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
  
            <input type="text" className={styles.createTitle} placeholder="Título..." {...register("title")} />
            <p className={styles.errorMsg}>{errors.title?.message}</p>


            <input
              type="textarea"
              className={styles.createDescription}
              placeholder="Descripción..."
              {...register("description")}
            />
            <p className={styles.errorMsg}>{errors.description?.message}</p>


            <select className={styles.createSelect} {...register("type")}>
              <option className={styles.createSelectOption} value="">Selecciona una opción</option>
              <option className={styles.createSelectOption} value="Relajado">Relajado</option>
              <option className={styles.createSelectOption} value="Medio">Medio</option>
              <option className={styles.createSelectOption} value="Adrenalina pura">Adrenalina pura</option>
            </select>
            <p className={styles.errorMsg}>{errors.type?.message}</p>


            <input type="text" className={styles.createCity} placeholder="Ciudad..." {...register("city")} />
            <p className={styles.errorMsg}>{errors.city?.message}</p>

            <div className={styles.divInputs}>
            {imagePreview && (
              <img
              src={imagePreview}
              alt="Imagen previsualizada"
              className={styles.imgPreview}
              />
            )}
            <input
              type="file"
              name="newImage"
              {...register("newImage")}
              onChange={handleImageChange}
            />
            </div>
            <p className={styles.errorMsg}>{errors.newImage?.message}</p>


            <input type="date" className={styles.createDate} {...register("date")} />
            <p>{errors.date?.message}</p>

            <input
              className={styles.createPrice}
              type="Number"
              min="0"
              max="500"
              placeholder="Precio..."
              {...register("price")}
            />
            <p>{errors.price?.message}</p>


            <input
              className={styles.createMinPlaces}
              type="Number"
              min="5"
              max="10"
              placeholder="Plazas mínimas..."
              {...register("min_places")}
            />
            <p>{errors.min_places?.message}</p>

            <input
              className={styles.createMaxPlaces}
              type="Number"
              min="10"
              max="25"
              placeholder="Plazas máximas..."
              {...register("total_places")}
            />
            <p>{errors.total_places?.message}</p>


          <button className={styles.createButton} disabled={!isValid} type="submit">
            Crear experiencia
          </button>
        </form>
      </section>
    </>
  );
};
