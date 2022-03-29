import { useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import { useGetCivilizationDetails } from "./hooks/useGetCivilizationDetails";
import { costSwitch } from "../../../helpers/costSwitch";
import "../styles.css";

export const CivilizationDetails: React.FC = () => {
  const {
    fetchCivilizationDetails,
    civilizationDetails,
    getUniqueUnit,
    getUniqueTech,
    deleteUniqueTech,
    deleteUniqueUnit,
    navigate,
    store,
  } = useGetCivilizationDetails();

  useEffect(() => {
    fetchCivilizationDetails();
  }, [fetchCivilizationDetails]);

  return (
    <div className="main-block">
      <div className="btn-back-block">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
      {civilizationDetails ? (
        <div className="details-block">
          <h2>{civilizationDetails["name"]}</h2>
          <p>{civilizationDetails["team_bonus"]}</p>
          <ul>
            Civilization bonus:
            {civilizationDetails["civilization_bonus"]?.map(
              (item: string, index: number) => {
                return <li key={index}>{item}</li>;
              }
            )}
          </ul>
          <button
            value={civilizationDetails["unique_unit"]}
            onClick={getUniqueUnit}
          >
            Unique unit
          </button>
          <button
            value={civilizationDetails["unique_tech"]}
            onClick={getUniqueTech}
          >
            Unique tech
          </button>
        </div>
      ) : (
        <Preloader />
      )}
      <div className="unique-items-wrapper">
        {store?.uniqueUnit.data ? (
          <div className="unique-item">
            <p>
              {store?.uniqueUnit.data["name"]}
              {store?.uniqueUnit.data["name"] ? (
                <button className="delete-button" onClick={deleteUniqueUnit}>
                  X
                </button>
              ) : null}
            </p>
            <p>{store?.uniqueUnit.data["description"]}</p>
            <div>
              {store?.uniqueUnit.data["cost"]
                ? Object.entries(store?.uniqueUnit.data["cost"]).map(
                    ([key, value]) => {
                      return (
                        <div className="cost-block">
                          <img src={costSwitch(key)} width="50px" />
                          <p>{value}</p>
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </div>
        ) : null}
        {store?.uniqueTech.data ? (
          <div className="unique-item">
            <p>
              {store?.uniqueTech.data["name"]}
              {store?.uniqueTech.data["name"] ? (
                <button className="delete-button" onClick={deleteUniqueTech}>
                  X
                </button>
              ) : null}
            </p>

            <p>{store?.uniqueTech.data["description"]}</p>
            <div>
              {store?.uniqueTech.data["cost"]
                ? Object.entries(store?.uniqueTech.data["cost"]).map(
                    ([key, value]) => {
                      return (
                        <div className="cost-block">
                          <img src={costSwitch(key)} width="50px" />
                          <p>{value}</p>
                        </div>
                      );
                    }
                  )
                : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
