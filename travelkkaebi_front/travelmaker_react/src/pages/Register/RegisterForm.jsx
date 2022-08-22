import React, { useRef, useState } from 'react'
import { ContainerWrapper, FormTitle, Title, Wrapper } from './Registerstyle'
import './css/register.css';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import styled from 'styled-components';
import { PhotoCamera } from '@mui/icons-material';
import Logo from '../../images/basicLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router';




const RegisterForm = () => {

    const navi = useNavigate();

    const [profile, setProfile] = useState(null);
    const selectFile = useRef(null);

    const imageUpload = e => {
        const reader = new FileReader();
        const file = selectFile.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setProfile(reader.result);
            console.log("img url", reader.result);
        }
    }

const signUpEvnt = (userDTO) => {
    axios.post ( 'server', userDTO )
    .then (res => {
        navi('/')
    })
    .catch (error => {
        console.log(error);
    })
}

const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    const username = data.get('username')
    const password = data.get('password')
    const name = data.get ('name')
    const nickname = data.get('nickname')
    const phone = data.get('phone')
    const email = data.get('email')
    const sex = data.get(RadioGroup.value);
    // check 상태 만들기
    const profile_img = data.append(selectFile)

    signUpEvnt ({
        username : username,
        password : password,
        name : name,
        nickname : nickname,
        phone : phone,
        email : email,
        sex : RadioGroup.value,
        profile_img : selectFile
    })
}

    return (

        <Wrapper>
            <Title> 회원가입 </Title>
            <ContainerWrapper>

                <form className="reg_form" id='reg_form' onSubmit={ handleSubmit }>
                    <div className='register_form'>

                        <FormTitle>기본정보
                            <p className='must'>필수입력사항 </p>
                        </FormTitle>

                        <div className='reg_table' style={{ margin: 0, display: 'block' }}>
                            <table className='register_table'>
                                <colgroup style={{ display: 'table-column-group' }}>
                                    <col style={{ width: 130, display: 'table-column' }} />
                                    <col style={{ width: "*", display: 'table-column' }} />
                                </colgroup>

                                <tbody>
                                    <tr>
                                        <td>
                                        <div className="profileimg">
                                            <img alt="basicimg"
                                                src={ profile ? profile : Logo }
                                                className="user_profile" />
                                        </div>
                                        <div className="photo_icon">
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="label"
                                                style={{ color: '#ffbe3bee' }}
                                                onClick= { () => selectFile.current.click() }
                                            >
                                                <input
                                                    hidden
                                                    accept="image/*"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={ imageUpload }
                                                    ref={ selectFile }
                                                />
                                                <PhotoCamera />
                                            </IconButton>
                                        </div>
                                        <br />
                                        </td>
                                        </tr>

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
                                            />
                                            <span id='username' className='reg_msg'></span>
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
                                            />
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
                                            />
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
                                            />
                                            <button type='button' className='btn_frmline'>휴대폰 본인확인</button>
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
                                                placeholder='닉네임'
                                            />
                                            <span id='nickname' className='reg_msg'></span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <th scope='row'>
                                            <label htmlFor="phone" className='req'>
                                                🔸휴대전화
                                            </label>
                                        </th>
                                        <td>
                                            <div className='telselect_wrap' style={{ margin: 0, display: 'block' }}>
                                                <select className='reg_input' name='phone' id='hp1' required>
                                                    <option value='010'>010</option>
                                                    <option value='011'>011</option>
                                                    <option value='018'>010</option>
                                                </select>
                                                <b>-</b>
                                                <input type='tel' className='reg_input' required maxLength='4' id='hp2' name='phone' />
                                                <b>-</b>
                                                <input type='tel' className='reg_input' required maxLength='4' id='hp3' name='phone' />
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
                                            <div className='emailselect_wrap' style={{ margin: 0, position: 'relative' }}>
                                                <input
                                                    type='text'
                                                    className='reg_input'
                                                    name='email'
                                                    id='email'
                                                    maxLength='16'
                                                    required
                                                />
                                                <b>@</b>
                                                <input
                                                    type='text'
                                                    className='reg_input'
                                                    name='email'
                                                    id='email2'
                                                    maxLength='16'
                                                    required
                                                />
                                                <select className='reg_input' required name='email3' id='email3'>
                                                    <option value>선택하세요</option>
                                                    <option value='wirteMode'>직접입력</option>
                                                    <option value='naver.com'>naver.com</option>
                                                    <option value='gmail.com'>gmail.com</option>
                                                    <option value='daum.net'>daum.net</option>
                                                    <option value='hanmail.com'>hanmail.com</option>
                                                    <option value='hotmail.com'>hotmail.com</option>
                                                </select>
                                            </div>
                                            <span id='msg_mb_email' className='reg_msg nok'>E-mail 주소를 입력해 주십시오.</span>
                                        </td>
                                    </tr>

                                    <tr style={{ marginTop : '20px' }}>
                                        <th scope='row'>
                                            <label htmlFor='SEX'>🔸성별</label>
                                        </th>
                                        <td>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                style={{ marginTop : '50px' }}
                                            >
                                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                                            </RadioGroup>
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
                            <input type='submit' onClick={ signUpEvnt }
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