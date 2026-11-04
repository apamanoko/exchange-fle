// =====================================================================
// 英語版(母語版の設計図) 罠4・通常4  —  日本語版 emails_ja_final.mjs と1対1で対応
//
// 【対応のルール(他の言語版も同じ)】
//   ・id は 'normal-N-<lang>' / 'trap-N-<lang>'(<lang> は en)。traps タグ、isTrap、送信アドレス、リンクのURL(data-display-url,
//     data-phished-url)、添付の実拡張子(.pdf.exe など)とサイズは日本語版と同一。
//   ・表示名・件名・本文・リンク文字・添付ファイル名(拡張子の前の部分)だけを翻訳する。
//   ・人名はローマ字(姓名の順は、その言語の自然な順)。部署名は英語に訳す(日本語は混ぜない)。
//   ・日付トークン {{D±n}} は日本語版と同じ位置・同じ値。表示形式は renderDateTokens が言語ごとに展開する。
//   ・日本語版の通常3にあった英語の一文は、言語の純度を保つため、日本語版からも外す(下の注を参照)。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsEnFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-en', lang: 'en', isTrap: false, traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: "Change to next week's seminar schedule",
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>Dear TAs,</p>
<p>This is Tanaka. Because of a campus event, the seminar for the exercise course I teach, scheduled for {{D+7}}, will be moved to 3rd period on {{D+8}}.</p>
<p>I have attached the revised schedule. Please reply by {{D+3}} to let me know whether you can attend as a TA. If you cannot, I will arrange another day.</p>
<p>Best regards,</p>
<p>Seiji Tanaka<br>Department of Information Engineering</p>`,
    attachments: [{ name: 'Seminar_Schedule_Revised.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-en', lang: 'en', isTrap: false, traps: [],
    from: { display: 'Academic Affairs Office', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'How to submit your TA work report',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Academic Affairs Office. Here is how to submit your TA work report for this month.</p>
<p>Please log in to the campus portal through the link below and enter your working days and hours on the work report form.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA work report form (campus portal)</a></p>
<p>The submission deadline is {{D+7}}. If you have any questions, please contact the Academic Affairs Office.</p>
<p>Academic Affairs Office</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-en', lang: 'en', isTrap: false, traps: [],
    from: { display: 'International Center', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: 'Winter break closure schedule',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>Dear international students and TAs,</p>
<p>This is the International Center. We would like to let you know how our office will operate during the winter break.</p>
<p>Please see the attached PDF for details. During the break, replies to e-mail inquiries may be delayed.</p>
<p>International Center</p>`,
    attachments: [{ name: 'Winter_Break_Notice.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-en', lang: 'en', isTrap: false, traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'Shared the TA training materials',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>Hi, this is Sato, one of the other TAs.</p>
<p>I put the materials from last week's TA training together on Google Drive. Could you check that you can open them?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA training materials (Google Drive)</a></p>
<p>If anything is missing, please let me know.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-en', lang: 'en', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: 'Student Support Office, TA Allowance', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '[Important] Confirmation of your bank account for the TA allowance (today)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Student Support Office. To pay this month's TA allowance, we have not yet been able to confirm the bank account information registered for you.</p>
<p>Please fill in your account details on the attached form and return it <strong>by 5:00 p.m. today</strong>. If the deadline is missed, this month's payment will be postponed to next month or later.</p>
<p>Student Support Office, TA Allowance</p>`,
    attachments: [{ name: 'TA_Allowance_Bank_Details_Form.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-en', lang: 'en', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: 'Urgent: request for confirmation (please keep confidential)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>To the TA,</p>
<p>This is Kubota. I am in a meeting and cannot take calls. There is something I urgently need you to confirm about documents related to your TA work.</p>
<p>Please review the documents and respond using the form below. Because this concerns personnel matters, please do not mention it to other faculty members or students.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Document confirmation form</a></p>
<p>Takashi Kubota<br>Dean, Graduate School of Science and Technology</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-en', lang: 'en', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: 'Ming Li', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'Re: Grading Report 5',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>Hi, Li here, another TA.</p>
<p>I am sending the revised version of the grading notes for Report 5 that I mentioned before. Could you check whether the criteria look right?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; From the previous email:<br>&gt; I would like us to align the grading criteria for Report 5 again. Could you send it over once you have revised it?</p>`,
    attachments: [{ name: 'Report5_Grading_Notes_Revised.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-en', lang: 'en', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: 'Information Technology Center, Security', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '[IT Center] Request to verify your account identity',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Information Technology Center. We have detected an unauthorized login attempt on your account.</p>
<p>For your safety, please verify your identity through the link below <strong>within 24 hours</strong>. If we cannot confirm your identity, your account will be temporarily suspended.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Information Technology Center, Security</p>`,
    attachments: [],
  },
];
