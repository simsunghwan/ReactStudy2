import React, { useState, useEffect } from "react";
// import "./TravelForm.css";
import styles from "./TravelForm.module.css";
// import Travels, {exptravels} from './Travels';

export default function TravelForm() {
  const UpdateForm = () => {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const id = e.target.id.value;
            const name = e.target.name.value;
            const image = e.target.image.value;

            /* 배열 데이터의 수정처리
            id와 index의 차이
            id: 1~
            index: 0~
            수정작업할 때 id-1로 해서 수정해야 함
            [1] 먼저 기존배열데이터(travels)를 복사해서 새 배열(newTravels)로 작성
            [2] 수정 정보를 포함한 객체를 생성한다
                t = {id:~~~, name:'ddd', image:'https://dvvfdg'}
            [3] 새배열의 map함수 정의
              [3-1] 수정정보객체의 t.id와 같은 경우 수정처리
              [3-2] setter로 useState정보(travels)를 수정
            [4] 모드변경: 화면변경 */

            // [1]
            const newTravels = [...travels];

            // [2]
            const updateArticle = {
              id: parseInt(id),
              name: name, // name
              image, // image: image
            };
            // [3]
            newTravels.map((t) =>
              t.id === parseInt(id) ? (newTravels[t.id - 1] = updateArticle) : t
            );
            // json server에 update 처리
            // fetch

            fetch(`http://localhost:3100/travels/${id}`, {
              method: "fetch", // PUT, PATCH, DELETE
              headers: { "Content-type": "application/json" }, // HTTP Request Header 설정
              // body, params(:data), query(url에서 ?뒤에 key=value&...)
              body: JSON.stringify(updateArticle), // 직렬화(Serialization) - 문자열로 변경
            }).then((response) => {
              console.log(response);
            });

            setModifyMode(!modifyMode);
          }}
        >
          <div className="input-group inputGroup-lg mb-2">
            <span className="input-group-text">인덱스 번호</span>
            <input
              type="text"
              className="form-control"
              name="id"
              autoComplete="off"
            />
          </div>
          <div className="input-group inputGroup-lg mb-2">
            <span className="input-group-text">여행지 국가</span>
            <input
              type="text"
              className="form-control"
              name="name"
              autoComplete="off"
              defaultValue={"name"}
            />
          </div>
          <div className="input-group inputGroup-lg mb-2">
            <span className="input-group-text">대표 이미지</span>
            <input
              type="text"
              className="form-control"
              name="image"
              autoComplete="off"
            />
          </div>
          <input type="submit" className="btn btn-dark" value="정보 수정" />
          <div style={{ border: "0px solid blue", position: "relative" }}>
            <button
              className="btn btn-outline-info"
              style={{ position: "absolute", top: "-38px", right: "0px" }}
              onClick={() => {
                // window.location.reload(); // 새로고침: 모든 화면을 새로 그림, 데이터들의 초기화
                setModifyMode(!modifyMode);
              }}
            >
              뒤돌아가기
            </button>
          </div>
        </form>
      </>
    );
  };

  const [travels, setTravels] = useState([]);
  const [modifyMode, setModifyMode] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3100/travel")
      .then((response) => response.json())
      .then((jsonData) => setTravels([...jsonData]));
  }, []);

  const clickHandlerModify = (data, event) => {
    event.preventDefault();

    console.log(data, event);
    // Update 구현, 화면변경 아직
    setModifyMode(!modifyMode);
  };

  return (
    <div className="container mt-5">
      <h3>Travel Form 페이지</h3>
      <hr />
      {/* <form action="">
      <p><input type="text" className={styles.inputBox} name="name" placeholder='여행지 국가이름' autoComplete='off'/></p>
      <p><input type="text" className={styles.inputBox} name="image" placeholder='여행지 대표이미지' autoComplete='off'/></p>
    </form> */}
      {!modifyMode ? (
        <form
          className={styles}
          onSubmit={(event) => {
            event.preventDefault(); // reload 방지
            const id = event.target.id.value;
            const name = event.target.name.value;
            const image = event.target.image.value;
            console.log(id, name, image);

            const newArticle = {
              id, // key명과 value의 변수명이 같으면 생략가능
              name,
              imglink: image,
            };

            // console.log(exptravels);

            // console.log(newArticle);
            // exptravels.push(newArticle); // 단순 배열 변경으로 렌더링 못함 --> useState 처리해야함
            // console.log(exptravels);

            // fetch로 Post /travels (Create하는 엔드포인트)로 newArticle을 전송하여 서버에 반영
            fetch("http://localhost:3100/travel", {
              method: "POST", // PUT, PATCH, DELETE
              headers: { "Content-type": "application/json" }, // HTTP Request Header 설정
              // body, params(:data), query(url에서 ?뒤에 key=value&...)
              body: JSON.stringify(newArticle), // 직렬화(Serialization) - 문자열로 변경
            }).then((response) => {
              console.log(response);
            });

            setTravels(
              //useState의 setter를 활용
              // travels,  // 에러 발생하지 않고 배열에 추가 되지만, 레더링 안됨
              [...travels, newArticle]
            );

            event.target.reset();
            // event.target --> <form></form>의 엘리먼트 객체
          }}
        >
          <div>
            <span className="input-group-text">인덱스 번호</span>
            <input
              type="text"
              className="form-control"
              name="id"
              autoComplete="off"
            />
          </div>
          <div>
            <span className="input-group-text">여행지 국가</span>
            <input
              type="text"
              className="form-control"
              name="name"
              autoComplete="off"
            />
          </div>
          <div>
            <span className="input-group-text">대표 이미지</span>
            <input
              type="text"
              className="form-control"
              name="image"
              autoComplete="off"
            />
          </div>
          <input
            type="submit"
            className="btn btn-dark"
            value="여행지 정보 입력"
          />
          <hr />
          {/* 
        <ul style={{listStyle:'none', padding:'40px'}}>
          <li>
            <span style={{display:'inline-block', width:'140px'}} >
              1.&nbsp;
            </span>
            <span style={{display:'inline-block', width:'140px', fontWeight:'bold'}} >
              Korea
            </span>
            <img width='30%' src="https://cdn.pixabay.com/photo/2020/08/09/11/31/business-5475283_1280.jpg" alt="" />
          </li>
          <li>
            <span style={{display:'inline-block', width:'140px'}} >
              2.&nbsp;
            </span>
            <span style={{display:'inline-block', width:'140px', fontWeight:'bold'}} >
              미국
            </span>
            <img width='30%' src="https://media.istockphoto.com/id/1222845420/ko/%EC%82%AC%EC%A7%84/%EB%AF%B8%EA%B5%AD%EA%B3%BC-%EC%9A%B0%ED%81%AC%EB%9D%BC%EC%9D%B4%EB%82%98-%EA%B5%AD%EA%B8%B0%EB%8A%94-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98%EA%B3%BC-%EA%B1%B4%EB%AC%BC%EC%9D%98-%EC%9D%BC%EB%B6%80%EC%97%90-%EB%8C%80%ED%95%B4-%EB%B9%84%ED%96%89-%EC%95%A0%EA%B5%AD-%EC%8B%AC.webp?b=1&s=612x612&w=0&k=20&c=v5iLT6Pu3yilTfwgmJyWK2qM4P6YmEMi8y7xSeF84fI=" alt="" />
          </li>
        </ul> 
        */}

          <ul style={{ listStyle: "none", padding: "40px" }}>
            {
              //exptravels.map(
              travels.map((t) => (
                // 부모에게는 position:'relative'게 준다
                <li key={t.id} style={{ position: "relative" }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "140px",
                      textTransform: "capitalize",
                    }}
                  >
                    {t.id}.
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: "140px",
                      marginBottom: "70px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {t.name}
                  </span>
                  <img height="140px" width="30%" src={t.imglink} alt="" />
                  <div>
                    <button
                      className="btn btn-outline-success"
                      style={{
                        position: "absolute", // 자식 엘리먼트 absolute엔 부모를 기준으로 한다.
                        top: "50px",
                        right: "100px",
                        zIndex: "2",
                      }}
                      onClick={(ev) => {
                        clickHandlerModify(t, ev);
                      }}
                    >
                      수정
                    </button>
                  </div>
                </li>
              ))
            }
          </ul>
        </form>
      ) : (
        <>
          <h1>UpdateMode</h1>
          <UpdateForm />
        </>
      )}
    </div>
  );
}
