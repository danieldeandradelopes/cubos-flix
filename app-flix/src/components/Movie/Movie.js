import './Movie.css'

function Movie(props) {
   const { title, backgroundImg, starsCount, price } = props.movie;
   return (
      <div className="movie_card">
         <img className="card_bg" src={backgroundImg} alt="" />
         <button className='fav '><img src="./assets/images/star.svg" alt="" /></button>

         <div className="card_info">
            <p>{title}</p>
            <div className='rating'><img src="./assets/images/golden-star.svg" alt="" /> {starsCount}</div>
         </div>

         <button onClick={() => props.addToBag(props.movie)} className='add_bag'><span>Sacola</span> <span>R${price.toFixed(2).toString().replace('.', ',')}</span></button>
      </div>
   )
}

export default Movie;