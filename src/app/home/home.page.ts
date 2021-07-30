import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  dataTeste = '2021-07-15t00000000';
  coordenada;
  show = false;
  dataIniSem1 = '';
  dataFimSem1 = '';
  dataFimSem2 = '';
  data6meses = '';
  data1Meses = '';
  data = new Date();
  dataHoje = new Date();
  maioresDados = {
    numMortes: 0,
    numCasos:0,
    dataMortes: '',
    dataCasos: '',
    dataConsulta: '',
    localConsulta: '',
  }
  dataAtual = this.data.getFullYear() + '-' + this.zeroFill(this.data.getMonth() + 1) + '-' + this.zeroFill(this.data.getDate());
  data6Mes = new Date();
  data1mes = new Date();
  data1sem = new Date();
  data2sem = new Date();
  dados1mes = [];
  deaths1mes = [];
  mediaMovel = 0;
  mediaMovel2 = 0;
  mortesTotais = 0;
  mortesTotais2 = 0;
  mortesDiarias = 0;
  mortesDiarias2 = 0;
  dadosMortesSem1 = [];
  dadosMortesSem2 = [];
  casosTotais = 0;
  totalDiario = 0;
  dados = [];
  
  constructor(private homeService: HomeService) { }

  listarDados(dados) {
    this.dados = dados;
    this.dados.forEach(dado => {
      dado.casos = dado.Cases;
      dado.data = dado.Date;
    });
    console.log(this.dados);
    this.contarCasos();

  }

  contarCasos() {
    for(let i = 0; i < this.dados.length - 1; i++) {
      this.totalDiario = this.dados[i+1].casos - this.dados[i].casos;

      this.casosTotais = this.casosTotais + this.totalDiario;
    }
    console.log(this.casosTotais);
  }
  contarMortes() {
    for(let i = 0; i < this.dadosMortesSem1.length - 1; i++) {
      this.mortesDiarias = this.dadosMortesSem1[i+1].Cases - this.dadosMortesSem1[i].Cases;

      this.dadosMortesSem1[i].mortesDiarias = this.mortesDiarias;
      console.log(this.mortesTotais);
      this.mortesTotais = this.mortesTotais + this.mortesDiarias;
      this.dadosMortesSem1[i].Date = this.dadosMortesSem1[i].Date.substring(0, 10);
      this.dadosMortesSem1[i].Date = moment(this.dadosMortesSem1[i].Date).format('DD/MM/YYYY') 
      this.mediaMovel = this.mortesTotais/7;
    }
    console.log(this.mortesTotais);
    console.log(this.mediaMovel);
    console.log(this.dadosMortesSem1);
  }

  contarMortes2() {
    for(let j = 0; j < this.dadosMortesSem2.length - 1; j++) {
      this.mortesDiarias2 = this.dadosMortesSem2[j+1].Cases - this.dadosMortesSem2[j].Cases;

      this.dadosMortesSem2[j].mortesDiarias = this.mortesDiarias2;
      console.log(this.mortesTotais2);
      this.mortesTotais2 = this.mortesTotais2 + this.mortesDiarias2;
      this.dadosMortesSem2[j].Date = this.dadosMortesSem2[j].Date.substring(0, 10);
      this.dadosMortesSem2[j].Date = moment(this.dadosMortesSem2[j].Date).format('DD/MM/YYYY');
      this.mediaMovel2 = this.mortesTotais2/7;
    }
    console.log(this.mortesTotais2);
    console.log(this.mediaMovel2);
    console.log(this.dadosMortesSem2);
  }
  listarMortes(deaths) {
    this.dadosMortesSem1 = deaths;
    this.dadosMortesSem1.forEach(dado => {
      dado.mortesDiarias = dado.Cases
    });
    this.contarMortes();
  }

  listarMortes2(deaths) {
    this.dadosMortesSem2 = deaths;
    this.dadosMortesSem2.forEach(dado => {
      dado.mortesDiarias = dado.Cases
    });
    this.contarMortes2();
  }

  listarDados1mes(dados) {
    this.dados1mes = dados;

    this.dados1mes.forEach(dado => {
      dado.casosDiarios = dado.Cases;
    });
    console.log(this.dados1mes);
    this.contarCasos1Mes();
  }

  contarCasos1Mes() {
    for(let i = 0; i < this.dados1mes.length - 1; i++) {
      this.totalDiario = this.dados1mes[i+1].Cases - this.dados1mes[i].Cases;

      this.dados1mes[i].casosDiarios = this.totalDiario;
    }
    this.dados1mes.sort(function(a, b) {
      if (a.casosDiarios > b.casosDiarios) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(this.dados1mes);
    this.maioresDados.dataCasos = this.dados1mes[1].Date;
    this.maioresDados.dataCasos = this.maioresDados.dataCasos.substring(0,10);
    this.maioresDados.dataCasos = moment(this.maioresDados.dataCasos).format('DD/MM/YYYY');
    this.maioresDados.numCasos = this.dados1mes[1].casosDiarios;
    this.maioresDados.dataConsulta = this.dataHoje.getDate() + '/' + this.zeroFill((this.dataHoje.getMonth() + 1)) + '/' + this.dataHoje.getFullYear() + ' - ' + this.zeroFill(this.dataHoje.getHours()) +':'+ this.zeroFill(this.dataHoje.getMinutes());
    console.log(this.maioresDados.dataConsulta)
  }

  listarMortes1Mes(deaths) {
    this.deaths1mes = deaths;

    this.deaths1mes.forEach(dado => {
      dado.mortesDiarias = dado.Cases;
    }); 
    this.contarMortes1mes();
  }

  contarMortes1mes() {
    for(let i = 0; i < this.deaths1mes.length - 1; i++) {
      this.totalDiario = this.deaths1mes[i+1].Cases - this.deaths1mes[i].Cases;

      this.deaths1mes[i].mortesDiarias = this.totalDiario;
    }
    this.deaths1mes.sort(function(a, b) {
      if (a.mortesDiarias > b.mortesDiarias) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(this.deaths1mes);

    this.maioresDados.dataMortes = this.deaths1mes[1].Date;
    this.maioresDados.dataMortes = this.maioresDados.dataMortes.substring(0,10);
    this.maioresDados.dataMortes = moment(this.maioresDados.dataMortes).format('DD/MM/YYYY');
    this.maioresDados.numMortes = this.deaths1mes[1].mortesDiarias;
  }

  formatarData() {
    const dia = this.zeroFill(this.data.getDate());
    const mes = this.zeroFill(this.data.getMonth() + 1);
    const ano = this.data.getFullYear();
    this.data.setDate(this.data.getDate() - 1);
    return ano + '-' + mes + '-' + dia + 'T00:00:00Z';
  }

  formatarData1Sem() {
    this.data1sem.setDate(this.data1sem.getDate() - 8);
    const dia = this.zeroFill(this.data1sem.getDate());
    const mes = this.zeroFill(this.data1sem.getMonth() + 1);
    const ano = this.data1sem.getFullYear();
    
    return ano + '-' + mes + '-' + dia + 'T00:00:00Z';
  }

  formatarData2Sem() {
    this.data2sem.setDate(this.data2sem.getDate() - 15);
    const dia = this.zeroFill(this.data2sem.getDate());
    const mes = this.zeroFill(this.data2sem.getMonth() + 1);
    const ano = this.data2sem.getFullYear();
    
    return ano + '-' + mes + '-' + dia + 'T00:00:00Z';
  }

  formatarData1Mes() {
    const dia = this.zeroFill(this.data1mes.getDate());
    const mes = this.zeroFill(this.data1mes.getMonth() + 1);
    const ano = this.data1mes.getFullYear();
    this.data1mes.setMonth(this.data1mes.getMonth() - 1)
    this.data1mes.setDate(this.data1mes.getDate() - 1)
    return ano + '-' + mes + '-' + dia + 'T00:00:00Z';
  }


  formatarData6Meses() {
    const dia = this.zeroFill(this.data6Mes.getDate());
    const mes = this.zeroFill(this.data6Mes.getMonth() + 1);
    const ano = this.data6Mes.getFullYear();
    this.data6Mes.setMonth(this.data6Mes.getMonth() - 6)
    return ano + '-' + mes + '-' + dia + 'T00:00:00Z';
  }

  getPosicao(posicao) {
    this.coordenada = posicao;
    console.log(this.coordenada.coords.latitude);
  }

  zeroFill(numero) {
    if (numero.toString().length == 1) {
      return '0' + numero
    } else {
      return numero;
    }

  }

  ngOnInit() {
    
    console.log(this.formatarData6Meses());
    console.log(this.formatarData());
    console.log(this.formatarData1Mes());

    this.data6meses = this.formatarData6Meses();
    this.dataIniSem1 = this.formatarData2Sem();
    this.dataFimSem2 = this.formatarData();
    this.dataFimSem1 = this.formatarData1Sem();
    this.data1Meses = this.formatarData1Mes();
    console.log(this.dataIniSem1)

    navigator.geolocation.getCurrentPosition( pos => {
      this.getPosicao(pos);
    });

    console.log(this.dataTeste.substring(0, 10))

    this.homeService.getData(this.data6meses, this.dataFimSem2).subscribe( (dados: any) => this.listarDados(dados));

    this.homeService.getDeaths(this.dataIniSem1, this.dataFimSem1).subscribe( (deaths: any) => this.listarMortes(deaths));

    this.homeService.getDeaths(this.dataFimSem1, this.dataFimSem2).subscribe( (deaths: any) => this.listarMortes2(deaths));

    this.homeService.getData(this.data1Meses, this.dataFimSem2).subscribe((dados: any) => this.listarDados1mes(dados));

    this.homeService.getDeaths(this.data1Meses, this.dataFimSem2).subscribe((deaths: any) => this.listarMortes1Mes(deaths));
  }

}
