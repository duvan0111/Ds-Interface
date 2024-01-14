import { useEffect, useState } from "react"
import PostCard from "../../../components/PostCard"
import postService from "../../../services/postService";

function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPosts()
      }, [])

    const getPosts = () => {
        setLoading(true);
        postService.getPosts()
          .then((res) => {
            setData(res.data)
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => setLoading(false))
      } 

    return(
        <>

            <div className="container post-feed">
                {
                    data.map((item) => {
                        return <PostCard data={item}/>
                    })
                }
            </div>
        </>
    )
}

export default Home