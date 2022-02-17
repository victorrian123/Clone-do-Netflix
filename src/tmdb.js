//Todas as informacoes de requisicoes
const API_KEY = '45d94cec05b6a1f7c342765d252859d0'
const API_BASE = 'https://api.themoviedb.org/3'


/*
-Originais Netflix
-Recomendados (Trending)
-Em alta(Top rated)
-Acao
-Comedia
-Terror
-Romance
-Documentarios
*/

const basicFeatch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    console.log(json)
    return json
}

export default {
   getHomeList: async () => {
       return [
           {
               slug: 'originals',
               title: 'Originais do Netflix',
               itens: await basicFeatch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'trending',
               title: 'Recomendados para Voce',
               itens: await basicFeatch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
           },
           {
               slug: 'toprated',
               title: 'Em alta',
               itens: await basicFeatch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
           },
           {
            slug: 'action',
            title: 'Acao',
            itens: await basicFeatch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'Comedy',
            title: 'Comedia',
            itens: await basicFeatch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'horror',
            title: 'Terror',
            itens: await basicFeatch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'romance',
            title: 'Romance',
            itens: await basicFeatch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'documentary',
            title: 'Documentarios',
            itens: await basicFeatch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        }

       ]
   },

   getMovieInfo: async (movieId,type) => {
        let info = {}
        if (movieId) {
            switch  (type) {
                case 'movie' :
                    info = await basicFeatch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
                case 'tv' :
                    info = await basicFeatch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break
                default:
                    info = null
                    break
            }
        }


        return info
   }

}












