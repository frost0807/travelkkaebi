import React from "react"
import "./ContactStyle.css";
import TeamTogether from './/TeamTogether.png';
import TeamLeader from './/TeamLeader.png';
import MapImg from './/map.png';
import { Container, Grid, Typography } from "@mui/material";

// import Map from "../../components/NaverMap/MapN";

function Contact (){

  return(
    <Container style={{marginTop:"100px"}}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <img src={TeamTogether} style={{width:'100%'}}></img>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={7}>
          <div>
            <Typography variant="h4"  style={{marginBottom:'10px'}}>우리 함께 여행 가자</Typography>
            <Typography variant="h5" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif"}}>
            코로나 바이러스로 인해 자주 가지 못했던 여행을 갈 수 있는 시기가 되면서
여행에 대한 관심이 급증한 요즘,
여행을 가고 싶은데 같이 갈 사람이 있으면 좋겠다, 여행을 좋아하는 사람들끼리 정보를 공유하거나
의사소통을 할 수 있는 사이트가 있으면 좋겠다는
요구에 부응해 만들게 된 여행 플랫폼!
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6}>
          <div style={{height:'100px'}}></div>
        </Grid>
        <Grid item xs={12} md={6}> </Grid>
    
      </Grid>
      <Grid container></Grid>

      <Grid container >
        <Grid item xs={12} md={6}>
        <div>
            <Typography variant="h4" style={{marginBottom:'10px'}}>회장인사말</Typography>
            
            <Typography variant="h5" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif"}}>존경하는 전국팔도 깨비 회원 여러분, 2022년 壬寅年 새해가 밝았습니다.
              2022년 임인년은 검은 호랑이 띠라고 합니다. 용맹함을 상징하는 호랑이 띠인데, 임은 물을 뜻하고, 인은 습기를 빨아 들이는 의미가 있으니 어느 정도 코로나-19 시국이 안정되지 않을까 기대해 봅니다. 올해에도 모두 건강하고 행복하게 지내실 수 있기를 기원합니다.
              돌이켜보면 우리 사이트가 여행 분야에서 명실상부하게 최고의 사이트로 
              우뚝서게 된 것은 전임회장님들을 비롯한 모든 회원님들의 노력과 
              봉사 덕분이라 생각합니다. 溫故而知新의 신념과 우리 사이트의 빛나는 
              전통을 바탕으로 여행 분야의 시대 변화에 빠르게 대응하여 우리 사이트가 
              코로나-19 해결의 주역이 되어야 한다고 다짐해 봅니다.
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={1}></Grid>

        <Grid item xs={12} md={5}>
          <img src={TeamLeader} style={{width:'100%'}}></img>
        </Grid>
        
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div style={{height:'100px'}}></div>
        </Grid>
        <Grid item xs={12} md={6}> </Grid>
    
      </Grid>
      {/* <Grid container>
        <Grid item xs={12} md={7}>
          <img src={MapImg} style={{width:'100%'}}></img>
        </Grid>
        <Grid item xs={12} md={1}></Grid>
        <Grid item xs={12} md={4}>
          <div>
            <Typography variant="h4"  style={{marginBottom:'10px'}}>오시는 길</Typography>
            <Typography variant="h6" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif"}}>

            주 소 : 서울특별시 강남구 강남대로94길 20<br></br>
            전 화 : 02-3486-9600<br></br>
            팩 스 : 02-552-3929
            </Typography>
          </div>
        </Grid>
      </Grid> */}
    </Container>

  )
}

export default Contact;