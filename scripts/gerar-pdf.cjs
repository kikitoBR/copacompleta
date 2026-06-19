const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function gerarPDF() {
  const destDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const destPath = path.join(destDir, 'acesso_figurinhas_copa_2026.pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const writeStream = fs.createWriteStream(destPath);
  doc.pipe(writeStream);

  // 1. Fundo do PDF (Verde Escuro Premium #062c16)
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#062c16');

  // Desenhar algumas faixas de gradiente/detalhe em verde claro para dar estilo
  doc.rect(0, 0, doc.page.width, 25).fill('#0e3e21');
  doc.rect(0, doc.page.height - 25, doc.page.width, 25).fill('#0e3e21');

  // 2. Título principal
  doc.moveDown(4);
  doc.fillColor('#fed000')
     .fontSize(28)
     .text('OBRIGADO PELA COMPRA! 🏆', { align: 'center' });
     
  doc.moveDown(0.5);
  doc.fillColor('#ffffff')
     .fontSize(16)
     .text('Álbum Completo & Figurinhas da Copa do Mundo 2026', { align: 'center' });

  // 3. Card/Box central (Verde Médio #0e3e21 com borda Amarela #fed000)
  const cardX = 60;
  const cardY = 220;
  const cardWidth = doc.page.width - 120;
  const cardHeight = 360;

  // Sombra suave do card (verde escuro bem fechado)
  doc.roundedRect(cardX + 5, cardY + 5, cardWidth, cardHeight, 15).fill('#02140a');
  
  // Card principal
  doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 15).fill('#0e3e21');
  
  // Borda do card
  doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 15)
     .lineWidth(2)
     .stroke('#fed000');

  // Conteúdo dentro do card
  doc.fillColor('#ffffff');
  
  doc.moveDown(4);
  doc.fontSize(18)
     .fillColor('#fed000')
     .text('SEU CONTEÚDO ESTÁ LIBERADO!', { align: 'center' });

  doc.moveDown(1.5);
  doc.fontSize(12)
     .fillColor('#ffffff')
     .text('Clique no botão abaixo para acessar a pasta oficial do Google Drive. Lá você encontrará todos os arquivos PDF diagramados em altíssima resolução de 300 DPI organizados por seleções, incluindo os cromos brilhantes e edições Legends, prontos para imprimir e recortar!', { 
        align: 'center',
        width: cardWidth - 60,
        lineGap: 4
     });

  // 4. Botão de Download Clicável (Amarelo Ouro #fed000)
  const btnWidth = 280;
  const btnHeight = 50;
  const btnX = (doc.page.width - btnWidth) / 2;
  const btnY = cardY + 240;
  const driveUrl = 'https://drive.google.com/drive/folders/13tk9VjB7qyarh6GZ3_70leH3QNGQn_FH?usp=sharing';

  // Desenhar botão
  doc.roundedRect(btnX, btnY, btnWidth, btnHeight, 10).fill('#fed000');
  
  // Texto do botão
  doc.fillColor('#062c16')
     .fontSize(13)
     .text('ACESSAR ARQUIVOS NO DRIVE 📂', btnX, btnY + 18, {
       width: btnWidth,
       align: 'center',
       link: driveUrl
     });

  // Tornar toda a área do botão clicável como link
  doc.link(btnX, btnY, btnWidth, btnHeight, driveUrl);

  // 5. Rodapé
  doc.moveDown(6);
  doc.fillColor('#a0aec0')
     .fontSize(9)
     .text('© 2026 Copa Digital • Este é o seu arquivo de acesso vitalício. Não compartilhe este link.', { 
       align: 'center',
       lineGap: 2
     });

  doc.end();
  
  writeStream.on('finish', () => {
    console.log(`PDF gerado com sucesso em: ${destPath}`);
  });
}

gerarPDF();
