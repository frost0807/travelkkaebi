import React, { useState, useEffect } from "react";

import styled from "styled-components";
import HeartImg from "../../images/heart.png";
import EmptyHeartImg from "../../images/empty-heart.png";

const Heart = styled.img`
width: 12px;
height: 12px;
`;

function LikeBtn({ like, onClick }){
    return (
        <Heart src={like?HeartImg:EmptyHeartImg} onClick={onClick} />
    );
};

export default LikeBtn;