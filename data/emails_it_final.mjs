// =====================================================================
// イタリア語版(母語版) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 人名: ローマ字(日本人は名→姓、中国人の李 明はイタリア語圏で一般的な「姓→名」の Li Ming)。
// 呼びかけ: 事務連絡・教員は敬体(Gentili TA / Gentile TA, voi・Lei)、TA仲間同士はくだけた丁寧語(Ciao, tu)。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsItFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-it', lang: 'it', isTrap: false, traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: 'Modifica del programma del seminario della prossima settimana',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>Gentili TA,</p>
<p>sono Tanaka. A causa di un evento universitario, il seminario del corso di esercitazioni di cui sono responsabile, previsto per {{D+7}}, è stato spostato a {{D+8}}, alla terza ora.</p>
<p>In allegato trovate il programma aggiornato. Vi chiedo di rispondere entro {{D+3}} per farmi sapere se potete partecipare come TA. Se non fosse possibile, concorderemo un altro giorno.</p>
<p>Cordiali saluti,</p>
<p>Seiji Tanaka<br>Dipartimento di Ingegneria dell'Informazione</p>`,
    attachments: [{ name: 'Programma_Seminario_Aggiornato.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-it', lang: 'it', isTrap: false, traps: [],
    from: { display: 'Ufficio Affari Accademici', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'Come inviare il rapporto di lavoro TA',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>Gentili TA,</p>
<p>qui l'Ufficio Affari Accademici. Vi indichiamo come inviare il rapporto di lavoro TA di questo mese.</p>
<p>Accedete al portale dell'ateneo tramite il link seguente e inserite i giorni e le ore di lavoro nel modulo del rapporto.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Modulo rapporto di lavoro TA (portale dell'ateneo)</a></p>
<p>La scadenza è {{D+7}}. Per qualsiasi domanda, rivolgetevi allo sportello dell'Ufficio Affari Accademici.</p>
<p>Ufficio Affari Accademici</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-it', lang: 'it', isTrap: false, traps: [],
    from: { display: 'Centro Internazionale', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: 'Chiusura per le vacanze invernali',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>Gentili studenti internazionali e TA,</p>
<p>qui il Centro Internazionale. Vi informiamo sul funzionamento del nostro ufficio durante le vacanze invernali.</p>
<p>Per i dettagli consultate il PDF allegato. Durante il periodo di chiusura, le risposte alle richieste via e-mail potrebbero subire dei ritardi.</p>
<p>Centro Internazionale</p>`,
    attachments: [{ name: 'Avviso_Chiusura_Invernale.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-it', lang: 'it', isTrap: false, traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'Ho condiviso i materiali della formazione TA',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>Ciao, sono Sato, un altro TA.</p>
<p>Ho raccolto su Google Drive i materiali della formazione TA della settimana scorsa. Puoi controllare se riesci ad aprirli?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiali della formazione TA (Google Drive)</a></p>
<p>Se manca qualcosa, fammelo sapere.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-it', lang: 'it', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: 'Ufficio Supporto agli Studenti – Indennità TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: "[Importante] Conferma del conto bancario per l'indennità TA (oggi)",
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>Gentili TA,</p>
<p>qui l'Ufficio Supporto agli Studenti. Per il pagamento dell'indennità TA di questo mese, non siamo riusciti a confermare i dati del conto bancario registrato.</p>
<p>Compilate il modulo allegato con i dati del conto e restituitelo <strong>entro le 17:00 di oggi</strong>. Se la scadenza non verrà rispettata, il pagamento di questo mese sarà rinviato al mese successivo o oltre.</p>
<p>Ufficio Supporto agli Studenti – Indennità TA</p>`,
    attachments: [{ name: 'Modulo_Verifica_Conto_Indennita_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-it', lang: 'it', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: 'Urgente: richiesta di conferma (si prega di mantenere la riservatezza)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>Gentile TA,</p>
<p>sono Kubota. Sono in riunione e non posso rispondere al telefono. C'è una cosa che devo farle confermare con urgenza riguardo ai documenti relativi al suo lavoro di TA.</p>
<p>Verifichi i documenti e risponda tramite il modulo qui sotto. Trattandosi di una questione di personale, la prego di non parlarne con altri docenti o studenti.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Modulo di conferma dei documenti</a></p>
<p>Takashi Kubota<br>Direttore della Scuola di Studi Superiori in Scienze e Tecnologie</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-it', lang: 'it', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'R: Valutazione del Report 5',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>Ciao, sono Li, un altro TA.</p>
<p>Ti mando la versione rivista delle note di valutazione del Report 5 di cui parlavamo. Puoi controllare se i criteri ti sembrano giusti?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Dall'e-mail precedente:<br>&gt; Vorrei allineare di nuovo i criteri di valutazione del Report 5. Me li puoi mandare quando li hai rivisti?</p>`,
    attachments: [{ name: 'Note_Valutazione_Report5_Riviste.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-it', lang: 'it', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: 'Centro Informatico – Sicurezza', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: "[Centro Informatico] Richiesta di verifica dell'identità dell'account",
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>Gentili TA,</p>
<p>qui il Centro Informatico. Abbiamo rilevato un tentativo di accesso non autorizzato al vostro account.</p>
<p>Per la vostra sicurezza, verificate la vostra identità tramite il link seguente <strong>entro 24 ore</strong>. Se non riusciremo a confermare la vostra identità, l'account verrà sospeso temporaneamente.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Centro Informatico – Sicurezza</p>`,
    attachments: [],
  },
];
