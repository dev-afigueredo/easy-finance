const dataCorrent = () => {
  let data = new Date(),
    mes = (data.getMonth() + 1).toString().padStart(2, '0'),
    ano = data.getFullYear();
  // return mes + "/" + ano;
  return ano + "-" + mes;
}

const dataCorrentComplete = () => {
  let data = new Date(),
    dia = data.getDate(),
    mes = (data.getMonth() + 1).toString().padStart(2, '0'),
    ano = data.getFullYear();
  // return mes + "/" + ano;
  return `${ano}-${mes}-${dia}`;
}

const monthName = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const dataFormatterMonthYear = (data) => {
  let arrData = data.split('-');

  let stringFormatada = arrData[1] + '-01-' +
    arrData[0];
  let dataFormatada1 = new Date(stringFormatada);
  let finalDate = monthName[dataFormatada1.getMonth()] + " / " + dataFormatada1.getFullYear();
  return finalDate;
}

export { dataCorrent, dataFormatterMonthYear, dataCorrentComplete };