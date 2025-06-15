import { fetchCurrentUser, login } from '../features/auth/AuthThunk'
import { Link, Navigate, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useForm } from 'react-hook-form'
import type { AuthRequest } from '../types/auth'

function SignIn() {
    const auth = useAppSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<AuthRequest>()

    if (auth.user) {
        return <Navigate to="/" replace />
    }

    const onSubmit = (data: AuthRequest) => {
        dispatch(login(data)).then((action) => {
            if (login.fulfilled.match(action)) {
                localStorage.setItem('accessToken', action.payload.access_token)
                dispatch(fetchCurrentUser())
                navigate('/')
            } else {
                setError('root', {
                    type: '400 Bad Request',
                    message: 'Incorrect email address or password.',
                })
            }
        })
    }

    return (
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Photega"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                {...register('email', {
                                    required: 'Email address is required.',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email format.',
                                    },
                                })}
                                type="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...register('password', {
                                    required: 'Password is required.',
                                })}
                                type="password"
                                className="
                                block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-red-600 mb-2">
                            {errors.root?.message}
                        </p>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default SignIn
