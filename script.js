document.addEventListener('DOMContentLoaded', () => {
    const btnAdd = document.getElementById('btn-adicionar');
    const corpoTabela = document.getElementById('corpo-tabela-linhas');
    const dadosDaTabela = [];
    const valorTotal = document.getElementById('valor-total');
    const botaoGerarPdf = document.getElementById('gerarPdf');
    const inputValor = document.getElementById('valor');
    const inputTelefone = document.getElementById('telefone');
    const inputWhatsapp = document.getElementById('whatsapp');
    const inputCnpj = document.getElementById('cnpj');

    function atualizarResumoProcessos() {
        const colunaDoProcesso = 2;
        const divResumo = document.getElementById('barraResumo');
        const contagem = { "Portabilidade": 0, "Linha Nova": 0, "Renovação": 0, "Transferência": 0 };
        const todasAsLinhas = corpoTabela.querySelectorAll('tr');

        todasAsLinhas.forEach(linha => {
            const celulaProcesso = linha.cells[colunaDoProcesso];
            if (celulaProcesso) {
                const tipoProcesso = celulaProcesso.textContent.trim();
                if (contagem.hasOwnProperty(tipoProcesso)) {
                    contagem[tipoProcesso]++;
                }
            }
        });

        let resumoPartes = [];
        const totalGeral = todasAsLinhas.length;
        for (const tipo in contagem) {
            const quantidade = contagem[tipo];
            if (quantidade > 0) {
                const quantidadeFormatada = String(quantidade).padStart(2, '0');
                resumoPartes.push(`${quantidadeFormatada} - ${tipo}`);
            }
        }
        let textoFinal = `Processos Totais: ${String(totalGeral).padStart(2, '0')}`;
        if (resumoPartes.length > 0) {
            textoFinal += ` (${resumoPartes.join(' | ')})`;
        }
        divResumo.textContent = textoFinal;
    }

    function formatarTelefone(e) {
        const input = e.target;
        let value = input.value.replace(/\D/g, '');
        let formattedValue = '';
        if (value.length > 0) {
            formattedValue = '(' + value.substring(0, 2);
        }
        if (value.length > 2) {
            formattedValue += ') ' + value.substring(2, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 11);
        }
        input.value = formattedValue;
    }


function gerarPdf() {
    const empresa = document.getElementById('empresa').value;
    const vendedor = document.getElementById('vendedor').value;
    const cnpj = document.getElementById('cnpj').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const email = document.getElementById('email').value;
    const ocultarValor = document.getElementById('ocultar-valor').checked;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    
    let yOffset = 15; 

doc.setFillColor(15, 118, 110); 
doc.rect(0, 0, pageWidth, 45, 'F'); 

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABcUAAAHiCAMAAAAeb1S6AAAC91BMVEUAAAD///////1rb2f8//v+/vs1iWH9/fn///qrrar8///+/f7///jq7tenqqX8/P2Mjon8//j6+/ekqJn///z39vSjpaL09fL8//SUlZHv7+qFiYL5+/WZtoX6/fj///6Wt4D6/fGwsq74+vTz9e/S1M/5+vr5//b3+O79//34//rv8eb4+Pf0+fPCw7/w8e7z//f///XY2tfy//L4+/TP0Mu9vrv///Lt7uj6/PbZ29fs7efr7ebHycXv//72+ff9//3U2dKls5KXt4/z//7w8+38/fuHmYn/+/v//u7z/ezz9PDm6OXe4Nro//3x+PD5/ev19vTt//fh5OCQr4r4//7+9vfo//Ph4+Dp7Oe8wLWrrp95iHfK6tvj//n9/+Xx9Of1/ebo6eTu8fDx8+vv8ePk6N7e5MzU1M/l5922t7Wbnpijqo66xKKawpuwt5no/eX2+PHy+uXb3Njq79LIzMGyt7KAmXcHilXg8eT4+9/n8NX9//319/Db39QHjV3q9fDg6NTa7c/o6uDY4cjp6+bR1M+5yMAEjlUHiFrGzsfM0bq1zrHl7M/L4MLU3cPI0bGQs6AbkVzb/O6938H+///r+u6HnoHs9dfU9eny8vDe6cW7vroLkUsGjlv////+/v7///3///7///v9///8//3+/vz//f/8//z9//79//v8//n9/fv///j7///9/Pn//f3+//n+//f///r9/v/7/vn5///7/f39/f36+/j5//v7//v9//X5+fr4+Pb8//j8//b3//38//v6//34//j6+/f///X6//n///f+//L7/f/19/X//Pn1//T0//v//Pv//vv7//r19/H2+/b9/P//+v/9+/z09PH5+vT6/P3w8e3+///1///6/fn6/fT///b6/+/2//vx8vH//P/6/+z3/+j3+/H+/+/4//X1/u///P39//z++vf6+/v1+fnw/vf6/fjr7+ru9vD+/fnz9Pz/9f7+8/Xt/u7+//vw+frw8ebx+uTm8t7/hTp0AAAAn3RSTlMA3d0K3d0K3d1q3d3dzWrdON3dat3dat3dOM043Wrd3Grdat3drd3d3d3dzd3dj93d3a3dza2P3d3Vv9fNj93d1a1qat3VzTjd3d3Nzb/d3d3V3cBq3d3d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'
doc.addImage(logoBase64, 'PNG', 10, 5, 50, 16); 
doc.setFontSize(10);
doc.setTextColor(255, 255, 255); 
doc.setFont("Jakarta", "normal");
doc.text("lorem ipsum", 10, 5 + 16 + 4);
yOffset += 10;
    
doc.setFontSize(10);
doc.setTextColor(255, 255, 255);
    
doc.setFont("JakartaBold", "bold");
doc.text("Proposta ACCelular - ACISC", pageWidth - 10, 10, { align: 'right' });
doc.setFontSize(8);
doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, pageWidth - 10, 17, { align: 'right' });

doc.setDrawColor(15, 118, 110);
doc.setLineWidth(0.8);
doc.setFillColor(255, 255, 255);
doc.roundedRect(10, yOffset + 6, 190, 40, 2, 2, 'FD')


doc.setFontSize(12);
doc.setFont("JakartaBold", "bold");
doc.setTextColor(15, 118, 110);
doc.text(`Empresa:`, 14, yOffset + 13);
yOffset += 6.5;

doc.setFillColor(226, 232, 240);
doc.roundedRect(13, yOffset + 8, 184, 7, 2, 2, 'F');
doc.setFont("Jakarta", "normal");
doc.setTextColor(75, 85, 99);
doc.text(`${empresa}`, 14, yOffset + 13);

yOffset += 11;

doc.setFontSize(12);
doc.setFont("JakartaBold", "bold");
doc.setTextColor(15, 118, 110);
doc.text(`CNPJ:`, 14, yOffset + 13);
yOffset += 6.5;

doc.setFillColor(226, 232, 240);
doc.roundedRect(13, yOffset + 8, 184, 7, 2, 2, 'F');
doc.setFont("Jakarta", "normal");
doc.setTextColor(75, 85, 99);
doc.text(`${cnpj}`, 14, yOffset + 13);

yOffset += 23;

const totalNumerico = dadosDaTabela.reduce((soma, item) => {
    return soma + (parseFloat(item.valor) || 0);
}, 0);
const totalFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalNumerico);

let headers;
let data;
let footer;

if (ocultarValor) {
    headers = [["Telefone", "Operadora", "Processo", "Dados"]];
    data = dadosDaTabela.map(item => {
        const telefoneParaPDF = (item.processo === 'Linha Nova' && !item.telefone) ? 'Número Novo' : item.telefone;
        return [
            telefoneParaPDF,
            item.operadora,
            item.processo,
            `${item.dados} GB`
        ];
    });

    footer = [
        [{ content: 'Total Geral:', colSpan: 3, styles: { halign: 'center' } }, totalFormatado]
    ];
} else {
    headers = [["Telefone", "Operadora", "Processo", "Dados", "Valor"]];
    data = dadosDaTabela.map(item => {
        const telefoneParaPDF = (item.processo === 'Linha Nova' && !item.telefone) ? 'Número Novo' : item.telefone;
        return [
            telefoneParaPDF,
            item.operadora,
            item.processo,
            `${item.dados} GB`,
            `R$ ${item.valor}`,
        ];
    });
    footer = [
        [{ content: 'Valor Total:', colSpan: 4, styles: { halign: 'center' } }, totalFormatado]
    ];
}

    doc.setFontSize(15);
    doc.setFillColor(15, 118, 110);
    doc.setTextColor(255, 255, 255);
    doc.setFont("JakartaBold", "bold");
    doc.roundedRect(
    (doc.internal.pageSize.getWidth() - (doc.getTextWidth(`Detalhes`) + 10)) / 2, 
    yOffset + 6,
    doc.getTextWidth(`Detalhes`) + 10,
    7, 
    2, 2, 'FD'
);

    doc.text(
        `Detalhes`, 
        doc.internal.pageSize.getWidth() / 2,
        yOffset + 11, 
        { align: 'center' }
    );

    yOffset += 15;

doc.autoTable({
    startY: yOffset,
    margin: {left: 10, right: 10},
    head: headers,
    body: data,
    foot: footer,
    theme: 'striped',
    styles: {
        font: 'Jakarta',
        fontStyle: 'normal',
        fontSize: 11,
        cellPadding: 2,
        valign: 'middle',
        halign: 'center',
        lineColor: [15, 118, 110],
        lineWidth: 0.1,
    },
    headStyles: {
        font: 'JakartaBold',
        fontStyle: 'bold',
        fillColor: [15, 118, 110],
        textColor: [255, 255, 255],
        lineColor: [15, 118, 110],
        lineWidth: 0.1,
    },
    footStyles: {
        font: 'JakartaBold',
        fontStyle: 'bold',
        fillColor: [255, 255, 255],
        textColor: [75, 85, 99],
        lineColor: [15, 118, 110],
        lineWidth: 0.1,
    },

    didDrawPage: function (data) {
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.setFillColor(15, 118, 110);
        doc.rect(0, pageHeight - 14, pageWidth, 15, 'F');

        doc.setFontSize(7);
        doc.setTextColor(168, 205, 202);
        
        doc.text(
            [
                'Associação Comercial e Industrial de São Carlos - ACISC',
                'Rua General Osório, 401 | São Carlos - SP',
                '(16) 3362-1900 | (16) 99798-9540',
                'www.acisc.com.br'
            ],
            pageWidth / 2,
            pageHeight - 10,
            { align: 'center' }
        );

        const pageStr = `Página ${data.pageNumber}`;
        doc.text(pageStr, pageWidth - 15, pageHeight - 6, { align: 'right' });
    }

});

const finalYdaTabela = doc.lastAutoTable.finalY;

if (finalYdaTabela + 30 > doc.internal.pageSize.getHeight() - 20) {
    doc.addPage();

    doc.setFontSize(12);
    doc.setFillColor(15, 118, 110);
    doc.setTextColor(255, 255, 255);
    doc.setFont("JakartaBold", "bold");
    doc.roundedRect(10, 20, doc.getTextWidth(vendedor) + 6, 7, 2, 2, 'FD');
    doc.text(vendedor, 12, 25); 

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    doc.setFont("Jakarta", "normal");
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(10, 28, doc.getTextWidth(`WhatsApp: ${whatsapp}`) + 6, 7, 2, 2, 'F'); 
    doc.text(`WhatsApp: ${whatsapp}`, 13, 32); 

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    doc.setFont("Jakarta", "normal");
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(10, 36, doc.getTextWidth(`E-mail: ${email}`) + 6, 7, 2, 2, 'F');
    doc.text(`E-mail: ${email}`, 13, 41);
} else {
    doc.setFontSize(12);
    doc.setFillColor(15, 118, 110);
    doc.setTextColor(255, 255, 255);
    doc.setFont("JakartaBold", "bold");
    doc.roundedRect(10, finalYdaTabela + 10, doc.getTextWidth(vendedor) + 6, 7, 2, 2, 'FD');
    doc.text(vendedor, 12, finalYdaTabela + 15);

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    doc.setFont("Jakarta", "normal");
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(10, finalYdaTabela + 18, doc.getTextWidth(`WhatsApp: ${whatsapp}`) + 6, 7, 2, 2, 'F'); 
    doc.text(`WhatsApp: ${whatsapp}`, 12, finalYdaTabela + 23);

    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    doc.setFont("Jakarta", "normal");
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(10, finalYdaTabela + 26, doc.getTextWidth(`E-mail: ${email}`) + 6, 7, 2, 2, 'F'); 
    doc.text(`E-mail: ${email}`, 12, finalYdaTabela + 31);
}

doc.save(`Proposta-${document.getElementById('empresa').value.replace(/[\/\\?%*:|"<> ]/g, '_')}.pdf`);
};
 
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            const telefone = document.getElementById('telefone').value;
            const operadora = document.getElementById('operadora').value;
            const processo = document.getElementById('processo').value;
            const dados = document.getElementById('dados').value;
            const valor = document.getElementById('valor').value;

            if (!operadora || !processo || !valor || !dados) {
                alert('Por favor, preencha todos os campos');
                return;
            }

            let valorFormatado = valor.replace('R$', '').replace(/\./g, '').trim();
            valorFormatado = valorFormatado.replace(',', '.');
            const valorNumerico = parseFloat(valorFormatado) || 0;

            document.getElementById('telefone').value = '';
            let corOperadora = '';
            if (operadora === 'VIVO') {
                corOperadora = 'style="background-color: #9333EA; border-radius: 24px; color: #fff; padding: 2px 4px;"';
            } else if (operadora === 'CLARO') {
                corOperadora = 'style="background-color: #DC2626; border-radius: 24px; color: #fff; padding: 2px 4px;"';
            }

            let numeroTelefone = document.getElementById('telefone');
            if (processo === 'Linha Nova' && telefone === '') {
                numeroTelefone = 'Número Novo';
            } else {
                const aviso = document.getElementById('avisoTelefone');
                const telefoneLimpo = telefone.replace(/\D/g, '');
                if (telefoneLimpo.length < 10) {
                    aviso.textContent = 'Verifique o Número.';
                    aviso.style.display = 'block';
                    return;
                }
                aviso.textContent = '';
                aviso.style.display = 'none';
                numeroTelefone = telefone;
            }

            dadosDaTabela.push({ telefone, operadora, processo, dados, valor:valorNumerico });

            const atualizarTotal = () => {
                let total = 0;
                const celulasValor = corpoTabela.querySelectorAll('tr td:nth-child(5)');
                celulasValor.forEach(celula => {
                    let valorString = celula.textContent;
                    valorString = valorString.replace('R$', '').replace(/\./g, '').trim();
                    valorString = valorString.replace(',', '.');
                    const valorNumerico = parseFloat(valorString);
                    if (!isNaN(valorNumerico)) {
                        total += valorNumerico;
                    }
                });
                atualizarResumoProcessos();
                valorTotal.textContent = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(total);
            };

            const novaLinhaHTML = `
                <tr>
                    <td style="font-weight: 500; border: 1px solid #000; color: #4B5563; padding: 8px;">${numeroTelefone}</td>
                    <td style="font-weight: 500; border: 1px solid #000; color: #4b5563; padding: 8px 20px;"><p ${corOperadora}>${operadora}</p></td>
                    <td style="font-weight: 500; border: 1px solid #000; color: #4b5563; padding: 8px;">${processo}</td>
                    <td style="font-weight: 500; border: 1px solid #000; color: #4b5563; padding: 8px;">${dados} GB</td>
                    <td style="font-weight: 500; border: 1px solid #000; color: #4b5563; padding: 8px;">${valor}</td>
                    <td class="td-apagar" style="font-weight: 500; border: 1px solid #000; color: #DC2626; padding: 8px;">
                        <button class="remover-linha">Apagar</button>
                    </td>
                </tr>
            `;
            corpoTabela.insertAdjacentHTML('beforeend', novaLinhaHTML);
            
            const novoBotao = corpoTabela.lastElementChild.querySelector('button');
            novoBotao.addEventListener('click', (event) => {
                  const linhaRemover = event.target.closest('tr');
                    const linhas = Array.from(corpoTabela.children);
                    const index = linhas.indexOf(linhaRemover);
                    if (index > -1) {
                        dadosDaTabela.splice(index, 1);
                    }
                    
                    linhaRemover.remove();
            });
            atualizarTotal();
            atualizarResumoProcessos();
        });
    }

