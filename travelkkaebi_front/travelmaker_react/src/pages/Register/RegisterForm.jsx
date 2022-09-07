import React, { useEffect, useRef, useState } from "react";
import { ContainerWrapper, FormTitle, Title, Wrapper } from "./Registerstyle";
import "./css/register.css";
import { Button, IconButton } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import styled from "styled-components";
import { PhotoCamera } from "@mui/icons-material";
import Logo from "../../images/basicLogo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { API_BASE_URL, userconfig } from "../../config";

const RegisterForm = () => {
  const navi = useNavigate();
  // validation hook
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    mode: "onChange",
  });
  // 비밀번호 확인
  const password = useRef();
  password.current = watch("password");

  // profile 이미지 상태
  const [profile, setProfile] = useState({
    image_file: "",
    preview_URL: Logo,
  });
  let inputRef;

  const imageUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(profile.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setProfile(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(profile.preview_URL);
    };
  }, []);

  // 회원가입 @@@@@@@@@@@@@@@@@@@@@@@@@@@
  const onSubmit = async (data) => {
    //console.log('data', data);
    const headerConfig = {
      Headers: {
        "content-type": "multipart/form-data",
      },
    };
    if (profile.image_file) {
      const formData = new FormData();
      const userDTO = JSON.stringify(data);
      formData.append("file", profile.image_file);
      formData.append(
        "userDTO",
        new Blob([userDTO], { type: "application/json" })
      );
      console.log("FormData", formData);

      await axios
        .post(userconfig + "/signup", formData, headerConfig)
        .then((res) => {
          console.log(res.data);
          alert("👹회원가입이 완료되었습니다.");
          setProfile({ image_file: "", preview_URL: Logo });
          navi("/");
        });
    }
  };

  // ** 이슈 ** 유효성에 맞지 않았을 때에도 경고창을 ,,,?!
  // 중복체크 repetitionEvent
  // 한번에 해버릴까 했는데 버튼 구역이 나뉘어져 있고
  // false일 경우 해당값이 다른 걸 알려줘야 해서... 2개로 나뉘었다..
  // username / nickname
  const [repetition, setRepetition] = useState(false);
  const repetitionIdBtn = useRef("");
  const repetitionNickBtn = useRef("");
  const userName = getValues("username");
  const nickName = getValues("nickname");

  const repetitionEventid = () => {
    console.log(userName);
    if (userName === "") {
      alert("아이디를 입력해주세요.");
      setRepetition(false);
    } else {
      // get ( API_BASE_URL +"/username/check?username="+userName)
      axios
        .get(userconfig + "/username/check", {
          params: { username: userName },
        })
        .then((res) => {
          if (res.data === false) {
            console.log(res.data);
            setRepetition(true);
            alert("사용 가능한 아이디입니다.");
            repetitionIdBtn.current.style.color = "#03d85e";
            repetitionIdBtn.current.style.fontWeight = "bold";
          } else {
            setRepetition(false);
            alert("이미 사용 중인 아이디 입니다.");
          }
        });
    }
  };
  const repetitionEvent_nickname = () => {
    if (nickName === "") {
      alert("닉네임을 입력해주세요.");
      return;
    } else {
      axios
        .get(userconfig + "/nickname/check", {
          params: { nickname: nickName },
        })
        .then((res) => {
          if (res.data === false) {
            setRepetition(true);
            alert("사용 가능한 닉네임 입니다.");
            repetitionNickBtn.current.style.color = "#03d85e";
            repetitionNickBtn.current.style.fontWeight = "bold";
          } else {
            setRepetition(false);
            alert("이미 사용 중인 닉네임 입니다.");
          }
        });
    }
  };

  // 핸드폰 정규식
  const autoHyphen2 = (target) => {
    target.value = target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  return (
    <Wrapper>
      <ContainerWrapper>
        <form
          className="reg_form"
          id="reg_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="register_form">
            <FormTitle>
              기본정보
              <p className="must">필수입력사항 </p>
            </FormTitle>
            <div className="profileimg">
              <img
                alt="basicimg"
                src={profile.preview_URL}
                className="user_profile"
              />
            </div>
            <div className="photo_icon">
              <input
                type="file"
                accept="image/*"
                name="profile_img_url"
                hidden
                style={{ display: "none" }}
                onChange={imageUpload}
                ref={(refParam) => (inputRef = refParam)}
                onClick={(e) => (e.target.value = null)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                onClick={() => inputRef.click()}
              >
                <PhotoCamera />
              </IconButton>
            </div>
            <br />

            <div className="reg_table" style={{ margin: 0, display: "block" }}>
              <table className="register_table">
                <colgroup style={{ display: "table-column-group" }}>
                  <col style={{ width: 130, display: "table-column" }} />
                  <col style={{ width: "*", display: "table-column" }} />
                </colgroup>

                <tbody>
                  <tr>
                    <th scope="row">
                      <label htmlFor="usernamelabel" className="req">
                        🔸아이디
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="text"
                        name="username"
                        id="username"
                        required
                        autoComplete="off"
                        placeholder="영소문자/숫자, 6~16자"
                        aria-invalid={
                          !isDirty
                            ? undefined
                            : errors.username
                            ? "true"
                            : "false"
                        }
                        {...register("username", {
                          minLength: {
                            value: 6,
                            message: "6글자 이상 입력해주세요",
                          },
                          maxLength: {
                            value: 16,
                            message: "16글자까지 입력 가능합니다.",
                          },
                          pattern: {
                            value: /^[a-z0-9,_].{6,16}$/,
                            message: "영소문자/숫자, _ 만 입력할 수 있습니다.",
                          },
                        })}
                      />
                      {errors.username && (
                        <div className="reg-error1">
                          <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                          {errors.username.message}
                        </div>
                      )}
                      <Button
                        size="small"
                        onClick={repetitionEventid}
                        className="repetitionBtn"
                        style={{
                          color: "gray",
                          marginLeft: "276px",
                          marginTop: "-50px",
                        }}
                        startIcon={<CheckCircleOutlineIcon />}
                        ref={repetitionIdBtn}
                      >
                        중복확인
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="passoword" className="req">
                        🔸비밀번호
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="password"
                        name="passoword"
                        id="passoword"
                        required
                        autoComplete="off"
                        aria-invalid={
                          !isDirty
                            ? undefined
                            : errors.password
                            ? "true"
                            : "false"
                        }
                        {...register("password", {
                          minLength: {
                            value: 8,
                            message: "8글자 이상 입력해주세요",
                          },
                          maxLength: {
                            value: 16,
                            message: "16글자까지 입력 가능합니다",
                          },
                          pattern: {
                            value: /^(?=.*\d)(?=.*[a-zA-Zs]).{8,16}/,
                            message: "8자이상, 영문, 숫자를 혼용하여 주세요.",
                          },
                        })}
                      />
                      {errors.password && (
                        <div className="reg-error3">
                          <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                          {errors.password.message}
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="passoword_re" className="req">
                        🔸비밀번호 확인
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="password"
                        name="passoword_re"
                        id="passoword_re"
                        required
                        autoComplete="off"
                        {...register("password_re", {
                          required: (
                            <div className="regis-error">
                              <WarningAmberIcon
                                style={{ fontSize: "small", marginTop: 3 }}
                              />
                              비밀번호를 다시 입력해주세요
                            </div>
                          ),
                          validate: (value) => value === password.current,
                          onChange: () => {
                            trigger("password_re");
                          },
                          onBlur: () => {
                            trigger("password_re");
                          },
                        })}
                      />
                      {errors.password_re &&
                        errors.password_re.type === "validate" && (
                          <div className="reg-error3">
                            <WarningAmberIcon
                              style={{ fontSize: "small", marginTop: 3 }}
                            />
                            비밀번호가 일치하지 않습니다.
                          </div>
                        )}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="name" className="req">
                        🔸이름
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="text"
                        name="name"
                        id="name"
                        required
                        autoComplete="off"
                        aria-invalid={
                          !isDirty ? undefined : errors.name ? "true" : "false"
                        }
                        {...register("name", {
                          minLength: {
                            value: 2,
                            message: "2글자 이상 입력해주세요",
                          },
                          maxLength: {
                            value: 16,
                            message: "16글자까지 입력 가능합니다.",
                          },
                          pattern: {
                            value: /^[a-zA-Z가-힣]{2,16}$/,
                            message: "이름이 올바르지 않습니다.",
                          },
                        })}
                      />
                      <button type="button" className="btn_frmline">
                        휴대폰 본인확인
                      </button>
                      {errors.name && (
                        <div className="reg-error1">
                          <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                          {errors.name.message}
                        </div>
                      )}
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="nickname" className="req">
                        🔸닉네임
                      </label>
                    </th>
                    <td>
                      <input
                        className="reg_input"
                        type="text"
                        name="nickname"
                        id="nickname"
                        required
                        autoComplete="off"
                        aria-invalid={
                          !isDirty
                            ? undefined
                            : errors.nickname
                            ? "true"
                            : " false"
                        }
                        {...register("nickname", {
                          pattern: {
                            value: /^[a-zA-Z가-힣,-_]{2,16}$/,
                            message: "이름이 올바르지 않습니다.",
                          },
                          maxLength: {
                            value: 16,
                            message: "16글자까지 입력 가능합니다.",
                          },
                          minLength: {
                            value: 6,
                            message: "6글자 이상 입력 가능합니다.",
                          },
                        })}
                      />
                      {errors.nickname && (
                        <div className="reg-error1">
                          <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                          {errors.nickname.message}
                        </div>
                      )}
                      <Button
                        size="small"
                        onClick={repetitionEvent_nickname}
                        className="repetitionBtn"
                        style={{
                          color: "gray",
                          marginLeft: "276px",
                          marginTop: "-50px",
                        }}
                        startIcon={<CheckCircleOutlineIcon />}
                        ref={repetitionNickBtn}
                      >
                        중복확인
                      </Button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="phone" className="req">
                        🔸휴대전화
                      </label>
                    </th>
                    <td>
                      <div className="telselect_wrap">
                        <input
                          type="text"
                          className="reg_input"
                          name="phone"
                          id="phone"
                          maxLength="11"
                          {...register("phone", {
                            required: true,
                            pattern: {
                              value: /^[0-9\b -]{0,13}$/,
                              message: "숫자만 입력 가능합니다.",
                            },
                          })}
                        />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">
                      <label htmlFor="email" className="req">
                        🔸이메일
                      </label>
                    </th>
                    <td>
                      <div className="emailselect_wrap">
                        <input
                          type="email"
                          className="reg_input"
                          name="email"
                          required
                          aria-invalid={
                            !isDirty
                              ? undefined
                              : errors.email
                              ? "true"
                              : "false"
                          }
                          {...register("email", {
                            maxLength: {
                              value: 40,
                              message: "최대 40글자까지 입력 가능합니다.",
                            },
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "이메일 형식에 맞게 입력해주세요",
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="reg-error3">
                            <WarningAmberIcon style={{ fontSize: "small" }} />{" "}
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="reg_table" style={{ marginTop: "50px" }}>
              <h3>기타 개인설정</h3>
              <table>{/*캡챠 넣을 곳*/}</table>
            </div>

            <BtnConfirm>
              <a href="/" className="btn_cancel">
                취소
              </a>
              <input
                type="submit"
                disabled={isSubmitting}
                value="가입하기"
                id="btn_submit"
                className="btn_submit"
                accessKey="s"
              />
            </BtnConfirm>
          </div>
        </form>
      </ContainerWrapper>
    </Wrapper>
  );
};

export default RegisterForm;

const BtnConfirm = styled.div`
  text-align: "center";
  margin: 55px auto 0 !important;
  display: block;
`;
