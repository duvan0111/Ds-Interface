// import { Link } from "react-router-dom"
import imageTest from "../../assets/blog-cover.jpg"
import { Card } from "antd"
import { Link } from "react-router-dom";
import profilDefault from "../../assets/profile-default.png"
const { Meta } = Card;

function PostCard({isHome}) {
    console.log((isHome));
    // isHome(false)

    return(
        <Link to={'/post/1'} className="post-card">
            <header className="post-card-header">
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(${imageTest})`,
                    }}
                ></div>
                {/* <div className="post-card-tags">
                    Tags
                </div> */}
                <h2 className="post-card-title">Card Title</h2>
            </header>
            <section className="post-card-excerpt">
                Card body
            </section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="post-card-avatar">
                        <img 
                            className="author-profile-image"
                            src={profilDefault}
                            alt="profile"
                        />
                    </div>
                    <span>author name</span>
                </div>
                <div className="post-card-footer-right">
                    <div>07/12/2023</div>
                </div>
            </footer>
        </Link>
    )
}

export default PostCard