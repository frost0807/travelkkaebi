package com.bitcamp.travelkkaebi.service;

import com.bitcamp.travelkkaebi.mapper.LikeOrDislikeMapper;
import com.bitcamp.travelkkaebi.model.LikeOrDislikeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class LikeOrDislikeService {
    private final LikeOrDislikeMapper likeOrDislikeMapper;

    //게시물 상세보기를 했을 때 좋아요, 싫어요의 체크상태 리턴해주는 메소드
    public LikeOrDislikeDTO selectOne(LikeOrDislikeDTO l, int userId) throws Exception {
        try{
            l.setUserId(userId);
            //로그인한 유저의 해당 게시물에 대한 좋-싫 테이블이 존재하는지 확인(게시물을 본적 있는지)
            int likeOrDislikeId = likeOrDislikeMapper.selectId(l);
            //게시물을 본적이 있다면
            if(likeOrDislikeId!=0){
                //상태 리턴
                return likeOrDislikeMapper.selectOne(likeOrDislikeId);
            } else{ //게시물을 처음 본다면
                //좋-싫 상태 테이블 생성하고 성공하면 해당 row리턴
                return likeOrDislikeMapper.selectOne(insert(l));
            }
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    //좋아요-싫어요 테이블 생성후 id리턴
    public int insert(LikeOrDislikeDTO l) throws Exception{
        try{
            //삽입
            likeOrDislikeMapper.insert(l);
            //useGeneratedKeys에 의해 생성된 id리턴
            return l.getCategoryId();
        } catch(Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    //게시물의 좋아요를 클릭했을 때 실행 할 메소드
    public LikeOrDislikeDTO clickLike(LikeOrDislikeDTO l, int userId) {
        try{
            //로그인한 유저의 식별자를 삽입(중간에 가로채서 접근할 수 있으므로 userId갱신)
            l.setUserId(userId);
            //테이블이 존재한다면(게시물이 삭제되지 않았다면)
            if(likeOrDislikeMapper.selectId(l)!=0){
                if(l.isLiked()==true&&l.isDisliked()==false){ //좋아요가 클릭되어 있었을 경우
                    l.setLiked(false);
                } else if(l.isLiked()==false&&l.isDisliked()==false){ //아무것도 클릭되어있지 않았을 경우
                    l.setLiked(true);
                } else if(l.isLiked()==false&&l.isDisliked()==true){ //싫어요가 클릭되어 있었을 경우
                    l.setLiked(true);
                    l.setDisliked(false);
                }
                //상태 업데이트하고 성공했다면
                if(likeOrDislikeMapper.update(l)!=0){
                    //update성공했으면 리턴
                    return likeOrDislikeMapper.selectOne(l.getLikeOrDislikeId());
                }
            }
            //테이블이 존재하지않거나 update 실패하던 null 리턴
            return null;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    //게시물의 싫어요를 클릭했을 때 실행 할 메소드
    public LikeOrDislikeDTO clickDislike(LikeOrDislikeDTO l, int userId) {
        try{
            //로그인한 유저의 식별자를 삽입
            l.setUserId(userId);
            //테이블이 존재한다면(게시물이 삭제되지 않았다면)
            if(likeOrDislikeMapper.selectId(l)!=0){
                if(l.isLiked()==true&&l.isDisliked()==false){ //좋아요가 클릭되어 있었을 경우
                    l.setLiked(false);
                    l.setLiked(true);
                } else if(l.isLiked()==false&&l.isDisliked()==false){ //아무것도 클릭되어있지 않았을 경우
                    l.setDisliked(true);
                } else if(l.isLiked()==false&&l.isDisliked()==true){ //싫어요가 클릭되어 있었을 경우
                    l.setDisliked(true);
                }
                //상태 업데이트하고 성공했다면
                if(likeOrDislikeMapper.update(l)!=0){
                    //update성공했으면 리턴
                    return likeOrDislikeMapper.selectOne(l.getLikeOrDislikeId());
                }
            }
            //테이블이 존재하지않거나 update 실패하던 null 리턴
            return null;
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}