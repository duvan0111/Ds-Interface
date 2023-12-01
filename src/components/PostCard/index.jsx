// import { Link } from "react-router-dom"
import imageTest from "../../assets/blog-cover.jpg"
import { Card } from "antd"
import { Link } from "react-router-dom";
const { Meta } = Card;

function PostCard() {
    
    return(
        <Link to={'#'} className="post-card">
            <header className="post-card-header">
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(${imageTest})`,
                    }}
                ></div>
                <div className="post-card-tags">
                    Test
                </div>
                <span>Featured</span>
                <h2 className="post-card-title">Build Card</h2>
            </header>
        </Link>
        // <>
            
        //     <Card
        //         hoverable
        //         style={{
        //         width: 240,
        //         }}
        //         cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        //     >
        //         <Meta title="Europe Street beat" description="www.instagram.com" />
        //     </Card>
        // </>
    )
}

export default PostCard