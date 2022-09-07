// import React from 'react';

// import axios from 'axios';
// import {useNavigate} from 'react-router-dom';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { API_BASE_URL } from '../../config';


// const ReviewUpdateForm = () => {
//   const [photo, setPhoto] = useState('');
//   const [subject, setSubject] = useState('');
//   const [content, setContent] = useState('');

//   // loginStatus 추후에 맞춰서 변경
//   const navi = useNavigate();
//   // let loginStatus = localStorage.loginStatus;
//   // loginStatus = 1;
//   // let id = localStorage.myid;

//   // const initFunc=()=>{
//   //   if(loginStatus==null){
//   //     alert("먼저 로그인한 후 글을 작성해주세요");
//   //     navi("/login");
//   //   }
//   // }

//   // 이미지 업로드 이벤트
//   // const imageUpload=(e)=>{
//   //   const uploadFile = e.target.files[0];
//   //   const imageFile = new FormData();
//   //   imageFile.append("uploadFile", uploadFile);

//   //   axios({
//   //     method:'post',
//   //     url:API_BASE_URL,
//   //     data:imageFile,
//   //     headers:{'Content-Type':'multipart/form-data'}
//   //   }).then(res=>{
//   //     setPhoto(res.data);
//   //   })
//   //   }

//     // 시작시 호출되는 함수
//     // const posting=()=>{
//     //   axios.post(API_BASE_URL+"/review/write",
//     //   {params : {
//     //     pageNo : currentPage }
//     //   })
//     //   .then(res=>{
//     //     setData(res.data);
//     //   })
//     // }

//   // submit 이벤트
//   const onBoardInsert=(e)=>{
//     e.preventDefault();

//     axios.post(insertUrl, {id, photo, subject, content})
//     .then(res=>{
//       navi("/board/list/1");
//     })
//   }

//   useEffect(()=>{
//       initFunc();
//     },[]);

//   return (
//     <div>
//       <img alt='' src={photoUrl+photo} className='imgphoto'/>
//       <form onSubmit={onBoardInsert}>
//         <table className='table table-bordered' style={{width:'400px'}}>
//           <caption><h3>게시판 글쓰기</h3></caption>
//           <tbody>
//             <tr>
//               <th style={{backgroundColor:'#ddd'}} width='100'>아이디</th>
//               <td>{id}</td>
//             </tr>
//             <tr>
//               <th style={{backgroundColor:'#ddd'}} width='100'>대표 이미지</th>
//               <td>
//                 <input type='file' className='form-control'll
//                 style={{width:'250px'}} 
//                 onChange={imageUpload} required/>
//               </td>
//             </tr>
//             <tr>
//               <th style={{backgroundColor:'#ddd'}} width='100'>제목</th>
//               <td>
//                 <input type={'text'} className="form-control"
//                 style={{width:'300px'}} required
//                 onChange={(e)=>{
//                   setSubject(e.target.value);
//                 }}/>
//               </td>
//             </tr>
//             <tr>
//               <td colSpan={2}>
//                 <textarea className='form-control' required
//                 style={{width:'400px', height:'120px'}}
//                 onChange={(e)=>{
//                   setContent(e.target.value);
//                 }}></textarea>
//               </td>
//             </tr>
//             <tr>
//               <td colSpan={2} align='center'>
//                 <button type="submit" className='btn btn-info'>게시글 저장</button>
//                 <button type="button" className='btn btn-success'
//                 style={{marginLeft:'10px'}}
//                 onClick={()=>{
//                   navi("/review/1");
//                 }}>게시판 메인</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// };

// export default ReviewUpdateForm;