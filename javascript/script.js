// A. Seleção dos Elementos HTML
const passwordOutput = document.getElementById('password-output');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthIndicator = document.getElementById('strength-indicator');

// Elementos de configuração
const lengthInput = document.getElementById('length');
const upperCheckbox = document.getElementById('uppercase');
const lowerCheckbox = document.getElementById('lowercase');
const numberCheckbox = document.getElementById('numbers');
const symbolCheckbox = document.getElementById('symbols');


// B. O que é 'addEventListener'?
// É a forma moderna de dizer ao navegador: "Quando este elemento for clicado, execute esta função."
// Sintaxe: elemento.addEventListener('evento', nomeDaFunção);

generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
// Conecta a verificação de força a todos os inputs relevantes
lengthInput.addEventListener('input', checkPasswordStrength);
upperCheckbox.addEventListener('input', checkPasswordStrength);
lowerCheckbox.addEventListener('input', checkPasswordStrength);
numberCheckbox.addEventListener('input', checkPasswordStrength);
symbolCheckbox.addEventListener('input', checkPasswordStrength);


// C. Função Principal para Gerar a Senha
function generatePassword() {
    // 1. Pega as configurações atuais do usuário (dentro da função!)
    const length = parseInt(lengthInput.value); // Usa parseInt para garantir que é um número
    
    // As variáveis que armazenarão os caracteres disponíveis para sorteio
    let availableChars = '';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+=-{}[]:;"<>,.?/~`';
    
    // 2. LÓGICA DE CONSTRUÇÃO DE CARACTERES DISPONÍVEIS
    // Usamos o '.checked' para verificar se a caixa está marcada
    if (upperCheckbox.checked) {
        availableChars += upper;
    }
    if (lowerCheckbox.checked) {
        availableChars += lower;
    }
    if (numberCheckbox.checked) {
        availableChars += numbers
    }
    if (symbolCheckbox.checked) {
        availableChars += symbols
    }

    // 3. Verifica se alguma opção foi selecionada.
    if (availableChars.length === 0) {
        passwordOutput.value = "Selecione pelo menos um tipo de caractere!";
        return;
    }

    // 4. CHAME A FUNÇÃO FINAL DE GERAÇÃO AQUI (Seu próximo passo)
/*
 Constrói a senha final sorteando caracteres da lista de disponíveis.
 * @param {number} length - O comprimento desejado da senha.
 * @param {string} chars - A string contendo todos os caracteres permitidos.
 * @returns {string} A senha gerada.
*/
    const finalPassword = buildPassword(length, availableChars);
    passwordOutput.value = finalPassword; 

    function buildPassword(length, chars) {
        let password = '';
    
        // O Loop de Geração
        for (let i = 0; i < length; i++) {
            // Explicação da Mágica:
            // 1. Math.random() gera um número entre 0 (inclusivo) e 1 (exclusivo).
            // 2. Multiplicamos por chars.length (ex: 70) para ter um número entre 0 e 69.
            // 3. Math.floor() remove os decimais, resultando em um índice inteiro.
            const randomIndex = Math.floor(Math.random() * chars.length);
        
            // 4. Usamos o índice aleatório para pegar um caractere da string 'chars'.
            password += chars[randomIndex];
        }
    
    return password;
    }
    checkPasswordStrength()
}

// D. Função para Copiar a Senha (Usando JS moderno)
function copyPassword() {
    // Usamos a API moderna do navegador para copiar (mais limpo que os métodos antigos)
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value)
            .then(() => {
                alert('Senha copiada para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar: ', err);
            });
    }
}

checkPasswordStrength()

function checkPasswordStrength() {
    let score = 0;
    let strengthText = 'Muito Fraca';
    let indicatorColor = 'red'; // Cor padrão

    // 1. Contagem de pontos por critério (você pode ajustar os valores)
    if (lengthInput.value >= 8) {
        score += 10; // Mais pontos para senhas de bom comprimento
    }
    if (upperCheckbox.checked) {
        score += 15;
    }
    if (lowerCheckbox.checked) {
        score += 15;
    }
    if (numberCheckbox.checked) {
        score += 20;
    }
    if (symbolCheckbox.checked) {
        score += 30; // Mais pontos para símbolos, que aumentam a complexidade
    }

    // 2. Definir o nível de força e a cor
    if (score >= 80) {
        strengthText = 'Forte';
        indicatorColor = 'green';
    } else if (score >= 50) {
        strengthText = 'Média';
        indicatorColor = 'yellow';
    } else if (score > 0) {
        strengthText = 'Fraca';
        indicatorColor = 'orange';
    } else {
        // Se score for 0 (nenhuma opção marcada)
        strengthText = 'Muito Fraca';
        indicatorColor = 'red';
    }

    // 3. Atualizar o DOM (HTML e CSS)
    strengthIndicator.textContent = `Força: ${strengthText}`;
    strengthIndicator.style.backgroundColor = indicatorColor;
    strengthIndicator.style.color = 'black'; // Para garantir boa visibilidade do texto
}