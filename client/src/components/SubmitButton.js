import React from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const data = experimental_useFormStatus();
    const disabled = data.pending;

    return (
        <input
            type="submit"
            disabled={disabled}
            className="button sign-in"
            value={data.pending ? "Loading..." : "Sign in"}
        />
    )
}

export default SubmitButton;