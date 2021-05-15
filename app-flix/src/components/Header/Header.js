import './Header.css'

function Header(props) {
   return (
      <header>
         <img src="./assets/images/logo.svg" alt="logo" />
         <div className='input_control'>
            <input
               type="text"
               placeholder={"Pesquise filmes..."}
               onChange={e => props.setSearch(e.target.value)} onKeyPress={e => props.searchMovie(e)}
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
   )
}

export default Header;