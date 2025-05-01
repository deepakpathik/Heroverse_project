import { useState, useEffect } from "react";
import md5 from "md5";
import "../styles/Search.css";
import Characters from "./Characters";
import Comics from "./Comics";
import Auth from "./Auth";
import Footer from "./Footer";
import Logo from "./Logo";

export default function Search() {
  const [characterData, setCharacterData] = useState(null);
  const [comicData, setComicData] = useState(null);
  const [characterName, setCharacterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // Start the animation after a delay
    setTimeout(() => {
      setIsVisible(true);
    }, 1000);
  }, []);

  const publicKey = "03b39ff478086f21f84ae08becb3751a";
  const privateKey = "db176d7c88ad2d8eee37dde4c78daf5343348a32";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (characterName.trim()) {
      getCharacterData();
    }
  };

  const getCharacterData = () => {
    setIsLoading(true);
    setCharacterData(null);
    setComicData(null);

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCharacterData(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while getting character data:", error);
        setIsLoading(false);
      });
  };

  const getComicData = (characterId) => {
    setIsLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const timeStamp = new Date().getTime();
    const hash = generateHash(timeStamp);

    const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setComicData(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error while getting comic data:", error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setCharacterName(event.target.value);
  };

  const generateHash = (timeStamp) => {
    return md5(timeStamp + privateKey + publicKey);
  };

  const handleReset = () => {
    setCharacterName("");
    setCharacterData(null);
    setComicData(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="search">
          <div className="header">
            <Logo size="medium" />
            <div className="user-info">
              <span>Welcome, {user.username}!</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Marvel Characters..."
              value={characterName}
              onChange={handleChange}
            />
            <div className="buttons">
              <button type="submit">Search Heroes</button>
              <button type="button" className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>

        {isLoading && <div className="loading"></div>}

        {!isLoading && !comicData && characterData && characterData.results && (
          <div className="results-info">
            <h2>Found {characterData.results.length} Characters</h2>
            <Characters data={characterData.results} onClick={getComicData} />
          </div>
        )}

        {!isLoading && comicData && comicData.results && (
          <div className="results-info">
            <h2>Available Comics</h2>
            <Comics data={comicData.results} onClick={() => {}} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}