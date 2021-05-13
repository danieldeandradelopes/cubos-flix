import { useState } from 'react';
import './App.css';
import Movies from './data';
import Coupon from './Coupon'

function App() {

  const [movies, setMovies] = useState(Movies);

  //Filters
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [movieSearchByName, setMovieSearchByName] = useState("");


  function searchMovie(e) {
    if (e.key !== 'Enter') return;
    setMovieSearchByName(search);
  }

  function handleCategories(category) {
    if (category === "all") {
      setCategories([]);
      return;
    }

    const categoryFound = categories.find(c => c === category);

    if (categoryFound) {
      setCategories(categories.filter(c => c !== category));
      return;
    }

    setCategories([...categories, category]);
  }

  function filterMovies(movie) {
    //All (default)
    if (!movieSearchByName && categories.length === 0) return movie;

    //By movie name & category
    if (movieSearchByName && categories.length > 0) {
      if (!categories.some(c => movie.categories.includes(c)) && !movie.title.includes(movieSearchByName)) return;
      return movie;
    }

    //Category
    if (categories.some(c => movie.categories.includes(c))) return movie;

    //Movie name
    if (movieSearchByName && movie.title.includes(movieSearchByName)) return movie;
  }


  return (
    <div className="App">
      <header>
        <img src="./assets/images/logo.svg" alt="logo" />
        <div className='input_control'>
          <input
            type="text"
            placeholder={"Pesquise filmes..."}
            onChange={e => setSearch(e.target.value)} onKeyPress={e => searchMovie(e)}
          />
          <button><img src="./assets/images/search-icon.svg" alt="search" /></button>
        </div>
        <div className='fav_control'>
          <img src="./assets/images/bookmark-icon.svg" alt="bookmark" />
          <a href="#fav">Favoritos</a>
        </div>
        <div className='promo_control'>
          <img src="./assets/images/promotion-icon.svg" alt="promotions" />
          <a href="#promo">Promoções</a>
        </div>
        <div className='profile_control'>
          <p>Bem vindo GEspinosa7</p>
          <img src="./assets/images/logo.svg" alt="logo" />
        </div>
      </header>

      <main>
        <Coupon />
        <h2>Top filmes</h2>
        <div className="top_movies">
          {
            movies.slice(0, 5).map(m => {
              return <div className="movie_card">
                <img className="card_bg" src={m.backgroundImg} alt="" />
                <button className='fav '><img src="./assets/images/star.svg" alt="" /></button>
                <div className="card_info">
                  <p>{m.title}</p>
                  <div className='rating'><img src="./assets/images/golden-star.svg" alt="" /> {m.starsCount}</div>
                </div>

                <button className='add_bag'><span>Sacola</span> <span>R${m.price}</span></button>
              </div>
            })
          }
        </div>

        <h2>Filmes</h2>
        <div className='type_movies'>
          <button className={(categories.length === 0 ? 'type_selected' : "")} onClick={() => handleCategories("all")} >Todos</button>
          <button className={(categories.includes("action") ? 'type_selected' : "")} onClick={() => handleCategories("action")} >Ação</button>
          <button className={(categories.includes("romance") ? 'type_selected' : "")} onClick={() => handleCategories("romance")} >Romance</button>
          <button className={(categories.includes("science fiction") ? 'type_selected' : "")} onClick={() => handleCategories("science fiction")} >Ficção ciêntifica</button>
          <button className={(categories.includes("horror") ? 'type_selected' : "")} onClick={() => handleCategories("horror")} >Terror</button>
        </div>

        <div className="movies_list">
          {movies.filter(filterMovies).map(m => {
            return <div className="movie_card">
              <img className="card_bg" src={m.backgroundImg} alt="" />
              <button className='fav '><img src="./assets/images/star.svg" alt="" /></button>

              <div className="card_info">
                <p>{m.title}</p>
                <div className='rating'><img src="./assets/images/golden-star.svg" alt="" /> {m.starsCount}</div>
              </div>

              <button className='add_bag'><span>Sacola</span> <span>R${m.price}</span></button>
            </div>
          })}
        </div>

      </main>

      <aside>
        <div className="bag">

          <div className="bag_header">
            <img src="./assets/images/bag-icon.svg" alt="bag-icon" />
            <h3> Sacola</h3>
          </div>

          <div className="bag_content">

            <div className="bag_item">
              <img className="item_img" src="./assets/images/joker.png" alt="" />
              <p className='item_title'>Joker</p>
              <p className='item_price'>R$ 2,49</p>

              <div className="actions">
                <button><img src="./assets/images/plus-icon.svg" alt="plus-icon" /></button>
                <span>1</span>
                <button><img src="./assets/images/trash-icon.svg" alt="trash-icon" /></button>
              </div>
            </div>

            <div className="bag_item">
              <img className="item_img" src="./assets/images/joker.png" alt="" />
              <p className='item_title'>Joker</p>
              <p className='item_price'>R$ 2,49</p>

              <div className="actions">
                <button><img src="./assets/images/plus-icon.svg" alt="plus-icon" /></button>
                <span>1</span>
                <button><img src="./assets/images/minus-icon.svg" alt="minus-icon" /></button>
              </div>
            </div>

            <div className="aside_input_control">
              <label>Insira seu cupom</label>
              <input type="text" placeholder="Cupom de desconto" />
            </div>


            <button className="confirm_data">Confirme seus dados R$04,98</button>

          </div>

          <div className="bag_footer"></div>

        </div>
      </aside>
    </div >
  );
}

export default App;