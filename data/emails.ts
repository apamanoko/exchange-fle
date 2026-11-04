import type { Email } from '@/types'

/**
 * 日本語版メール（通常4通 + 罠4通）
 * 全被験者共通で使用する
 */
export const emailsJa: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  // 通常1: 田中教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '田中 誠二', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '来週のゼミ日程の変更について',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>TA担当の皆さん</p>
<p>田中です。担当している演習科目で、{{D+7}}のゼミを、学内行事の都合で{{D+8}}の3限に変更することになりました。</p>
<p>変更後の日程表を添付します。TAとして参加できるかどうか、{{D+3}}までに返信で教えてください。難しい場合は、代わりの日で調整します。</p>
<p>よろしくお願いします。</p>
<p>田中 誠二<br>情報工学部 情報工学科</p>`,
    attachments: [{ name: 'ゼミ日程_変更後.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // 通常2: 学務課（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '学務課', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'TA勤務報告の提出方法について',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>TA担当者 各位</p>
<p>学務課です。今月分のTA勤務報告の提出方法をご案内します。</p>
<p>下記のリンクから、学内ポータルの勤務報告フォームにログインし、勤務日と時間数を入力してください。</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA勤務報告フォーム(学内ポータル)</a></p>
<p>提出期限は{{D+7}}です。不明な点があれば、学務課の窓口までお問い合わせください。</p>
<p>学務課</p>`,
    attachments: [],
  },

  // 通常3: 国際センター（事務的・正規PDF添付・多言語の一文）
  {
    id: 'normal-3-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '国際センター', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '冬季休業期間のご案内',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>留学生・TAの皆さん</p>
<p>国際センターです。冬季休業期間中の窓口の対応についてお知らせします。</p>
<p>詳細は添付のPDFをご確認ください。休業期間中は、メールでの問い合わせへの返信が遅くなる場合があります。</p>
<p>国際センター</p>`,
    attachments: [{ name: '冬季休業のご案内.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // 通常4: 佐藤（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '佐藤 健太', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'TA研修の資料、共有しました',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>お疲れさまです。同じTAの佐藤です。</p>
<p>先週のTA研修の資料を、Googleドライブにまとめました。見られるか、確認してもらえますか?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA研修資料(Googleドライブ)</a></p>
<p>足りない資料があれば、教えてください。</p>
<p>佐藤</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-ja: 学生支援課を装う（事務的）
   * 設計タグ: sender_domain_spoof / attachment_double_ext / urgency_deadline / sensitive_info_request
   * TrapType へ: domain / extension / urgency（sensitive_info_request は該当なし→本文の内容で表現）
   */
  {
    id: 'trap-1-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: '学生支援課 TA手当担当', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【重要】TA手当 振込口座の確認について(本日中)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>TA担当者 各位</p>
<p>学生支援課です。今月分のTA手当の振込にあたり、登録されている口座情報の確認が取れていません。</p>
<p>添付の確認書に口座情報を記入し、<strong>本日17時まで</strong>に返送してください。期限を過ぎた場合、今月分の振込は来月以降に延期されます。</p>
<p>学生支援課 TA手当担当</p>`,
    attachments: [{ name: 'TA手当_口座確認書.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  /**
   * trap-2-ja: 久保田研究科長を装う（個人的な依頼）
   * 設計タグ: free_mail_sender / link_mismatch / urgency / secrecy / authority
   * TrapType へ: domain / link / urgency / authority（secrecy は該当なし→本文の内容で表現）
   */
  {
    id: 'trap-2-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '久保田 隆', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '至急:確認のお願い(内密にお願いします)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>TAの方へ</p>
<p>久保田です。いま会議で席を外せず、電話に出られません。TA業務に関わる書類について、急ぎで確認してほしいことがあります。</p>
<p>下記のフォームから、書類の内容を確認して回答してください。人事に関わる内容のため、他の教職員や学生には伝えないでください。</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">書類確認フォーム</a></p>
<p>久保田 隆<br>理工学研究科長</p>`,
  },

  /**
   * trap-3-ja: TA仲間を装う（個人的な依頼）
   * 設計タグ: free_mail_sender / attachment_double_ext / fake_reply_thread
   * TrapType へ: domain / extension（fake_reply_thread は該当なし→件名 Re: と本文の引用で表現）
   */
  {
    id: 'trap-3-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: '李 明', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: 第5回レポート採点の件',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>お疲れさま。同じTAの李です。</p>
<p>前に言っていた第5回レポートの採点メモを、修正した版を送ります。基準がこれで合っているか、見てもらえますか?</p>
<p>李</p>
<hr>
<p style="color:#666">> 前回のメールより<br>> 第5回のレポート、採点基準をもう一度そろえたいです。修正したら、送ってもらえますか?</p>`,
    attachments: [{ name: '第5回_採点メモ_修正版.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  /**
   * trap-4-ja: 情報センターを装う（事務的）
   * 設計タグ: sender_domain_typo / link_text_mismatch / threat_deadline
   * TrapType へ: domain / link / urgency
   * 正規: @ccmailg.meijo-u.ac.jp / 偽装: @ccmallg...（mail→mall）
   */
  {
    id: 'trap-4-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: '情報センター セキュリティ担当', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【情報センター】アカウントの本人確認のお願い',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>TA担当者 各位</p>
<p>情報センターです。お使いのアカウントに、不正なログインの試行を検知しました。</p>
<p>安全のため、<strong>24時間以内</strong>に下記のリンクから本人確認を行ってください。確認が取れない場合、アカウントの利用を一時停止します。</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>情報センター セキュリティ担当</p>`,
  },
]

/**
 * 英語版メール（通常4通 + 罠4通）
 * 日本在籍の留学生TAとして自然な英語シナリオ。日本語版と攻撃タイプは等価。
 */
export const emailsEn: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Prof. Tanaka（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: "Change to next week's seminar schedule",
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Dear TAs,</p>
<p>This is Tanaka. Because of a campus event, the seminar for the exercise course I teach, scheduled for {{D+7}}, will be moved to 3rd period on {{D+8}}.</p>
<p>I have attached the revised schedule. Please reply by {{D+3}} to let me know whether you can attend as a TA. If you cannot, I will arrange another day.</p>
<p>Best regards,</p>
<p>Seiji Tanaka<br>Department of Information Engineering</p>`,
    attachments: [{ name: 'Seminar_Schedule_Revised.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Academic Affairs Office（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Academic Affairs Office', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'How to submit your TA work report',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Academic Affairs Office. Here is how to submit your TA work report for this month.</p>
<p>Please log in to the campus portal through the link below and enter your working days and hours on the work report form.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA work report form (campus portal)</a></p>
<p>The submission deadline is {{D+7}}. If you have any questions, please contact the Academic Affairs Office.</p>
<p>Academic Affairs Office</p>`,
    attachments: [],
  },

  // normal 3: International Center（事務的・正規PDF添付）
  {
    id: 'normal-3-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'International Center', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Winter break closure schedule',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Dear international students and TAs,</p>
<p>This is the International Center. We would like to let you know how our office will operate during the winter break.</p>
<p>Please see the attached PDF for details. During the break, replies to e-mail inquiries may be delayed.</p>
<p>International Center</p>`,
    attachments: [{ name: 'Winter_Break_Notice.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Shared the TA training materials',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Hi, this is Sato, one of the other TAs.</p>
<p>I put the materials from last week's TA training together on Google Drive. Could you check that you can open them?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA training materials (Google Drive)</a></p>
<p>If anything is missing, please let me know.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Student Support Office を装う / domain・extension・urgency
  {
    id: 'trap-1-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Student Support Office, TA Allowance', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Important] Confirmation of your bank account for the TA allowance (today)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Student Support Office. To pay this month's TA allowance, we have not yet been able to confirm the bank account information registered for you.</p>
<p>Please fill in your account details on the attached form and return it <strong>by 5:00 p.m. today</strong>. If the deadline is missed, this month's payment will be postponed to next month or later.</p>
<p>Student Support Office, TA Allowance</p>`,
    attachments: [{ name: 'TA_Allowance_Bank_Details_Form.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Urgent: request for confirmation (please keep confidential)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>To the TA,</p>
<p>This is Kubota. I am in a meeting and cannot take calls. There is something I urgently need you to confirm about documents related to your TA work.</p>
<p>Please review the documents and respond using the form below. Because this concerns personnel matters, please do not mention it to other faculty members or students.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Document confirmation form</a></p>
<p>Takashi Kubota<br>Dean, Graduate School of Science and Technology</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Ming Li', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Grading Report 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Hi, Li here, another TA.</p>
<p>I am sending the revised version of the grading notes for Report 5 that I mentioned before. Could you check whether the criteria look right?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; From the previous email:<br>&gt; I would like us to align the grading criteria for Report 5 again. Could you send it over once you have revised it?</p>`,
    attachments: [{ name: 'Report5_Grading_Notes_Revised.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: IT Center を装う / domain・link・urgency
  {
    id: 'trap-4-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'Information Technology Center, Security', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[IT Center] Request to verify your account identity',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Dear TAs,</p>
<p>This is the Information Technology Center. We have detected an unauthorized login attempt on your account.</p>
<p>For your safety, please verify your identity through the link below <strong>within 24 hours</strong>. If we cannot confirm your identity, your account will be temporarily suspended.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Information Technology Center, Security</p>`,
  },
]

/**
 * ドイツ語版メール（通常4通 + 罠4通）
 * 日本在籍の留学生TAとして自然なドイツ語シナリオ。日本語版と攻撃タイプ・構造は等価。
 */
export const emailsDe: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-de',
    lang: 'de',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Änderung des Seminartermins in der nächsten Woche',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Liebe TAs,</p>
<p>hier ist Tanaka. Aufgrund einer Veranstaltung an der Universität wird das Seminar meiner Übung, das für den {{D+7}} geplant war, auf den {{D+8}}, 3. Stunde, verlegt.</p>
<p>Den aktualisierten Terminplan finden Sie im Anhang. Bitte teilen Sie mir bis zum {{D+3}} per Antwort mit, ob Sie als TA teilnehmen können. Falls nicht, vereinbaren wir einen anderen Tag.</p>
<p>Mit freundlichen Grüßen</p>
<p>Seiji Tanaka<br>Fachbereich Informationstechnik</p>`,
    attachments: [{ name: 'Seminarplan_Aktualisiert.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Studienbüro（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-de',
    lang: 'de',
    isTrap: false,
    traps: [],
    from: { display: 'Studienbüro', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'So reichen Sie den TA-Arbeitsbericht ein',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist das Studienbüro. Wir erklären Ihnen, wie Sie den TA-Arbeitsbericht für diesen Monat einreichen.</p>
<p>Melden Sie sich über den folgenden Link im Portal der Universität an und tragen Sie im Berichtsformular Ihre Arbeitstage und Arbeitsstunden ein.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Formular für den TA-Arbeitsbericht (Universitätsportal)</a></p>
<p>Die Einreichungsfrist ist der {{D+7}}. Bei Fragen wenden Sie sich bitte an den Schalter des Studienbüros.</p>
<p>Studienbüro</p>`,
    attachments: [],
  },

  // normal 3: Internationales Zentrum（事務的・正規PDF添付）
  {
    id: 'normal-3-de',
    lang: 'de',
    isTrap: false,
    traps: [],
    from: { display: 'Internationales Zentrum', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Hinweis zur Schließung in der Winterpause',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Sehr geehrte internationale Studierende und TAs,</p>
<p>hier ist das Internationale Zentrum. Wir informieren Sie über den Betrieb unseres Büros während der Winterpause.</p>
<p>Einzelheiten entnehmen Sie bitte dem angehängten PDF. In der Winterpause kann sich die Beantwortung von E-Mail-Anfragen verzögern.</p>
<p>Internationales Zentrum</p>`,
    attachments: [{ name: 'Hinweis_Winterpause.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-de',
    lang: 'de',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Ich habe die Unterlagen der TA-Schulung geteilt',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Hallo, hier ist Sato, ein anderer TA.</p>
<p>Ich habe die Unterlagen der TA-Schulung von letzter Woche auf Google Drive zusammengestellt. Kannst du prüfen, ob du sie öffnen kannst?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Unterlagen der TA-Schulung (Google Drive)</a></p>
<p>Sag mir Bescheid, falls etwas fehlt.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Studierendenservice を装う / domain・extension・urgency
  {
    id: 'trap-1-de',
    lang: 'de',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Studierendenservice – TA-Vergütung', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Wichtig] Bestätigung Ihres Bankkontos für die TA-Vergütung (heute)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist der Studierendenservice. Für die Auszahlung der TA-Vergütung dieses Monats konnten wir die hinterlegten Bankdaten nicht bestätigen.</p>
<p>Bitte tragen Sie Ihre Kontodaten in das angehängte Formular ein und senden Sie es <strong>heute bis 17:00 Uhr</strong> zurück. Bei Fristüberschreitung wird die Auszahlung für diesen Monat auf den nächsten Monat oder später verschoben.</p>
<p>Studierendenservice – TA-Vergütung</p>`,
    attachments: [{ name: 'Formular_Kontobestaetigung_TA_Verguetung.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-de',
    lang: 'de',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Dringend: Bitte um Bestätigung (bitte vertraulich behandeln)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Guten Tag,</p>
<p>hier ist Kubota. Ich befinde mich in einer Besprechung und kann nicht telefonieren. Es gibt etwas, das ich dringend von Ihnen bestätigt haben möchte, und zwar zu Unterlagen, die Ihre TA-Tätigkeit betreffen.</p>
<p>Bitte prüfen Sie die Unterlagen und antworten Sie über das folgende Formular. Da es sich um Personalangelegenheiten handelt, bitte ich Sie, anderen Lehrenden oder Studierenden nichts davon zu sagen.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Formular zur Bestätigung der Unterlagen</a></p>
<p>Takashi Kubota<br>Leiter der Graduiertenschule für Naturwissenschaften und Technik</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-de',
    lang: 'de',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'AW: Bewertung von Bericht 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Hallo, hier ist Li, ein anderer TA.</p>
<p>Ich schicke dir die überarbeitete Fassung der Bewertungsnotizen zu Bericht 5, von denen ich vorher gesprochen hatte. Kannst du prüfen, ob die Kriterien passen?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Aus der vorherigen E-Mail:<br>&gt; Ich möchte die Bewertungskriterien für Bericht 5 noch einmal abstimmen. Kannst du sie mir schicken, wenn du sie überarbeitet hast?</p>`,
    attachments: [{ name: 'Bewertungsnotizen_Bericht5_Ueberarbeitet.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: IT-Zentrum を装う / domain・link・urgency
  {
    id: 'trap-4-de',
    lang: 'de',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'IT-Zentrum – Sicherheit', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[IT-Zentrum] Bitte um Bestätigung Ihrer Kontoidentität',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Sehr geehrte TAs,</p>
<p>hier ist das IT-Zentrum. Wir haben einen unbefugten Anmeldeversuch bei Ihrem Konto festgestellt.</p>
<p>Zu Ihrer Sicherheit bestätigen Sie bitte Ihre Identität über den folgenden Link <strong>innerhalb von 24 Stunden</strong>. Wenn wir Ihre Identität nicht bestätigen können, wird Ihr Konto vorübergehend gesperrt.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>IT-Zentrum – Sicherheit</p>`,
  },
]

/**
 * 韓国語版メール（通常4通 + 罠4通）
 * 日本在住の韓国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する韓国人留学生TA
 */
export const emailsKo: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 교수（개인적 의뢰・회신 필요・정규 PDF 첨부）
  {
    id: 'normal-1-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '다나카 세이지', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '다음 주 세미나 일정 변경 안내',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>TA 여러분께</p>
<p>다나카입니다. 제가 담당하는 연습 과목의 세미나가 학내 행사로 인해, {{D+7}}에 예정되어 있던 일정에서 {{D+8}} 3교시로 변경되었습니다.</p>
<p>변경된 일정표를 첨부합니다. TA로 참석 가능하신지 {{D+3}}까지 회신으로 알려 주세요. 어려운 경우에는 다른 날로 조정하겠습니다.</p>
<p>잘 부탁드립니다.</p>
<p>다나카 세이지<br>정보공학부 정보공학과</p>`,
    attachments: [{ name: '세미나_일정_변경본.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: 학무과（사무적・정규 링크・기한 여유）
  {
    id: 'normal-2-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '학무과', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'TA 근무 보고 제출 방법 안내',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>학무과입니다. 이번 달 TA 근무 보고서의 제출 방법을 안내드립니다.</p>
<p>아래 링크에서 학내 포털의 근무 보고 양식에 로그인하여 근무일과 근무 시간을 입력해 주세요.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA 근무 보고 양식(학내 포털)</a></p>
<p>제출 기한은 {{D+7}}입니다. 궁금한 점이 있으시면 학무과 창구로 문의해 주세요.</p>
<p>학무과</p>`,
    attachments: [],
  },

  // normal 3: 국제센터（사무적・정규 PDF 첨부）
  {
    id: 'normal-3-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '국제센터', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '동계 휴업 기간 안내',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>유학생·TA 여러분께</p>
<p>국제센터입니다. 동계 휴업 기간 중의 창구 운영에 대해 알려드립니다.</p>
<p>자세한 내용은 첨부된 PDF를 확인해 주세요. 휴업 기간 중에는 이메일 문의에 대한 답변이 늦어질 수 있습니다.</p>
<p>국제센터</p>`,
    attachments: [{ name: '동계휴업_안내.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA 동료・개인적 의뢰・정규 Drive 링크）
  {
    id: 'normal-4-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '사토 겐타', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'TA 연수 자료 공유했어요',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>수고 많으세요. 같은 TA인 사토예요.</p>
<p>지난주 TA 연수 자료를 구글 드라이브에 정리해 두었어요. 열리는지 확인해 주실 수 있나요?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA 연수 자료(구글 드라이브)</a></p>
<p>부족한 자료가 있으면 알려 주세요.</p>
<p>사토</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: 학생지원과 사칭 / domain・extension・urgency
  {
    id: 'trap-1-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: '학생지원과 TA 수당 담당', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[중요] TA 수당 입금 계좌 확인 요청(오늘 중)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>학생지원과입니다. 이번 달 TA 수당을 입금하는 데 있어, 등록되어 있는 계좌 정보를 확인하지 못했습니다.</p>
<p>첨부된 확인서에 계좌 정보를 기재하여 <strong>오늘 오후 5시까지</strong> 회신해 주세요. 기한이 지나면 이번 달 수당 입금은 다음 달 이후로 연기됩니다.</p>
<p>학생지원과 TA 수당 담당</p>`,
    attachments: [{ name: 'TA수당_계좌확인서.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota 사칭 / domain・link・urgency・authority
  {
    id: 'trap-2-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '구보타 다카시', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '긴급: 확인 부탁드립니다(비밀로 해 주세요)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>TA 담당자께</p>
<p>구보타입니다. 지금 회의 중이라 자리를 비울 수 없어 전화를 받지 못합니다. TA 업무와 관련된 서류에 대해 급히 확인해 주셨으면 하는 것이 있습니다.</p>
<p>아래 양식에서 서류 내용을 확인하고 회신해 주세요. 인사와 관련된 내용이므로, 다른 교직원이나 학생에게는 말하지 말아 주세요.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">서류 확인 양식</a></p>
<p>구보타 다카시<br>이공학연구과장</p>`,
  },

  // trap 3: TA 동료 사칭 / domain・extension
  {
    id: 'trap-3-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: '리밍', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: 제5회 리포트 채점 건',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>안녕하세요, 같은 TA인 리예요.</p>
<p>전에 말했던 제5회 리포트 채점 메모를 수정한 버전으로 보내요. 기준이 이 정도면 맞는지 봐 주실 수 있나요?</p>
<p>리</p>
<hr>
<p style="color:#666">&gt; 이전 메일에서<br>&gt; 제5회 리포트 채점 기준을 다시 한번 맞추고 싶어요. 수정하면 보내 주실 수 있나요?</p>`,
    attachments: [{ name: '제5회_채점메모_수정본.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: 정보센터 사칭 / domain・link・urgency
  {
    id: 'trap-4-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: '정보센터 보안 담당', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[정보센터] 계정 본인 확인 요청',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>정보센터입니다. 사용 중이신 계정에서 비정상적인 로그인 시도가 감지되었습니다.</p>
<p>안전을 위해 <strong>24시간 이내</strong>에 아래 링크에서 본인 확인을 해 주세요. 확인이 되지 않으면 계정 이용이 일시 중지됩니다.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>정보센터 보안 담당</p>`,
  },
]

/**
 * 中国語版メール（通常4通 + 罠4通）
 * 日本在住の中国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する中国人留学生TA
 */
export const emailsZh: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '田中诚二', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '关于下周研讨课日程变更的通知',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>各位TA：</p>
<p>我是田中。因校内活动，我负责的练习课程原定于{{D+7}}的研讨课，改至{{D+8}}第3节课。</p>
<p>修改后的日程表见附件。请在{{D+3}}前回复告知您是否能以TA身份参加。如果不方便，我们再另行安排其他日期。</p>
<p>谨上</p>
<p>田中诚二<br>信息工学部 信息工学科</p>`,
    attachments: [{ name: '研讨课日程_修改版.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: 教务处（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '教务处', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '关于提交TA工作报告的方法',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>各位TA：</p>
<p>我们是教务处。现将本月TA工作报告的提交方法通知如下。</p>
<p>请通过下方链接登录校内门户网站，在工作报告表格中填写工作日期和工作时长。</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA工作报告表格（校内门户）</a></p>
<p>提交截止日期为{{D+7}}。如有疑问，请到教务处窗口咨询。</p>
<p>教务处</p>`,
    attachments: [],
  },

  // normal 3: 国际交流中心（事務的・正規PDF添付）
  {
    id: 'normal-3-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '国际交流中心', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '关于寒假休业期间的通知',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>各位留学生及TA：</p>
<p>我们是国际交流中心。现将寒假休业期间的窗口办公安排通知如下。</p>
<p>详情请见附件PDF。休业期间，邮件咨询的回复可能会有所延迟。</p>
<p>国际交流中心</p>`,
    attachments: [{ name: '寒假休业通知.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '佐藤健太', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'TA培训资料已共享',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>你好，我是同为TA的佐藤。</p>
<p>我把上周TA培训的资料整理到了Google Drive上。你能确认一下是否可以打开吗？</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA培训资料（Google Drive）</a></p>
<p>如果缺少什么资料，请告诉我。</p>
<p>佐藤</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: 学生支援课 を装う / domain・extension・urgency
  {
    id: 'trap-1-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: '学生支援课 TA津贴负责', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【重要】关于确认TA津贴汇款账户（今日内）',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>各位TA：</p>
<p>我们是学生支援课。为发放本月TA津贴，我们尚未能确认已登记的银行账户信息。</p>
<p>请在附件的确认表中填写账户信息，并于<strong>今天下午5点前</strong>回复。逾期的话，本月津贴将推迟到下个月或之后发放。</p>
<p>学生支援课 TA津贴负责</p>`,
    attachments: [{ name: 'TA津贴_账户确认表.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '久保田隆', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '紧急：请求确认（请保密）',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>您好：</p>
<p>我是久保田。我正在开会，无法接电话。关于与您TA工作相关的文件，有一件事需要您紧急确认。</p>
<p>请查看文件，并通过下方表格回复。由于涉及人事问题，请不要告知其他教职员工或学生。</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">文件确认表格</a></p>
<p>久保田隆<br>理工学研究科长</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: '李明', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '回复：关于第5次报告评分',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>你好，我是同为TA的李。</p>
<p>把之前说过的第5次报告评分笔记的修改版发给你。你能帮我看看评分标准是否合适吗？</p>
<p>李</p>
<hr>
<p style="color:#666">&gt; 来自上一封邮件：<br>&gt; 我想再统一一下第5次报告的评分标准。修改好之后，能发给我吗？</p>`,
    attachments: [{ name: '第5次_评分笔记_修改版.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: 信息中心 を装う / domain・link・urgency
  {
    id: 'trap-4-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: '信息中心 安全负责', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【信息中心】请求确认账户身份',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>各位TA：</p>
<p>我们是信息中心。我们检测到您的账户存在异常登录尝试。</p>
<p>为了账户安全，请在<strong>24小时内</strong>通过下方链接确认身份。如果无法确认，您的账户将被暂时停用。</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>信息中心 安全负责</p>`,
  },
]

/**
 * イタリア語版メール（通常4通 + 罠4通）
 * 日本在住のイタリア語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するイタリア人留学生TA
 */
export const emailsIt: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Modifica del programma del seminario della prossima settimana',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Gentili TA,</p>
<p>sono Tanaka. A causa di un evento universitario, il seminario del corso di esercitazioni di cui sono responsabile, previsto per {{D+7}}, è stato spostato a {{D+8}}, alla terza ora.</p>
<p>In allegato trovate il programma aggiornato. Vi chiedo di rispondere entro {{D+3}} per farmi sapere se potete partecipare come TA. Se non fosse possibile, concorderemo un altro giorno.</p>
<p>Cordiali saluti,</p>
<p>Seiji Tanaka<br>Dipartimento di Ingegneria dell'Informazione</p>`,
    attachments: [{ name: 'Programma_Seminario_Aggiornato.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Ufficio Affari Accademici（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Ufficio Affari Accademici', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Come inviare il rapporto di lavoro TA',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Gentili TA,</p>
<p>qui l'Ufficio Affari Accademici. Vi indichiamo come inviare il rapporto di lavoro TA di questo mese.</p>
<p>Accedete al portale dell'ateneo tramite il link seguente e inserite i giorni e le ore di lavoro nel modulo del rapporto.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Modulo rapporto di lavoro TA (portale dell'ateneo)</a></p>
<p>La scadenza è {{D+7}}. Per qualsiasi domanda, rivolgetevi allo sportello dell'Ufficio Affari Accademici.</p>
<p>Ufficio Affari Accademici</p>`,
    attachments: [],
  },

  // normal 3: Centro Internazionale（事務的・正規PDF添付）
  {
    id: 'normal-3-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Centro Internazionale', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Chiusura per le vacanze invernali',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Gentili studenti internazionali e TA,</p>
<p>qui il Centro Internazionale. Vi informiamo sul funzionamento del nostro ufficio durante le vacanze invernali.</p>
<p>Per i dettagli consultate il PDF allegato. Durante il periodo di chiusura, le risposte alle richieste via e-mail potrebbero subire dei ritardi.</p>
<p>Centro Internazionale</p>`,
    attachments: [{ name: 'Avviso_Chiusura_Invernale.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Ho condiviso i materiali della formazione TA',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Ciao, sono Sato, un altro TA.</p>
<p>Ho raccolto su Google Drive i materiali della formazione TA della settimana scorsa. Puoi controllare se riesci ad aprirli?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiali della formazione TA (Google Drive)</a></p>
<p>Se manca qualcosa, fammelo sapere.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Ufficio Supporto agli Studenti を装う / domain・extension・urgency
  {
    id: 'trap-1-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Ufficio Supporto agli Studenti – Indennità TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: "[Importante] Conferma del conto bancario per l'indennità TA (oggi)",
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Gentili TA,</p>
<p>qui l'Ufficio Supporto agli Studenti. Per il pagamento dell'indennità TA di questo mese, non siamo riusciti a confermare i dati del conto bancario registrato.</p>
<p>Compilate il modulo allegato con i dati del conto e restituitelo <strong>entro le 17:00 di oggi</strong>. Se la scadenza non verrà rispettata, il pagamento di questo mese sarà rinviato al mese successivo o oltre.</p>
<p>Ufficio Supporto agli Studenti – Indennità TA</p>`,
    attachments: [{ name: 'Modulo_Verifica_Conto_Indennita_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Urgente: richiesta di conferma (si prega di mantenere la riservatezza)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Gentile TA,</p>
<p>sono Kubota. Sono in riunione e non posso rispondere al telefono. C'è una cosa che devo farle confermare con urgenza riguardo ai documenti relativi al suo lavoro di TA.</p>
<p>Verifichi i documenti e risponda tramite il modulo qui sotto. Trattandosi di una questione di personale, la prego di non parlarne con altri docenti o studenti.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Modulo di conferma dei documenti</a></p>
<p>Takashi Kubota<br>Direttore della Scuola di Studi Superiori in Scienze e Tecnologie</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'R: Valutazione del Report 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Ciao, sono Li, un altro TA.</p>
<p>Ti mando la versione rivista delle note di valutazione del Report 5 di cui parlavamo. Puoi controllare se i criteri ti sembrano giusti?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Dall'e-mail precedente:<br>&gt; Vorrei allineare di nuovo i criteri di valutazione del Report 5. Me li puoi mandare quando li hai rivisti?</p>`,
    attachments: [{ name: 'Note_Valutazione_Report5_Riviste.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: Centro Informatico を装う / domain・link・urgency
  {
    id: 'trap-4-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'Centro Informatico – Sicurezza', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: "[Centro Informatico] Richiesta di verifica dell'identità dell'account",
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Gentili TA,</p>
<p>qui il Centro Informatico. Abbiamo rilevato un tentativo di accesso non autorizzato al vostro account.</p>
<p>Per la vostra sicurezza, verificate la vostra identità tramite il link seguente <strong>entro 24 ore</strong>. Se non riusciremo a confermare la vostra identità, l'account verrà sospeso temporaneamente.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Centro Informatico – Sicurezza</p>`,
  },
]

/**
 * ベトナム語版メール（通常4通 + 罠4通）
 * 日本在住のベトナム語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するベトナム人留学生TA
 */
export const emailsVi: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Tanaka Seiji', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Thay đổi lịch buổi seminar tuần sau',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Chào các bạn TA,</p>
<p>Tôi là Tanaka. Do có sự kiện của trường, buổi seminar của môn thực hành tôi phụ trách, dự kiến vào {{D+7}}, sẽ được chuyển sang {{D+8}}, tiết 3.</p>
<p>Tôi đính kèm lịch đã cập nhật. Vui lòng phản hồi trước {{D+3}} để cho tôi biết các bạn có thể tham gia với tư cách TA hay không. Nếu không được, chúng ta sẽ sắp xếp sang ngày khác.</p>
<p>Trân trọng,</p>
<p>Tanaka Seiji<br>Khoa Kỹ thuật Thông tin</p>`,
    attachments: [{ name: 'Lich_Seminar_Da_Cap_Nhat.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Phòng Đào tạo（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Phòng Đào tạo', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Hướng dẫn nộp báo cáo công việc TA',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Kính gửi các bạn TA,</p>
<p>Đây là Phòng Đào tạo. Chúng tôi xin hướng dẫn cách nộp báo cáo công việc TA của tháng này.</p>
<p>Vui lòng đăng nhập vào cổng thông tin của trường qua liên kết dưới đây và nhập ngày làm việc cùng số giờ làm việc vào biểu mẫu báo cáo.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Biểu mẫu báo cáo công việc TA (cổng thông tin của trường)</a></p>
<p>Hạn nộp là {{D+7}}. Nếu có thắc mắc, vui lòng liên hệ quầy của Phòng Đào tạo.</p>
<p>Phòng Đào tạo</p>`,
    attachments: [],
  },

  // normal 3: Trung tâm Quốc tế（事務的・正規PDF添付）
  {
    id: 'normal-3-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Trung tâm Quốc tế', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Thông báo nghỉ đông',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Kính gửi các bạn sinh viên quốc tế và TA,</p>
<p>Đây là Trung tâm Quốc tế. Chúng tôi xin thông báo về hoạt động của văn phòng trong kỳ nghỉ đông.</p>
<p>Vui lòng xem chi tiết trong tệp PDF đính kèm. Trong thời gian nghỉ, phản hồi cho các yêu cầu qua email có thể bị chậm.</p>
<p>Trung tâm Quốc tế</p>`,
    attachments: [{ name: 'Thong_Bao_Nghi_Dong.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Sato Kenta', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Mình đã chia sẻ tài liệu tập huấn TA',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Chào bạn, mình là Sato, cũng là TA.</p>
<p>Mình đã tổng hợp tài liệu tập huấn TA tuần trước lên Google Drive. Bạn kiểm tra giúp mình xem có mở được không nhé?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Tài liệu tập huấn TA (Google Drive)</a></p>
<p>Nếu thiếu tài liệu nào, bạn cho mình biết nhé.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Phòng Hỗ trợ Sinh viên を装う / domain・extension・urgency
  {
    id: 'trap-1-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Phòng Hỗ trợ Sinh viên – Phụ cấp TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Quan trọng] Xác nhận tài khoản ngân hàng nhận phụ cấp TA (trong hôm nay)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Kính gửi các bạn TA,</p>
<p>Đây là Phòng Hỗ trợ Sinh viên. Để chi trả phụ cấp TA của tháng này, chúng tôi chưa xác nhận được thông tin tài khoản ngân hàng đã đăng ký.</p>
<p>Vui lòng điền thông tin tài khoản vào mẫu đính kèm và gửi lại <strong>trước 17:00 hôm nay</strong>. Nếu quá hạn, khoản chi trả của tháng này sẽ bị hoãn sang tháng sau hoặc muộn hơn.</p>
<p>Phòng Hỗ trợ Sinh viên – Phụ cấp TA</p>`,
    attachments: [{ name: 'Mau_Xac_Nhan_Tai_Khoan_Phu_Cap_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Kubota Takashi', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Khẩn: Đề nghị xác nhận (xin giữ bí mật)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Chào bạn,</p>
<p>Tôi là Kubota. Tôi đang họp nên không thể nghe điện thoại. Có một việc tôi cần bạn xác nhận gấp, liên quan đến các tài liệu trong công việc TA của bạn.</p>
<p>Vui lòng xem tài liệu và phản hồi qua biểu mẫu bên dưới. Vì đây là vấn đề nhân sự, xin đừng nói với các giảng viên, nhân viên hay sinh viên khác.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Biểu mẫu xác nhận tài liệu</a></p>
<p>Kubota Takashi<br>Trưởng Khoa Sau đại học Khoa học và Công nghệ</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Chấm điểm báo cáo số 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Chào bạn, mình là Li, cũng là TA.</p>
<p>Mình gửi bạn bản đã sửa của ghi chú chấm điểm báo cáo số 5 mà mình đã nhắc trước đó. Bạn xem giúp mình các tiêu chí đã đúng chưa nhé?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Từ email trước:<br>&gt; Mình muốn thống nhất lại tiêu chí chấm điểm báo cáo số 5. Sửa xong bạn gửi cho mình nhé?</p>`,
    attachments: [{ name: 'Ghi_Chu_Cham_Diem_Bao_Cao_5_Ban_Sua.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: Trung tâm CNTT を装う / domain・link・urgency
  {
    id: 'trap-4-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'Trung tâm Công nghệ Thông tin – Bảo mật', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Trung tâm CNTT] Đề nghị xác minh danh tính tài khoản',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Kính gửi các bạn TA,</p>
<p>Đây là Trung tâm Công nghệ Thông tin. Chúng tôi phát hiện có nỗ lực đăng nhập trái phép vào tài khoản của bạn.</p>
<p>Vì an toàn, vui lòng xác minh danh tính qua liên kết dưới đây <strong>trong vòng 24 giờ</strong>. Nếu không xác nhận được, tài khoản của bạn sẽ bị tạm khóa.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Trung tâm Công nghệ Thông tin – Bảo mật</p>`,
  },
]

/**
 * スペイン語版メール（通常4通 + 罠4通）
 * 日本在住のスペイン語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するスペイン語圏留学生TA
 */
export const emailsEs: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Cambio en el programa del seminario de la próxima semana',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe Tanaka. Debido a un evento de la universidad, el seminario del curso de ejercicios a mi cargo, previsto para el {{D+7}}, se traslada para el {{D+8}}, en la tercera hora.</p>
<p>Adjunto el programa actualizado. Por favor, respondan a más tardar el {{D+3}} para indicarme si pueden participar como TA. Si no les resulta posible, coordinaremos otro día.</p>
<p>Saludos cordiales,</p>
<p>Seiji Tanaka<br>Departamento de Ingeniería de la Información</p>`,
    attachments: [{ name: 'Programa_Seminario_Actualizado.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Oficina de Asuntos Académicos（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Oficina de Asuntos Académicos', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Cómo entregar el informe de trabajo de TA',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe la Oficina de Asuntos Académicos. Les explicamos cómo entregar el informe de trabajo de TA de este mes.</p>
<p>Inicien sesión en el portal de la universidad mediante el siguiente enlace e ingresen los días y las horas trabajadas en el formulario del informe.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Formulario de informe de trabajo de TA (portal de la universidad)</a></p>
<p>El plazo de entrega es el {{D+7}}. Si tienen alguna duda, consulten en la ventanilla de la Oficina de Asuntos Académicos.</p>
<p>Oficina de Asuntos Académicos</p>`,
    attachments: [],
  },

  // normal 3: Centro Internacional（事務的・正規PDF添付）
  {
    id: 'normal-3-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Centro Internacional', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Aviso de cierre por las vacaciones de invierno',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Estimados estudiantes internacionales y TA:</p>
<p>Les escribe el Centro Internacional. Les informamos sobre el funcionamiento de nuestra oficina durante las vacaciones de invierno.</p>
<p>Consulten el PDF adjunto para más detalles. Durante el cierre, las respuestas a las consultas por correo electrónico podrían demorar.</p>
<p>Centro Internacional</p>`,
    attachments: [{ name: 'Aviso_Vacaciones_de_Invierno.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'He compartido los materiales de la capacitación de TA',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Hola, soy Sato, otro TA.</p>
<p>Reuní en Google Drive los materiales de la capacitación de TA de la semana pasada. ¿Puedes comprobar si puedes abrirlos?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiales de la capacitación de TA (Google Drive)</a></p>
<p>Si falta algo, avísame.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Oficina de Apoyo Estudiantil を装う / domain・extension・urgency
  {
    id: 'trap-1-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Oficina de Apoyo Estudiantil – Asignación de TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Importante] Confirmación de su cuenta bancaria para la asignación de TA (hoy)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe la Oficina de Apoyo Estudiantil. Para efectuar el pago de la asignación de TA de este mes, no hemos podido confirmar los datos de la cuenta bancaria registrada.</p>
<p>Completen el formulario adjunto con los datos de su cuenta y devuélvanlo <strong>antes de las 17:00 de hoy</strong>. Si vence el plazo, el pago de este mes se aplazará al mes siguiente o más adelante.</p>
<p>Oficina de Apoyo Estudiantil – Asignación de TA</p>`,
    attachments: [{ name: 'Formulario_Verificacion_Cuenta_Asignacion_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Urgente: solicitud de confirmación (por favor, manténgalo en confidencialidad)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Estimado TA:</p>
<p>Le escribe Kubota. Estoy en una reunión y no puedo atender llamadas. Necesito que confirme con urgencia un asunto sobre documentos relacionados con su trabajo de TA.</p>
<p>Revise los documentos y responda mediante el formulario de abajo. Como se trata de un asunto de personal, le pido que no lo comente con otros docentes ni estudiantes.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Formulario de confirmación de documentos</a></p>
<p>Takashi Kubota<br>Director de la Escuela de Posgrado de Ciencias y Tecnología</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'RE: Calificación del informe 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Hola, soy Li, otro TA.</p>
<p>Te envío la versión corregida de las notas de calificación del informe 5 que mencioné antes. ¿Puedes revisar si los criterios te parecen correctos?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Del correo anterior:<br>&gt; Me gustaría unificar de nuevo los criterios de calificación del informe 5. ¿Me los puedes enviar cuando los hayas revisado?</p>`,
    attachments: [{ name: 'Notas_Calificacion_Informe5_Revisadas.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: Centro de Informática を装う / domain・link・urgency
  {
    id: 'trap-4-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'Centro de Informática – Seguridad', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Centro de Informática] Solicitud de verificación de identidad de su cuenta',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe el Centro de Informática. Hemos detectado un intento de acceso no autorizado a su cuenta.</p>
<p>Por su seguridad, verifiquen su identidad mediante el siguiente enlace <strong>dentro de las próximas 24 horas</strong>. Si no podemos confirmar su identidad, su cuenta se suspenderá temporalmente.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Centro de Informática – Seguridad</p>`,
  },
]

/**
 * ポーランド語版メール（通常4通 + 罠4通）
 * 日本在住のポーランド語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するポーランド人留学生TA
 */
export const emailsPl: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Zmiana terminu seminarium w przyszłym tygodniu',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Drodzy TA,</p>
<p>tu Tanaka. Ze względu na wydarzenie na uczelni seminarium w prowadzonych przeze mnie ćwiczeniach, zaplanowane na {{D+7}}, zostaje przeniesione na {{D+8}}, na 3. godzinę zajęć.</p>
<p>W załączniku przesyłam zaktualizowany harmonogram. Proszę o odpowiedź do {{D+3}} z informacją, czy mogą Państwo wziąć udział jako TA. Jeśli nie, ustalimy inny dzień.</p>
<p>Z poważaniem</p>
<p>Seiji Tanaka<br>Instytut Inżynierii Informacyjnej</p>`,
    attachments: [{ name: 'Harmonogram_Seminarium_Zaktualizowany.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Dziekanat（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Dziekanat', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Jak złożyć sprawozdanie z pracy TA',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Szanowni Państwo,</p>
<p>tu Dziekanat. Informujemy, jak złożyć sprawozdanie z pracy TA za ten miesiąc.</p>
<p>Prosimy o zalogowanie się do portalu uczelni za pomocą poniższego linku i wpisanie dni oraz godzin pracy w formularzu sprawozdania.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Formularz sprawozdania z pracy TA (portal uczelni)</a></p>
<p>Termin składania to {{D+7}}. W razie pytań prosimy o kontakt z okienkiem Dziekanatu.</p>
<p>Dziekanat</p>`,
    attachments: [],
  },

  // normal 3: Centrum Międzynarodowe（事務的・正規PDF添付）
  {
    id: 'normal-3-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Centrum Międzynarodowe', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Informacja o zamknięciu w okresie przerwy zimowej',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Szanowni studenci zagraniczni i TA,</p>
<p>tu Centrum Międzynarodowe. Informujemy o funkcjonowaniu naszego biura w okresie przerwy zimowej.</p>
<p>Szczegóły znajdą Państwo w załączonym pliku PDF. W czasie przerwy odpowiedzi na zapytania e-mailowe mogą być opóźnione.</p>
<p>Centrum Międzynarodowe</p>`,
    attachments: [{ name: 'Informacja_Przerwa_Zimowa.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Udostępniłem materiały ze szkolenia TA',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Cześć, tu Sato, inny TA.</p>
<p>Zebrałem na Google Drive materiały z zeszłotygodniowego szkolenia TA. Możesz sprawdzić, czy da się je otworzyć?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiały ze szkolenia TA (Google Drive)</a></p>
<p>Daj znać, jeśli czegoś brakuje.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Dział Wsparcia Studentów を装う / domain・extension・urgency
  {
    id: 'trap-1-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Dział Wsparcia Studentów – Wynagrodzenie TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Ważne] Potwierdzenie konta bankowego do wypłaty wynagrodzenia TA (dzisiaj)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Szanowni Państwo,</p>
<p>tu Dział Wsparcia Studentów. Do wypłaty wynagrodzenia TA za ten miesiąc nie udało nam się potwierdzić zarejestrowanych danych konta bankowego.</p>
<p>Prosimy o uzupełnienie załączonego formularza danymi konta i odesłanie go <strong>do godz. 17:00 dzisiaj</strong>. W przypadku przekroczenia terminu wypłata za ten miesiąc zostanie przesunięta na następny miesiąc lub później.</p>
<p>Dział Wsparcia Studentów – Wynagrodzenie TA</p>`,
    attachments: [{ name: 'Formularz_Potwierdzenie_Konta_Wynagrodzenie_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Pilne: prośba o potwierdzenie (proszę zachować poufność)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Dzień dobry,</p>
<p>tu Kubota. Jestem na spotkaniu i nie mogę rozmawiać przez telefon. Muszę pilnie uzyskać potwierdzenie dotyczące dokumentów związanych z pracą TA.</p>
<p>Proszę przejrzeć dokumenty i odpowiedzieć za pomocą poniższego formularza. Ponieważ sprawa dotyczy kwestii kadrowych, proszę nie informować o niej innych wykładowców ani studentów.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Formularz potwierdzenia dokumentów</a></p>
<p>Takashi Kubota<br>Dziekan Szkoły Podyplomowej Nauki i Technologii</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'RE: Ocena raportu 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Cześć, tu Li, inny TA.</p>
<p>Przesyłam poprawioną wersję notatek do oceny raportu 5, o których była mowa wcześniej. Możesz sprawdzić, czy kryteria wyglądają dobrze?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Z poprzedniej wiadomości:<br>&gt; Dobrze byłoby jeszcze raz ujednolicić kryteria oceny raportu 5. Prześlesz mi je, gdy je poprawisz?</p>`,
    attachments: [{ name: 'Notatki_Ocena_Raportu5_Poprawione.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: Centrum Informatyczne を装う / domain・link・urgency
  {
    id: 'trap-4-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'Centrum Informatyczne – Bezpieczeństwo', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Centrum Informatyczne] Prośba o potwierdzenie tożsamości konta',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Szanowni Państwo,</p>
<p>tu Centrum Informatyczne. Wykryliśmy nieautoryzowaną próbę logowania na Państwa konto.</p>
<p>Dla Państwa bezpieczeństwa prosimy o potwierdzenie tożsamości za pomocą poniższego linku <strong>w ciągu 24 godzin</strong>. Jeśli nie uda nam się potwierdzić Państwa tożsamości, konto zostanie tymczasowo zablokowane.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Centrum Informatyczne – Bezpieczeństwo</p>`,
  },
]

/**
 * ノルウェー語版メール（通常4通 + 罠4通）
 * 日本在住のノルウェー語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するノルウェー人留学生TA
 */
export const emailsNo: Email[] = [

  // ============================================================
  // 通常メール × 4通（日本語版と1対1対応）
  // ============================================================

  // normal 1: Tanaka 教授（個人的な依頼・返信が必要・正規PDF添付）
  {
    id: 'normal-1-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Endring i seminarplanen for neste uke',
    dateOffsetDays: -1, dateTime: '16:40',
    bodyHtml: `<p>Hei alle TA-er,</p>
<p>Dette er Tanaka. På grunn av et arrangement på universitetet er seminaret i øvingsemnet jeg underviser i, som var planlagt til {{D+7}}, flyttet til {{D+8}}, tredje time.</p>
<p>Jeg legger ved den oppdaterte planen. Gi meg beskjed innen {{D+3}} om du kan delta som TA. Hvis det ikke passer, finner vi en annen dag.</p>
<p>Med vennlig hilsen</p>
<p>Seiji Tanaka<br>Institutt for informasjonsteknologi</p>`,
    attachments: [{ name: 'Seminarplan_Oppdatert.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 2: Studieavdelingen（事務的・正規リンク・期限に余裕）
  {
    id: 'normal-2-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Studieavdelingen', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Slik leverer du TA-arbeidsrapporten',
    dateOffsetDays: -2, dateTime: '10:05',
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er Studieavdelingen. Her er en veiledning for hvordan du leverer TA-arbeidsrapporten for denne måneden.</p>
<p>Logg inn på universitetets portal via lenken nedenfor og fyll inn arbeidsdager og timer i rapportskjemaet.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Skjema for TA-arbeidsrapport (universitetets portal)</a></p>
<p>Fristen er {{D+7}}. Hvis du har spørsmål, kan du ta kontakt med skranken til Studieavdelingen.</p>
<p>Studieavdelingen</p>`,
    attachments: [],
  },

  // normal 3: Internasjonalt senter（事務的・正規PDF添付）
  {
    id: 'normal-3-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Internasjonalt senter', address: 'kokusai@meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Informasjon om stenging i vinterferien',
    dateOffsetDays: -3, dateTime: '13:20',
    bodyHtml: `<p>Til internasjonale studenter og TA-er,</p>
<p>Dette er Internasjonalt senter. Vi vil informere om hvordan kontoret vårt holder åpent i vinterferien.</p>
<p>Se vedlagt PDF for detaljer. I ferieperioden kan svar på e-postforespørsler bli forsinket.</p>
<p>Internasjonalt senter</p>`,
    attachments: [{ name: 'Vinterferie_Informasjon.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // normal 4: Sato（TA仲間・個人的な依頼・正規Driveリンク）
  {
    id: 'normal-4-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Jeg har delt materialet fra TA-opplæringen',
    dateOffsetDays: 0, dateTime: '08:55',
    bodyHtml: `<p>Hei, dette er Sato, en annen TA.</p>
<p>Jeg har samlet materialet fra TA-opplæringen forrige uke på Google Drive. Kan du sjekke om du får åpnet det?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiale fra TA-opplæringen (Google Drive)</a></p>
<p>Gi meg beskjed hvis noe mangler.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ============================================================
  // 罠メール × 4通（日本語版と traps / アドレス / リンク / 添付が同一）
  // ============================================================

  // trap 1: Studentstøtteavdelingen を装う / domain・extension・urgency
  {
    id: 'trap-1-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: { display: 'Studentstøtteavdelingen – TA-godtgjørelse', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Viktig] Bekreftelse av bankkonto for TA-godtgjørelse (i dag)',
    dateOffsetDays: 0, dateTime: '09:12',
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er Studentstøtteavdelingen. For å kunne utbetale TA-godtgjørelsen for denne måneden har vi ikke fått bekreftet opplysningene om den registrerte bankkontoen.</p>
<p>Fyll ut vedlagt skjema med kontoopplysningene og send det i retur <strong>innen kl. 17:00 i dag</strong>. Hvis fristen oversittes, utsettes utbetalingen for denne måneden til neste måned eller senere.</p>
<p>Studentstøtteavdelingen – TA-godtgjørelse</p>`,
    attachments: [{ name: 'TA_Godtgjorelse_Bekreftelse_Konto.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // trap 2: Dean Kubota を装う / domain・link・urgency・authority
  {
    id: 'trap-2-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Haster: Ber om bekreftelse (vennligst hold dette konfidensielt)',
    dateOffsetDays: -1, dateTime: '19:47',
    bodyHtml: `<p>Hei,</p>
<p>Dette er Kubota. Jeg sitter i et møte og kan ikke ta telefonen. Det er noe jeg haster med å få bekreftet angående dokumenter knyttet til TA-arbeidet ditt.</p>
<p>Se gjennom dokumentene og svar via skjemaet nedenfor. Siden dette gjelder personalsaker, ber jeg deg om ikke å nevne det for andre ansatte eller studenter.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Skjema for bekreftelse av dokumenter</a></p>
<p>Takashi Kubota<br>Dekan ved forskerskolen for naturvitenskap og teknologi</p>`,
  },

  // trap 3: TA仲間を装う / domain・extension
  {
    id: 'trap-3-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'SV: Vurdering av rapport 5',
    dateOffsetDays: -1, dateTime: '21:03',
    bodyHtml: `<p>Hei, dette er Li, en annen TA.</p>
<p>Jeg sender deg den reviderte versjonen av vurderingsnotatene for rapport 5 som jeg nevnte tidligere. Kan du sjekke om kriteriene ser riktige ut?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Fra forrige e-post:<br>&gt; Jeg vil gjerne samkjøre vurderingskriteriene for rapport 5 på nytt. Kan du sende dem når du har revidert dem?</p>`,
    attachments: [{ name: 'Rapport5_Vurderingsnotater_Revidert.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // trap 4: IT-senteret を装う / domain・link・urgency
  {
    id: 'trap-4-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'link', 'urgency'],
    from: { display: 'IT-senteret – Sikkerhet', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[IT-senteret] Forespørsel om bekreftelse av identiteten din',
    dateOffsetDays: 0, dateTime: '07:30',
    bodyHtml: `<p>Til alle TA-er,</p>
<p>Dette er IT-senteret. Vi har oppdaget et uautorisert påloggingsforsøk på kontoen din.</p>
<p>For sikkerhets skyld må du bekrefte identiteten din via lenken nedenfor <strong>innen 24 timer</strong>. Hvis vi ikke kan bekrefte identiteten din, vil kontoen bli midlertidig sperret.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>IT-senteret – Sikkerhet</p>`,
  },
]

/**
 * フィンランド語版メール（通常4通 + 罠4通）
 * 日本在住のフィンランド語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するフィンランド人留学生TA
 */
export const emailsFi: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-fi',
    lang: 'fi',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Mikko Virtanen', address: 'virtanen.m@meijo-u.ac.jp' },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Seminaarin aikataulumuutos – ensi viikko',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Hei,</p>
<p>Ensi maanantaina on yllättävä tiedekuntakokous, joten seminaari täytyy siirtää tiistaille klo 15:00. Huone pysyy samana (512).</p>
<p>Voisitko ilmoittaa ennen viikonloppua, pääsetkö paikalle? Pahoittelen häiriötä.</p>
<p>Ystävällisin terveisin,<br>Prof. Mikko Virtanen</p>`,
  },
  {
    id: 'normal-2-fi',
    lang: 'fi',
    isTrap: false,
    traps: [],
    from: { display: 'Opintopalvelut', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Kurssien ilmoittautumisen määräaika – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Hyvät opiskelijat,</p>
<p>Muistutamme, että ensimmäisen lukukauden kurssien ilmoittautuminen päättyy {{D+3}} klo 23:59. Tarkistakaa tilanteenne portaalista.</p>
<p>【Tarkistettavaa】<br>
・Vuotuinen opintopisteraja (48 opintopistettä) ei ylity<br>
・Kaikki pakolliset kurssit on ilmoitettu<br>
・Ei aikataulukollisioita</p>
<p>Yhteydenotot: Opintopalvelut, sisänumero 1234</p>`,
  },
  {
    id: 'normal-3-fi',
    lang: 'fi',
    isTrap: false,
    traps: [],
    from: { display: 'Yliopistokirjasto', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Muistutus: kirjojen palautuspäivä lähestyy',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Hyvä lainaaja,</p>
<p>Muistutamme, että seuraavat kirjat tulee palauttaa {{D+2}} mennessä:</p>
<p>・Kyberturvallisuuden perusteet (2. painos)<br>
・Johdatus kognitiiviseen psykologiaan</p>
<p>Voit uusia lainan kirjaston portaalin kautta (yksi uusinta sallittu).</p>`,
  },
  {
    id: 'normal-4-fi',
    lang: 'fi',
    isTrap: false,
    traps: [],
    from: { display: 'Aino Mäkinen', address: 'makinen.aino.2023@meijo-u.ac.jp' },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Jaan diat ensi viikon seminaariin',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>Hei!</p>
<p>Lähetän diani ensi viikon yhteisseminaaria varten etukäteen. Katso ne, kun sinulla on hetki aikaa!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Katso diat Google Drivessa
</a></p>
<p>Ota yhteyttä, jos sinulla on kysyttävää. Nähdään!</p>
<p>Aino</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-fi: 【BEC】Ulkomaisen toimittajan tekeytyminen
   * 罠: väärennetty verkkotunnus（oxf0rd）+ kaksoisliite（.pdf.exe）
   * Psykologinen paine: määräaika（{{D+9}} jälkeen ei hyväksytä）
   */
  {
    id: 'trap-1-fi',
    lang: 'fi',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Finland – Tuki',
      address: 'support@oxf0rd-edu-finland.com',
    },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Tärkeää] Pankkitietojen muutos – kansainvälisten opiskelijoiden tuki',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Hyvä käyttäjä,</p>
<p>Nimeni on Juhani Korhonen Oxford Education Finlandin tukitiimistä.</p>
<p>Pankkijärjestelmämme päivityksen vuoksi kansainvälisten opiskelijoiden tukimaksujen tilinumero on muuttunut. Pyydämme käyttämään seuraavassa maksussanne <strong>liitteenä olevassa vahvistusasiakirjassa</strong> olevia uusia pankkitietoja.</p>
<p><strong>※ Vanhan tilin maksusuorituksia ei hyväksytä {{D+9}} jälkeen.</strong></p>
<p>Oxford Education Finland<br>Juhani Korhonen<br>Puh: 09-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Pankkitietojen_vahvistus.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-fi: 【BEC】Auktoriteettihenkilön tekeytyminen（toimitusjohtajahuijaus）
   * 罠: ilmainen sähköpostitunnus（gmail）+ väärä linkki + kiireellisyys + auktoriteetti
   * Psykologinen paine: matkalla・tänään・luottamuksellinen
   */
  {
    id: 'trap-2-fi',
    lang: 'fi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Yoshikawa (Dekaani)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Kiireellinen – Tarvitsen apuasi tänään',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Hei,</p>
<p>Olen tällä hetkellä konferenssissa Lontoossa enkä pysty vastaamaan puheluihin. Minulla on kiireellinen asia, johon tarvitsen apuasi.</p>
<p>Ulkomaisen yliopiston kanssa tehtävään yhteistyöprojektiin liittyen minun täytyy jakaa vastuuopiskelijoiden tiedot tänään. Voisitko täyttää alla olevan linkin lomakkeen ja lähettää sen mahdollisimman pian?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Klikkaa tästä täyttääksesi lomakkeen
</a></p>
<p>Pidä tämä toistaiseksi luottamuksellisena – projektia ei ole vielä virallisesti julkistettu.</p>
<p>Kiitos,<br>Prof. Yoshikawa</p>`,
  },

  /**
   * trap-3-fi: 【Spear phishing】Sähköpostiketjun kaappaus
   * 罠: kaksoisliite（.pdf.exe）+ luottamuksen hyväksikäyttö
   * Psykologinen paine: pahoittelu・työn jatkuvuus
   */
  {
    id: 'trap-3-fi',
    lang: 'fi',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Ville Heikkinen（M1-opiskelija, Tietotekniikka）',
      address: 'heikkinen.ville.2024@gmail.com',
    },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Puuttuvat asiakirjat stipendihakemuksessa',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Hei,</p>
<p>Olen korjannut kaikki kohdat, jotka mainitsit. Pahoittelen vaivannäköä!</p>
<p>Lähetän korjatut asiakirjat salasanasuojattuna ZIP-tiedostona.<br>
Salasana: <strong>2024</strong></p>
<p>Kerro, jos kaikki näyttää nyt hyvältä. Kiitos!</p>
<p>Ville</p>`,
    attachments: [{
      name: 'Stipendihakemus_Korjattu.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-fi: 【Phishing】Väärä infrastruktuuriilmoitus
   * 罠: väärennetty verkkotunnus（ccmallg vs ccmailg）+ väärä linkki + kiireellisyys
   * Psykologinen paine: epäilyttävä kirjautuminen・tänään・tili jäädytetty
   */
  {
    id: 'trap-4-fi',
    lang: 'fi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'IT-keskus – Meijo-yliopisto',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Sinä (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Kiireellinen] Tilin vahvistus vaaditaan',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>Tämä on tärkeä ilmoitus Meijo-yliopiston IT-keskukselta.</p>
<p><strong>Sähköpostitililläsi on havaittu epäilyttävää kirjautumisaktiviteettia.</strong> Tilisi suojaamiseksi pyydämme sinua suorittamaan henkilöllisyyden vahvistuksen tänään.</p>
<p>▼ Vahvista tilisi täällä<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Jos vahvistusta ei suoriteta tänään klo 23:59 mennessä, tilisi jäädytetään väliaikaisesti.</strong></p>
<p>IT-keskus – Meijo-yliopisto<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]