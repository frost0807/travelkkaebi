import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function TestReviewDetail(){
  const [loading, setLoading] = useState(true);
  const [reviewNum, setReviewNum] = useState([])

  const {id} = useParams()
  // const getReviewNum = async() => {
  //   const json = await (
  //     await (await fetch (`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)) // 주소 부분을 ${id} 포함해서 그 값 가져오게 변경
  //   ).json();
  //   console.log(json.data.reviewNum);
  //   setReviewNum(json.data.reviewNum)

  //   setLoading(false);
  // }
  // useEffect(()=>{
  //   getReviewNum();
  // }, []);
  
  return (
    <div>
    {/* {loading ? (<h1>loading...</h1>) : (
    <div>
    <h1>{reviewNum.title}</h1>
    <img src={reviewNum.large_image} alt={reviewNum.title}></img>
    <ul>
    {reviewNum.contents.map(g=>(
    <li key={g}>{g}</li>))}
    </ul>
    <p>{reviewNum.description_full}</p>
    <a>{reviewNum.like}</a>
    <a>{reviewNum.dis_like}</a>
    </div>
    )}   */}

    My name is {id}

    </div>
  )
}
export default TestReviewDetail;