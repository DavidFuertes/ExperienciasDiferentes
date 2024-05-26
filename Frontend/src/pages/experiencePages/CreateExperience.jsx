import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { createExperienceSchema } from "../../schemas/createExperienceSchema.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
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
    <div>
      <ToastContainer />
      <section className="formSection">
        <h1>Nueva Experiencia</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <label>Título</label>
            <input type="text" placeholder="Título..." {...register("title")} />
            <p>{errors.title?.message}</p>
          </fieldset>
          <fieldset>
            <label>Descripción</label>
            <input
              type="text"
              placeholder="Descripción..."
              {...register("description")}
            />
            <p>{errors.description?.message}</p>
          </fieldset>
          <fieldset>
            <label>Tipo de experiencia</label>
            <select {...register("type")}>
              <option value="">Selecciona una opción</option>
              <option value="Relajado">Relajado</option>
              <option value="Medio">Medio</option>
              <option value="Adrenalina pura">Adrenalina pura</option>
            </select>
            <p>{errors.type?.message}</p>
          </fieldset>
          <fieldset>
            <label>Ciudad</label>
            <input type="text" placeholder="Ciudad..." {...register("city")} />
            <p>{errors.city?.message}</p>
          </fieldset>
          <fieldset>
            <label>Imagen</label>
            <input
              type="file"
              name="newImage"
              {...register("newImage")}
              onChange={handleImageChange}
            />
            <p>{errors.newImage?.message}</p>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Imagen previsualizada"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </fieldset>
          <fieldset>
            <label>Fecha</label>
            <input type="date" {...register("date")} />
            <p>{errors.date?.message}</p>
          </fieldset>
          <fieldset>
            <label>Precio</label>
            <input
              type="Number"
              min="0"
              max="500"
              placeholder="0"
              {...register("price")}
            />
            <p>{errors.price?.message}</p>
          </fieldset>
          <fieldset>
            <label>Plazas mínimas</label>
            <input
              type="Number"
              min="5"
              max="10"
              placeholder="0"
              {...register("min_places")}
            />
            <p>{errors.min_places?.message}</p>
          </fieldset>
          <fieldset>
            <label>Plazas máximas</label>
            <input
              type="Number"
              min="10"
              max="25"
              placeholder="0"
              {...register("total_places")}
            />
            <p>{errors.total_places?.message}</p>
          </fieldset>

          <button disabled={!isValid} type="submit">
            Crear experiencia
          </button>
        </form>
      </section>
    </div>
  );
};
