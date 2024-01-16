import { useEffect, useState } from "react"
import PostCard from "../../../components/PostCard"
import postService from "../../../services/postService";
import { Flex, Spin } from "antd";

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
            const newData = res.data.filter((elt) => elt.status == "PUBLIER")
            setData(newData)
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
                  loading ? (
                    <Flex align="center" gap="middle">
                      <Spin size="large" />
                  </Flex>
                  ) : (
                    data.map((item) => {
                      return <PostCard data={item}/>
                    })
                  )
                }
            </div>
        </>
    )
}

export default Home