export interface Quote {
  text: string
  source: string
}

export const quotes: Quote[] = [
  { text: '天行健，君子以自强不息。', source: '《易经·乾卦》' },
  { text: '地势坤，君子以厚德载物。', source: '《易经·坤卦》' },
  { text: '穷则变，变则通，通则久。', source: '《易经·系辞下》' },
  { text: '一阴一阳之谓道。', source: '《易经·系辞上》' },
  { text: '积善之家，必有余庆。', source: '《易经·坤卦》' },
  { text: '君子藏器于身，待时而动。', source: '《易经·系辞下》' },
  { text: '二人同心，其利断金。', source: '《易经·系辞上》' },
  { text: '谦谦君子，卑以自牧。', source: '《易经·谦卦》' },
  { text: '同声相应，同气相求。', source: '《易经·乾卦》' },
  { text: '仁者见之谓之仁，智者见之谓之智。', source: '《易经·系辞上》' },
  { text: '日新之谓盛德。', source: '《易经·系辞上》' },
  { text: '生生之谓易。', source: '《易经·系辞上》' },
  { text: '形而上者谓之道，形而下者谓之器。', source: '《易经·系辞上》' },
  { text: '方以类聚，物以群分。', source: '《易经·系辞上》' },
  { text: '仰以观于天文，俯以察于地理。', source: '《易经·系辞上》' },
  { text: '乐天知命，故不忧。', source: '《易经·系辞上》' },
  { text: '书不尽言，言不尽意。', source: '《易经·系辞上》' },
  { text: '德薄而位尊，智小而谋大，力小而任重，鲜不及矣。', source: '《易经·系辞下》' },
  { text: '君子上交不谄，下交不渎。', source: '《易经·系辞下》' },
  { text: '善不积不足以成名，恶不积不足以灭身。', source: '《易经·系辞下》' },
  { text: '损益盈虚，与时偕行。', source: '《易经·损卦》' },
  { text: '君子以思患而豫防之。', source: '《易经·既济卦》' },
  { text: '见善则迁，有过则改。', source: '《易经·益卦》' },
  { text: '君子以俭德辟难，不可荣以禄。', source: '《易经·否卦》' },
  { text: '天与火，同人。君子以类族辨物。', source: '《易经·同人卦》' },
  { text: '山上有泽，咸。君子以虚受人。', source: '《易经·咸卦》' },
  { text: '雷风恒。君子以立不易方。', source: '《易经·恒卦》' },
  { text: '明入地中，明夷。君子以莅众，用晦而明。', source: '《易经·明夷卦》' },
  { text: '泽中有雷，随。君子以向晦入宴息。', source: '《易经·随卦》' },
  { text: '山下有风，蛊。君子以振民育德。', source: '《易经·蛊卦》' },
]

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)]
}
