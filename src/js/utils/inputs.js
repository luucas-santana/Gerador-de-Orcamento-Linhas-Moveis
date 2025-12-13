import {formatarTelefone, formatarMoeda, formatarCnpj, formatarCpf, formatarCep} from "./formatador.js"


document.addEventListener('DOMContentLoaded', () => {
    const inputValor = document.querySelectorAll('.moedaInput');
    const inputTelefone = document.querySelectorAll('.numeroTelefone');
    const inputCep = document.querySelectorAll('.inputCep');
    const inputCnpj = document.querySelectorAll('.inputCnpj');
    const inputCpf = document.getElementById('cpf-form');

    inputTelefone.forEach(inputTelefone => {
        inputTelefone.addEventListener('input', function() {
            const valorFormatado = formatarTelefone(this.value);
            this.value = valorFormatado;
        });
    });
    
    inputValor.forEach(inputValor => {
        inputValor.addEventListener('input', function() {
            const valorFormatado = formatarMoeda(this.value);
            this.value = valorFormatado;
        });
    });
    
    inputCnpj.forEach(inputCnpj => {
        inputCnpj.addEventListener('input', function() {
            const valorFormatado = formatarCnpj(this.value);
            this.value = valorFormatado
        });
    });

    inputCep.forEach(inputCep => {
        inputCep.addEventListener('input', function() {
            const valorFormatado = formatarCep(this.value);
            this.value = valorFormatado
        })
    });

    inputCpf.addEventListener('input', function() {
        const valorFormatado = formatarCpf(this.value);
        this.value = valorFormatado
    });

});