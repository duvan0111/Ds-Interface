import PostCard from "../../../components/PostCard"

function Home() {
    return(
        <>
            <div className="container">
                <div className="post-feed">
                    <div><PostCard /></div>
                    <div><PostCard /></div>
                    <div><PostCard /></div>
                    <div><PostCard /></div>
                    <div><PostCard /></div>
                </div>
            </div>
        </>
    )
}

export default Home