import * as yup from 'yup'

export const userSchema = yup.object().shape({
    name: yup.string().min(3).max(15)
})

export const emailSchema = yup.object().shape({
    email: yup.string().email()
})

export const phoneNumberSchema = yup.object().shape({
    phoneNumber: yup.string().min(7).max(18).matches(/^\d+$/, 'must be a number')
})

export const dateSchema = yup.object().shape({
    date: yup.date()
})