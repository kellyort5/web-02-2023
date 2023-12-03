import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/products")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">

            <div className='justify-center max-w-md rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-black" key={i}>
                            {error}
                        </div>
                    ))
                }

                <div className="text-2xl font-bold text-center">REGISTER</div>

                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', { required: true })}
                        className="w-full bg-transparent text-black border-2 border-blue-950 px-4 py-2 rounded-md my-2" placeholder='username' />
                    {errors.username && <p className='text-red-500'>Username is required</p>}

                    <input type="email" {...register('email', { required: true })}
                        className="w-full bg-transparent text-black border-2 border-blue-950 px-4 py-2 rounded-md my-2" placeholder='email' />
                    {errors.email && <p className='text-red-500'>Email is required</p>}


                    <input type="password" {...register('password', { required: true })}
                        className="w-full bg-transparent text-black border-2 border-blue-950 px-4 py-2 rounded-md my-2" placeholder='password' />
                    {errors.password && <p className='text-red-500'>Password is required</p>}



                    <button className="bg-indigo-500 px-3 py-2 rounded-md" type='submit'>
                        Register
                    </button>
                </form>

                <p className="flex gap-x-2 justify-between">
                    Already have an account? <Link to="/login" className="text-sky-500">Login</Link>
                </p>
            </div>

        </div>
    );
}

export default RegisterPage;