import React, { useRef, useState } from 'react'
import { ContainerWrapper, FormTitle, Title, Wrapper } from './Registerstyle'
import './css/register.css';
import { Button, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import styled from 'styled-components';
import { PhotoCamera, RepeatOneSharp } from '@mui/icons-material';
import Logo from '../../images/basicLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { API_BASE_URL } from '../../config';

// rest api 주소 아직 안 적음

// 핸드폰 validation 숫자

const RegisterForm = () => {

    const navi = useNavigate();
    // 회원가입 완료 후 페이지를 선택할 수 있게 할 예정
    // 일단 메인으로 보냄

    // profile 이미지 상태
    // pull 하고 이미지 미리보기가 안되는 중...
    // 되는 파일이 있고 일단 https://duckgugong.tistory.com/249 참고 하기
    const [profile, setProfile] = useState(null);
    const selectFile = useRef(null);

    const imageUpload = e => {
        e.preventDefault();
        const reader = new FileReader();
        const file = selectFile.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfile(reader.result);
            console.log("img url", reader.result);
        }
    }
// validation hook
    const { 
        register,
        handleSubmit,
        trigger,
        watch,
        getValues,
        formState: { isSubmitting, isDirty, errors }
    } = useForm({
        mode: 'onChange'
    });


    // 비밀번호 확인
    const password = useRef();
    password.current = watch('password');


    // 사진도 formdata로 한번에 보내도 가지려나
    const signUpEvnt = (user) => {
        if (!user.username || !user.password || !user.name || !user.nickname || !user.email || !user.phone ) {
            alert('입력칸이 비어있습니다.');
            console.log(user.sex);
         } else if ( !repetition ) {
            alert ('중복 체크를 해주세요.');
            return;
        }
        axios.post(API_BASE_URL, user)
            .then(res => {
                console.log(res.data)
                navi('/')
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onSubmit = e => {
        e.preventDefault();
        const data = new FormData(e.target)
        const username = data.get('username')
        const password = data.get('password')
        const name = data.get ('name')
        const nickname = data.get('nickname')
        const phone = data.get('phone')
        const email = data.get('email')
        // append가 되었을까?
        const profile_img = data.append('profile_img_url', setProfile);
        console.log(profile_img);
        
        signUpEvnt ({
            username : username,
            password : password,
            name : name,
            nickname : nickname,
            phone : phone,
            email : email,
            profile_img_url : profile_img
        })
    }

    // ** 이슈 ** 유효성에 맞지 않았을 때에도 경고창을 ,,,?!
    // 중복체크 repetitionEvent
    // 한번에 해버릴까 했는데 버튼 구역이 나뉘어져 있고
    // false일 경우 해당값이 다른 걸 알려줘야 해서... 2개로 나뉘었다..
    // username / nickname
    const [ repetition, setRepetition ] = useState(false);
    const repetitionBtn = useRef(null);
    const userName = getValues('username');
    const nickName = getValues('nickname');
    const repetitionEvent_id = () => {
        if (userName === '') {
            alert("아이디를 입력해주세요.");
            return;
        } else {
            axios.get(API_BASE_URL+'샬라샬라~' , userName)
            .then(res => {
                if (res.data === true) {
                    setRepetition(true);
                    alert ('사용 가능한 아이디입니다.');
                    repetitionBtn.current.style.color = '#03d85e';
                    repetitionBtn.current.style.fontWeight = 'bold';
                } else {
                    setRepetition(false);
                    alert('이미 사용 중인 아이디 입니다.')
                }
            })
        }
    }
    const repetitionEvent_nickname =() => {
        if (nickName === '') {
            alert("닉네임을 입력해주세요.");
            return;
        } else {
            axios.get(API_BASE_URL+'샬라샬라~' , nickName)
            .then(res => {
                if (res.data === true) {
                    setRepetition(true);
                    alert ('사용 가능한 닉네임 입니다.');
                    repetitionBtn.current.style.color = '#03d85e';
                    repetitionBtn.current.style.fontWeight = 'bold';
                } else {
                    setRepetition(false);
                    alert('이미 사용 중인 닉네임 입니다.')
                }
            })
        }
    }


    return (

        <Wrapper>
            <Title> 회원가입 </Title>
            <ContainerWrapper>

                <form className="reg_form" id='reg_form' onSubmit={ handleSubmit(onSubmit) }>
                    <div className='register_form'>

                        <FormTitle>기본정보
                            <p className='must'>필수입력사항 </p>
                        </FormTitle>
                                        <div className="profileimg">
                                            <img alt="basicimg"
                                                src={ profile ? profile : Logo }
                                                className="user_profile" />
                                                 {/* 이미지를  controller에서 따로 url을 받는 곳이 없어서
                                                  *   url을 때려박지를 못함
                                                   */}
                                        </div>
                                        <div className="photo_icon">
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="label"
                                                onClick={() => selectFile.current.click()}
                                            >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    name='profile_img_url'
                                                    multiple
                                                    style={{ display: 'none' }}
                                                    onChange= { imageUpload }
                                                    ref={ selectFile }
                                                />
                                                <PhotoCamera />
                                            </IconButton>
                                        </div>
                                    <br />

                        <div className='reg_table' style={{ margin: 0, display: 'block' }}>
                            <table className='register_table'>
                                <colgroup style={{ display: 'table-column-group' }}>
                                    <col style={{ width: 130, display: 'table-column' }} />
                                    <col style={{ width: "*", display: 'table-column' }} />
                                </colgroup>

                                <tbody>
                                   <tr>
                                        <th scope='row'>
                                            <label htmlFor="username" className='req'>
                                                🔸아이디
                                            </label>
                                        </th>
                                        <td>
                                            <input
                                                className='reg_input'
                                                type='text'
                                                name='username'
                                                id='username'
                                                required
                                                autoComplete='off'
                                                placeholder='영소문자/숫자, 6~16자'
                                                aria-invalid=
                                                {!isDirty ? undefined : errors.username ? "true" : "false"}
                                                {...register('username', {
                                                    minLength: {
                                                        value: 6,
                                                        message: '6글자 이상 입력해주세요'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: '16글자까지 입력 가능합니다.'
                                                    },
                                                    pattern: {
                                                        value: /^[a-z0-9,-_]{6,16}$/,
                                                        message: '영소문자/숫자, -,_ 만 입력할 수 있습니다.'
                                                    }
                                                }
                                                )}
                                            />
                                            {errors.username && (
                                                <div className="reg-error1">
                                                    <WarningAmberIcon style={{ fontSize: 'small' }} />
                                                    {" "}{errors.username.message}
                                                </div>
                                            )}
                                            <Button
                                                size="small"
                                                onClick={ repetitionEvent_id }
                                                className="repetitionBtn"
                                                style={{ color: 'gray', marginLeft: '276px' }}
                                                startIcon={<CheckCircleOutlineIcon />}
                                                ref={repetitionBtn}
                                            >
                                                중복확인
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="passoword" className='req'>
                                                🔸비밀번호
                                            </label>
                                        </th>
                                        <td>
                                            <input
                                                className='reg_input'
                                                type='password'
                                                name='passoword'
                                                id='passoword'
                                                required
                                                autoComplete='off'
                                                aria-invalid=
                                                {!isDirty ? undefined : errors.password ? "true" : "false"}
                                                {...register('password', {
                                                    minLength: {
                                                        value: 8,
                                                        message: '8글자 이상 입력해주세요'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: '16글자까지 입력 가능합니다'
                                                    },
                                                    pattern: {
                                                        value: /^(?=.*\d)(?=.*[a-zA-Zs]).{8,16}/,
                                                        message: '8자이상, 영문, 숫자를 혼용하여 주세요.',
                                                    }
                                                }
                                                )}
                                            />
                                            {errors.password && (
                                                <div className="reg-error3">
                                                    <WarningAmberIcon style={{ fontSize: 'small' }} />
                                                    {" "}{errors.password.message}
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="passoword_re" className='req'>
                                                🔸비밀번호 확인
                                            </label>
                                        </th>
                                        <td>
                                            <input
                                                className='reg_input'
                                                type='password'
                                                name='passoword_re'
                                                id='passoword_re'
                                                required
                                                autoComplete='off'
                                                {...register('password_re', {
                                                    required: (
                                                        <div className="regis-error">
                                                            <WarningAmberIcon style={{ fontSize: 'small', marginTop: 3 }} />
                                                            비밀번호를 다시 입력해주세요
                                                        </div>
                                                    ),
                                                    validate: value => value === password.current,
                                                    onChange: () => {
                                                        trigger('password_re');
                                                    },
                                                    onBlur: () => {
                                                        trigger('password_re');
                                                    },
                                                })}
                                            />
                                            {errors.password_re &&
                                                errors.password_re.type === 'validate' && (
                                                    <div className="reg-error3">
                                                        <WarningAmberIcon style={{ fontSize: 'small', marginTop: 3 }} />
                                                        비밀번호가 일치하지 않습니다.
                                                    </div>
                                                )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="name" className='req'>
                                                🔸이름
                                            </label>
                                        </th>
                                        <td>
                                            <input
                                                className='reg_input'
                                                type='text'
                                                name='name'
                                                id='name'
                                                required
                                                autoComplete='off'
                                                aria-invalid=
                                                {!isDirty ? undefined : errors.name ? "true" : "false"}
                                                {...register('name', {
                                                    minLength: {
                                                        value: 2,
                                                        message: '2글자 이상 입력해주세요'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: '16글자까지 입력 가능합니다.'
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z가-힣]{2,16}$/,
                                                        message: '이름이 올바르지 않습니다.'
                                                    }
                                                }
                                                )}
                                            />
                                            <button type='button' className='btn_frmline'>휴대폰 본인확인</button>
                                            {errors.name && (
                                                <div className="reg-error1">
                                                    <WarningAmberIcon style={{ fontSize: 'small' }} />
                                                    {" "}{errors.name.message}
                                                </div>
                                            )}
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="nickname" className='req'>
                                                🔸닉네임
                                            </label>
                                        </th>
                                        <td>
                                            <input
                                                className='reg_input'
                                                type='text'
                                                name='nickname'
                                                id='nickname'
                                                required
                                                autoComplete='off'
                                                aria-invalid=
                                                { !isDirty ? undefined : errors.nickname ? "true" : " false" }
                                                { ...register('nickname', {
                                                    pattern: {
                                                        value: /^[a-zA-Z가-힣,-_]{2,16}$/,
                                                        message: '이름이 올바르지 않습니다.'
                                                    },
                                                    maxLength: {
                                                        value: 16,
                                                        message: '16글자까지 입력 가능합니다.'
                                                    },
                                                    minLength : {
                                                        value : 6,
                                                        message : '6글자 이상 입력 가능합니다.'
                                                    }
                                                } 
                                                )}
                                            />
                                            {errors.nickname && (
                                                <div className="reg-error1">
                                                    <WarningAmberIcon style={{ fontSize: 'small' }} />
                                                    {" "}{errors.nickname.message}
                                                </div>
                                            )}
                                            <Button
                                                size="small"
                                                onClick={ repetitionEvent_nickname }
                                                className="repetitionBtn"
                                                style={{ color: 'gray', marginLeft: '276px' }}
                                                startIcon={<CheckCircleOutlineIcon />}
                                                ref={repetitionBtn}
                                            >
                                                중복확인
                                            </Button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="phone" className='req'>
                                                🔸휴대전화
                                            </label>
                                        </th>
                                        <td>
                                            <div className='telselect_wrap'>
                                                <input type='text' className='reg_input' required maxLength='3' id='hp1' name='phone' />
                                                <b>-</b>
                                                <input type='text' className='reg_input' required maxLength='4' id='hp2' name='phone' />
                                                <b>-</b>
                                                <input type='text' className='reg_input' required maxLength='4' id='hp3' name='phone' />
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="email" className='req'>
                                                🔸이메일
                                            </label>
                                        </th>
                                        <td>
                                            <div className='emailselect_wrap'>
                                                <input type='email' className='reg_input' name='email' required
                                                    aria-invalid={
                                                        !isDirty ? undefined : errors.email ? 'true' : 'false'
                                                    }
                                                    {...register('email', {
                                                        maxLength: {
                                                            value: 40,
                                                            message: '최대 40글자까지 입력 가능합니다.'
                                                        },
                                                        pattern: {
                                                            value: /\S+@\S+\.\S+/,
                                                            message: '이메일 형식에 맞게 입력해주세요',
                                                        },
                                                    })} />
                                                {errors.email && (
                                                    <div className="reg-error3">
                                                        <WarningAmberIcon style={{ fontSize: 'small' }} />
                                                        {" "}{errors.email.message}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='reg_table' style={{ marginTop: '50px' }}>
                            <h3>기타 개인설정</h3>
                            <table>{/*캡챠 넣을 곳*/}</table>
                        </div>

                        <BtnConfirm>
                            <a href='/' className='btn_cancel'>취소</a>
                            <input type='submit' onClick={ signUpEvnt } disabled= {isSubmitting }
                                value='가입하기' id='btn_submit' className='btn_submit' accessKey='s'></input>
                        </BtnConfirm>

                    </div>
                </form>

            </ContainerWrapper>
        </Wrapper>
    )
}

export default RegisterForm

const BtnConfirm = styled.div`
text-align : 'center';
margin: 55px auto 0 !important;
display: block;
`