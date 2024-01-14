// import { Link } from "react-router-dom"
import imageTest from "../../assets/blog-cover.jpg"
import { Card, Avatar, Tooltip } from "antd"
import { Link } from "react-router-dom";
import profilDefault from "../../assets/profile-default.png"
import { GESTION_IMAGE, GESTION_COLOR_AVATAR } from "../../utils";
const { Meta } = Card;


function PostCard({isHome, data}) {
    // console.log((isHome));
    // isHome(false)

    return(
        <Link to={`/post/${data._id}`} state={{post : data}} className="post-card">
            <header className="post-card-header">
                <div
                    className="post-card-image"
                    style={{
                        backgroundImage: `url(${GESTION_IMAGE[data?.category[0]._id]})`,
                    }}
                ></div>
                <h2 className="post-card-title">{data?.title}</h2>
            </header>
            <section className="post-card-excerpt">
                {data?.resume.length > 100 ? `${data?.resume.substr(0, 100)}...` : data?.resume}
            </section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    {/* <div className="post-card-avatar">
                        <img 
                            className="author-profile-image"
                            src={profilDefault}
                            alt="profile"
                        />
                    </div> */}
                    <Avatar.Group shape="square">{
                        data.users.map((item, index) => {
                            // return <span className={'capitalize'}>{`${item.name.split(" ")[0]},`} </span>
                            return (
                                
                                <Tooltip key = {item._id} title={item.name} placement="top">
                                    <Avatar
                                        key = {item._id}
                                        style={{
                                            backgroundColor: GESTION_COLOR_AVATAR[index],
                                        }}
                                        >
                                        <span className={'capitalize'}>{`${item.name.split(" ")[0][0]}`} </span>
                                    </Avatar>
                                </Tooltip>
                            )
                        })
                        }
                    </Avatar.Group>
                </div>
                <div className="post-card-footer-right">
                    <div>{ new Date(data?.date).toLocaleDateString('fr-FR', {day: "numeric", month: "numeric", year: "numeric"})}</div>
                </div>
            </footer>
        </Link>
    )
}

export default PostCard