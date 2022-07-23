import React from "react";
import styles from "./ControlCardUsers.module.css"
import deleteimg from "../../../img/delete.png";
import edit from "../../../img/edit.png";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../redux/actions";
import Swal from "sweetalert2"


<<<<<<< Updated upstream
export default function ControlCardUsers({user, setDataModal, setUpdateList, updateList}) {
=======
  const [input, setInput] = useState({
    dni: dni,
    name: name,
    last_name: last_name,
    is_admin: is_admin,
    e_mail: e_mail,
    password: password,
    picture: picture,
    gender: gender,
    phone: phone,
    num_contact: num_contact
  });
>>>>>>> Stashed changes

  function handleEdit(e) { 
    e.preventDefault();
    setDataModal(user);
  }

<<<<<<< Updated upstream
  const dispatch = useDispatch();
=======
          <div key={dni} className="card p-3">
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.name}
                  name="name"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.last_name}
                  name="last_name"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                  <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={input.dni}
                    name="dni"
                    className="form-control border-0"
                    id="floatingInput"
                  />
                  <label htmlFor="floatingInput">DNI</label>
                </div>
                <div className="form-floating col-md">
                  <select
                    onChange={(e) => handleChange(e)}
                    className="form-select border-0"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    name="is_admin"
                  >
                    <option value="">{input.is_admin}</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <label htmlFor="floatingInput">isAdmin</label>
                </div>
            </div>

            <div className="row g-2 mb-3">

              <div className="form-floating col-md">
                <input
                  type="email"
                  onChange={(e) => handleChange(e)}
                  value={input.e_mail}
                  name="e_mail"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={input.picture}
                  name="picture"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Picture</label>
              </div>
              <div className="form-floating col-md">
                <select
                  onChange={(e) => handleChange(e)}
                  className="form-select border-0"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  name="gender"
                >
                  <option value="">{input.gender}</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
                <label htmlFor="floatingInput">Gender</label>
              </div>
            </div>
            <div className="row g-2 mb-3">
              <div className="form-floating col-md">
                <input
                  type="tel"
                  onChange={(e) => handleChange(e)}
                  value={input.phone}
                  name="phone"
                  className="form-control  border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Phone</label>
              </div>
              <div className="form-floating col-md">
                <input
                  type="tel"
                  onChange={(e) => handleChange(e)}
                  value={input.num_contact}
                  name="num_contact"
                  className="form-control border-0"
                  id="floatingInput"
                />
                <label htmlFor="floatingInput">Emergency Number</label>
              </div>
            </div>

            {/* <h5 onClick={()=>handleOnClick()}>dni={p.category.type}</h5> */}
            <button className="btn btn-outline-secondary btn-dark my-2" type="submit">Confirm changes</button>
          </div>

        </form>
>>>>>>> Stashed changes

  function handleDelete(e) { 
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#A7D129',
      cancelButtonColor: 'rgb(43, 43, 44);',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(user.dni))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        setUpdateList(!updateList)
      }
    })
  }

  return (
    <div className={styles.box}>
    <div className={styles.itemScore}>
      <div className={styles.subtitle}>
      <h5 className={styles.data}>DNI: {user.dni}</h5>
      
      <h5 className={styles.data}>Full Name: {user.name} {user.last_name}</h5>
      </div>
      <div className={styles.itemScore}>
      <img
            src={edit}
            alt="buttonedit"
            className={styles.button} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" 
            onClick={(e)=>handleEdit(e)}
          />
      <img
            src={deleteimg}
            alt="buttondelete"
            className={styles.button} type="button" 
            onClick={(e)=>handleDelete(e)}
          />
      </div>
     
      </div>     
    </div>
  );
}
