/**
 * @param {string} valor
 * @returns {string}
 */
export function stringValor(valor) {
    if (typeof valor !== 'string') return '';
    return valor.replace(/\D/g, '');
}


/** FORMATADOR VALORES/MOEDA
 *   @param {number|string} valor
 *   @return {string}
 */
export function formatarMoeda(valor) {
let digitos = stringValor(String(valor));

    if (digitos === '') {
        return '';
    }

    let numero = Number(digitos) / 100;
    
    const limite = 1000;
    if (numero > limite) {
        numero = limite;
    }

    const moedaFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numero);    
    return moedaFormatado;
}

/** FORMATADOR CNPJ
 *   @param {number|string} valor
 *   @return {string}
 */
export function formatarCnpj(valor) {
    if (!valor) return '';
    let digitos = String(valor).replace(/\D/g, '').slice(0, 14);

    if (digitos.length === 0) return '';

    let formatado = digitos;

    if (digitos.length > 2) {
        formatado = digitos.replace(/^(\d{2})(\d)/, '$1.$2');
    }
    if (digitos.length > 5) {
        formatado = formatado.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    }
    if (digitos.length > 8) {
        formatado = formatado.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
    }
    if (digitos.length > 12) {
        formatado = formatado.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    return formatado;
}

/** FORMATADOR TELEFONE
 * @param {number|string} valor
 * @return {string}
 */
export function formatarTelefone(valor){
    let digitos = stringValor(String(valor)).slice(0, 11);

    if (digitos.length === 0) {
        return '';
    }
    let formatado = '(' + digitos.substring(0, 2);

    if (digitos.length > 2) {
        formatado += ') ';
        
        if (digitos.length >= 7) { 
            formatado += digitos.substring(2, 7); 
            
            if (digitos.length > 7) {
                formatado += '-' + digitos.substring(7, 11);
            }
        }

        else { 
            formatado += digitos.substring(2, 6);
        }
    }

    return formatado;
}

/** FORMATADOR CEP
 * @param {number|string} valor
 * @return {string}
 */
export function formatarCep(valor) {
    let digitos = stringValor(String(valor)).slice(0, 8);
    
    if (digitos.length === 0) {
        return '';
    }

    if (digitos.length > 5) {
        return digitos.replace(/^(\d{5})(\d+)/, '$1-$2');
    }
    return digitos;
}

/**
 * @param {number|string} valor
 * @return {string}
 */
export function formatarCpf(valor) {
    let valorFormatado = String(valor).replace(/\D/g, '');
    valorFormatado = valorFormatado.substring(0, 11);
    valorFormatado = valorFormatado.replace(/^(\d{3})(\d)/, '$1.$2');
    valorFormatado = valorFormatado.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    valorFormatado = valorFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    return valorFormatado;
}