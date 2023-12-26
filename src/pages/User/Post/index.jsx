import { useContext } from 'react';
import coverPost from '../../../assets/publishing-options.png'
import { isHomeContext } from '../../../utils/context';

function Post() {

    const {setIsHome} = useContext(isHomeContext)
    setIsHome(false)
    
    return(
        <>
            <div className="container">
                <article className="content">
                    <figure className="post-feature-image">
                        <img
                            src={coverPost}
                            alt={'image post'}
                        />
                    </figure>
                    <section className='post-full-content' style={{backgroundColor:'transparent'}}>
                        <h1 className='content-title'>Title</h1>
                        <section className='content-body load-external-scripts'>
                            Content Post
                        </section>
                    </section>
                </article>
            </div>
        </>
    )
}

export default Post