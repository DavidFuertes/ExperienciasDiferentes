import { useEffect, useState } from "react";
import HandleAddDuplicateExperience from "./HandleAddDuplicateExperience";

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
  const [modalIsOpen, setModalIsOpen] = useState(0);
  const [modifiedExperience, setModifiedExperience] = useState(null);

  useEffect(() => {
    setTitleValue(title);
    setDescriptionValue(description);
    setTypeValue(type);
    setCityValue(city);
    setImageValue(image);
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

  function handleSubmit(event) {
    event.preventDefault();
    const modifiedExp = {
      id: id,
      title: titleValue,
      description: descriptionValue,
      type: typeValue,
      city: cityValue,
      image: imageValue,
      date: dateValue,
      price: priceValue,
      min_places: minPlacesValue,
      total_places: totalPlacesValue,
      active: activeValue,
    };
    setModalIsOpen(1);
    setModifiedExperience(modifiedExp);
  }

  return (
    <>
      <br></br>
      <form onSubmit={handleSubmit}>
        <h2>Editar Experiencia</h2>
        <div>
          <p>ID: {id}</p>
          <label>
            TÍTULO:
            <input
              type="text"
              placeholder={titleValue}
              value={titleValue}
              minLength={10}
              maxLength={50}
              onChange={(event) => {
                setTitleValue(event.target.value);
              }}
            />
          </label>
          <label>
            DESCRIPCIÓN:
            <input
              type="text"
              placeholder={descriptionValue}
              value={descriptionValue}
              minLength={10}
              maxLength={200}
              onChange={(event) => {
                setDescriptionValue(event.target.value);
              }}
            />
          </label>
          <label>
            TIPO:
            <input
              type="text"
              placeholder={typeValue}
              value={typeValue}
              minLength={3}
              maxLength={20}
              onChange={(event) => {
                setTypeValue(event.target.value);
              }}
            />
          </label>
          <label>
            LUGAR:
            <input
              type="text"
              placeholder={cityValue}
              value={cityValue}
              minLength={3}
              maxLength={30}
              onChange={(event) => {
                setCityValue(event.target.value);
              }}
            />
          </label>
          <label>
            IMAGEN:
            <input
              type="text"
              placeholder={imageValue}
              value={imageValue}
              minLength={3}
              maxLength={50}
              onChange={(event) => {
                setImageValue(event.target.value);
              }}
            />
          </label>
          <label>
            FECHA: {dateValue}
            <input
              type="date"
              value={dateValue}
              onChange={(event) => {
                setDateValue(event.target.value);
              }}
            />
          </label>
          <label>
            PRECIO:
            <input
              type="number"
              placeholder={priceValue.toString()}
              value={priceValue.toString()}
              min={0}
              onChange={(event) => {
                setPriceValue(parseInt(event.target.value));
              }}
            />
          </label>
          <label>
            PLAZAS MÍNIMAS:
            <input
              type="number"
              placeholder={minPlacesValue.toString()}
              value={minPlacesValue.toString()}
              min={1}
              onChange={(event) => {
                setMinPlacesValue(parseInt(event.target.value));
              }}
            />
          </label>
          <label>
            PLAZAS TOTALES:
            <input
              type="number"
              placeholder={totalPlacesValue.toString()}
              value={totalPlacesValue.toString()}
              min={1}
              onChange={(event) => {
                setTotalPlacesValue(parseInt(event.target.value));
              }}
            />
          </label>
          <label>
            ACTIVO:
            <input
              type="checkbox"
              checked={activeValue}
              onChange={(event) => {
                setActiveValue(event.target.checked);
              }}
            />
          </label>
        </div>
        <button type="submit">Visualizar cambios</button>
      </form>

      <HandleAddDuplicateExperience
        data={modifiedExperience}
        isOpen={modalIsOpen}
      />
    </>
  );
}

export default EditExperienceForm;
