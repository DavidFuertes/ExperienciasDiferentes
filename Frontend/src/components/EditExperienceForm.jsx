import { useEffect, useState } from "react";
import HandleAddDuplicateExperience from "./HandleAddDuplicateExperience";
import { ToastContainer } from "react-toastify";
import styles from "./EditExperienceForm.module.css";

function EditExperienceForm({ experienceInfo }) {
  const {
    id,
    title,
    description,
    type,
    city,
    image,
    date,
    price,
    min_places,
    total_places,
    active,
  } = experienceInfo[0];

  const [titleValue, setTitleValue] = useState(title);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [typeValue, setTypeValue] = useState(type);
  const [cityValue, setCityValue] = useState(city);
  const [imageValue, setImageValue] = useState(image);
  const [dateValue, setDateValue] = useState(date);
  const [priceValue, setPriceValue] = useState(price);
  const [minPlacesValue, setMinPlacesValue] = useState(min_places);
  const [totalPlacesValue, setTotalPlacesValue] = useState(total_places);
  const [activeValue, setActiveValue] = useState(active);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modifiedExperience, setModifiedExperience] = useState(null);
  const [imagePreview, setImagePreview] = useState(imageValue);
  const [fileValue, setFileValue] = useState(null);

  useEffect(() => {
    setTitleValue(title);
    setDescriptionValue(description);
    setTypeValue(type);
    setCityValue(city);
    setImageValue(image);
    setImagePreview(image);
    setDateValue(date);
    setPriceValue(price);
    setMinPlacesValue(min_places);
    setTotalPlacesValue(total_places);
    setActiveValue(active);
  }, [
    title,
    description,
    type,
    city,
    image,
    date,
    price,
    min_places,
    total_places,
    active,
  ]);

  useEffect(() => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("es-ES", options);
    const [day, month, year] = formattedDate.split("/");
    const dateWithDashes = `${year}-${month}-${day}`;
    setDateValue(dateWithDashes);
  }, [date]);

  function handleImageChange(event) {
    const file = event.target.files[0];
    const rutaTemporalImagen = URL.createObjectURL(file);

    setImagePreview(rutaTemporalImagen);
    setFileValue(file);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const modifiedExp = {
      id: id,
      title: titleValue,
      description: descriptionValue,
      type: typeValue,
      city: cityValue,
      image: imagePreview,
      file: fileValue,
      date: dateValue,
      price: priceValue,
      min_places: minPlacesValue,
      total_places: totalPlacesValue,
      active: activeValue,
    };

    //const formData = new FormData(modifiedExp);
    setModifiedExperience(modifiedExp);
    setModalIsOpen(true);
  }

  return (
    <>
      <ToastContainer />
      <section className={styles.formSectionPanelControl}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Editar Experiencia</h2>
          <p className={styles.id}>ID: {id}</p>

          <label>TÍTULO</label>
          <input
            className={styles.textInput}
            type="text"
            placeholder={titleValue}
            value={titleValue}
            minLength={10}
            maxLength={50}
            onChange={(event) => {
              setTitleValue(event.target.value);
            }}
          />
          <label>DESCRIPCIÓN</label>
          <textarea
            className={styles.textInput}
            type="text"
            placeholder={descriptionValue}
            value={descriptionValue}
            minLength={10}
            maxLength={200}
            onChange={(event) => {
              setDescriptionValue(event.target.value);
            }}
          />

          <label>TIPO</label>
          <select
            className={styles.select}
            value={typeValue}
            onChange={(event) => {
              setTypeValue(event.target.value);
            }}
          >
            <option value="Adrenalina pura">Adrenalina pura</option>
            <option value="Medio">Medio</option>
            <option value="Relajado">Relajado</option>
          </select>
          <label>LUGAR</label>
          <input
            className={styles.textInput}
            type="text"
            placeholder={cityValue}
            value={cityValue}
            minLength={3}
            maxLength={30}
            onChange={(event) => {
              setCityValue(event.target.value);
            }}
          />
          <div className={styles.divInputs}>
            {imagePreview && (
              <img
                className={styles.imgPreview}
                src={imagePreview}
                width="300"
              />
            )}
            <label className={styles.imgButton}>
              <input
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <label>FECHA</label>
          <input
            className={styles.textInput}
            type="date"
            value={dateValue}
            onChange={(event) => {
              setDateValue(event.target.value);
            }}
          />

          <label>PRECIO</label>
          <input
            className={styles.textInput}
            type="number"
            placeholder={priceValue.toString()}
            value={priceValue.toString()}
            min={0}
            onChange={(event) => {
              setPriceValue(parseInt(event.target.value));
            }}
          />

          <label>PLAZAS MÍNIMAS</label>
          <input
            className={styles.textInput}
            type="number"
            placeholder={minPlacesValue.toString()}
            value={minPlacesValue.toString()}
            min={1}
            onChange={(event) => {
              setMinPlacesValue(parseInt(event.target.value));
            }}
          />
          <label>PLAZAS TOTALES</label>
          <input
            className={styles.textInput}
            type="number"
            placeholder={totalPlacesValue.toString()}
            value={totalPlacesValue.toString()}
            min={1}
            onChange={(event) => {
              setTotalPlacesValue(parseInt(event.target.value));
            }}
          />

          <label>ACTIVO</label>
          <input
            type="checkbox"
            checked={activeValue}
            onChange={(event) => {
              setActiveValue(event.target.checked ? 1 : 0);
            }}
          />
          <button className={styles.createButton} type="submit">
            Visualizar cambios
          </button>
        </form>
      </section>

      <HandleAddDuplicateExperience
        data={modifiedExperience}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </>
  );
}

export default EditExperienceForm;
