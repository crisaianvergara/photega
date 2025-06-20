import { forgotPassword } from '../features/auth/AuthThunk'
import { useAppDispatch } from '../app/hook'
import { useForm } from 'react-hook-form'
import type { ForgotPasswordRequest } from '../types/auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

function ForgotPassword() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordRequest>()

    const onSubmit = (data: ForgotPasswordRequest) => {
        dispatch(forgotPassword(data)).then((action) => {
            if (forgotPassword.fulfilled.match(action)) {
                toast.success('Check your email for the password reset link.')
                navigate('/login')
            } else {
                toast.error('Failed to send reset token. Please try again.')
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
                    Reset your password
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
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Request Password Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ForgotPassword
