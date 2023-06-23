import { useEffect, useState } from "react";

const App = ()  => {
  const [allStars, setAllStars] = useState([]);
  const [stars, setStars] = useState([]);
  
  // get star information from local storage
  useEffect(() => {
    const allStars = JSON.parse(localStorage.getItem("stars")) || [];
    setAllStars(allStars);
    const date = getFormattedDate();
    const todaysData = allStars.find(d => d.data === getFormattedDate());
    if (!todaysData) {
      allStars.push({ data: date, stars: [false, false, false] });
      setAllStars(allStars);
      setStars([false, false, false]);
    } else {
      setStars(todaysData.stars);
    }
  }, []);

  // save star information to local storage
  useEffect(() => {
    if (stars.length === 0) return;

    const allStars = JSON.parse(localStorage.getItem("stars")) || [];
    const todaysIndex = allStars.findIndex(d => d.data === getFormattedDate());

    if (todaysIndex === -1) {
      allStars.push({ data: getFormattedDate(), stars });
    } else {
      allStars[todaysIndex].stars = stars;
    }

    localStorage.setItem("stars", JSON.stringify(allStars));
    setAllStars(allStars);
  }, [stars]);

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // month is 0-indexed
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  const toggleStar = (index) => {
    const newStars = [...stars];
    newStars[index] = !newStars[index];
    setStars(newStars);
  };

  return (
    <div>
    <main>
      {stars.length > 0 && stars.map((star, index) => (
        <span
          className='star'
          key={index}
          onClick={() => toggleStar(index)}
          style={{ color: star ? "gold" : "grey" }}
        >
          ★
        </span>  
      ))}
    </main>
    <aside>
      <h2>Star History</h2>
      {allStars.length > 0 && allStars.map((star) => (
        <div key={star.data} className='star-history-item'>
          <h3>{star.data}</h3>

          {star.stars.map((star, index) => (
            <span
              className='star-history'
              key={index}
              style={{ color: star ? "gold" : "grey" }}
            >
              ★
            </span>
          ))}
        </div>
      ))}
    </aside>
    </div>
  );
}

export default App;
