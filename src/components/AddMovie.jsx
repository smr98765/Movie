import { useRef } from 'react'
import classes from './AddMovie.module.css'

function AddMovie(props) {
    const titleRef = useRef('')
    const openingTextRef = useRef('')
    const releaseDateRef = useRef('')

    const submitHandler = (event) => {
        event.preventDefault()

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
        props.onAddMovie(movie)
    }
  return(
    <form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor='title'> Title</label>
            <input type="text" id='title' ref={titleRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor=''>Opening Text</label>
            <input type="text" id='opening-text' ref={openingTextRef}/>
        </div>
        <div className={classes.control}>
            <label htmlFor='release-date'>Release Date</label>
            <input type="text" id='release-date'ref={releaseDateRef} />
        </div>
        <button type='submit'> Add Movie</button>
    </form>
  )  
}

export default AddMovie