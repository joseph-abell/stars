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
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}${month}${day}`;
  };

  const getHumanReadableDate = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);

    return `${day}-${month}-${year}`;
  };

  const toggleStar = (index) => {
    const newStars = [...stars];
    newStars[index] = !newStars[index];
    setStars(newStars);
  };

  return (
    <div>
    <aside>
      {allStars.length > 0 && allStars.sort((a, b) => b.date - a.date).map((star) => (
        <div key={star.data} className='star-history-item'>
          <h3>{getHumanReadableDate(star.data)}</h3>

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
    </div>
  );
}

export default App;
