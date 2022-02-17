import React, {useState} from "react";
import './MovieRow.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({title, item}) => {

    const [scrollX, setScroollX] = useState(0)

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if (x > 0) {
            x = 0
        }
        setScroollX(x)
    }

    const handleRigthArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = item.results.length * 150
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60
        }
        setScroollX(x)
    }


    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow} >
                <NavigateBeforeIcon style={{fontSize:50}}/>
            </div>

            <div className="movieRow--rigth" onClick={handleRigthArrow}>
                <NavigateNextIcon style={{fontSize:50}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: item.results.length * 150  
                }}>
                    {item.results.length > 0 && item.results.map((item,key) => (
                        <div key={key} className="movieRow--item">
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                ))}
                </div>
            </div>
        </div>
    )
}