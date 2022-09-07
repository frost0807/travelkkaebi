import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./pagination.css";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageLists = styled.ul`
  display: flex;
`;
const PageNumber = styled.li``;

function Pagination({ totalCount, pageNate, limits }) {
  const pageNumbers = [];
  // 페이지 넘버를 설정하기 위해 페이지당 포스트 개수와 총 포스트 개수를 가져온다.
  // index 를 1로 설정하고, index 가 (총 포스트개수 / 페이지당 포스트 개수) 보다 크지 않을때까지 i값을 올린다.
  // 그리고 그 값을 pageNumber 에 넣어서 설장한다.
  for (let i = 1; i <= Math.ceil(totalCount / limits); i++) {
    pageNumbers.push(i);
  }

  // 리버스를 해야 하나
  return (
    <Wrapper>
      <PageLists>
        {pageNumbers.map((number) => (
          <PageNumber key={number} style={{ marginTop: "2rem" }}>
            <Link
              to={`/joinme/${number}`}
              onClick={() => pageNate(number)}
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "#595959",
                margin: "0 0.5rem",
                padding: 0,
                border: "none",
                background: "none",
              }}
            >
              {number}
              
            </Link>
          </PageNumber>
        ))}
      </PageLists>
    </Wrapper>
  );
}

export default Pagination;
