import React from "react";

export default function Travel({ idn, name, img }) {
  return (
    <>
      <h1>여행지 정보</h1>
      <h3>
        {idn}.{name}
      </h3>
      <img src={img} width="100%" />
    </>
  );
}
