const Country = (props) => {
  const { name, capital, area, languages, flag } = props;

  return (
    <div>
      <h1>{name}</h1>

      <div>capital {capital}</div>
      <div>area {area}</div>

      <h2>languages:</h2>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={key}>{languages[key]}</li>
        ))}
      </ul>

      <img alt="" src={`${flag}`} style={{ width: "200px", height: "auto" }} />
    </div>
  );
};

export default Country;
