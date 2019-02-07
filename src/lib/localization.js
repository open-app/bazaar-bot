const translations = {
  yes: {
    pt: 'Sim',
    es: 'Si',
    en: 'Yes',
  },
  no: {
    pt: 'Não',
    es: 'No',
    en: 'No',
  },
  done: {
    pt: 'Pronto',
    es: 'Listo',
    en: 'Done',
  },
  cancel: {
    pt: 'Cancelar',
    es: 'Cancelar',
    en: 'Cancel',
  },
  error: {
    pt: 'Tivemos um problema',
    es: 'Hemos tenido un problema',
    en: 'There was a problem',
  },
  welcome: {
    pt: 'Bem vindo ao bazar da comunidade',
    es: 'Bienvenido al bazar de la comunidad',
    en: 'Welcome to the community Bazaar',
  },
  resourcesList: {
    pt: 'Essa é a lista dos serviços e produtos da comunidade.',
    es: 'Esta es la lista de los servicios y productos de la comunidad.',
    en: 'This is the community\'s list of products and services.',
  },
  resourcesAdd: {
    pt: 'Para adicionar um novo use o ➕',
    es: 'Para agregar un nuevo uso el ➕',
    en: 'To add a new use the ➕',
  },
  select: {
    pt:'Selecione oque gostaria de fazer:',
    es:'Seleccione lo que desea hacer:',
    en:'Select what you\'d like to do:',
  },
  list: {
    pt: 'listar',
    es: 'listar',
    en: 'list',
  },
  new: {
    pt: 'novo',
    es: 'nuevo',
    en: 'new',
  },
  newHelp1: {
    pt: 'Qual o nome do produto ou serviço que gostaria de publicar?',
    es: 'nuevo',
    en: 'new',
  },
  newHelp2: {
    pt: 'É uma troca solidária ou gostaria de receber em troca?',
    es: 'nuevo',
    en: 'new',
  },
  newHelp3: {
    pt: 'Assim será sua publicação, confirma?',
    es: 'nuevo',
    en: 'new',
  },
  newOpt1: {
    pt: 'Solidária',
    es: 'Solidaria',
    en: 'Solidary',
  },
  newOpt2: {
    pt: process.env.COMMUNITY_CURRENCY,
    es: process.env.COMMUNITY_CURRENCY,
    en: process.env.COMMUNITY_CURRENCY,
  },
  newOpt3: {
    pt: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`,
    es: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`,
    en: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`,
  },
  newOpt4: {
    pt: process.env.FIAT_CURRENCY,
    es: process.env.FIAT_CURRENCY,
    en: process.env.FIAT_CURRENCY,
  },
  newCom: {
    pt: `Qual o valor em ${process.env.COMMUNITY_CURRENCY}?`,
    es: `Cuál es el valor en ${process.env.COMMUNITY_CURRENCY}?`,
    en: `What is the value in ${process.env.COMMUNITY_CURRENCY}?`,
  },
  newFiat: {
    pt: `Qual o valor em ${process.env.FIAT_CURRENCY}?`,
    es: `Cuál es el valor en ${process.env.FIAT_CURRENCY}?`,
    en: `What is the value in ${process.env.FIAT_CURRENCY}?`,
  },
  exchange: {
    pt: 'trocar',
    es: 'cambiar',
    en: 'exchange',
  },
  unpublish: {
    pt: 'tirar',
    es: 'sacar',
    en: 'unpublish',
  },
  unpHelp1: {
    pt: 'Qual deseja retirar?',
    es: 'Qué desea retirar?',
    en: 'Which would you like to unpublish?',
  },
  unpHelp2: {
    pt: 'Certeza que deseja retirar',
    es: 'Certeza que desea retirar',
    en: 'Are you sure you\'d like to unpublish',
  },
  me: {
    pt: 'eu',
    es: 'yo',
    en: 'me'
  },
  check: {
    pt: 'checar',
    es: 'mirar',
    en: 'check',
  },
  
}

module.exports = (ctx, obj) => {
  let lang = null
  if (ctx.state.user) {
    lang = ctx.state.user.language_code.split('-')[0]
  }
  return translations[obj][lang || process.env.DEFAULT_LOCAL || 'en']
}