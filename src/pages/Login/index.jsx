import { memo, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Errors from '../../components/Errors';

import {useSelector,useDispatch} from 'react-redux';
import { loginFileUpdate, loginSubmit, deleteOne } from '../../store/moudle/loginSlice'
import users from '../../request/modules/user';


const Regist = memo(() => {

    // 获取切片
    let { email,password,errors } = useSelector((state) => {
        return state.login
    })

    // 分发 action
    const dispatch = useDispatch()

    // 跳转
    const nav = useNavigate()

    // 登录提交
    const loginOnSubmit = (e) => {
        e.preventDefault()
        users.login( email, password )
            .then(res => {
                if (res.status === 1) {
                    console.log('登陆成功', res.message);
                    nav('/home')
                } else {
                    console.log('登陆失败', res.message);
                    dispatch(loginSubmit(res.message))
                }
            })
            .catch(err => {
                console.log('登陆失败', err.message);
                dispatch(loginSubmit(res.message))
            })
    }

    // 重置表单
    useEffect(() => {
        return () => {
            dispatch(deleteOne())
        }
    },[])

    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h3 className='text-xs-center'>登录</h3>
                    <p className='text-xs-center'>
                        <Link to={"/regist"}>
                            没有账号去注册?
                        </Link>
                    </p>
                    <Errors errors={errors} />
                    <form onSubmit={loginOnSubmit}>
                        {/* 对表单进行分组 */}
                        <fieldset className='form-group'>
                            <input type="text"
                                placeholder='用户邮箱'
                                className='form-control'
                                value={email}
                                onChange={(e) => dispatch(loginFileUpdate({
                                    key: 'email',
                                    value: e.target.value
                                }))}
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type="password"
                                placeholder='用户密码'
                                className='form-control'
                                value={password}
                                onChange={(e) => dispatch(loginFileUpdate({
                                    key: 'password',
                                    value: e.target.value
                                }))}
                            />
                        </fieldset>
                        {/* type='submit' 可以触发表单提交 onSubmit */}
                        <p className='text-xs-center'>
                            <button type='submit' className='btn btn-success'>
                                登录
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Regist