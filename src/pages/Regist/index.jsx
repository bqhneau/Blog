import { memo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Errors from '../../components/Errors';
import { useSelector,useDispatch } from 'react-redux';
import { registFileUpdate, registSubmit,deleteOne } from '../../store/moudle/registSlice'
import user from '../../request/modules/user';

const Regist = memo(() => {
    // 读取切片
    let { email, username, password, errors } = useSelector((state) => {
        // state 为 仓库中 所有的 reducer
        return state.regist
    })

    // 分发 action
    const dispatch = useDispatch()

    // 重定向
    const nav = useNavigate()

    // 注册提交方法
    const registOnsubmit = (e) => {
        e.preventDefault()
        user.regist({ email, username, password })
            .then(res => {
                if (res.status == 1) {
                    console.log('注册成功', res);
                    nav('/login')
                } else {
                    console.log('注册失败', res.message);
                    dispatch(registSubmit(res.message))
                }
                
            })
            .catch(err => {
                console.log('服务器错误', err);
                dispatch(registSubmit(err.message))
            })
    }

    // 解决bug
    useEffect(() => {
        return () => {
            // 清空数据
            dispatch(deleteOne())
        }
    },[])
    return (
        <div className="container page">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                    <h3 className='text-xs-center'>注册</h3>
                    <p className='text-xs-center'>
                        <Link to={"/login"}>
                            有账号直接登录?
                        </Link>
                    </p>
                    <Errors errors={errors}/>
                    <form onSubmit={registOnsubmit}>
                        {/* 对表单进行分组 */}
                        <fieldset className='form-group'>
                            <input type="text"
                                value={email}
                                onChange={(e) => dispatch(registFileUpdate({
                                    key: 'email',
                                    value:e.target.value
                                }))}
                                placeholder='用户邮箱'
                                className='form-control'
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type="text"
                                value={username}
                                onChange={(e) => dispatch(registFileUpdate({
                                    key: 'username',
                                    value: e.target.value
                                }))}
                                placeholder='用户昵称'
                                className='form-control'
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type='password'
                                value={password}
                                onChange={(e) => dispatch(registFileUpdate({
                                    key: 'password',
                                    value: e.target.value
                                }))}
                                placeholder='用户密码'
                                className='form-control'
                            />
                        </fieldset>
                        {/* type='submit' 可以触发表单提交 onSubmit */}
                        <p className='text-xs-center'>
                            <button type='submit' className='btn btn-success'>
                                注册
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
})

export default Regist