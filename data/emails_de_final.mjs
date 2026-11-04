// =====================================================================
// ドイツ語版(母語版) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 人名: ローマ字(日本人は名→姓、中国人の李 明は Li Ming)。
// 敬語: 事務連絡・教員・研究科長は Sie(「Sehr geehrte TAs」「Liebe TAs」「Guten Tag」)、TA仲間同士は du(「Hallo」)。
// ファイル名: 変音記号(ä ö ü ß)は、ファイル名として安全なように ae oe ue ss に置き換えている。
// 注意: 以前の emailsDe_en(ドイツ語・英語の旧セット)とは別物。語コードは 'de'。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsDeFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-de', lang: 'de', isTrap: false, traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: 'Änderung des Seminartermins in der nächsten Woche',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>Liebe TAs,</p>
<p>hier ist Tanaka. Aufgrund einer Veranstaltung an der Universität wird das Seminar meiner Übung, das für den {{D+7}} geplant war, auf den {{D+8}}, 3. Stunde, verlegt.</p>
<p>Den aktualisierten Terminplan finden Sie im Anhang. Bitte teilen Sie mir bis zum {{D+3}} per Antwort mit, ob Sie als TA teilnehmen können. Falls nicht, vereinbaren wir einen anderen Tag.</p>
<p>Mit freundlichen Grüßen</p>
<p>Seiji Tanaka<br>Fachbereich Informationstechnik</p>`,
    attachments: [{ name: 'Seminarplan_Aktualisiert.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-de', lang: 'de', isTrap: false, traps: [],
    from: { display: 'Studienbüro', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'So reichen Sie den TA-Arbeitsbericht ein',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist das Studienbüro. Wir erklären Ihnen, wie Sie den TA-Arbeitsbericht für diesen Monat einreichen.</p>
<p>Melden Sie sich über den folgenden Link im Portal der Universität an und tragen Sie im Berichtsformular Ihre Arbeitstage und Arbeitsstunden ein.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Formular für den TA-Arbeitsbericht (Universitätsportal)</a></p>
<p>Die Einreichungsfrist ist der {{D+7}}. Bei Fragen wenden Sie sich bitte an den Schalter des Studienbüros.</p>
<p>Studienbüro</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-de', lang: 'de', isTrap: false, traps: [],
    from: { display: 'Internationales Zentrum', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: 'Hinweis zur Schließung in der Winterpause',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>Sehr geehrte internationale Studierende und TAs,</p>
<p>hier ist das Internationale Zentrum. Wir informieren Sie über den Betrieb unseres Büros während der Winterpause.</p>
<p>Einzelheiten entnehmen Sie bitte dem angehängten PDF. In der Winterpause kann sich die Beantwortung von E-Mail-Anfragen verzögern.</p>
<p>Internationales Zentrum</p>`,
    attachments: [{ name: 'Hinweis_Winterpause.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-de', lang: 'de', isTrap: false, traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'Ich habe die Unterlagen der TA-Schulung geteilt',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>Hallo, hier ist Sato, ein anderer TA.</p>
<p>Ich habe die Unterlagen der TA-Schulung von letzter Woche auf Google Drive zusammengestellt. Kannst du prüfen, ob du sie öffnen kannst?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Unterlagen der TA-Schulung (Google Drive)</a></p>
<p>Sag mir Bescheid, falls etwas fehlt.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-de', lang: 'de', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: 'Studierendenservice – TA-Vergütung', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '[Wichtig] Bestätigung Ihres Bankkontos für die TA-Vergütung (heute)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist der Studierendenservice. Für die Auszahlung der TA-Vergütung dieses Monats konnten wir die hinterlegten Bankdaten nicht bestätigen.</p>
<p>Bitte tragen Sie Ihre Kontodaten in das angehängte Formular ein und senden Sie es <strong>heute bis 17:00 Uhr</strong> zurück. Bei Fristüberschreitung wird die Auszahlung für diesen Monat auf den nächsten Monat oder später verschoben.</p>
<p>Studierendenservice – TA-Vergütung</p>`,
    attachments: [{ name: 'Formular_Kontobestaetigung_TA_Verguetung.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-de', lang: 'de', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: 'Dringend: Bitte um Bestätigung (bitte vertraulich behandeln)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>Guten Tag,</p>
<p>hier ist Kubota. Ich befinde mich in einer Besprechung und kann nicht telefonieren. Es gibt etwas, das ich dringend von Ihnen bestätigt haben möchte, und zwar zu Unterlagen, die Ihre TA-Tätigkeit betreffen.</p>
<p>Bitte prüfen Sie die Unterlagen und antworten Sie über das folgende Formular. Da es sich um Personalangelegenheiten handelt, bitte ich Sie, anderen Lehrenden oder Studierenden nichts davon zu sagen.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Formular zur Bestätigung der Unterlagen</a></p>
<p>Takashi Kubota<br>Leiter der Graduiertenschule für Naturwissenschaften und Technik</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-de', lang: 'de', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'AW: Bewertung von Bericht 5',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>Hallo, hier ist Li, ein anderer TA.</p>
<p>Ich schicke dir die überarbeitete Fassung der Bewertungsnotizen zu Bericht 5, von denen ich vorher gesprochen hatte. Kannst du prüfen, ob die Kriterien passen?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Aus der vorherigen E-Mail:<br>&gt; Ich möchte die Bewertungskriterien für Bericht 5 noch einmal abstimmen. Kannst du sie mir schicken, wenn du sie überarbeitet hast?</p>`,
    attachments: [{ name: 'Bewertungsnotizen_Bericht5_Ueberarbeitet.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-de', lang: 'de', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: 'IT-Zentrum – Sicherheit', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '[IT-Zentrum] Bitte um Bestätigung Ihrer Kontoidentität',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist das IT-Zentrum. Wir haben einen unbefugten Anmeldeversuch bei Ihrem Konto festgestellt.</p>
<p>Zu Ihrer Sicherheit bestätigen Sie bitte Ihre Identität über den folgenden Link <strong>innerhalb von 24 Stunden</strong>. Wenn wir Ihre Identität nicht bestätigen können, wird Ihr Konto vorübergehend gesperrt.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>IT-Zentrum – Sicherheit</p>`,
    attachments: [],
  },
];
