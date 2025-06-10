import { useState, useCallback } from "react";

type Validator<T> = (value: string, values: T) => string | null;

interface ValidationRules<T> {
    [key: string]: Validator<T>;
}

function useForm<T extends Record<string, any>>(
    initialValues: T,
    validationRules: ValidationRules<T>
) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<keyof T, string | null >>(() => {
        const initialErrors: Record<keyof T, string | null> = {} as Record<keyof T, string | null>
        for (const key in initialValues) {
      initialErrors[key] = null;
    }
    return initialErrors;
  });

  const [loading, setLoading] = useState<boolean>(false);

  const validateField = useCallback((fieldName: keyof T, value: string): string | null => {
    const validator = validationRules[fieldName as string];
    if (validator) {
        const error = validator(value, values);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
        return error;
    }
    return null;
  }, [validationRules, values]);

const validateForm = useCallback((): boolean => {
    let isValid = true;
    const newErrors: Record<keyof T, string | null> = {} as Record<keyof T, string | null>; 

    for (const fieldName in validationRules) {
        const value = values[fieldName];
        const error = validationRules[fieldName](value, values);
        if (error) {
            newErrors[fieldName as keyof T] = error;
            isValid = false;
        } else {
            newErrors[fieldName as keyof T] = null ;
        }
    }

    setErrors(newErrors);
    return isValid
}, [values, validationRules]);

const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value }= event.target;

    setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
    }));

    if (validationRules[name]) {
        validateField(name as keyof T, value);
    }

}, [validationRules, validateField]);


const handleSubmit = useCallback((onSubmit: (data: T) => Promise<void> | void) =>
    async (event: React.FormEvent) => {
        event.preventDefault();

        const formIsValid = validateForm();

        if (formIsValid) {
            setLoading(true);

            try {
                await onSubmit(values)
            } catch (err) {
                console.error("Error na submissao do formulário: ", err)
            } finally {
                setLoading(false);
            }
        } else {
            console.log("Formulário inválido: ", errors)
        }
    }, [values, errors, validateForm]);

    return {
        values,
        errors,
        loading,
        handleChange,
        validateField,
        handleSubmit,
    };

}

export default useForm;