package com.bitcamp.travelkkaebi.exception;

public enum ErrorCode {
    ALREADY_EXIST_USERNAME("이미 존재하는 아이디입니다."),
    USER_UPDATE_EXCEPTION("회원정보 수정 실패"),
    USER_DELETE_EXCEPTION("회정삭제 실패"),
    DOES_NOT_EXIST_USER("존재하지 않는 회원입니다."),
    DOES_NOT_MATCH_PASSWORD("비밀번호가 일치하지 않습니다"),
    DOES_NOT_MATCH_USER("회원정보가 일치하지 앖습니다."),
    DOES_NOT_EDIT_USER("에디터 유저가 아닙니다"),
    EDIT_EXCEPTION("edit exception"),
    NO_INPUT_INFORMATION("입력정보가 없습니다."),
    DOES_NOT_EXIST_BOARD("해당 게시물이 존재하지 않습니다."),
    ALREADY_APPLIED("이미 신청한 글입니다"),
    NO_SEARCH("검색된 게시물이 없습니다"),
    FAILED_TO_UPDATE_VIEW("조회수 갱신 실패"),
    BOARD_UPDATE_EXCEPTION("게시물 수정 갱신 실패"),
    FAILED_TO_SELECT_BOARD("게시물 조회 실패"),

    FAILED_TO_INSERT_BOARD("게시물 등록 실패");



    public final String message;

    ErrorCode(String message) {
        this.message = message;
    }
}