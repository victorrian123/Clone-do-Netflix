import React, {useEffect, useState} from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";


export default () => {


  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData] = useState(null);
  const [blackHeader,setBlackHeader] = useState(false)



  useEffect(() => {

    const loadALL = async () => {

      //Pegando a lista dos filmes
      let list = await tmdb.getHomeList()
      setMovieList(list)

      //Pegando filme em destaque(featured)
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].itens.results.length - 1))
      let  chosen = originals[0].itens.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
      console.log(chosenInfo)

    }
    loadALL()

  },[])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll',scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])




  return(
    <div className="page">
      
      <Header black={blackHeader}/>



      { featuredData &&
        <FeaturedMovie item={featuredData} />
      }

        <section className="lists">
          {movieList.map((item,key) => (
            <MovieRow key={key} title={item.title} item={item.itens}/>
          ))}
        </section>
        <footer className="footer-credits">
          Feito por Victor Rian
        </footer>

        {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando"></img>
        </div>
        }
    </div>
  )
}