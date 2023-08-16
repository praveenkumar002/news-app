import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//css imports
import "../styles/news.css";

//firebase imports
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

//icon import
import logoutIcon from "../icons/logout-logo.png";
import userIcon from "../icons/user-logo.png";
import dateIcon from "../icons/date-logo.png";
import axios from "axios";

function NewsPage() {
  const navigate = useNavigate();

  const [newsResult, setNewsResult] = useState([]);

  //   to maintain logout
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        localStorage.removeItem("email");
        localStorage.removeItem("displayName");
        localStorage.removeItem("photoUrl");
        navigate("/");
      }
    });

    axios
      .get(
        "https://newsapi.org/v2/everything?q=a&apiKey=2eab91d12ac344ddb75e3ffb2736b01f"
      )
      .then((result) => {
        console.log(result.data.articles);
        setNewsResult((result.data.articles));
        console.log(newsResult.length);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("email");
        localStorage.removeItem("displayName");
        localStorage.removeItem("photoUrl");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleThing = (value) => {
    let eleEvery = document.querySelector(".filterOptionsListEverything").style;
    let eleTop = document.querySelector(".filterOptionsListTop").style;

    if (value == "everything") {
      eleEvery.backgroundColor = "#68a5b4";
      eleEvery.color = "#ffff";

      eleTop.backgroundColor = "#ffff";
      eleTop.color = "#000";

      axios
      .get(
        "https://newsapi.org/v2/everything?q=a&apiKey=2eab91d12ac344ddb75e3ffb2736b01f"
      )
      .then((result) => {
        console.log(result.data.articles);
        setNewsResult((result.data.articles));
        console.log(newsResult.length);
      })
      .catch(() => {});
    } else {
      eleEvery.backgroundColor = "#ffff";
      eleEvery.color = "#000";

      eleTop.backgroundColor = "#68a5b4";
      eleTop.color = "#ffff";

      axios
      .get(
        "https://newsapi.org/v2/top-headlines?q=a&apiKey=2eab91d12ac344ddb75e3ffb2736b01f"
      )
      .then((result) => {
        console.log(result.data.articles);
        setNewsResult((result.data.articles));
        console.log(newsResult.length);
      })
      .catch(() => {});
    }
  };

  const searchBar = (event) => {
    axios
    .get(
      `https://newsapi.org/v2/everything?q=${event.target.value}&apiKey=2eab91d12ac344ddb75e3ffb2736b01f`
    )
    .then((result) => {
      console.log(result.data.articles);
      setNewsResult((result.data.articles));
      console.log(newsResult.length);
    })
    .catch(() => {});
  }
  return (
    <div className="magicBg">
      <header className="newsPageHeader">
        <p>Welcome, {localStorage.getItem("displayName") || "Praveen"}</p>
        <img src={logoutIcon} alt="" onClick={handleLogout} />
      </header>

      <div className="newsPage">
        <ul className="filterOptions">
          <li
            className="filterOptionsList filterOptionsListEverything"
            onClick={() => handleThing("everything")}
          >
            Everything
          </li>
          <li
            className="filterOptionsList filterOptionsListTop"
            onClick={() => handleThing("headlines")}
          >
            Top Headlines
          </li>
          <li className="filterOptionsList">
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Keywords"
              onChange={(event)=>searchBar(event)}
            />
          </li>
        </ul>

        <div className="newsContainer">
          {newsResult.map((news, key) => (
            <div className="newsItems" key={key}>
              <img src={news.urlToImage} alt="" className="newsItemImg" />
              <div className="newsItemDetails">
                <h3 className="newsItemDetailsTitle">{news.title}</h3>
                <p className="newsItemDetailsDescription">{news.description}</p>
              </div>
              <div className="newsItemMetaData">
                <div className="newsItemMetaDataUser"><img src={userIcon} alt="" />{news.author}</div>
                <div className="newsItemMetaDataDate"><img src={dateIcon} alt="date" />{news.publishedAt.slice(0, 10)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
