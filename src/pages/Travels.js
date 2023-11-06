import React, { useState } from "react";
import Travel from "../components/Travel";

const exptravels = [
  {
    id: 1,
    name: "Korea",
    imglink:
      "https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg",
  },
  {
    id: 2,
    name: "America",
    imglink:
      "https://media.istockphoto.com/id/1222845420/ko/%EC%82%AC%EC%A7%84/%EB%AF%B8%EA%B5%AD%EA%B3%BC-%EC%9A%B0%ED%81%AC%EB%9D%BC%EC%9D%B4%EB%82%98-%EA%B5%AD%EA%B8%B0%EB%8A%94-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EA%B3%BC-%EA%B1%B4%EB%AC%BC%EC%9D%98-%EC%9D%BC%EB%B6%80%EC%97%90-%EB%8C%80%ED%95%B4-%EB%B9%84%ED%96%89-%EC%95%A0%EA%B5%AD-%EC%8B%AC.webp?b=1&s=612x612&w=0&k=20&c=v5iLT6Pu3yilTfwgmJyWK2qM4P6YmEMi8y7xSeF84fI=",
  },
  {
    id: 3,
    name: "japan",
    imglink:
      "https://cdn.pixabay.com/photo/2014/10/07/13/48/mountain-477832_1280.jpg",
  },
];

function Travels() {
  // const name = '한국'
  // const img='https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg'

  const [travelData, setTravelData] = useState([]);
  const [createTravel, setCreateTravel] = useState(false);
  async function travelClick() {
    const response = await fetch("http://localhost:3100/travel");
    const jsonData = await response.json();

    setTravelData([...jsonData]);
    setCreateTravel(!createTravel);
  }
  return (
    <div className="container mt-5">
      <button className="btn btn-outline-primary" onClick={travelClick}>
        {!createTravel ? "여행지 데이터 불러오기" : "접기"}
      </button>
      <hr />
      {/* <Travels name={name} img={img} />
    <Travels name={name} img={img} />
    <Travels name={name} img={img} /> 
    jsx에서 js코드 실행코드는 {}내에서 작성
    */}

      {createTravel ? (
        travelData.map((t) => {
          return <Travel key={t.id} idn={t.id} name={t.name} img={t.imglink} />;
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export { Travels as default, exptravels };
