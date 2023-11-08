import React, { useState, useEffect } from "react";
// import "./TravelForm.css";
import styles from "./TravelForm.module.css";
// import Travels, {exptravels} from './Travels';

export default function TravelForm() {
  const UpdateForm = ({ uTravels }) => {
    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const id = e.target.id.value;
            const name = e.target.name.value;
            const image = e.target.image.value;

            const newTravels = [...travels];
            const updateArticle = {
              id: id,
              name: name,
              imglink: image,
            };

            newTravels.map((t) =>
              t.id === id ? (newTravels[t.id - 1] = updateArticle) : t
            );

            fetch(`http://localhost:3100/travel/${id}`, {
              method: "PATCH",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify(updateArticle),
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
              defaultValue={uTravels.id}
            />
          </div>
          <div className="input-group inputGroup-lg mb-2">
            <span className="input-group-text">여행지 국가</span>
            <input
              type="text"
              className="form-control"
              name="name"
              autoComplete="off"
              defaultValue={uTravels.name}
            />
          </div>
          <div className="input-group inputGroup-lg mb-2">
            <span className="input-group-text">대표 이미지</span>
            <input
              type="text"
              className="form-control"
              name="image"
              autoComplete="off"
              defaultValue={uTravels.image}
            />
          </div>
          <input type="submit" className="btn btn-dark" value="정보 수정" />
          <div style={{ border: "0px solid blue", position: "relative" }}>
            <button
              style={{
                position: "absolute",
                top: "-38px",
                right: "0px",
                border: "1px solid red",
              }}
              className="btn btn-outline-info"
              onClick={() => {
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
  const [inputUpdateData, setInputUpdateData] = useState({
    id: "",
    name: "",
    image: "",
  });
  useEffect(() => {
    fetch("http://localhost:3100/travel")
      .then((response) => response.json())
      .then((jsonData) => setTravels([...jsonData]));
  }, [modifyMode]);

  const onDelete = (ev, data) => {
    console.log("Delete");
    console.log("삭제ID", data);

    fetch(`http://localhost:3100/travel/${data}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    }).then((response) => {
      console.log(response);
    });

    // 삭제처리
    // 1. fetch로 삭제처리
    // 2. travels에 filter함수 할당
    setTravels(travels.filter((t) => t.id !== data));
  };

  const clickHandlerModify = (data, event) => {
    // 수정화면의 input 태그 값 세팅
    event.preventDefault();

    console.log(data, event);
    // Update 구현, 화면변경 아직

    setInputUpdateData({
      id: data.id,
      name: data.name,
      image: data.imglink,
    });

    setModifyMode(!modifyMode);
  };

  return (
    <div className="container mt-5">
      <h3>Travel Form 페이지</h3>
      <hr />

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

            fetch("http://localhost:3100/travel", {
              method: "POST",
              headers: { "Content-type": "application/json" },

              body: JSON.stringify(newArticle),
            }).then((response) => {
              console.log(response);
            });

            setTravels([...travels, newArticle]);

            event.target.reset();
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

          <ul style={{ listStyle: "none", padding: "40px" }}>
            {travels.map((t) => (
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
                      position: "absolute",
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
                  <button
                    className="btn btn-outline-info"
                    style={{
                      position: "absolute",
                      top: "50px",
                      right: "24px",
                      zIndex: "1",
                    }}
                    onClick={(ev) => {
                      onDelete(ev, t);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </form>
      ) : (
        <>
          <h1>UpdateMode</h1>
          <UpdateForm uTravels={inputUpdateData} />
        </>
      )}
    </div>
  );
}
