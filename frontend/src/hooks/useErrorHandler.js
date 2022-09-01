import { useState } from 'react';

export const useErrorHandler = () => {
    const [errors, setErrors] = useState([]);

    const getError = (value, field) => errors.find((error) => error.name === value)?.[field] || undefined;

    const setError = ({ name, message, hasError }) => {
        setErrors((prevErrors) => {
            const newErrors = [...prevErrors];

            const index = newErrors.findIndex((error) => error.name === name);
            if (index === -1) {
                newErrors.push({
                    name,
                    message,
                    hasError,
                });
            } else {
                newErrors[index] = {
                    name,
                    message,
                    hasError,
                };
            }

            return newErrors;
        });
    };

    const clearError = (value) => {
        if (value === 'all') {
            setErrors([]);
        } else {
            setErrors((prevErrors) => {
                const newErrors = [...prevErrors];

                const index = newErrors.findIndex((error) => error.name === value);
                if (index !== -1) {
                    newErrors.splice(index, 1);
                }

                return newErrors;
            });
        }
    };

    return {
        getError,
        setError,
        clearError,
    };
};
