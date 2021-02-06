const translations = {
  yes: {
    pt: 'Sim',
    es: 'Si',
    en: 'Yes'
  },
  no: {
    pt: 'Não',
    es: 'No',
    en: 'No'
  },
  to: {
    pt: 'para',
    es: 'a',
    en: 'to'
  },
  done: {
    pt: 'Pronto',
    es: 'Listo',
    en: 'Done'
  },
  cancel: {
    pt: 'Cancelar',
    es: 'Cancelar',
    en: 'Cancel'
  },
  error: {
    pt: 'Tivemos um problema',
    es: 'Hemos tenido un problema',
    en: 'There was a problem'
  },
  empty: {
    pt: 'Nada foi publicado',
    es: 'No se ha publicado nada',
    en: 'Nothing has been published'
  },
  other: {
    pt: 'Outro',
    es: 'Otro',
    en: 'Other'
  },
  welcome: {
    pt: 'Bem vindo ao bazar da comunidade',
    es: 'Bienvenido al bazar de la comunidad',
    en: 'Welcome to the community Bazaar'
  },
  resourcesList: {
    pt: 'Essa é a lista dos serviços e produtos da comunidade.',
    es: 'Esta es la lista de los servicios y productos de la comunidad.',
    en: "This is the community's list of products and services."
  },
  resourcesAdd: {
    pt: 'Para adicionar um novo use o ➕',
    es: 'Para agregar un nuevo uso el ➕',
    en: 'To add a new use the ➕'
  },
  contactUser: {
    pt: 'Entre em contato com o usuário para adquirir um produto ou serviço.',
    es:
      'Póngase en contacto con el usuario para comprar un producto o servicio.',
    en: 'Contact the user to purchase a product or service.'
  },
  select: {
    pt: 'Selecione oque gostaria de fazer:',
    es: 'Seleccione lo que desea hacer:',
    en: "Select what you'd like to do:"
  },
  list: {
    pt: 'Publicações',
    es: 'Ofertas',
    en: 'Publications'
  },
  new: {
    pt: 'Publicar',
    es: 'Añadir',
    en: 'Publish'
  },
  newHelp1: {
    pt: 'Qual o nome do produto ou serviço que gostaria de publicar?',
    es: 'Cuál es el nombre del producto o servicio que desea publicar?',
    en: "What's the name of the product of service woul'd like to publish?"
  },
  newHelp2: {
    pt: 'É uma doação ou gostaria de receber em troca?',
    es: 'Es una donación o quieres recibir algo en cambio?',
    en: 'Is it a donation or would you like to receive in return?'
  },
  newHelp3: {
    pt: 'Assim será sua publicação, confirma?',
    es: 'Assim será sua publicação, confirma?',
    en: "This is what you're publications will look, ok?"
  },
  newOpt1: {
    pt: 'Doação',
    es: 'Donación',
    en: 'Donation'
  },
  newOpt2: {
    pt: process.env.COMMUNITY_CURRENCY,
    es: process.env.COMMUNITY_CURRENCY,
    en: process.env.COMMUNITY_CURRENCY
  },
  newOpt3: {
    pt: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`,
    es: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`,
    en: `${process.env.COMMUNITY_CURRENCY} & ${process.env.FIAT_CURRENCY}`
  },
  newOpt4: {
    pt: process.env.FIAT_CURRENCY,
    es: process.env.FIAT_CURRENCY,
    en: process.env.FIAT_CURRENCY
  },
  newCom: {
    pt: `Qual o valor em ${process.env.COMMUNITY_CURRENCY}?`,
    es: `Cuál es el valor en ${process.env.COMMUNITY_CURRENCY}?`,
    en: `What is the value in ${process.env.COMMUNITY_CURRENCY}?`
  },
  newFiat: {
    pt: `Qual o valor em ${process.env.FIAT_CURRENCY}?`,
    es: `Cuál es el valor en ${process.env.FIAT_CURRENCY}?`,
    en: `What is the value in ${process.env.FIAT_CURRENCY}?`
  },
  exchange: {
    pt: 'Enviar',
    es: 'Enviar',
    en: 'Send'
  },
  excHelp1: {
    pt: 'Para qual usuário gostaria de enviar?',
    es: 'Para qué usuario desea enviar?',
    en: 'To which user would you like to send?'
  },
  excHelp2: {
    pt: 'Qual o nome do usuário?',
    es: 'Cuál es el nombre del usuario?',
    en: "What is the user's name?"
  },
  excHelp3: {
    pt: `Quantos ${process.env.COMMUNITY_CURRENCY} gostaria de enviar?`,
    es: `Cuántos ${process.env.COMMUNITY_CURRENCY} quisiera enviar?`,
    en: `How much ${process.env.COMMUNITY_CURRENCY} would you like to send?`
  },
  excHelp4: {
    pt: 'Certeza que gostaria de enviar',
    es: 'Seguro que gustaría enviar',
    en: "Are you sure woul'd like to send"
  },
  excHelp5: {
    pt: 'Seu saldo é de',
    es: 'Su saldo es de',
    en: "You're balance is"
  },
  unpublish: {
    pt: 'Retirar',
    es: 'Eliminar',
    en: 'Unpublish'
  },
  unpHelp1: {
    pt: 'Qual deseja retirar?',
    es: 'Qué desea retirar?',
    en: 'Which would you like to unpublish?'
  },
  unpHelp2: {
    pt: 'Certeza que deseja retirar',
    es: 'Certeza que desea retirar',
    en: "Are you sure you'd like to unpublish"
  },
  me: {
    pt: 'Meu saldo',
    es: 'Mi saldo',
    en: 'My balance'
  },
  noBalance: {
    pt: 'Usuário sem saldo',
    es: 'Usuario sin saldo',
    en: 'User with no balance'
  },
  check: {
    pt: 'Saldo do usuari@',
    es: 'Saldo do usuari@',
    en: 'User balance'
  },
  userCheck: {
    pt: 'Qual o nome de usuario que gostaria de pesquisar?',
    es: '¿Qué nombre de usuario te gustaría buscar?',
    en: 'What username would you like to search for?'
  }
}

module.exports = (ctx, obj) => {
  const availableLangs = ['pt', 'es', 'en']
  const defaultLang = process.env.DEFAULT_LOCAL || 'en'
  if (ctx.state.user && ctx.state.user.language_code) {
    const userLang = ctx.state.user.language_code.split('-')[0]
    const isLang = availableLangs.filter(l => l === userLang)
    if (isLang.length > 0) {
      return translations[obj][userLang]
    } else {
      return translations[obj][process.env.DEFAULT_LOCAL || defaultLang]
    }
  } else {
    return translations[obj][process.env.DEFAULT_LOCAL || defaultLang]
  }
}
