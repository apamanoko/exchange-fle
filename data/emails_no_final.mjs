// =====================================================================
// ノルウェー語版(母語版・ブークモール) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 人名: ローマ字(日本人は名→姓、中国人の李 明は Li Ming)。
// 呼びかけ: ノルウェー語は敬称(De)を使わず、公式な連絡でも du を使うのが一般的。事務連絡は「Til alle TA-er」、教員は「Hei alle TA-er」、
//           TA仲間同士は「Hei」(くだけた調子)。丁寧さの差は、書き出しと結びの言葉(Med vennlig hilsen など)で表す。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsNoFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-no', lang: 'no', isTrap: false, traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: 'Endring i seminarplanen for neste uke',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>Hei alle TA-er,</p>
<p>Dette er Tanaka. På grunn av et arrangement på universitetet er seminaret i øvingsemnet jeg underviser i, som var planlagt til {{D+7}}, flyttet til {{D+8}}, tredje time.</p>
<p>Jeg legger ved den oppdaterte planen. Gi meg beskjed innen {{D+3}} om du kan delta som TA. Hvis det ikke passer, finner vi en annen dag.</p>
<p>Med vennlig hilsen</p>
<p>Seiji Tanaka<br>Institutt for informasjonsteknologi</p>`,
    attachments: [{ name: 'Seminarplan_Oppdatert.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-no', lang: 'no', isTrap: false, traps: [],
    from: { display: 'Studieavdelingen', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'Slik leverer du TA-arbeidsrapporten',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er Studieavdelingen. Her er en veiledning for hvordan du leverer TA-arbeidsrapporten for denne måneden.</p>
<p>Logg inn på universitetets portal via lenken nedenfor og fyll inn arbeidsdager og timer i rapportskjemaet.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Skjema for TA-arbeidsrapport (universitetets portal)</a></p>
<p>Fristen er {{D+7}}. Hvis du har spørsmål, kan du ta kontakt med skranken til Studieavdelingen.</p>
<p>Studieavdelingen</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-no', lang: 'no', isTrap: false, traps: [],
    from: { display: 'Internasjonalt senter', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: 'Informasjon om stenging i vinterferien',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>Til internasjonale studenter og TA-er,</p>
<p>Dette er Internasjonalt senter. Vi vil informere om hvordan kontoret vårt holder åpent i vinterferien.</p>
<p>Se vedlagt PDF for detaljer. I ferieperioden kan svar på e-postforespørsler bli forsinket.</p>
<p>Internasjonalt senter</p>`,
    attachments: [{ name: 'Vinterferie_Informasjon.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-no', lang: 'no', isTrap: false, traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'Jeg har delt materialet fra TA-opplæringen',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>Hei, dette er Sato, en annen TA.</p>
<p>Jeg har samlet materialet fra TA-opplæringen forrige uke på Google Drive. Kan du sjekke om du får åpnet det?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiale fra TA-opplæringen (Google Drive)</a></p>
<p>Gi meg beskjed hvis noe mangler.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-no', lang: 'no', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: 'Studentstøtteavdelingen – TA-godtgjørelse', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '[Viktig] Bekreftelse av bankkonto for TA-godtgjørelse (i dag)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er Studentstøtteavdelingen. For å kunne utbetale TA-godtgjørelsen for denne måneden har vi ikke fått bekreftet opplysningene om den registrerte bankkontoen.</p>
<p>Fyll ut vedlagt skjema med kontoopplysningene og send det i retur <strong>innen kl. 17:00 i dag</strong>. Hvis fristen oversittes, utsettes utbetalingen for denne måneden til neste måned eller senere.</p>
<p>Studentstøtteavdelingen – TA-godtgjørelse</p>`,
    attachments: [{ name: 'TA_Godtgjorelse_Bekreftelse_Konto.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-no', lang: 'no', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: 'Haster: Ber om bekreftelse (vennligst hold dette konfidensielt)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>Hei,</p>
<p>Dette er Kubota. Jeg sitter i et møte og kan ikke ta telefonen. Det er noe jeg haster med å få bekreftet angående dokumenter knyttet til TA-arbeidet ditt.</p>
<p>Se gjennom dokumentene og svar via skjemaet nedenfor. Siden dette gjelder personalsaker, ber jeg deg om ikke å nevne det for andre ansatte eller studenter.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Skjema for bekreftelse av dokumenter</a></p>
<p>Takashi Kubota<br>Dekan ved forskerskolen for naturvitenskap og teknologi</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-no', lang: 'no', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'SV: Vurdering av rapport 5',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>Hei, dette er Li, en annen TA.</p>
<p>Jeg sender deg den reviderte versjonen av vurderingsnotatene for rapport 5 som jeg nevnte tidligere. Kan du sjekke om kriteriene ser riktige ut?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Fra forrige e-post:<br>&gt; Jeg vil gjerne samkjøre vurderingskriteriene for rapport 5 på nytt. Kan du sende dem når du har revidert dem?</p>`,
    attachments: [{ name: 'Rapport5_Vurderingsnotater_Revidert.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-no', lang: 'no', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: 'IT-senteret – Sikkerhet', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '[IT-senteret] Forespørsel om bekreftelse av identiteten din',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er IT-senteret. Vi har oppdaget et uautorisert påloggingsforsøk på kontoen din.</p>
<p>For sikkerhets skyld må du bekrefte identiteten din via lenken nedenfor <strong>innen 24 timer</strong>. Hvis vi ikke kan bekrefte identiteten din, vil kontoen bli midlertidig sperret.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>IT-senteret – Sikkerhet</p>`,
    attachments: [],
  },
];
