import { memo } from 'react'
import { Link } from 'react-router-dom';
import Errors from '../../components/Errors';

const errors = '网络错误'

const Regist = memo(() => {
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
                    <form>
                        {/* 对表单进行分组 */}
                        <fieldset className='form-group'>
                            <input type="text"
                                placeholder='用户邮箱'
                                className='form-control'
                            />
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type="text"
                                placeholder='用户密码'
                                className='form-control'
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