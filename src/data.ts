export interface Sticker {
  id: string;
  name: string;
  team: string;
  type: 'normal' | 'shiny' | 'legend';
  number: string;
  imageUrl: string;
  rarityColor: string;
  pdfUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  text: string;
  rating: number;
  avatarSeed: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const stickersData: Sticker[] = [
  {
    id: 'vinicius',
    name: 'Vinícius Júnior',
    team: 'Brasil',
    type: 'legend',
    number: 'BRA-10',
    imageUrl: '/vinicius.png',
    rarityColor: 'from-amber-400 via-yellow-350 to-amber-600',
    pdfUrl: '/vinicius.pdf'
  },
  {
    id: 'bellingham',
    name: 'Jude Bellingham',
    team: 'Inglaterra',
    type: 'legend',
    number: 'ENG-5',
    imageUrl: '/bellingham.png',
    rarityColor: 'from-amber-400 via-yellow-300 to-yellow-500',
    pdfUrl: '/bellingham.pdf'
  },
  {
    id: 'haaland',
    name: 'Erling Haaland',
    team: 'Noruega',
    type: 'normal',
    number: 'NOR-9',
    imageUrl: '/haaland.png',
    rarityColor: 'from-gray-300 to-slate-400',
    pdfUrl: '/haaland.pdf'
  },
  {
    id: 'dembele',
    name: 'Ousmane Dembélé',
    team: 'França',
    type: 'shiny',
    number: 'FRA-11',
    imageUrl: '/dembele.png',
    rarityColor: 'from-cyan-400 via-blue-200 to-indigo-500',
    pdfUrl: '/dembele.pdf'
  },
  {
    id: 'marquinhos',
    name: 'Marquinhos',
    team: 'Brasil',
    type: 'shiny',
    number: 'BRA-4',
    imageUrl: '/marquinhos.png',
    rarityColor: 'from-green-400 via-yellow-200 to-emerald-600',
    pdfUrl: '/marquinhos.pdf'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcelo Santos',
    role: 'Pai do Lucas (9 anos)',
    city: 'São Paulo - SP',
    text: 'Fiz as contas e ia gastar mais de R$ 1.500 para completar o álbum do meu filho com aqueles pacotinhos de banca que só vêm repetidos. Comprei o PDF por R$ 9,90, imprimi numa gráfica rápida em papel adesivo fotográfico. Ficou espetacular! Ele recortou e colou tudo feliz da vida, e eu economizei uma fortuna.',
    rating: 5,
    avatarSeed: 'marcelo'
  },
  {
    id: '2',
    name: 'Amanda Silveira',
    role: 'Colecionadora',
    city: 'Belo Horizonte - MG',
    text: 'A resolução do PDF é absurda de boa. Sou perfeccionista e me surpreendi com a nitidez dos cromos brilhantes e das cartas Legends. Fora que o guia de impressão explica direitinho qual gramatura e papel usar. Super recomendo pra quem ama futebol mas preza pela inteligência financeira.',
    rating: 5,
    avatarSeed: 'amanda'
  },
  {
    id: '3',
    name: 'Roberto Cavalheiro',
    role: 'Fã de Futebol',
    city: 'Porto Alegre - RS',
    text: 'Atendimento nota 10. Comprei por Pix e o link de download chegou no meu WhatsApp e e-mail em menos de 1 minuto. Muito prático! O material é organizadíssimo e já imprimi os primeiros pacotes. Excelente custo-benefício.',
    rating: 5,
    avatarSeed: 'roberto'
  }
];

export const faqItems: FAQItem[] = [
  {
    question: 'Como eu recebo o produto digital?',
    answer: 'Imediatamente após a confirmação do pagamento (que dura segundos via Pix ou Cartão), você recebe um e-mail de acesso e também uma notificação direta no seu WhatsApp com o link exclusivo para baixar o arquivo PDF completo.'
  },
  {
    question: 'Qual a qualidade das imagens e das figurinhas?',
    answer: 'Todas as imagens estão em altíssima definição (300 DPI, padrão gráfico profissional). Cada seleção, escudo, cromo brilhante e figurinha especial "Legends" foi processada para garantir cores robustas, contornos nítidos e fidelidade máxima ao design oficial.'
  },
  {
    question: 'Posso imprimir quantas vezes eu quiser?',
    answer: 'Sim! Uma vez baixado o arquivo PDF, o acesso é vitalício. Você pode imprimir o álbum inteiro e os kits de figurinhas quantas vezes desejar. Ideal para famílias com mais de um filho, permitindo que cada um complete seu próprio álbum pagando por apenas uma cópia.'
  },
  {
    question: 'Qual papel e impressora são indicados?',
    answer: 'Você pode usar qualquer impressora jato de tinta ou laser convencional. Para um acabamento idêntico ao oficial da banca de jornal, recomendamos usar Papel Fotográfico Adesivo Brilhante (Glossy) com gramatura entre 115g e 135g. No material, incluímos um Guia de Impressão Rápido detalhando esse passo a passo.'
  },
  {
    question: 'É seguro comprar neste site?',
    answer: 'Totalmente seguro. Nosso checkout utiliza criptografia SSL reforçada de ponta a ponta, processado pelas maiores plataformas de pagamentos digitais do Brasil. Além disso, você conta com a nossa garantia incondicional de reembolso.'
  }
];
