
import CountryInfo from "./CountryInfo";

const Countries = ({
  countries,
  countryNameSearch,
  countryInfoToShow,
  setCountryInfoToShow,
}) => {
  const Country = ({ name }) => {
    return (
      <li key={name}>
        {name}
        <button onClick={() => setCountryInfoToShow(name)}>Show</button>
      </li>
    );
  };


  return (
    <div>
      {countryInfoToShow ? (
        countries
          .filter((c) =>
            c.name.common
              .toUpperCase()
              .includes(countryInfoToShow.toUpperCase())
          )
          .map((country) => (
            <CountryInfo
              name={country.name.common}
              area={country.area}
              capital={country.capital}
              languages={country.languages}
              image={country.flags.png}
              latlng={country.latlng}
            />
          ))
      ) : countries.filter(
          (c) =>
            c.name.common
              .toUpperCase()
              .includes(countryNameSearch.toUpperCase()) ||
            countryNameSearch === ""
        ).length !== 1 ? (
        <ul>
          {countries.filter(
            (c) =>
              c.name.common
                .toUpperCase()
                .includes(countryNameSearch.toUpperCase()) ||
              countryNameSearch === ""
          ).length > 10 ? (
            <h3>Too many matches, specify another filter</h3>
          ) : (
            countries
              .filter(
                (c) =>
                  c.name.common
                    .toUpperCase()
                    .includes(countryNameSearch.toUpperCase()) ||
                  countryNameSearch === ""
              )
              .map((country) => <Country name={country.name.common} />)
          )}
        </ul>
      ) : (
        countries
          .filter(
            (c) =>
              c.name.common
                .toUpperCase()
                .includes(countryNameSearch.toUpperCase()) ||
              countryNameSearch === ""
          )
          .map((country) => (
            <CountryInfo
              name={country.name.common}
              area={country.area}
              capital={country.capital}
              languages={country.languages}
              image={country.flags.png}
              latlng={country.latlng}
            />
          ))
      )}
    </div>
  );
};

export default Countries;
