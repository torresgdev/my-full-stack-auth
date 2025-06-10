import React, {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useForm from "../hooks/useForm";
import { validateEmail, validatePassword, validateConfirmPassword } from "../utils/validation";
import { registerUser } from "../api/auth";

interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}



const RegisterPage: React.FC = () => {
    const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);

    const navigate = useNavigate();

     const {
    values,        
    errors,        
    loading,       
    handleChange,  
    handleSubmit,  
  } = useForm<RegisterFormValues>(
    { email: '', password: '', confirmPassword: '' }, 
    {
      
      email: validateEmail, 
      password: validatePassword, 
      confirmPassword: (value: string, formValues: RegisterFormValues) =>
        validateConfirmPassword(value, formValues.password),
    }
  );

  const handleRegisterSubmit = async (data: RegisterFormValues) => {
    setSubmissionMessage(null)

     try {
        await registerUser(data.email, data.password)

        setSubmissionMessage('Cadastro realizado com sucesso! Você pode fazer login agora.')
        setIsSuccessMessage(true)
        console.log('Registro Bem-Sucedido: ', data.email);

        setTimeout(() => navigate('/login'), 1000)

  } catch (error) {
        let errorMessage = "Error ao registrar, Por favor, tente nomanve."
        if(error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error
        } else {
            console.error("Tipo de error inesperado: ", error)
        }
        setSubmissionMessage(errorMessage);
        setIsSuccessMessage(false)
        console.error("erro de registro no Backend: ", error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-pink-600 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Criar Nova Conta</h2>

            {submissionMessage && (
                <div className={`p-3 rounded-md mb-4 text-center ${isSuccessMessage ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submissionMessage}
                </div>
            )}

            <form onSubmit={handleSubmit(handleRegisterSubmit)} noValidate>
                <Input 
                    label="E-mail"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={values.email}
                    onChange={handleChange}
                    error = {errors.email}
                    disabled={loading} />

                <Input 
                    label="Senha"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mínimo de 6 caracteres"
                    value={values.password}
                    onChange={handleChange}
                    error= {errors.password}
                    disabled={loading} />

                <Input 
                    label="Confirmar Senha"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirme sua Senha"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error = {errors.confirmPassword}
                    disabled={loading} />

                <Button type="submit" isLoading={loading} className="mt-4 p-3 w-50 rounded-2xl bg-gradient-to-r from-blue-500 to-pink-500 hover:bg-gradient-to-l hover:from-pink-700 to-purple-500 transition-colors duration-100">
                        Registrar
                </Button>
            </form>

            <p className="text-center text-gray-600 text-sm mt-6">
                Já tem conta ?{''}
                <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                    Faça Login 
                </Link>
            </p>
        </div>
    </div>

    )
}

export default RegisterPage;