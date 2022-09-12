import { ContainerWrapper, FormTitle, Title, Wrapper } from "./RegionEventCreatestyle";
import "./ReviewCreateForm.css";
import axios from 'axios';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button, IconButton } from "@mui/material";
import Logo from ".//basicLogo.png";
import { PhotoCamera } from "@mui/icons-material";
import React, { useMemo, useRef, useState } from "react";
import { API_BASE_URL } from '../../config';
import { useForm } from "react-hook-form";
import { bearerToken, headerConfig, headerImg_tk } from "../../util";

const ReviewCreateForm = () => {
  const [photo, setPhoto] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');


  const imageUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(profile.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setProfile(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  // loginStatus 추후에 맞춰서 변경
  const navi = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    mode: "onChange",
  });
  let userId = localStorage.userId;

  const logInStatus=()=>{
    if(userId==null){
      alert("먼저 로그인한 후 글을 작성해주세요");
      navi("/login");
    }
  }
  
  // let reviewId =1;
  // let categoryId =1;
  // let userId="userIdT";
  // let title="titleT";
  // let region ="서울";
  // let view =0;
  // let createTime="2022.06.06";
  // let updateTime="2022.06.06";


  // profile 이미지 상태
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL: Logo,
  });
  let inputRef;

  const onSubmit= async (data)=>{
    const headerConfig = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    // data.preventDefault();
    console.log(data);
    
    const formData = new FormData();
    console.log(formData);
    const reviewDTO = JSON.stringify(data);
    // regionEventDTO.id =1;
    formData.append("file", profile.image_file);
    formData.append(
      "reviewDTO",
      new Blob([reviewDTO], { type: "application/json" })
    );
    console.log(formData);

    axios.defaults.headers = {
      "Content-Type": "application/json; charset = utf-8",
      Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
    };
    await axios
    .post(API_BASE_URL + "/review/write", formData, headerConfig)
    .then((res) => {
      console.log(res.data);
      alert("👹소중한 리뷰 작성이 완료되었습니다.");
      navi('/review/1');
    });


  


    

    // axios.post(API_BASE_URL+"/travelkkaebi/region/event/write", {RegionEventDTO})
    // .then(res=>{
    //   navi("/regionevent");
    // })
  }

  useEffect(()=>{
      // 로그인 체크 함수
      logInStatus();
    },[]);

  return (
    <div>

<Wrapper>
      <ContainerWrapper>
        <form
          className="reg_form"
          id="reg_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="register_form">
            <FormTitle>
              리뷰 글쓰기
              <p className="must">필수입력사항 </p>
            </FormTitle>
            {/* <div className="profileimg">
              <img
                alt="basicimg"
                src={profile.preview_URL}
                className="user_profile"
              />
            </div> */}
            {/* <div className="photo_icon">
              <input
                type="file"
                accept="image/*"
                name="profile_img_url"
                hidden
                style={{ display: "none" }}
                onChange={imageUpload}
                ref={(refParam) => (inputRef = refParam)}
                onClick={(e) => (e.target.value = null)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() => inputRef.click()}
              >
                <PhotoCamera />
              </IconButton>
            </div> */}
            <br />

            <div className="reg_table" style={{ margin: 0, display: "block" }}>
              <table className="register_table">
                <colgroup style={{ display: "table-column-group" }}>
                  <col style={{ width: 130, display: "table-column" }} />
                  <col style={{ width: "*", display: "table-column" }} />
                </colgroup>

                <tbody>
                  
                  <tr>
                    <th scope="row">
                      <label htmlFor="photo" className="req">
                        👹사진 첨부 부분
                      </label>
                    </th>


                    <div className="profileimg">
              <img
                alt="basicimg"
                src={profile.preview_URL}
                className="user_profile"
              />
            </div>
            <div className="photo_icon">
              <input
                type="file"
                accept="image/*"
                name="profile_img_url"
                hidden
                style={{ display: "none" }}
                onChange={imageUpload}
                ref={(refParam) => (inputRef = refParam)}
                onClick={(e) => (e.target.value = null)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() => inputRef.click()}
              >
                <PhotoCamera />
              </IconButton>
            </div>
            <br />



                  </tr>
                  <tr>
                    <th scope="row">


                      <label htmlFor="title" className="req">
                        🔸제목
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="text"
                        name="title"
                        id="title"
                        required
                        autoComplete="off"
                        aria-invalid={
                          !isDirty
                            ? undefined
                            : errors.nickname
                            ? "true"
                            : " false"
                        }
                        {...register("title", {
                          maxLength: {
                            value: 30,
                            message: "30글자까지 입력 가능합니다.",
                          },
                          minLength: {
                            value: 5,
                            message: "5글자 이상 입력 가능합니다.",
                          },
                        })}
                      />

                      
                    </td>
                  </tr>

                  
                  <tr>
                    <th scope="row">
                      <label htmlFor="content" className="req">
                        🔸내용
                      </label>
                    </th>
                    <td>
                      <div className="content_wrap">
                        <input
                          type="content"
                          className="reg_input"
                          name="content"
                          required
                          
                          {...register("content", {
                            maxLength: {
                              value: 500,
                              message: "최대 500글자까지 입력 가능합니다.",
                            },
                            
                          })}
                        />
                        {/* {errors.email && (
                          <div className="reg-error3">
                            <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                            {errors.email.message}
                          </div>
                        )} */}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="content" className="req">
                        🔸지역
                      </label>
                    </th>
                    <td>
                      <div className="content_wrap">
                        <input
                          type="region"
                          className="reg_input"
                          name="region"
                          required
                          
                          {...register("region", {
                            maxLength: {
                              value: 20,
                              message: "최대 20글자까지 입력 가능합니다.",
                            },
                            
                          })}
                        />
                        {/* {errors.email && (
                          <div className="reg-error3">
                            <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                            {errors.email.message}
                          </div>
                        )} */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <BtnConfirm>
              <a href="/review/1" className="btn_cancel">
                취소
              </a>
              <input
                type="submit"
                disabled={isSubmitting}
                value="글 작성"
                id="btn_submit"
                className="btn_submit"
                accessKey="s"
              />
            </BtnConfirm>
          </div>
        </form>
      </ContainerWrapper>
    </Wrapper>

      {/* <img alt='' src={photoUrl+photo} className='imgphoto'/> */}
      {/* <form onSubmit={onBoardInsert}>
        <table className='table table-bordered' style={{width:'400px'}}>
          <caption><h3>지역축제게시판 글쓰기</h3></caption>
          <tbody>
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>아이디</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>대표 이미지</th>
              <td>
                <input type='file' className='form-control'll
                style={{width:'250px'}} 
                onChange={imageUpload} required/>
              </td>
            </tr>
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>제목</th>
              <td>
                <input type={'text'} className="form-control"
                style={{width:'300px'}} required
                onChange={(e)=>{
                  setSubject(e.target.value);
                }}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea name="textarea" className='form-control' required
                style={{width:'400px', height:'120px'}}
                onChange={(e)=>{
                  setContent(e.target.value);
                }}></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2} align='center'>
                <button type="submit" className='btn btn-info'>게시글 저장</button>
                <button type="button" className='btn btn-success'
                style={{marginLeft:'10px'}}
                onClick={()=>{
                  navi("/regionevent");
                }}>게시판 메인</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form> */}
    </div>
  );
};

export default ReviewCreateForm;

const BtnConfirm = styled.div`
  text-align: "center";
  margin: 55px auto 0 !important;
  display: block;
`;