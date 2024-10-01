import {useEffect, useState} from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState()
  const [pageNumber, setPageNumber] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetchPosts = async () => {
    const res = await axios.get(`https://dummyjson.com/posts?limit=10&skip=${pageNumber*10}`);
    setPosts([...posts , ...res.data.posts]);
    console.log(res.data.posts)
  }

  useEffect(()=> {
    fetchPosts();
    if(posts.length <90){
      setHasMore(true)
    }
    else setHasMore(false)
  },[pageNumber])

  function fetchData() {
    setPageNumber(pageNumber+1)
  }
  // console.log(query)

  return (
    <div className="App">
      <h2>Infinite Scrolling(Scroll down to see the content)</h2>
      {
        posts?.map(post => {
          return(<ul className='' style={{"listStyle":"none","border":"2px solid grey", "padding":"2rem", "margin" : "2rem"}}>
            <li style={{"textAlign" : "left"}}>ID : {post.id} <br/>
            Title : {post.title}
            </li>

          </ul>
            
          )
        })
      }
      <InfiniteScroll
  dataLength={posts.length} //This is important field to render the next data
  next={fetchData}
  hasMore={hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
  // below props only if you need pull down functionality
  // refreshFunction={this.refresh}
  // pullDownToRefresh
  // pullDownToRefreshThreshold={50}
  // pullDownToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
  // }
  // releaseToRefreshContent={
  //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
  // }
>
  {/* {items} */}
</InfiniteScroll>

    </div>
  );
}

export default App;
