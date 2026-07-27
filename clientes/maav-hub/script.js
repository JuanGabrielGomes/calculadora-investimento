// ============================================================================
// CONFIGURAÇÃO DA CALCULADORA — MAAV HUB
// Só mexa aqui se souber exatamente o que está mudando: estes números
// controlam o resultado da simulação.
// ============================================================================
const CONFIG = {
  valorMinimo: 100000,
  valorMaximo: 3000000,
  passo: 100000,
  valorCreditoInicial: 100000,
  parcelaBase: 636.61, // parcela cheia para cada R$100.000 de crédito
  percentualParcelaReduzida: 0.70,
  percentualRendimentoMensal: 0.023, // renda passiva = crédito atualizado x 2,3%
  prazoMinimoMeses: 1,
  prazoMaximoMeses: 50,

  reajusteIncc: {
    percentual: 0.07, // 7% de reajuste por faixa de prazo
    faixas: [
      { de: 13, ate: 24, multiplicador: 1 },
      { de: 25, ate: 36, multiplicador: 2 },
      { de: 37, ate: 48, multiplicador: 3 },
      { de: 49, ate: 50, multiplicador: 4 },
    ],
  },

  whatsappNumero: "5544991580021", // DDI + DDD + número, só dígitos
  whatsappMensagem: "Olá, gostaria de fazer uma simulação de consórcio imobiliário",
};
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const creditInput = document.getElementById("credit-value");
  const parcelInitial = document.getElementById("parcel-initial");
  const updatedCredit = document.getElementById("updated-credit");
  const reducedParcel = document.getElementById("reduced-parcel");
  const fullParcel = document.getElementById("full-parcel");
  const yieldValue = document.getElementById("yield-value");
  const investmentValue = document.getElementById("investment-value");
  const investedValue = document.getElementById("invested-value");
  const paybackValue = document.getElementById("payback-value");
  const slider = document.getElementById("contemplation-period");
  const sliderValue = document.getElementById("slider-value");
  const youPaidDisplay = document.getElementById("you-paid");
  const tenantPaidDisplay = document.getElementById("tenant-paid");
  const inccValue = document.getElementById("incc-value");
  const increaseBtn = document.getElementById("increase-credit");
  const decreaseBtn = document.getElementById("decrease-credit");
  const ctaWhatsapp = document.getElementById("cta-whatsapp");

  let creditValue = CONFIG.valorCreditoInicial;

  inccValue.textContent = `${Math.round(CONFIG.reajusteIncc.percentual * 100)}%`;
  ctaWhatsapp.href = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(CONFIG.whatsappMensagem)}`;
  slider.min = CONFIG.prazoMinimoMeses;
  slider.max = CONFIG.prazoMaximoMeses;

  function formatCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function calcularReajuste(valor, meses) {
    const faixa = CONFIG.reajusteIncc.faixas.find((f) => meses >= f.de && meses <= f.ate);
    if (!faixa) return valor;
    return valor + valor * CONFIG.reajusteIncc.percentual * faixa.multiplicador;
  }

  function atualizarBotoes() {
    decreaseBtn.disabled = creditValue - CONFIG.passo < CONFIG.valorMinimo;
    increaseBtn.disabled = creditValue + CONFIG.passo > CONFIG.valorMaximo;
  }

  function calcularPercentuais(valorInvestido, creditoAtualizado) {
    const vocePagou = creditoAtualizado > 0 ? valorInvestido / creditoAtualizado : 0;
    const inquilinoPagara = 1 - vocePagou;

    youPaidDisplay.textContent = isNaN(vocePagou) || vocePagou < 0 ? "0%" : `${(vocePagou * 100).toFixed(2)}%`;
    tenantPaidDisplay.textContent = isNaN(inquilinoPagara) || inquilinoPagara < 0 ? "0%" : `${(inquilinoPagara * 100).toFixed(2)}%`;
  }

  function calcularPayback(valorInvestido, rendaPassiva, meses) {
    if (meses === 1 || meses === 2) {
      paybackValue.textContent = "0 meses";
      return;
    }
    if (valorInvestido === 0 || rendaPassiva === 0) {
      paybackValue.textContent = "0 meses";
      return;
    }
    const payback = valorInvestido / rendaPassiva;
    paybackValue.textContent = isNaN(payback) || payback <= 0 ? "0 meses" : `${Math.round(payback)} meses`;
  }

  function atualizarValores() {
    const meses = parseInt(slider.value, 10);

    const creditoAtualizado = calcularReajuste(creditValue, meses);
    const parcelaCheia = (creditoAtualizado / 100000) * CONFIG.parcelaBase;
    const parcelaReduzida = parcelaCheia * CONFIG.percentualParcelaReduzida;
    const rendaPassiva = creditoAtualizado * CONFIG.percentualRendimentoMensal;
    const totalInvestido = parcelaReduzida * meses;

    updatedCredit.textContent = formatCurrency(creditoAtualizado);
    reducedParcel.textContent = formatCurrency(parcelaReduzida);
    fullParcel.textContent = formatCurrency(parcelaCheia);
    yieldValue.textContent = formatCurrency(rendaPassiva);
    parcelInitial.value = formatCurrency(parcelaReduzida);
    investmentValue.textContent = formatCurrency(totalInvestido);
    investedValue.textContent = formatCurrency(totalInvestido);
    creditInput.value = formatCurrency(creditValue);

    calcularPercentuais(totalInvestido, creditoAtualizado);
    calcularPayback(totalInvestido, rendaPassiva, meses);
    atualizarBotoes();
  }

  increaseBtn.addEventListener("click", () => {
    if (creditValue + CONFIG.passo <= CONFIG.valorMaximo) {
      creditValue += CONFIG.passo;
      atualizarValores();
    }
  });

  decreaseBtn.addEventListener("click", () => {
    if (creditValue - CONFIG.passo >= CONFIG.valorMinimo) {
      creditValue -= CONFIG.passo;
      atualizarValores();
    }
  });

  slider.addEventListener("input", () => {
    sliderValue.textContent = `${slider.value} meses`;
    atualizarValores();
  });

  slider.value = CONFIG.prazoMinimoMeses;
  sliderValue.textContent = `${CONFIG.prazoMinimoMeses} meses`;
  atualizarValores();
});
