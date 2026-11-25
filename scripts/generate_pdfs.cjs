const path = require('path');
const puppeteer = require('/Users/kalyan/.npm/_npx/55158e48eb5c59f7/node_modules/puppeteer-core');

async function generatePDFs() {
  console.log('⏳ Connecting to Google Chrome on port 9222...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });

  // 1. Proposal PDF
  console.log('📄 Generating Proposal PDF (12 Sections with 8 Technological Infographics)...');
  const proposalPage = await browser.newPage();
  const proposalPath = 'file://' + path.resolve('public/proposal_document.html');
  await proposalPage.goto(proposalPath, { waitUntil: 'networkidle0' });
  await proposalPage.pdf({
    path: path.resolve('public/ASTRA_Assam_NESFIC_D22_Proposal.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
  });
  await proposalPage.close();
  console.log('✅ Proposal PDF generated: public/ASTRA_Assam_NESFIC_D22_Proposal.pdf');

  // 2. Proof of Work PDF
  console.log('📄 Generating Proof of Work PDF...');
  const powPage = await browser.newPage();
  const powPath = 'file://' + path.resolve('public/proof_of_work_document.html');
  await powPage.goto(powPath, { waitUntil: 'networkidle0' });
  await powPage.pdf({
    path: path.resolve('public/ASTRA_Assam_NESFIC_D22_Proof_of_Work.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', bottom: '10mm', left: '10mm', right: '10mm' }
  });
  await powPage.close();
  console.log('✅ Proof of Work PDF generated: public/ASTRA_Assam_NESFIC_D22_Proof_of_Work.pdf');

  await browser.disconnect();
}

generatePDFs().catch(err => {
  console.error('❌ PDF generation failed:', err);
  process.exit(1);
});
