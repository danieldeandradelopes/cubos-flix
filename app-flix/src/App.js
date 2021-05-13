/* eslint-disable jsx-a11y/alt-text */

import { useState, useRef, useEffect } from 'react';
import './App.css';
import Movies from './data';

function App() {

  const [movies] = useState(Movies);

  //Coupon
  const [couponCounter, setCouponCounter] = useState(300);
  const [isCouting, setIsCouting] = useState(true);
  const interval = useRef(null);
  const minutes = String(Math.floor(couponCounter / 60)).padStart(2, "0");
  const seconds = String(couponCounter % 60).padStart(2, "0");
  const [activeCoupon, setacAtiveCoupon] = useState(false);

  useEffect(() => {
    if (isCouting) {
      interval.current = setInterval(() => {
        setCouponCounter(prev => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval.current);
      interval.current = null;
      setIsCouting(false);
    }
  }, []);

  function addDiscountCoupon() {
    if (couponCounter > 0) {
      setacAtiveCoupon(true);
      setCouponCounter(0);
    }
  }


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


  //Bag
  const [bag, setBag] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);

  function addToBag(movie) {
    const newArray = [...bag];
    const bagMovies = newArray.find(m => m.id === Number(movie.id));

    if (bagMovies) {
      bagMovies.amount++;
      setBag(newArray);
      const newPrice = bagMovies.price + finalPrice;

      setFinalPrice(newPrice);
      return;
    }

    const newMovie = {
      id: movie.id,
      title: movie.title,
      backgroundImg: movie.backgroundImg,
      price: movie.price,
      amount: 1,
    }

    newArray.push(newMovie);

    setBag(newArray);
    const newPrice = movie.price + finalPrice;
    setFinalPrice(newPrice);
  }

  function increasesQuantity(movieId) {
    const newArray = [...bag];
    const bagMovies = newArray.find(m => m.id === movieId);

    bagMovies.amount++;
    setBag(newArray);
    const newPrice = bagMovies.price + finalPrice;
    setFinalPrice(newPrice);
  }

  function decreasesQuantity(movieId) {
    const newArray = [...bag];
    const bagMovies = newArray.find(m => m.id === movieId);
    const newPrice = finalPrice - bagMovies.price;
    setFinalPrice(newPrice);

    bagMovies.amount--;
    if (bagMovies.amount === 0) {
      setBag(
        newArray.filter(m => m.id !== movieId),
      );
      return;
    }

    setBag(newArray);
  }

  const bagPrice = activeCoupon ? (finalPrice - finalPrice * 0.1).toFixed(2).toString().replace('.', ',') : finalPrice.toFixed(2).toString().replace('.', ',');

  //Bag Coupon

  function addDiscountCouponByInput(e) {
    if (e.key !== 'Enter') return;

    if (e.target.value === 'htmlnaoelinguagem') {
      addDiscountCoupon();
      e.target.value = '';
    }
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

        {/* COUPON */}
        {
          couponCounter > 0 ? (
            <div className="coupon" style={{ backgroundImage: "url('./assets/images/bg-promotion.svg')" }} onClick={addDiscountCoupon}>
              <h1>APROVEITE AGORA</h1>
              <div className="coupon_txt">
                <img src="./assets/images/coupon-circle-icon.svg" alt="" />
                <p>CUPOM: HTMLNAOELINGUAGEM</p>
              </div>

              <h2>FINALIZA EM:</h2>
              <div className="coupon_timer">
                <img src="./assets/images/time-icon.svg" alt="" />
                <p>00:{minutes}:{seconds}</p>
              </div>

              <img className="money" src="./assets/images/money.png" alt="money" />
            </div>
          ) : ""
        }


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

                <button onClick={() => addToBag(m)} className='add_bag'><span>Sacola</span> <span>R${m.price.toFixed(2).toString().replace('.', ',')}</span></button>
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

              <button className='add_bag'><span>Sacola</span> <span>R${m.price.toFixed(2).toString().replace('.', ',')}</span></button>
            </div>
          })}
        </div>

      </main>

      <aside>

        {/* BAG */}
        <div className="bag">

          <div className="bag_header">
            <img src="./assets/images/bag-icon.svg" alt="bag-icon" />
            <h3> Sacola</h3>
          </div>

          <div className="bag_content">

            {
              bag.length > 0 ?
                (
                  bag.map(m => (
                    <div className="bag_item">
                      <img className="item_img" src={m.backgroundImg} alt="" />
                      <p className='item_title'>{m.title}</p>
                      <p className='item_price'>R$ {m.price.toFixed(2).toString().replace('.', ',')}</p>

                      <div className="actions">
                        <button onClick={() => increasesQuantity(m.id)}><img src="./assets/images/plus-icon.svg" alt="plus-icon" /></button>
                        <span>{m.amount}</span>
                        <button onClick={() => decreasesQuantity(m.id)}><img
                          src={
                            m.amount > 1 ?
                              "./assets/images/minus-icon.svg"
                              :
                              "./assets/images/trash-icon.svg"
                          }
                        /></button>
                      </div>
                    </div>
                  ))
                )
                :
                (
                  <div>
                    <h2>Sua sacola está vazia</h2>
                    <h3>Adicione filmes agora</h3>
                  </div>
                )

            }

            <div className="aside_input_control">
              <label>Insira seu cupom</label>
              <input type="text" placeholder="Cupom de desconto" onKeyPress={(e) => addDiscountCouponByInput(e)} />
            </div>


            <button className="confirm_data">{finalPrice === 0 ? "Confirme seus dados" : `Confirme seus dados R$ ${bagPrice}`}</button>

          </div>
        </div>
      </aside>
    </div >
  );
}

export default App;