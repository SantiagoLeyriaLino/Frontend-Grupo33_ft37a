import * as yup from 'yup'
import { setLocale } from 'yup';

setLocale({
    mixed: {
      required: 'review cannot be empty',
    },
    number: {
      min: 'choose a rating between 1 and 5'
    }
});

export const reviewSchema = yup.object().shape({
    review: yup.string().required(),
    rating: yup.number().min(1)
})