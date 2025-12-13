document.addEventListener('DOMContentLoaded', () => {
const btnForm = document.getElementById('btnPageForm');
const btnProposta = document.getElementById('btnPageProposta');
const pageForm = document.getElementById('page-form');
const pageProposta = document.getElementById('page-proposta');
const btnFormCancelamento = document.getElementById('btnFormCancelamento');
const btnFormInternacional = document.getElementById('btnFormInternacional');
const formInternacional = document.getElementById('infoInternacional');
const formCancelamento = document.getElementById('infoCancelamento');
const formDadosEmpresa = document.getElementById('mostrarForm');

function paginaForm() {
pageForm.classList.remove('hidden');
pageProposta.classList.add('hidden');

btnForm.classList.add('btnAtivo');
btnProposta.classList.remove('btnAtivo');
}

function paginaProposta() {
pageForm.classList.add('hidden');
pageProposta.classList.remove('hidden');

btnForm.classList.remove('btnAtivo');
btnProposta.classList.add('btnAtivo');
}

btnForm.addEventListener('click', paginaForm);
btnProposta.addEventListener('click', paginaProposta);


// seletorForm.addEventListener('input', () => {
//     mostrarForm.classList.remove('hidden');
//     const inputs = document.querySelectorAll('input, textarea');

    
//     if (seletorForm.value === 'internacional'){
//         infoInternacional.classList.remove('hidden');
//         infoCancelamento.classList.add('hidden');
//         console.log("internacional");
//     }
    
//     if(seletorForm.value === 'cancelamento'){
//         infoCancelamento.classList.remove('hidden');
//         infoInternacional.classList.add('hidden');
//         console.log("cancelamento");
//     }
    
//     inputs.forEach(input => {
//         input.value = '';
//     });

// });

function mostrarFormInternacional(){
    const inputs = document.querySelectorAll('input, textarea');
    formDadosEmpresa.classList.remove('hidden');
    formInternacional.classList.remove('hidden');
    formCancelamento.classList.add('hidden');
    
    btnFormInternacional.classList.add('btnAtivo');
    btnFormCancelamento.classList.remove('btnAtivo');

    inputs.forEach(input => {
        input.value = '';
    });
};
btnFormInternacional.addEventListener('click', mostrarFormInternacional)

function mostrarFormCancelamento(){
    const inputs = document.querySelectorAll('input, textarea');
    formDadosEmpresa.classList.remove('hidden');
    formCancelamento.classList.remove('hidden');
    formInternacional.classList.add('hidden');
    
    btnFormCancelamento.classList.add('btnAtivo');
    btnFormInternacional.classList.remove('btnAtivo');

    inputs.forEach(input => {
        input.value = '';
    });
};
btnFormCancelamento.addEventListener('click', mostrarFormCancelamento)

});