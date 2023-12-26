import { Layout } from "antd"
import { Link, Outlet } from "react-router-dom"
import blogCover  from "../../assets/blog-cover.jpg";
import logo from "../../assets/react.svg"
import { AiOutlineFacebook } from "react-icons/ai"
import { RxTwitterLogo } from "react-icons/rx";
import { useContext } from "react";
import { isHomeContext } from "../../utils/context";



const {Header, Content, Footer} = Layout

function LayoutUser() {
    const {isHome, setIsHome} = useContext(isHomeContext)

    return (
        <Layout>
            <Header 
                className={' viewport-top site-head h-3/4 min-h-fit'} 
                style={{
                    backgroundImage: `url(${blogCover})`
                }}
            >

                <div className="container">
                    <div className="site-mast">
                        <div className="site-mast-left">
                            <Link to={'/'}>
                                    <img className="site-logo" src={logo} alt="logo" />
                            </Link>      
                        </div>
                        <div className="site-mast-right">
                            <a href="#" className="site-nav-item site-nav-icon text-3xl" target="_blank"><RxTwitterLogo/></a>
                            <a href="#" className="site-nav-item site-nav-icon text-3xl" target="_blank"><AiOutlineFacebook/></a>
                            {/* <a href="#" className="site-nav-item" target="_blank">oka</a> */}

                        </div>
                    </div>
                    { isHome ? (
                        <div className="site-banner">
                            <h1 className="site-banner-title text-6xl"> Blog Data Science </h1>
                            <p className="site-banner-desc text-3xl">
                                Ce Blog a ete creer pour permettre aux etudiant de Data science L3 de partager leurs experiences 
                                avec vous, sur des sujets relatives leurs differents UE.
                            </p>
                        </div>
                    ) : null}
                    
                    <nav className="site-nav">
                        <div className="site-nav-left">
                            <Link 
                                className="site-nav-item"
                                to={'/'}
                                onClick={()=> setIsHome(true)}
                                >
                                Home
                            </Link>
                            <Link 
                                className="site-nav-item"
                                to={'/auteur'}
                                >
                                Auteurs
                            </Link>
                        </div>
                        <div className="site-nav-right">
                            <Link
                                className="site-nav-button"
                                to={'/login'}
                            >
                                Se connecter
                            </Link>
                        </div>
                    </nav>
                </div>
            </Header>
            <Content className="site-main">
                <Outlet />
            </Content>
            <Footer className="text-center viewport-bottom">DS-Blog ©2023 Created by
                <a href={'#'} target={'_blank'} rel={'noreferrer'}
                   className={'mx-1'}>DS L3 Students</a>
            </Footer>
        </Layout>
    )
}

export default LayoutUser