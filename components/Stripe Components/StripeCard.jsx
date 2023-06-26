import { CardElement } from "@stripe/react-stripe-js"
import { AddressElement } from "@stripe/react-stripe-js"
import { LinkAuthenticationElement } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import { CardNumberElement } from "@stripe/react-stripe-js"
import { CardExpiryElement } from "@stripe/react-stripe-js"
import { CardCvcElement } from "@stripe/react-stripe-js"
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js"
import { AuBankAccountElement } from "@stripe/react-stripe-js"
import { FpxBankElement } from "@stripe/react-stripe-js"
import { AfterpayClearpayMessageElement } from "@stripe/react-stripe-js"

export default function StripeCard () {
    return (
        <>
            <CardElement/>
            <AddressElement options={{mode: "shipping"}}/>
            {/* <PaymentElement/> */}
        </>
    )
}