export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email) {
        return "O e-mail é obrigatório"
    }
    if(!emailRegex.test(email)) {
        return "Por favor, insira um e-mail válido."
    }
    return null;
}

export const validatePassword = (password: string): string | null => {
    if(!password) {
        return "A senha é obrigatória"
    }

    if(password.length < 6) {
        return " A senha deve ter pelo menos 6 caracteres"
    }
    return null;
}

export const validateConfirmPassword = (confirmPassword: string, password:string): string | null => {
    if (!confirmPassword) {
        return "A confirmação da senha é obrigatória"
    }
    if (confirmPassword !== password) {
        return "As senhas não conincidem."
    }
    return null;
}