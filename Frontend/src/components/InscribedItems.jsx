import { useContext, useState } from "react";
import styles from "./InscribedItems.module.css";
import { UserContext } from "../context/UserContext.jsx";
import { Slide, toast } from "react-toastify";
import { deleteUserFromReservation } from "../services/index.js";

function InscribedItems({ inscribed, filterInscribed }) {
  const { token } = useContext(UserContext);
  const { id, reservation_id, name, email, avatar } = inscribed.inscribed;
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleRowClick = () => {
    setSelectedUser(inscribed.inscribed);
    setShowModal(true);
  };

  const handleDeleteUser = async (reservation_id, token) => {
    try {
      const data = await deleteUserFromReservation(reservation_id, token);

      toast.success(data.message, {
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

      setShowModal(false);
      filterInscribed(id);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.row} onClick={handleRowClick}>
        <img src={avatar} alt="Avatar" className={styles.avatar} />
        <p className={styles.userInfo}>{id}</p>
        <p className={styles.userInfo}>{name}</p>
        <p className={styles.userInfo}>{email}</p>
      </div>

      {showModal && (
        <div className={`${styles.modal} ${showModal ? styles.active : ""}`}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Confirm Delete</h2>
            <p>
              ¿Estás seguro de que quieres eliminar la reserva{" "}
              {selectedUser?.reservation_id} del usuario {selectedUser?.name}?
            </p>
            <div>
              <button
                className={styles.modalButton}
                onClick={() => handleDeleteUser(reservation_id, token)}
              >
                Sí
              </button>
              <button className={styles.modalButton} onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InscribedItems;
