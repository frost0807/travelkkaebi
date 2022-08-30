import React from "react";
import { useParams } from "react-router";

function JoinMeDetail() {
  const { joinid } = useParams();

  return <div>JoinMeDetail</div>;
}

export default JoinMeDetail;
