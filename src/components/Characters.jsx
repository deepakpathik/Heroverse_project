import "../styles/Characters.css";

export default function Characters({ data, onClick }) {
  return (
    <div className="characters-grid">
      {data.map((character) => (
        <div
          key={character.id}
          className="character-card"
          onClick={() => onClick(character.id)}
        >
          <img 
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="character-info">
            <h3>{character.name}</h3>
            <p>{character.description || "No description available"}</p>
            <button className="view-comics">View Comics</button>
          </div>
        </div>
      ))}
    </div>
  );
}