botaoGerarPdf.addEventListener('click', gerarPdf);
    
const inputsTelefone = [inputTelefone, inputWhatsapp];
inputsTelefone.forEach(input => {
    if (input) {
        input.addEventListener('input', formatarTelefone);
    }
});

    if (inputValor) {
        inputValor.addEventListener('input', function() {
            let valor = this.value;
            valor = valor.replace(/\D/g, '');
            if (valor === '') {
                this.value = '';
                return;
            }
            valor = Number(valor) / 100;
            const limite = 100000;
            if (valor > limite) {
                valor = limite;
            }
            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(valor);
            this.value = valorFormatado;
        });
    }
    if (inputCnpj) {
        inputCnpj.addEventListener('input', function(e) {
            let value = e.target.value;
            value = value.replace(/\D/g, '');
            value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    const checkboxOcultarValor = document.getElementById('ocultar-valor');
    const iconeToggleValor = document.getElementById('toggle-valor-icon');

    iconeToggleValor.addEventListener('click', () => {
    checkboxOcultarValor.checked = !checkboxOcultarValor.checked;
    
    if (checkboxOcultarValor.checked) {
        iconeToggleValor.classList.remove('fa-eye');
        iconeToggleValor.classList.add('fa-eye-slash');
        iconeToggleValor.title = 'Colunas ocultas no PDF';
    } else {
        iconeToggleValor.classList.remove('fa-eye-slash');
        iconeToggleValor.classList.add('fa-eye');
        iconeToggleValor.title = 'Colunas visíveis no PDF';
    }
});


});