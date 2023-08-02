function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ').trim();
}

module.exports = (p) => {
  let thisString = p;
  /* Uniformize crossing to (X), add spaces around crossing */
  let regex = /\(X\)/giu;
  thisString = thisString.replace(regex, ' X ');
  regex = /Ant[e]?[s]?[\s]?[\(]?X[\)]?[^aiouâêîôûáéíóúàèìòùt]/giu;
  thisString = thisString.replace(regex, 'Antes do Cruzamento');
  regex = /[\(]?X[\)]?[\s]?Ant[e]?[s]?\s/giu;
  thisString = thisString.replace(regex, ' Cruzamento Antes ');
  regex = /[\s][\(]?X[\)]?[\s]*($|\))/giu;
  thisString = thisString.replace(regex, ' Cruzamento $1');
  regex = /(^|[\(])[\s]*[\(]?X[\)]?\s/giu;
  thisString = thisString.replace(regex, '$1 Cruzamento ');
  regex = /([gpsgqvzt])X/giu;
  thisString = thisString.replace(regex, '$1 X ');
  regex = /([^aEIBXN])X([^XTaeIO])/giu;
  thisString = thisString.replace(regex, '$1 X $2');
  regex = /([^aeiouãõâêîôûáéíóúàèìòùbxn\)\s])([\(]?X[\)]?)(?![aeiou])/giu;
  thisString = thisString.replace(regex, '$1 X ');
  regex = /([\(]?X[\)]?)([^xaieouãõâêîôûáéíóúàèìòùt\(\s)])/giu;
  thisString = thisString.replace(regex, ' X $2');
  regex = /([\(]?X[\)]?)(?=Estr)/giu;
  thisString = thisString.replace(regex, ' X ');
  regex = /([^aeioutfcsrpbndâêîôûáéíóúàèìòù\s])(R\s)/giu;
  thisString = thisString.replace(regex, '$1 R ');
  /* Add spaces around parenthesis */
  regex = /([^\s])\(([^X])/giu;
  thisString = thisString.replace(regex, '$1 ( $2');
  regex = /\(([^\sX])/giu;
  thisString = thisString.replace(regex, '( $1');
  regex = /([^\sX])\)/giu;
  thisString = thisString.replace(regex, '$1 )');
  regex = /([^X])\)([^\s])/giu;
  thisString = thisString.replace(regex, '$1 ) $2');
  /* Add spaces around numbers */
  regex = /(^|\()[\s]*N[ac\s]?((\d)+)([\s\-\(\)]|$)/giu;
  thisString = thisString.replace(regex, '$1Estrada Nacional $2 ');
  regex = /\bN([\d]{3})-(\d)\b/giu;
  thisString = thisString.replace(regex, ' Estrada Nacional $1 $2 ');
  regex = /(?!\sE)\sN[.\s]*[º]?[\s]?((\d)+[a-g]?)[\s]*([\(\)]?)$/giu;
  thisString = thisString.replace(regex, ' Número $1 $3');
  regex = /1[\.]?[º]?[\s]*(?=Mai|Dez)/giu;
  thisString = thisString.replace(regex, 'Primeiro de ');
  regex = /([^\s\d])(\d)/giu;
  thisString = thisString.replace(regex, '$1 $2');
  regex = /(\d)([^\s\dºª])/giu;
  thisString = thisString.replace(regex, '$1 $2');
  /* Add months of the year */
  regex = /\b(Jan[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Janeiro$2');
  regex = /\b(Fev[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Fevereiro$2');
  regex = /\b(Abr[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Abril$2');
  regex = /\b(Jun[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Junho$2');
  regex = /\b(Jul[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Julho$2');
  regex = /\b(Ago[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Agosto$2');
  regex = /\b(Set[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Setembro$2');
  regex = /\b(Out[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Outubro$2');
  regex = /\b(Nov[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Novembro$2');
  regex = /\b(Dez[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Dezembro$2');
  /* Resolve common street abbreviations */
  regex = /\b(Alm(ad)?[\.]?)\s(Neg[^\s]*)/giu;
  thisString = thisString.replace(regex, 'Almada Negreiros');
  regex = /\b(Al[m]?[\.]?)\s(Gag[^\s]*)/giu;
  thisString = thisString.replace(regex, 'Almirante Gago');
  regex = /\b(Al[m]?[\.]?)\s(Garr[^\s]*)/giu;
  thisString = thisString.replace(regex, 'Almeida Garret');
  regex = /\b(Al[m]?[\.]?)\s(Reis)/giu;
  thisString = thisString.replace(regex, 'Almirante Reis');
  regex = /(^|\s)(Al(am)?[\.]?[aª]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Alameda ');
  regex = /\b(Alm[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Almirante ');
  regex = /\bM\s+R\s+(?=Bastos)/giu;
  thisString = thisString.replace(regex, 'Major Rosa ');
  regex = /\b(B[oº][\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Bairro$2');
  regex = /(^|\(|\sX)[\s]?B[oº]?[\.]?(\s|$)/giu;
  thisString = thisString.replace(regex, '$1 Bairro$2');
  regex = /\b(P[r]?[cç][a]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Praça$2');
  regex = /\b(P[r]?[cç]t[a]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Praceta$2');
  regex = /\b(P[a]?[r]?[q](ue)?[\.]?)(\s)(Camp[^\s]*)\b/giu;
  thisString = thisString.replace(regex, 'Parque de Campismo');
  regex = /\b(P[a]?[r]?[q](ue)?[\.]?)(\s)(Inf[^\s]*)\b/giu;
  thisString = thisString.replace(regex, 'Parque Infantil');
  regex = /\b(P[a]?[r]?[q](ue)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Parque ');
  regex = /\b(P[a]?[r]?[q](ue)?[\.]?)(\s)(?=Est)/giu;
  thisString = thisString.replace(regex, 'Parque ');
  regex = /(?<=Parque)\s*Est[a]?[c]?[i]?[o]?[n]?[a]?[m]?[\.]?($|\s)/giu;
  thisString = thisString.replace(regex, ' de Estacionamento ');
  regex = /\b(C[m]?[p]?[\.]?[oº]?)(\s)(?=Fut|Bol)/giu;
  thisString = thisString.replace(regex, 'Campo$2');
  regex = /\b(Viad[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Viaduto$2');
  regex = /\b(Vdt[o]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Viaduto$2');
  regex = /\b(Aqued[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Aqueduto$2');
  regex = /\b(Ed(if)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Edifício ');
  regex = /\b(Imp[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Impasse ');
  regex = /\b(P[n]?t[e]?[\.]?)(\s)(?=V)/giu;
  thisString = thisString.replace(regex, 'Ponte$2');
  regex = /\b(P[n]?t[e]?[\.]?)(\s)(?=2)/giu;
  thisString = thisString.replace(regex, 'Ponte$2');
  regex = /\b(V[a]?[l][\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Vale$2');
  regex = /\b(Qt[aª]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Quinta$2');
  regex = /\b(R[o]?[t][\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Rotunda');
  regex = /\b(F[r]?t[e]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Frente');
  regex = /\b(T[r]?[a]?v[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Travessa');
  regex = /\b(Tr(?![êeoiu])[a]?[v]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Travessa');
  regex = /\b(Urb[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Urbanização');
  regex = /\b(V[i]?v[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Vivenda');
  regex = /\b(Herd[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Herdade');
  regex = /\b(L[r]?g[o]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Largo');
  regex = /\b(Lt[e]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Lote');
  regex = /\b(C[l]?ç[d]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Calçada');
  regex = /\b(Mt[e]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Monte');
  regex = /\b(Estr[\.]?)\sM[un]?(?=\d)/giu;
  thisString = thisString.replace(regex, 'Estrada Municipal ');
  regex = /\b(Estr[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Estrada ');
  regex = /\b(Est[\.]?)\s(?=Pris)/giu;
  thisString = thisString.replace(regex, 'Estabelecimento ');
  regex = /\b(Est(a[çc])?[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Estação ');
  regex = /\s(Rodov[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Rodoviária');
  regex = /\b(Rest[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Restaurante ');
  regex = /\b(Esp[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Espaço ');
  regex = /\b(E[\s]?N[ac]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Estrada Nacional ');
  regex = /\b([E][\s]?M[un]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Estrada Municipal ');
  regex = /\b((C|Ca|Cam|Caminho)?[\s]?M[un]?)\s+(?=\d{4})/giu;
  thisString = thisString.replace(regex, ' Caminho Municipal ');
  regex = /\b((E|Est|Estr|Estrada)?[\s]?M[un]?)\s+(?=\d{3})/giu;
  thisString = thisString.replace(regex, ' Estrada Municipal ');
  regex = /\s([A][\s]?E)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Auto-estrada ');
  regex = /\b(Km[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Quilómetro ');
  regex = /s\s(Mun(ici)?(p)?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 's Municipais');
  regex = /\sC[âa]m[\.]?\s(?=Mun)/giu;
  thisString = thisString.replace(regex, ' Câmara ');
  regex = /\b(C(al)?ç[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Calçada ');
  regex = /\s(Mun[i]?[c]?(?![í])[i]?(p)?[\.]?)\b/giu;
  thisString = thisString.replace(regex, ' Municipal');
  regex = /\b([C][a]?[m]?[\s]?M[u]?[n]?)[\s]*(?=[\d])/giu;
  thisString = thisString.replace(regex, 'Caminho Municipal ');
  regex = /\b([C][aâ]?[m]?[\s]?M[u]?[n]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Câmara Municipal ');
  regex = /\sM([\d]{3})\b/giu;
  thisString = thisString.replace(regex, ' Municipal $1');
  regex = /(\s|^)(F[aá]b[r]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Fábrica $3');
  regex = /\b(Qrt[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Quartel');
  regex = /\b(Ord[\.]?)(\s)*(?=Mil)/giu;
  thisString = thisString.replace(regex, 'Ordem ');
  regex = /\b(Milit[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Militar ');
  regex = /\b(Seg[\.]?)\s(?=Soc)/giu;
  thisString = thisString.replace(regex, 'Segurança ');
  regex = /\b(J(un)?[t]?[a]?[\.]?)\s(de\s)?(Freg(uesia)?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Junta de Freguesia ');
  regex = /\b(Ass[o]?[c]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Associação ');
  regex = /\s(Soc(ied)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Sociedade ');
  regex = /\b(Bomb[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Bombeiros$2');
  regex = /\b(Rec[r]?[e]?[a]?[t]?[i]?[v]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Recreativo ');
  regex = /\b(Volunt[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Voluntários$2');
  regex = /\b(Florest[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Florestal ');
  regex = /\s(Co[\s]?op[\.]?)\b/giu;
  thisString = thisString.replace(regex, ' Cooperativa');
  regex = /\b(E[s]?[c]?[\.]?[\s]?B[\.]?[\s]?)([\d]+)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Escola Básica $2 ');
  regex = /\b(E[s]?[c]?[\.]?[\s]?B[\.]?[\s]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Escola Básica ');
  regex = /\b(Esc[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Escola ');
  regex = /\b(Col[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Colégio ');
  regex = /\b(Cid[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Cidade ');
  regex = /(?<=Cidade)[\s]*(Univ(ers)?[\.]?)\s/giu;
  thisString = thisString.replace(regex, ' Universitária ');
  regex = /\b(Univ(ers)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Universidade ');
  regex = /\b(Hosp[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Hospital ');
  regex = /\b(B[áa][s][i]?[c]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Básica ');
  regex = /\b(Sec[u]?[n]?[d]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Secundária ');
  regex = /\s(C[\s]?[+][\s]?S)\b/giu;
  thisString = thisString.replace(regex, ' Básica e Secundária');
  regex = /\b2[\s]+3\s/giu;
  thisString = thisString.replace(regex, ' Segundo e Terceiro ');
  regex = /\b(C(e|en|ent|entr|entro)?[\.]?)([\s]?Com(?!uni)(er)?[c]?(ial)?)/giu;
  thisString = thisString.replace(regex, 'Centro Comercial');
  regex = /\b(C(a|as|asa)?[\.]?)\s*(?=Mis)/giu;
  thisString = thisString.replace(regex, 'Casa ');
  regex = /(?<=Casa)\s*Mis(er)?(ic)?([óo]r)?[d]?($|\s)/giu;
  thisString = thisString.replace(regex, ' Misericórdia ');
  regex = /\sC[\.]?\sC[\.]?[\s]+(?=\w)/giu;
  thisString = thisString.replace(regex, ' Centro Comercial ');
  regex = /\b(Z[o]?[n]?[a]?[\.]?)([\s]?Ind[úu]?[s]?[t]?[r]?[i]?[a]?[l]?)/giu;
  thisString = thisString.replace(regex, 'Zona Industrial');
  regex = /\sZ\s/giu;
  thisString = thisString.replace(regex, ' Zona ');
  regex = /\b(P[o]?[\.]?(s|st|sto)?[\.]?)([\s]?Abast[^\s]*)/giu;
  thisString = thisString.replace(regex, 'Posto de Abastecimento');
  regex = /\b(P[o]?[\.]?(s|st|sto)?[\.]?)\s(?=Comb)/giu;
  thisString = thisString.replace(regex, 'Posto de ');
  regex = /(?<=de)\sComb([uú]s)?[t]?([íi]v)?[\.]?(\s|$)/giu;
  thisString = thisString.replace(regex, ' Combustível ');
  regex = /\b(P[o]?[\.]?(s|st|sto)?[\.]?)([\s]?Comb([uú]st)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Posto de Combustível ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\sSa[úu][d]?[e]?)/giu;
  thisString = thisString.replace(regex, 'Centro de Saúde');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(?=Emprego)/giu;
  thisString = thisString.replace(regex, 'Centro de ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(?=Empres)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(?=Comun)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(de\s)?(?=Jard)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent)?[\.]?)(\s)(de\s)?(?=Ref)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(de\s)?(?=Paroq)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(de\s)?(?=Jog)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(?=Oncol)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(C(e|en|ent|tro)?[\.]?)(\s)(?=Acolh)/giu;
  thisString = thisString.replace(regex, 'Centro ');
  regex = /\b(Ctro[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Centro');
  regex = /\b(Comun[i]?[t]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Comunitário ');
  regex = /\b(C[\.]?)(\s)(?=Bra)/giu;
  thisString = thisString.replace(regex, 'Casa ');
  regex = /\bEmpres[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Empresarial');
  regex = /\bJardm\b/giu;
  thisString = thisString.replace(regex, 'Jardim');
  regex = /\bCtt\b/giu;
  thisString = thisString.replace(regex, 'Correios');
  regex = /\bCab\s+(?=Luz|Pt)/giu;
  thisString = thisString.replace(regex, 'Cabine ');
  regex = /\bGNR\b/giu;
  thisString = thisString.replace(regex, 'Guarda');
  regex = /\bPSP\b/giu;
  thisString = thisString.replace(regex, 'Polícia');
  regex = /\bFarm([aá]c)?[\.]?(\s|$)/giu;
  thisString = thisString.replace(regex, 'Farmácia ');
  regex = /\b(Ter[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Terminal ');
  regex = /\b(Merc[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Mercado ');
  regex = /\b(Superm(erc)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Supermercado ');
  regex = /\b(Paral[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Paralelo ');
  regex = /\b(Prin[c]?[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Principal ');
  /* Localities */
  regex = /\b(Alc[^âa](ch)?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Alcochete');
  regex = /\b(Alf[\.]?)\s(?=Din|Cun)/giu;
  thisString = thisString.replace(regex, 'Alfredo ');
  regex = /\b(Alf[^â](ag)?[\.]?)\s(?!Din|Cun)/giu;
  thisString = thisString.replace(regex, 'Alfragide ');
  regex = /\s(F[\.]?)\s(?=Fomento)/giu;
  thisString = thisString.replace(regex, ' Fundo ');
  regex = /\b(F[\.]?)\s(da\s)?(?=Telha)/giu;
  thisString = thisString.replace(regex, 'Fonte da ');
  regex = /\b(Almei[d]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, 'Almeida');
  regex = /\bP(in)?[\.]?\sFrad(es)?(\s|$)/giu;
  thisString = thisString.replace(regex, 'Pinhal de Frades ');
  regex = /\bP(in)?(hal)?[\.]?\sGen(er)?(al)?(\s|$)/giu;
  thisString = thisString.replace(regex, 'Pinhal do General ');
  regex = /\bP(in)?(hal)?[\.]?\sNov[o]?(\s|$)/giu;
  thisString = thisString.replace(regex, 'Pinhal Novo ');
  regex = /(\s|^)A[\.]?\sBonecos(\s|$)/giu;
  thisString = thisString.replace(regex, ' Alto dos Bonecos ');
  regex = /\bP[\.]?\s(?=Pires)/giu;
  thisString = thisString.replace(regex, ' Paio ');
  regex = /\bCs[l]?\b/giu;
  thisString = thisString.replace(regex, 'Casal');
  regex = /\b(C[\.\s]*)(?=Camb)/giu;
  thisString = thisString.replace(regex, 'Casal ');
  regex = /\b(G[\.\s]*)(?=Junq)/giu;
  thisString = thisString.replace(regex, 'Guerra ');
  regex = /\b(G[\.\s]*)(de[\s]*)?(?=Ort)/giu;
  thisString = thisString.replace(regex, 'Garcia de ');
  regex = /\b(Com[^\s]*[\s]Gr[^\s]*[\s]G[^\s]*)\b/giu;
  thisString = thisString.replace(regex, 'Combatentes da Grande Guerra');
  regex = /\b(Mov[^\s]*[\s]F[^\s]*[\s]Arm[^\s]*)\b/giu;
  thisString = thisString.replace(regex, 'Movimento das Forças Armadas');
  regex = /\bF[^\s]*[\s]+Arm[^\s]*\b/giu;
  thisString = thisString.replace(regex, 'Forças Armadas');
  regex = /\b(C[o]?v[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Cova ');
  regex = /\b(Oei[r]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Oeiras ');
  regex = /\b(Morad[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Moradores ');
  regex = /\b(Trab[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Trabalhadores ');
  regex = /\b(C[\.]?)\s(?=Pau)/giu;
  thisString = thisString.replace(regex, 'Cruz ');
  regex = /\b(A[l]?[d]?[\.]?)\s(?=Meco)/giu;
  thisString = thisString.replace(regex, 'Aldeia do ');
  regex = /\b(Ch(ar)?(neca)?[\.]?)(\sCap[a]?[r]?(ica)?[\.]?)/giu;
  thisString = thisString.replace(regex, 'Charneca de Caparica');
  regex = /\b(Ch(ar)?(neca)?[\.]?)(\sCot[o]?[v]?(ia)?[\.]?)/giu;
  thisString = thisString.replace(regex, 'Charneca da Cotovia');
  regex = /\b(C(osta)?[\.]?)(\sCap(arica)?[\.]?)/giu;
  thisString = thisString.replace(regex, 'Costa da Caparica');
  regex = /\b(M[o]?[n]?(te)?[\.]?)(\sCap(arica)?[\.]?)/giu;
  thisString = thisString.replace(regex, 'Monte de Caparica ');
  regex = /\b(J(o[ãa]o)?[\.]?)(\sCap(arica)?[\.]?)/giu;
  thisString = thisString.replace(regex, 'João da Caparica');
  regex = /\bV(ila)?[\.]?[\s]?F[r]?(esca)?[\.]?[\s]?Az(eit[ãa]o)?/giu;
  thisString = thisString.replace(regex, 'Vila Fresca de Azeitão');
  regex = /\bV(ila)?[\.]?[\s]?N[o]?[g]?(ueira)?[\.]?[\s]?Az(eit[ãa]o)?/giu;
  thisString = thisString.replace(regex, 'Vila Nogueira de Azeitão');
  regex = /\bB[r]?[e]?[j]?(os)?[\.]?[\s]?Az(eit[ãa]o)?/giu;
  thisString = thisString.replace(regex, 'Brejos de Azeitão');
  regex = /\bV[e]?nd(as)?[\.]?[\s]?Az(eit[ãa]o)?/giu;
  thisString = thisString.replace(regex, 'Vendas de Azeitão');
  regex = /\bF[e]?[r]?[n]?[\.]?[\s](?=Ferro)/giu;
  thisString = thisString.replace(regex, 'Fernão ');
  regex = /\bA[\.]?[\s]?Nec(ess)?(id)?\b/giu;
  thisString = thisString.replace(regex, 'Alto das Necessidades');
  regex = /\bM[\.]?[\s]?S(in)?tr[a]?\b/giu;
  thisString = thisString.replace(regex, 'Mira Sintra');
  regex = /\b(Dep([oó]|[oó]s|[oó]si|[oó]sit)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Depósito$3');
  regex = /\b(Av[e]?[n]?[\.]?[aª]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Avenida$2');
  regex = /(?<!Rua|Avenida|Alameda|Praceta|Travessa|Estrada)(\s|^)R[\.]?(\s)/iu;
  let regex2 = /(Rua|Avenida|Alameda|Praceta|Travessa|Estrada)[\s]+[^\s]+[\s]+R[\.]?\s/iu
  while (thisString.match(regex) && !thisString.match(regex2)){
    thisString = thisString.replace(regex, ' Rua$2');
  }
  regex = /\b(Desp[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Desportivo$2');
  regex = /(?<!C\s|Costa\s|Mte\s|Monte\s|Jo[ãa]o\s)\b(Cap[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Capitão ');
  regex = /\b(Inf[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Infante$2');
  regex = /\b(Mal[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Marechal$2');
  regex = /\b(Gen[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'General$2');
  regex = /\b(Cel[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Coronel$2');
  regex = /\b(Ten[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Tenente$2');
  regex = /\b(Sarg[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Sargento$2');
  regex = /\b(Brig[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Brigadeiro$2');
  regex = /\b(Dq[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Duque$2');
  regex = /\b(Con[s]?[\.]?)(\s)(?!Ext)/giu;
  thisString = thisString.replace(regex, 'Conselheiro ');
  regex = /\b(Corr[\.]?)(\s)(?!Ext)/giu;
  thisString = thisString.replace(regex, 'Corregedor ');
  regex = /\b(Consig[\.]?)\s(?=Pedr)/giu;
  thisString = thisString.replace(regex, 'Consiglieri ');
  regex = /\b(Mq[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Marquês$2');
  regex = /\b(C[o]?m[^\s]?[d]?[t][e]?[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Comandante ');
  regex = /\b(C[o]?m[^\s]?[d][t]?[e]?[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Comandante ');
  regex = /\b(Visc[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Visconde$2');
  regex = /\b(Poe[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, 'Poeta$2');
  regex = /\b(Esp([íi]r)?[\.]?)(\s)(?=S)/giu;
  thisString = thisString.replace(regex, 'Espírito ');
  regex = /\b(B(to)?[\.]?)(\s)(de\s)?(?=Jesus)/giu;
  thisString = thisString.replace(regex, 'Bento de ');
  regex = /\b(S(ou)?[s]?[\.]?)(\s)?(?=Mend)/giu;
  thisString = thisString.replace(regex, 'Sousa ');
  regex = /\b(R(a)?[úu]?[\.]?)(\s)?(?=Soln)/giu;
  thisString = thisString.replace(regex, 'Raúl ');
  regex = /\b(E[g]?[a]?[\.]?)(\s)+(?=Mon)/giu;
  thisString = thisString.replace(regex, 'Egas ');
  regex = /(?<=Egas\s)\s*\bM[o]?[n]?\s/giu;
  thisString = thisString.replace(regex, 'Moniz ');
  regex = /\b(C[a]?[l]?[\.]?)(\s)(?=Gulb)/giu;
  thisString = thisString.replace(regex, 'Calouste ');
  regex = /(?<=Calouste\s)\bG(ulb|ulbenk)?\b/giu;
  thisString = thisString.replace(regex, 'Gulbenkian');
  regex = /\b(B[o]?[r]?[d]?[\.]?)(\s)(?=Pin)/giu;
  thisString = thisString.replace(regex, 'Bordalo ');
  regex = /(?<=Bordalo)[\s]*P(in)?[h]?(ei)?[r]?[\.]?\b/giu;
  thisString = thisString.replace(regex, ' Pinheiro');
  regex = /(?<=Gago|Magalh[aã]es)[\s]*C(ou)?[t]?(inh)?[\.]?\b/giu;
  thisString = thisString.replace(regex, ' Coutinho');
  regex = /\bDps[\.]?(\s)/giu;
  thisString = thisString.replace(regex, 'Depois ');
  regex = /\bJto[\.]?(\s)/giu;
  thisString = thisString.replace(regex, 'Junto ');
  regex = /\bBx[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Baixo');
  regex = /\bCim[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Cima');
  regex = /(?<!Rua)(?<=[a-zA-Z])\sC\s*\(/giu;
  thisString = thisString.replace(regex, ' Cima (');
  regex = /\bAld[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Aldeia');
  regex = /\b(Az[i]?(nh)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Azinhaga ');
  regex = /\bCircunv[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Circunvalação');
  regex = /\bEstal[\.]?\b/giu;
  thisString = thisString.replace(regex, 'Estaleiro');
  /* Leave towards all unmatched lonely C */
  regex = /(^|\()[\s]?C[\.]?\s(?!C\s)/giu;
  thisString = thisString.replace(regex, '$1 Casal ');
  /* Resolve common name abbreviations to determine gramatical gender */
  regex = /\b(M[\.]?[ªa])(\s|$)/giu;
  thisString = thisString.replace(regex, 'Maria ');
  regex = /\b(M[\.]?)\s(?=Ana)/giu;
  thisString = thisString.replace(regex, 'Maria ');
  regex = /\b(Hel[ªa]?[\.]?[ªa]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Helena ');
  regex = /\b(Virg(in)?[ªa]?[\.]?[ªa]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Virgínia ');
  regex = /\b(Ant[oº]?[\.]?[oº]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'António ');
  regex = /\b(Ant[oº]?[\.]?[oº]?)$/giu;
  thisString = thisString.replace(regex, 'António ');
  regex = /\s([ÁA]lv[\.]?)\s(?=Per)/giu;
  thisString = thisString.replace(regex, ' Álvares ');
  regex = /\s([ÁA]lv[oº]?[\.]?[oº]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Álvaro ');
  regex = /\s(J[oº]?[\.]?[oº]?)(\s)(?=Ba[p]?t)/giu;
  thisString = thisString.replace(regex, ' João ');
  regex = /\s(J[\.]?)(\s)(?=Saram)/giu;
  thisString = thisString.replace(regex, ' José ');
  regex = /\b(Joaq[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Joaquim ');
  regex = /\b(Af[\.]?[oº]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Afonso ');
  regex = /\b(Alb[e]?[r]?[t]?[\.]?[oº]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Alberto ');
  regex = /\b(Albuq[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Albuquerque ');
  regex = /\b(Afonso\s)(Henr[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Afonso Henriques ');
  regex = /\s(H[\.]?)\s(?=Del)/giu;
  thisString = thisString.replace(regex, ' Humberto ');
  regex = /\b(Henr[i]?[q]?[\.]?)\s/giu;
  thisString = thisString.replace(regex, 'Henrique ');
  regex = /\b(Vic[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Vicente ');
  regex = /\b(Card[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Cardoso ');
  regex = /\b(Man[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Manuel ');
  regex = /\b(Isid[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Isidoro ');
  regex = /\b(Xa[v]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Xavier ');
  regex = /\b(Fran[c]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Francisco ');
  regex = /\b(Fred[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Frederico ');
  regex = /\b(Lourei[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Loureiro ');
  regex = /\b(Fer[n]?(an)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Fernando ');
  regex = /\b(Faust[i]?[n]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Faustino ');
  regex = /\b(Hum[b]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Humberto ');
  regex = /(?<=Humberto)\s(Del[g]?[\.]?)\b/giu;
  thisString = thisString.replace(regex, ' Delgado');
  regex = /\b(G[\.]?)(\s)(?=Humb)/giu;
  thisString = thisString.replace(regex, 'General ');
  regex = /\b(Alex[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Alexandre ');
  regex = /(?<=Alexandre)[\s]*(Hercul[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Herculano ');
  regex = /\s(Rob[e]?[r]?[t]?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Roberto ');
  regex = /\s(Seq[\.]?)\b/giu;
  thisString = thisString.replace(regex, ' Sequeira');
  regex = /(?<!M)\s(Gui(lh)?[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Guilherme ');
  regex = /\s(Gar[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Garcia ');
  regex = /\b(Bart[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Bartolomeu ');
  regex = /\b(Andr[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'André ');
  regex = /\b(Aug[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Augusto ');
  regex = /\b(Quir[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Quirino ');
  regex = /\b(Rod[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Rodrigo ');
  regex = /\b(Ferr[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Ferreira ');
  regex = /\b(Marq[\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, 'Marques ');
  /* Resolve Dona */
  regex = /\s(D[\.]?[ª]?[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Dona$2');
  regex = /\s(D[\.]?[ª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  let thisString2 = thisString.replace(regex, ' Dona$2');
  if (thisString2 === thisString) {
    regex = /\b(D[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, 'Dom$2');
  } else {
    thisString = thisString2;
  }
  /* Resolve N Sra */
  regex = /(\sN[\.]?[ª]?[\.]?)\s(Sr[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Nossa Senhora$3');
  regex = /(\sN[\.]?[ª]?[\.]?)\s(Sr[\.]?[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Nossa Senhora$3');
  regex = /(\sN[\.]?[ª]?[\.]?)\s(Sr[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Nossa Senhora$3');
  if (thisString2 === thisString) {
    regex = /(\sN[\.]?)\s(Sr[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Nosso Senhor$3');
  } else {
    thisString = thisString2;
  }
  /* Resolve Sra */
  regex = /(\s|^)(Sr[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Senhora ');
  regex = /(\s|^)(Sr[\.]?[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Senhora ');
  regex = /(\s|^)(Sr[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Senhora ');
  if (thisString2 === thisString) {
    regex = /(\s|^)(Sr[\.]?)\s(?=\w)/giu;
    thisString = thisString.replace(regex, ' Senhor ');
  } else {
    thisString = thisString2;
  }
  /* Resolve Prof Dr */
  regex = /\s(P[r]?[o]?[f]?[\.]?[\s]?D[r]?[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Professora Doutora$2');
  regex = /\s(P[r]?[o]?[f]?[\.]?[\s]?D[r]?[\.]?[aª][\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Professora Doutora$2');
  regex = /\s(P[r]?[o]?[f]?[\.]?[\s]?D[r]?[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Professora Doutora$2');
  if (thisString2 === thisString) {
    regex = /\s(P[r]?[o]?[f]?[\.]?[\s]?D[r]?[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Professor Doutor$2');
  } else {
    thisString = thisString2;
  }
  /* Resolve Prof */
  regex = /\s(Pr[o]?f[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Professora$2');
  regex = /\s(Pr[o]?f[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Professora$2');
  regex = /\s(Pr[o]?f[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Professora$2');
  if (thisString2 === thisString) {
    regex = /\s(Pr[o]?f[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Professor$2');
  } else {
    thisString = thisString2;
  }
  regex = /\s(Pr[\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Praça ');
  regex = /\s(P[r]?[\.]?)(\s)+(?=T[áa]x)/giu;
  thisString = thisString.replace(regex, ' Praça ');
  /* Resolve Eng */
  regex = /\s(Eng[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Engenheira$2');
  regex = /\s(Eng[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Engenheira$2');
  regex = /\s(Eng[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Engenheira$2');
  if (thisString2 === thisString) {
    regex = /\s(Eng[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Engenheiro$2');
  } else {
    thisString = thisString2;
  }
  /* Resolve Emb */
  regex = /\s(Emb[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Embaixadora ');
  regex = /\s(Emb[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Embaixadora$2');
  regex = /\s(Emb[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Embaixadora$2');
  if (thisString2 === thisString) {
    regex = /\s(Emb[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Embaixador$2');
  } else {
    thisString = thisString2;
  }  
  /* Resolve Dra */
  regex = /\s(Dr[\.]?[aª][\.]?)(\s)/giu;
  thisString = thisString.replace(regex, ' Doutora$2');
  regex = /\s(Dr[\.]?[aª]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Doutora$2');
  regex = /\s(Dr[\.]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Doutora$2');
  if (thisString2 === thisString) {
    regex = /\s(Dr[\.]?)(\s\w)/giu;
    thisString = thisString.replace(regex, ' Doutor$2');
  } else {
    thisString = thisString2;
  }
  /* Resolve Santa */
  regex = /((\s|^)S[\.]?[t]?[aª][\.]?)(\s|$)/giu;
  thisString = thisString.replace(regex, ' Santa$3');
  regex = /((\s|^)S[\.]?[t]?[aª]?[\.]?)(\s[^\s]*[a]\b)/giu;
  thisString = thisString.replace(regex, ' Santa$3');
  regex = /((\s|^)S[\.]?[t]?[aª]?[\.]?)(\s(Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes)\b)/giu;
  thisString2 = thisString.replace(regex, ' Santa$3');
  if (thisString2 === thisString) {
    /* Resolve São vs. Santo */
    regex = /(\s|^)(S[\.]?[t][\.]?[oº]?[\.]?)(\s)/giu;
    thisString = thisString.replace(regex, ' Santo ');
    regex = /(\s|^)(S[\.]?[t][\.]?[oº]?[\.]?[s][\.]?)(\s)/giu;
    thisString = thisString.replace(regex, ' Santos ');
    regex = /(\s|^)(S[\.]?[t]?[\.]?[oº]?[\.]?)[\s]+(?=[aeiou])/giu;
    thisString = thisString.replace(regex, ' Santo ');
    regex = /(\s|^)(S[\.]?)[\s]+(?=[^aeiou])/giu;
    thisString = thisString.replace(regex, ' São ');
  } else {
    thisString = thisString2;
  }
  /* Resolve Roman Ordinals I-IX*/
  /* Due to possible collisions with abbreviations of single letters I and V, */
  /* these have stricter criteria and will perform a bit worse to avoid collision */
  regex = /([^.]?\b)((XXI)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Vinte Um$4');
  regex = /([^.]?\b)((XX)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Vinte$4');
  regex = /([^.]?\b)((XII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Doze$4');
  regex = /([^.]?\b)((XIII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Treze$4');
  regex = /([^.]?\b)((XIV)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Catorze$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(IX)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Nona$4');
  regex = /([^.]?\b)((IX)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Nono$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(VIII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Oitava$4');
  regex = /([^.]?\b)((VIII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Oitavo$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(VII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Sétima$4');
  regex = /([^.]?\b)((VII)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Sétimo$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(VI)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Sexta$4');
  regex = /([^.]?\b)((VI)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Sexto$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(IV)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Quarta$4');
  regex = /([^.]?\b)((IV)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Quarto$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(III)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Terceira$4');
  regex = /([^.]?\b)((III)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Terceiro$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s(II)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Segunda$4');
  regex = /([^.]?\b)((II)\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1Segundo$4');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s[I]\b)([^.]?)/giu;
  thisString = thisString.replace(regex, '$1 Primeira$3');
  regex = /(?<=[oº]|Manuel|Lu[íi]s|Henrique|Henriques|Jos[eé])(\s+[I]\b)([^.]?)/giu;
  thisString = thisString.replace(regex, ' Primeiro$2');
  regex = /([aª]|Isabel|Inês|Ines|Beatriz|Matilde|Gertrudes|Judite|Leonor|Lurdes\b)(\s[V])(\s|$)/giu;
  thisString = thisString.replace(regex, '$1 Quinta ');
  regex = /([oº]|Manuel|Luis|Henrique|Henriques\b)(\s[V])(\s|$)/giu;
  thisString = thisString.replace(regex, '$1 Quinto ');
  /* Replace crossings */
  regex = /[\(](([^\)])*)[\s]+(X)[\s]+((.)*)/giu;
  thisString = thisString.replace(regex, '( Cruzamento entre $1 e $4 ');
  regex = /(?<=[A-Za-z]\s)((?:Rua|Avenida|Alameda|Praceta|Travessa|Estrada)([^\)])*)[\s]+(X)[\s]+((.)*)/giu;
  thisString = thisString.replace(regex, '( Cruzamento entre $1 e $4 )');
  regex = /((.)*)[\s]+(X)[\s]+((.)*)/giu;
  thisString = thisString.replace(regex, 'Cruzamento entre $1 e $4');
  regex = /\bEDP\b/giu;
  thisString = thisString.replace(regex, 'E. D. P.');
  regex = /\bFCT\b/giu;
  thisString = thisString.replace(regex, 'F. C. T.');
  regex = /\bIc\s/giu;
  thisString = thisString.replace(regex, 'I. C. ');
  /* Trim spaces */
  thisString = thisString.replace(/\s+/g, ' ');
  /* Title case */
  thisString = titleCase(thisString);
  /* Reset "e" casing*/
  // thisString = thisString.replace(/\sE\s/g, ' e ');
  // Return result
  return thisString
};
