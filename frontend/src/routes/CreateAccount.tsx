import { createAccount } from '../features/auth/AuthThunk'
import { Navigate, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useForm } from 'react-hook-form'
import type { AuthRequest } from '../types/auth'

function CreateAccount() {
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
        return <Navigate to="/" />
    }

    const onSubmit = (data: AuthRequest) => {
        dispatch(createAccount(data)).then((action) => {
            if (createAccount.fulfilled.match(action)) {
                navigate('/login')
            } else {
                setError('root', {
                    type: '400 Bad Request',
                    message: '400 Bad Request',
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
                    Register new account
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
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                {...register('password', {
                                    required: 'Password is required.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters long.',
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
                                        message:
                                            'Password must include uppercase, lowercase, number, and special character.',
                                    },
                                })}
                                type="password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default CreateAccount
