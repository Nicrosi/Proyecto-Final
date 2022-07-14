import { getAllSponsors, getAllUsers } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ControlCardUsers from "../ControlCardUsers/ControlCardUsers";

import ControlCardSponsor from "../ControlCardSponsor/ControlCardSponsor";

export default function ControlPanel() {
  const users = useSelector((state) => state.users);

  const sponsors = useSelector((state) => state.sponsors);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());

    dispatch(getAllSponsors());
  }, [dispatch]);

  return (
    <>
      <div style={{ marginTop: "48px" }}>
        <div className="row">
          {users &&
            users.map((p) => {
              return (
                <div key={p.dni}>
                  <ControlCardUsers
                    dni={p.dni}
                    name={p.name}
                    last_name={p.last_name}
                    is_admin={p.is_admin}
                    e_mail={p.e_mail}
                    picture={p.picture}
                    gender={p.gender}
                    phone={p.phone}
                    num_contact={p.num_contact}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div style={{ marginTop: "48px" }}>
        <div className="row">
          {sponsors &&
            sponsors.map((p) => {
              return (
                <div key={p.id_sponsor}>
                  <ControlCardSponsor
                    company={p.company}
                    message={p.message}
                    logo={p.logo}
                    link={p.link}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
