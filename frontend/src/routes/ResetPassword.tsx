import { resetPassword } from '../features/auth/AuthThunk'
import { useAppDispatch } from '../app/hook'
import { useForm } from 'react-hook-form'
import type { ResetPasswordRequest } from '../types/auth'
import toast from 'react-hot-toast'
import { useNavigate, useSearchParams } from 'react-router'

function ResetPassword() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordRequest>()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = (data: ResetPasswordRequest) => {
        data = { ...data, token: token }
        dispatch(resetPassword(data)).then((action) => {
            if (resetPassword.fulfilled.match(action)) {
                toast.success('Your password has been reset successfully.')
                navigate('/login')
            } else {
                toast.error('Reset password link expired or invalid.')
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
                    Changed your password
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="newPassword"
                                className="block text-sm/6 font-medium text-gray-900"
                            >
                                New password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="newPassword"
                                {...register('newPassword', {
                                    required: 'New password is required.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'New password must be at least 8 characters long.',
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
                                        message:
                                            'New password must include uppercase, lowercase, number, and special character.',
                                    },
                                })}
                                type="password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                            {errors.newPassword && (
                                <p className="text-sm text-red-600 mt-2">
                                    {errors.newPassword?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default ResetPassword
