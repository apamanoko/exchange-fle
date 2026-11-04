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
 * 韓国語版メール（通常4通 + 罠4通）
 * 日本在住の韓国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する韓国人留学生TA
 */
export const emailsKo: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '김 민준 교수', address: 'kim.m@meijo-u.ac.jp' },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '다음 주 세미나 일정 변경 안내',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>안녕하세요.</p>
<p>다음 주 월요일에 교내 회의가 생겨서 세미나 일정을 변경해야 할 것 같습니다. 화요일 오후 3시로 변경 부탁드려도 될까요? 장소는 동일하게 512호실입니다.</p>
<p>참석 가능 여부를 이번 주 중으로 알려주시면 감사하겠습니다. 갑작스럽게 변경하게 되어 죄송합니다.</p>
<p>김 민준 교수 드림</p>`,
  },
  {
    id: 'normal-2-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '학무과', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '전기 수강 신청 마감 안내',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>재학생 여러분께</p>
<p>전기 수강 신청 기간이 {{D+3}} 23:59에 마감됩니다. 포털 사이트에서 신청 내용을 반드시 확인해 주세요.</p>
<p>【확인 사항】<br>
・연간 이수 학점 상한(48학점)을 초과하지 않았는지<br>
・필수 과목 신청 누락이 없는지<br>
・시간표 중복이 없는지</p>
<p>문의: 학무과 내선 1234</p>`,
  },
  {
    id: 'normal-3-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '부속 도서관', address: 'library@meijo-u.ac.jp' },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '대출 도서 반납 기한 안내',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>안녕하세요.</p>
<p>아래 도서의 반납 기한이 {{D+2}}로 다가왔습니다.</p>
<p>・사이버 보안의 기초와 실천<br>
・인지심리학 입문 (제2판)</p>
<p>포털 사이트 '도서관 서비스'에서 연장 신청이 가능합니다(1회 한정).</p>`,
  },
  {
    id: 'normal-4-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '이 지현', address: 'lee.jihyun.2023@meijo-u.ac.jp' },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '다음 주 발표 자료 공유드립니다',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>안녕하세요!</p>
<p>다음 주 합동 세미나에서 사용할 발표 자료를 미리 공유드립니다. 시간 되실 때 한번 봐주시면 감사하겠습니다.</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Google Drive에서 자료 보기
</a></p>
<p>궁금한 점 있으시면 편하게 연락 주세요!</p>
<p>이 지현 드림</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-ko: 【BEC】해외 벤더 사칭
   * 罠: 도메인 위장（oxf0rd）+ 이중 확장자（.pdf.exe）
   * 심리적 압박: 기한（{{D+9}} 이후 수납 불가）
   */
  {
    id: 'trap-1-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Korea 지원팀',
      address: 'support@oxf0rd-edu-korea.com',
    },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【중요】유학생 지원비 납입 계좌 변경 안내',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>안녕하세요.</p>
<p>Oxford Education Korea 지원팀 김영수입니다.</p>
<p>이번 시스템 업그레이드로 인해 유학생 지원비 납입 계좌가 변경되었습니다. 다음 번 납입 시에는 <strong>첨부된 확인서</strong>에 기재된 새 계좌를 이용해 주시기 바랍니다.</p>
<p><strong>※ {{D+9}} 이후에는 기존 계좌로의 입금을 받지 않습니다.</strong></p>
<p>Oxford Education Korea<br>김 영수<br>Tel: 02-XXXX-XXXX</p>`,
    attachments: [{
      name: '계좌변경확인서.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-ko: 【BEC】권위자 사칭（CEO 사기）
   * 罠: 무료 메일 도메인（gmail）+ 링크 위장 + 긴급성 + 권위
   * 심리적 압박: 해외 출장 중・오늘 중・기밀
   */
  {
    id: 'trap-2-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '요시카와 연구과장',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '긴급 부탁드립니다',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>안녕하세요.</p>
<p>지금 런던 학회에 참석 중이라 전화를 받기 어려운 상황입니다. 긴급하게 부탁드릴 일이 있어 메일 드립니다.</p>
<p>해외 대학과의 연계 프로젝트 관련하여 오늘 중으로 담당 학생 정보를 공유해야 합니다. 아래 링크의 양식에 입력 후 제출해 주시겠어요?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  여기를 클릭하여 양식에 입력해 주세요
</a></p>
<p>아직 공식 발표 전이므로 다른 분들께는 비밀로 해주세요.</p>
<p>잘 부탁드립니다.<br>요시카와</p>`,
  },

  /**
   * trap-3-ko: 【표적형】업무 연속 메일 탈취
   * 罠: 이중 확장자（.pdf.exe）+ 신뢰 관계 악용
   * 심리적 압박: 사과・이전 업무의 연속
   */
  {
    id: 'trap-3-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: '박 지수（정보공학연구과 M1）',
      address: 'park.jisu.2024@gmail.com',
    },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: 장학금 신청 서류 미비 사항에 대하여',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>안녕하세요.</p>
<p>지적해 주신 서류 미비 사항을 모두 수정했습니다. 불편을 드려서 정말 죄송합니다.</p>
<p>수정한 파일을 비밀번호 설정 ZIP으로 다시 보내드립니다.<br>
압축 해제 비밀번호: <strong>2024</strong></p>
<p>확인 후 문제없으시면 알려주세요. 감사합니다!</p>
<p>박 지수 드림</p>`,
    attachments: [{
      name: '장학금신청서_수정본.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-ko: 【피싱】인프라 위장 통지
   * 罠: 도메인 위장（ccmallg vs ccmailg）+ 링크 위장 + 긴급성
   * 심리적 압박: 불심 로그인 감지・당일・계정 정지
   */
  {
    id: 'trap-4-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '메이조대학 정보센터',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: '당신 (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【긴급】계정 확인이 필요합니다',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>메이조대학 정보센터에서 중요한 안내를 드립니다.</p>
<p><strong>귀하의 메일 계정에서 의심스러운 로그인이 감지되었습니다.</strong> 계정 보호를 위해 오늘 중으로 본인 확인 절차를 완료해 주시기 바랍니다.</p>
<p>▼ 본인 확인은 여기서<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ 오늘 23:59까지 절차가 완료되지 않으면 계정이 일시 정지됩니다.</strong></p>
<p>메이조대학 정보센터<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * 中国語版メール（通常4通 + 罠4通）
 * 日本在住の中国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する中国人留学生TA
 */
export const emailsZh: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '陈 明远 教授', address: 'chen.m@meijo-u.ac.jp' },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '下周研讨会时间变更通知',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>您好，</p>
<p>下周一临时有教务会议，研讨会需要调整时间，麻烦改到周二下午3点可以吗？地点不变，还是512室。</p>
<p>请这周内告知是否方便参加，给您带来不便深感抱歉。</p>
<p>陈 明远 教授</p>`,
  },
  {
    id: 'normal-2-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '教务处', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '前期选课截止通知',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>各位同学：</p>
<p>前期选课截止时间为{{D+3}}23:59，请通过门户网站确认选课内容。</p>
<p>【请确认以下事项】<br>
・年度学分上限（48学分）是否超出<br>
・必修课是否有遗漏<br>
・课程时间是否有冲突</p>
<p>如有疑问请联系教务处（内线：1234）。</p>`,
  },
  {
    id: 'normal-3-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '附属图书馆', address: 'library@meijo-u.ac.jp' },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '借阅图书还书期限提醒',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>您好，</p>
<p>以下图书的还书期限为{{D+2}}，请及时归还。</p>
<p>・《网络安全基础与实践》<br>
・《认知心理学入门》（第2版）</p>
<p>如需续借，请通过门户网站"图书馆服务"申请（限续借一次）。</p>`,
  },
  {
    id: 'normal-4-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '王 芳', address: 'wang.fang.2023@meijo-u.ac.jp' },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '下周发表资料共享',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>你好！</p>
<p>把下周联合研讨会用的发表资料提前分享给你，有时间的话先看一下吧。</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  点击查看 Google Drive 资料
</a></p>
<p>有什么问题随时联系我！</p>
<p>王 芳</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-zh: 【BEC】海外供应商冒充
   * 罠: 域名伪装（oxf0rd）+ 双重扩展名（.pdf.exe）
   * 心理压力: 截止日期（{{D+9}}后不受理）
   */
  {
    id: 'trap-1-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education China 支持团队',
      address: 'support@oxf0rd-edu-china.com',
    },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【重要】留学生支援费用收款账户变更通知',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>您好，</p>
<p>我是Oxford Education China支持团队的李建国。</p>
<p>由于系统升级，留学生支援费用的收款账户已发生变更。下次付款时，请参考<strong>附件中的确认函</strong>使用新账户信息。</p>
<p><strong>※ {{D+9}}之后将不再接受旧账户的汇款。</strong></p>
<p>Oxford Education China<br>李 建国<br>Tel: 010-XXXX-XXXX</p>`,
    attachments: [{
      name: '账户变更确认函.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-zh: 【BEC】权威人士冒充（CEO诈骗）
   * 罠: 免费邮件域名（gmail）+ 链接伪装 + 紧迫性 + 权威
   * 心理压力: 海外出差中・今日内・机密
   */
  {
    id: 'trap-2-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '吉川 研究科长',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '紧急请求帮助',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>您好，</p>
<p>我现在在伦敦参加学会，不方便接听电话。有件紧急的事想请您帮忙。</p>
<p>与海外大学的合作项目需要今天之内共享负责学生的信息。能请您填写下面表格并提交吗？</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  点击此处填写表格
</a></p>
<p>这个项目还未正式公布，请暂时保密，不要告知其他人。</p>
<p>拜托了。<br>吉川</p>`,
  },

  /**
   * trap-3-zh: 【鱼叉式网络钓鱼】业务邮件劫持
   * 罠: 双重扩展名（.pdf.exe）+ 信任关系利用
   * 心理压力: 道歉・业务连续性
   */
  {
    id: 'trap-3-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: '刘 晓明（信息工学研究科 M1）',
      address: 'liu.xiaoming.2024@gmail.com',
    },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: 关于奖学金申请材料不完整的问题',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>您好，</p>
<p>您指出的材料不完整问题我已全部修改完毕，给您添麻烦了，非常抱歉。</p>
<p>修改后的文件以加密ZIP格式重新发送。<br>
解压密码：<strong>2024</strong></p>
<p>确认后如有问题请告知，谢谢！</p>
<p>刘 晓明</p>`,
    attachments: [{
      name: '奖学金申请书_修改版.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-zh: 【网络钓鱼】基础设施伪装通知
   * 罠: 域名伪装（ccmallg vs ccmailg）+ 链接伪装 + 紧迫性
   * 心理压力: 检测到可疑登录・当天・账户暂停
   */
  {
    id: 'trap-4-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '名城大学 信息中心',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: '您（TA）', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【紧急】需要确认您的账户',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>这是名城大学信息中心发出的重要通知。</p>
<p><strong>检测到您的邮件账户存在可疑登录行为。</strong>为保护您的账户安全，请于今天之内完成本人验证手续。</p>
<p>▼ 本人验证请点击此处<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ 今天23:59前未完成验证的账户将被暂时停用。</strong></p>
<p>名城大学 信息中心<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * イタリア語版メール（通常4通 + 罠4通）
 * 日本在住のイタリア語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するイタリア人留学生TA
 */
export const emailsIt: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Marco Rossi', address: 'rossi.m@meijo-u.ac.jp' },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Cambio orario seminario – settimana prossima',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Ciao,</p>
<p>Purtroppo lunedì prossimo ho una riunione di facoltà, quindi dovrei spostare il seminario a martedì alle 15:00. La sala rimane la stessa (512).</p>
<p>Potresti farmi sapere entro questa settimana se riesci a venire? Scusa per il disagio.</p>
<p>Cordiali saluti,<br>Prof. Marco Rossi</p>`,
  },
  {
    id: 'normal-2-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Ufficio Didattica', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Scadenza iscrizione corsi – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Gentili studenti,</p>
<p>Vi ricordiamo che il periodo di iscrizione ai corsi del primo semestre termina {{D+3}} alle ore 23:59. Vi preghiamo di verificare la vostra situazione sul portale.</p>
<p>【Da verificare】<br>
・Non aver superato il limite annuale di crediti (48 CFU)<br>
・Nessun corso obbligatorio mancante<br>
・Nessuna sovrapposizione di orari</p>
<p>Per informazioni: Ufficio Didattica, int. 1234</p>`,
  },
  {
    id: 'normal-3-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Biblioteca Universitaria', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Promemoria restituzione libri',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Gentile utente,</p>
<p>Ti ricordiamo che i seguenti libri devono essere restituiti entro {{D+2}}:</p>
<p>・Fondamenti di Cybersicurezza (2ª ed.)<br>
・Introduzione alla Psicologia Cognitiva</p>
<p>È possibile rinnovare il prestito dal portale (rinnovo consentito una sola volta).</p>`,
  },
  {
    id: 'normal-4-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Giulia Ferrari', address: 'ferrari.giulia.2023@meijo-u.ac.jp' },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Slides per il seminario della settimana prossima',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>Ciao!</p>
<p>Ti mando le mie slide per il seminario della settimana prossima. Dagli un'occhiata quando hai un momento!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Visualizza le slide su Google Drive
</a></p>
<p>Scrivimi se hai domande. A presto!</p>
<p>Giulia</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-it: 【BEC】Impersonificazione fornitore estero
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   * 心理的圧力: 期限（dopo il {{D+9}} non accettato）
   */
  {
    id: 'trap-1-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Italy – Supporto',
      address: 'support@oxf0rd-edu-italy.com',
    },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Importante] Modifica coordinate bancarie – Supporto studenti internazionali',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Gentile utente,</p>
<p>Sono Marco Bianchi del team di supporto di Oxford Education Italy.</p>
<p>A seguito di un aggiornamento del nostro sistema bancario, le coordinate per il pagamento del supporto agli studenti internazionali sono state modificate. Per il prossimo pagamento, ti preghiamo di fare riferimento al <strong>documento di conferma allegato</strong>.</p>
<p><strong>※ I pagamenti sul vecchio conto non saranno accettati dopo il {{D+9}}.</strong></p>
<p>Oxford Education Italy<br>Marco Bianchi<br>Tel: 02-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Conferma_Coordinate_Bancarie.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-it: 【BEC】Impersonificazione figura autoritaria（CEO fraud）
   * 罠: free mailドメイン（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: in viaggio・oggi・riservato
   */
  {
    id: 'trap-2-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Yoshikawa (Preside)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Urgente – Ho bisogno del tuo aiuto oggi',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Ciao,</p>
<p>Sono a una conferenza a Londra e non riesco a rispondere al telefono. Ho bisogno urgentemente del tuo aiuto.</p>
<p>Per un progetto di collaborazione con un'università straniera, devo condividere le informazioni degli studenti responsabili entro oggi. Potresti compilare il modulo al link qui sotto e inviarlo il prima possibile?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Clicca qui per accedere al modulo
</a></p>
<p>Per ora ti chiedo di mantenere la massima riservatezza – il progetto non è ancora stato annunciato ufficialmente.</p>
<p>Grazie mille,<br>Prof. Yoshikawa</p>`,
  },

  /**
   * trap-3-it: 【Spear phishing】Dirottamento email di lavoro
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: scuse・continuità del lavoro
   */
  {
    id: 'trap-3-it',
    lang: 'it',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Lorenzo Bianchi（Studente M1, Ing. Informatica）',
      address: 'lorenzo.bianchi.2024@gmail.com',
    },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Documenti mancanti per la domanda di borsa di studio',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Ciao,</p>
<p>Ho corretto tutti i problemi che mi hai segnalato. Scusa tantissimo per il disturbo!</p>
<p>Ti rimando i documenti corretti in un archivio ZIP protetto da password.<br>
Password: <strong>2024</strong></p>
<p>Fammi sapere se va tutto bene questa volta. Grazie ancora!</p>
<p>Lorenzo</p>`,
    attachments: [{
      name: 'Domanda_Borsa_Corretta.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-it: 【Phishing】Notifica infrastruttura falsa
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   * 心理的圧力: accesso sospetto・oggi・sospensione account
   */
  {
    id: 'trap-4-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Centro Informatico – Università Meijo',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Tu (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Urgente] Verifica del tuo account richiesta',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>Questo è un avviso importante dal Centro Informatico dell'Università Meijo.</p>
<p><strong>È stato rilevato un accesso sospetto al tuo account email.</strong> Per proteggere il tuo account, ti chiediamo di completare la verifica dell'identità entro oggi.</p>
<p>▼ Verifica il tuo account qui<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Se la verifica non viene completata entro le 23:59 di oggi, il tuo account verrà temporaneamente sospeso.</strong></p>
<p>Centro Informatico – Università Meijo<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * ベトナム語版メール（通常4通 + 罠4通）
 * 日本在住のベトナム語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するベトナム人留学生TA
 */
export const emailsVi: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'GS. Nguyễn Minh Tuấn', address: 'nguyen.m@meijo-u.ac.jp' },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Thay đổi lịch seminar tuần tới',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Xin chào,</p>
<p>Tuần tới thứ Hai tôi có cuộc họp đột xuất nên cần thay đổi lịch seminar. Bạn có thể chuyển sang thứ Ba lúc 3 giờ chiều không? Phòng vẫn là 512.</p>
<p>Bạn cho tôi biết trước cuối tuần này nhé. Xin lỗi vì sự bất tiện này.</p>
<p>Trân trọng,<br>GS. Nguyễn Minh Tuấn</p>`,
  },
  {
    id: 'normal-2-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Phòng Đào tạo', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Thông báo hạn chót đăng ký môn học – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Kính gửi các sinh viên,</p>
<p>Thời hạn đăng ký môn học học kỳ I sẽ kết thúc vào {{D+3}} lúc 23:59. Vui lòng kiểm tra lại trên cổng thông tin.</p>
<p>【Các điểm cần kiểm tra】<br>
・Số tín chỉ không vượt quá giới hạn hàng năm (48 tín chỉ)<br>
・Không bỏ sót môn học bắt buộc<br>
・Không có xung đột lịch học</p>
<p>Liên hệ: Phòng Đào tạo, máy lẻ 1234</p>`,
  },
  {
    id: 'normal-3-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Thư viện Đại học', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Nhắc nhở: Hạn trả sách sắp đến',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Kính gửi bạn đọc,</p>
<p>Các tài liệu sau đây sẽ đến hạn trả vào {{D+2}}:</p>
<p>・Cơ sở An ninh mạng (tái bản lần 2)<br>
・Nhập môn Tâm lý học Nhận thức</p>
<p>Bạn có thể gia hạn trực tuyến qua cổng thông tin thư viện (chỉ gia hạn được một lần).</p>`,
  },
  {
    id: 'normal-4-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Nguyễn Thị Lan', address: 'nguyen.lan.2023@meijo-u.ac.jp' },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Chia sẻ tài liệu thuyết trình tuần tới',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>Chào bạn!</p>
<p>Mình chia sẻ trước tài liệu thuyết trình cho seminar chung tuần tới. Bạn xem qua khi có thời gian nhé!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Xem tài liệu trên Google Drive
</a></p>
<p>Có gì thắc mắc cứ nhắn mình nhé!</p>
<p>Lan</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-vi: 【BEC】Mạo danh nhà cung cấp nước ngoài
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   * 心理的圧力: 期限（sau ngày {{D+9}} không nhận）
   */
  {
    id: 'trap-1-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Vietnam – Hỗ trợ',
      address: 'support@oxf0rd-edu-vietnam.com',
    },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【Quan trọng】Thông báo thay đổi tài khoản ngân hàng nhận học phí hỗ trợ du học sinh',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Xin chào,</p>
<p>Tôi là Trần Văn Hùng từ bộ phận hỗ trợ của Oxford Education Vietnam.</p>
<p>Do nâng cấp hệ thống ngân hàng, tài khoản nhận thanh toán học phí hỗ trợ du học sinh đã thay đổi. Vui lòng tham khảo <strong>tài liệu xác nhận đính kèm</strong> để biết thông tin tài khoản mới cho lần thanh toán tiếp theo.</p>
<p><strong>※ Sau ngày {{D+9}}, chúng tôi sẽ không nhận thanh toán vào tài khoản cũ.</strong></p>
<p>Oxford Education Vietnam<br>Trần Văn Hùng<br>Tel: 028-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Xac_nhan_tai_khoan_moi.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-vi: 【BEC】Mạo danh người có thẩm quyền（CEO fraud）
   * 罠: free mailドメイン（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: đang công tác・hôm nay・bí mật
   */
  {
    id: 'trap-2-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'GS. Yoshikawa (Trưởng khoa)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Khẩn – Cần bạn giúp hôm nay',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Xin chào,</p>
<p>Tôi đang tham dự hội nghị ở London và không thể nghe điện thoại. Có việc khẩn cần nhờ bạn giúp.</p>
<p>Liên quan đến dự án hợp tác với trường đại học nước ngoài, tôi cần chia sẻ thông tin sinh viên phụ trách trong hôm nay. Bạn có thể điền vào biểu mẫu dưới đây và gửi càng sớm càng tốt không?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Nhấp vào đây để điền biểu mẫu
</a></p>
<p>Dự án này chưa được công bố chính thức nên hãy giữ bí mật, không chia sẻ với người khác nhé.</p>
<p>Cảm ơn bạn.<br>GS. Yoshikawa</p>`,
  },

  /**
   * trap-3-vi: 【Spear phishing】Chiếm đoạt chuỗi email công việc
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: xin lỗi・tính liên tục của công việc
   */
  {
    id: 'trap-3-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Trần Thị Mai（Sinh viên M1, Công nghệ Thông tin）',
      address: 'tran.mai.2024@gmail.com',
    },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Hồ sơ xin học bổng còn thiếu tài liệu',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Xin chào,</p>
<p>Em đã sửa tất cả những điểm thầy/cô chỉ ra rồi ạ. Xin lỗi đã gây phiền phức!</p>
<p>Em gửi lại tài liệu đã sửa dưới dạng file ZIP có mật khẩu bảo vệ.<br>
Mật khẩu giải nén: <strong>2024</strong></p>
<p>Thầy/cô xem qua và cho em biết nếu có vấn đề gì nhé. Cảm ơn thầy/cô!</p>
<p>Trần Thị Mai</p>`,
    attachments: [{
      name: 'Ho_so_hoc_bong_da_sua.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-vi: 【Phishing】Thông báo giả mạo hạ tầng
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   * 心理的圧力: đăng nhập đáng ngờ・hôm nay・tài khoản bị đình chỉ
   */
  {
    id: 'trap-4-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Trung tâm Thông tin – ĐH Meijo',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Bạn (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '【Khẩn】Cần xác minh tài khoản của bạn',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>Đây là thông báo quan trọng từ Trung tâm Thông tin Đại học Meijo.</p>
<p><strong>Đã phát hiện hoạt động đăng nhập đáng ngờ trên tài khoản email của bạn.</strong> Để bảo vệ tài khoản, vui lòng hoàn tất xác minh danh tính trong hôm nay.</p>
<p>▼ Xác minh tài khoản tại đây<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Nếu không hoàn tất xác minh trước 23:59 hôm nay, tài khoản của bạn sẽ bị tạm đình chỉ.</strong></p>
<p>Trung tâm Thông tin – ĐH Meijo<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * スペイン語版メール（通常4通 + 罠4通）
 * 日本在住のスペイン語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するスペイン語圏留学生TA
 */
export const emailsEs: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Carlos García', address: 'garcia.c@meijo-u.ac.jp' },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Cambio de horario – Seminario de la semana que viene',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Hola,</p>
<p>El lunes que viene tengo una reunión de facultad, así que necesito cambiar el seminario al martes a las 15:00. La sala sigue siendo la misma (512).</p>
<p>¿Podrías decirme antes de que acabe la semana si puedes venir? Siento las molestias.</p>
<p>Un saludo,<br>Prof. Carlos García</p>`,
  },
  {
    id: 'normal-2-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Oficina de Asuntos Académicos', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Plazo de matrícula – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Estimados estudiantes,</p>
<p>Os recordamos que el plazo de matrícula del primer semestre finaliza el {{D+3}} a las 23:59. Por favor, comprobad vuestra situación en el portal.</p>
<p>【Puntos a verificar】<br>
・No haber superado el límite anual de créditos (48 créditos)<br>
・No faltar ninguna asignatura obligatoria<br>
・No tener conflictos de horario</p>
<p>Consultas: Oficina de Asuntos Académicos, ext. 1234</p>`,
  },
  {
    id: 'normal-3-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Biblioteca Universitaria', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Recordatorio: fecha de devolución de libros',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Estimado/a usuario/a,</p>
<p>Te recordamos que los siguientes libros deben devolverse antes del {{D+2}}:</p>
<p>・Fundamentos de Ciberseguridad (2.ª ed.)<br>
・Introducción a la Psicología Cognitiva</p>
<p>Puedes renovar el préstamo desde el portal de la biblioteca (renovación permitida una sola vez).</p>`,
  },
  {
    id: 'normal-4-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'María López', address: 'lopez.maria.2023@meijo-u.ac.jp' },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Comparto las diapositivas para el seminario de la semana que viene',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>¡Hola!</p>
<p>Te mando mis diapositivas para el seminario conjunto de la semana que viene. ¡Échales un vistazo cuando puedas!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Ver diapositivas en Google Drive
</a></p>
<p>Escríbeme si tienes alguna duda. ¡Hasta pronto!</p>
<p>María</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-es: 【BEC】Suplantación de proveedor extranjero
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   * 心理的圧力: 期限（después del {{D+9}} no se acepta）
   */
  {
    id: 'trap-1-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Spain – Soporte',
      address: 'support@oxf0rd-edu-spain.com',
    },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Importante] Cambio de datos bancarios – Apoyo a estudiantes internacionales',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Estimado/a usuario/a,</p>
<p>Mi nombre es Carlos Martínez, del equipo de soporte de Oxford Education Spain.</p>
<p>Debido a una actualización de nuestro sistema bancario, los datos de pago para el apoyo a estudiantes internacionales han cambiado. Para el próximo pago, consulta el <strong>documento de confirmación adjunto</strong> para obtener los nuevos datos bancarios.</p>
<p><strong>※ Los pagos a la cuenta antigua no se aceptarán después del {{D+9}}.</strong></p>
<p>Oxford Education Spain<br>Carlos Martínez<br>Tel: 91-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Confirmacion_Datos_Bancarios.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-es: 【BEC】Suplantación de figura de autoridad（CEO fraud）
   * 罠: free mailドメイン（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: de viaje・hoy・confidencial
   */
  {
    id: 'trap-2-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Yoshikawa (Decano)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Urgente – Necesito tu ayuda hoy',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Hola,</p>
<p>Estoy en una conferencia en Londres y no puedo atender llamadas. Necesito pedirte algo urgente.</p>
<p>Para un proyecto de colaboración con una universidad extranjera, necesito compartir hoy mismo la información de los estudiantes responsables. ¿Podrías rellenar el formulario del siguiente enlace y enviarlo lo antes posible?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Haz clic aquí para acceder al formulario
</a></p>
<p>Por ahora te pido que lo mantengas en secreto, ya que el proyecto no se ha anunciado oficialmente.</p>
<p>Muchas gracias,<br>Prof. Yoshikawa</p>`,
  },

  /**
   * trap-3-es: 【Spear phishing】Secuestro de hilo de correo
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: disculpa・continuidad del trabajo
   */
  {
    id: 'trap-3-es',
    lang: 'es',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Miguel Fernández（Estudiante M1, Ing. Informática）',
      address: 'miguel.fernandez.2024@gmail.com',
    },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Documentación incompleta en la solicitud de beca',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Hola,</p>
<p>Ya he corregido todo lo que me indicaste. ¡Perdona las molestias!</p>
<p>Te reenvío los documentos corregidos en un archivo ZIP protegido con contraseña.<br>
Contraseña: <strong>2024</strong></p>
<p>Avísame si todo está bien esta vez. ¡Gracias!</p>
<p>Miguel</p>`,
    attachments: [{
      name: 'Solicitud_Beca_Corregida.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-es: 【Phishing】Notificación falsa de infraestructura
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   * 心理的圧力: acceso sospechoso・hoy・cuenta suspendida
   */
  {
    id: 'trap-4-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Centro de Informática – Universidad Meijo',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Tú (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Urgente] Se requiere verificar tu cuenta',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>Este es un aviso importante del Centro de Informática de la Universidad Meijo.</p>
<p><strong>Se ha detectado un acceso sospechoso en tu cuenta de correo.</strong> Para proteger tu cuenta, te pedimos que completes la verificación de identidad hoy mismo.</p>
<p>▼ Verifica tu cuenta aquí<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Si la verificación no se completa antes de las 23:59 de hoy, tu cuenta quedará suspendida temporalmente.</strong></p>
<p>Centro de Informática – Universidad Meijo<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * ポーランド語版メール（通常4通 + 罠4通）
 * 日本在住のポーランド語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するポーランド人留学生TA
 */
export const emailsPl: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Tomasz Kowalski', address: 'kowalski.t@meijo-u.ac.jp' },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Zmiana terminu seminarium – przyszły tydzień',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Cześć,</p>
<p>W przyszły poniedziałek mam nagłe zebranie wydziałowe, więc muszę przesunąć seminarium na wtorek o 15:00. Sala pozostaje ta sama (512).</p>
<p>Daj mi znać przed końcem tygodnia, czy możesz przyjść. Przepraszam za niedogodności.</p>
<p>Pozdrawiam,<br>Prof. Tomasz Kowalski</p>`,
  },
  {
    id: 'normal-2-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Dziekanat', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Termin rejestracji na zajęcia – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Szanowni Studenci,</p>
<p>Przypominamy, że rejestracja na zajęcia pierwszego semestru kończy się w {{D+3}} o godz. 23:59. Prosimy o sprawdzenie swojej sytuacji w portalu.</p>
<p>【Do sprawdzenia】<br>
・Czy nie przekroczono rocznego limitu punktów (48 punktów)<br>
・Czy zarejestrowano wszystkie obowiązkowe przedmioty<br>
・Czy nie ma konfliktów w planie zajęć</p>
<p>Kontakt: Dziekanat, wew. 1234</p>`,
  },
  {
    id: 'normal-3-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Biblioteka Uniwersytecka', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Przypomnienie: termin zwrotu książek',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Szanowny Czytelniku,</p>
<p>Przypominamy, że poniższe pozycje należy zwrócić do {{D+2}}:</p>
<p>・Podstawy cyberbezpieczeństwa (wyd. 2)<br>
・Wprowadzenie do psychologii poznawczej</p>
<p>Możesz przedłużyć wypożyczenie przez portal biblioteczny (tylko jedno przedłużenie).</p>`,
  },
  {
    id: 'normal-4-pl',
    lang: 'pl',
    isTrap: false,
    traps: [],
    from: { display: 'Marta Wiśniewska', address: 'wisniewska.m.2023@meijo-u.ac.jp' },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Udostępniam slajdy na przyszły tydzień',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>Cześć!</p>
<p>Udostępniam moje slajdy na wspólne seminarium w przyszłym tygodniu. Rzuć okiem, kiedy masz chwilę!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Zobacz slajdy na Google Drive
</a></p>
<p>Napisz, jeśli masz pytania. Do zobaczenia!</p>
<p>Marta</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-pl: 【BEC】Podszywanie się pod dostawcę zagranicznego
   * 罠: fałszywa domena（oxf0rd）+ podwójne rozszerzenie（.pdf.exe）
   * Presja psychologiczna: termin（po {{D+9}} nie przyjmujemy）
   */
  {
    id: 'trap-1-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Poland – Wsparcie',
      address: 'support@oxf0rd-edu-poland.com',
    },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Ważne] Zmiana danych bankowych – wsparcie dla studentów zagranicznych',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Szanowny Użytkowniku,</p>
<p>Nazywam się Piotr Nowak z działu wsparcia Oxford Education Poland.</p>
<p>W związku z aktualizacją naszego systemu bankowego zmieniliśmy numer rachunku do wpłat za wsparcie studentów zagranicznych. Przy następnej wpłacie prosimy skorzystać z nowych danych zawartych w <strong>załączonym dokumencie potwierdzającym</strong>.</p>
<p><strong>※ Po {{D+9}} płatności na stare konto nie będą przyjmowane.</strong></p>
<p>Oxford Education Poland<br>Piotr Nowak<br>Tel: 22-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Potwierdzenie_Danych_Bankowych.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-pl: 【BEC】Podszywanie się pod osobę z autorytetem（CEO fraud）
   * 罠: darmowa domena（gmail）+ fałszywy link + pilność + autorytet
   * Presja psychologiczna: w podróży・dzisiaj・poufne
   */
  {
    id: 'trap-2-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Yoshikawa (Dziekan)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Pilne – Potrzebuję Twojej pomocy dzisiaj',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Cześć,</p>
<p>Jestem teraz na konferencji w Londynie i nie mogę odbierać telefonów. Mam do Ciebie pilną prośbę.</p>
<p>W związku z projektem współpracy z zagraniczną uczelnią muszę dzisiaj udostępnić informacje o odpowiedzialnych studentach. Czy mógłbyś/mogłabyś wypełnić formularz pod poniższym linkiem i wysłać go jak najszybciej?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Kliknij tutaj, aby wypełnić formularz
</a></p>
<p>Na razie proszę zachować to w tajemnicy – projekt nie został jeszcze oficjalnie ogłoszony.</p>
<p>Dziękuję,<br>Prof. Yoshikawa</p>`,
  },

  /**
   * trap-3-pl: 【Spear phishing】Przejęcie wątku e-mail
   * 罠: podwójne rozszerzenie（.pdf.exe）+ wykorzystanie zaufania
   * Presja psychologiczna: przeprosiny・ciągłość pracy
   */
  {
    id: 'trap-3-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Aleksander Wójcik（Student M1, Informatyka）',
      address: 'wojcik.aleksander.2024@gmail.com',
    },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Brakujące dokumenty w podaniu o stypendium',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Cześć,</p>
<p>Poprawiłem wszystko, co mi wskazałeś/wskazałaś. Przepraszam za kłopot!</p>
<p>Wysyłam poprawione dokumenty jako archiwum ZIP zabezpieczone hasłem.<br>
Hasło: <strong>2024</strong></p>
<p>Daj znać, czy tym razem wszystko się zgadza. Dziękuję!</p>
<p>Aleksander</p>`,
    attachments: [{
      name: 'Podanie_Stypendium_Poprawione.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-pl: 【Phishing】Fałszywe powiadomienie o infrastrukturze
   * 罠: fałszywa domena（ccmallg vs ccmailg）+ fałszywy link + pilność
   * Presja psychologiczna: podejrzane logowanie・dzisiaj・zawieszenie konta
   */
  {
    id: 'trap-4-pl',
    lang: 'pl',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Centrum Informatyczne – Uniwersytet Meijo',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Ty (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Pilne] Wymagana weryfikacja konta',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>To ważne powiadomienie od Centrum Informatycznego Uniwersytetu Meijo.</p>
<p><strong>Na Twoim koncie e-mail wykryto podejrzane logowanie.</strong> Aby zabezpieczyć konto, prosimy o weryfikację tożsamości jeszcze dziś.</p>
<p>▼ Zweryfikuj swoje konto tutaj<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Jeśli weryfikacja nie zostanie ukończona do godz. 23:59 dzisiaj, Twoje konto zostanie tymczasowo zawieszone.</strong></p>
<p>Centrum Informatyczne – Uniwersytet Meijo<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * ノルウェー語版メール（通常4通 + 罠4通）
 * 日本在住のノルウェー語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するノルウェー人留学生TA
 */
export const emailsNo: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Erik Andersen', address: 'andersen.e@meijo-u.ac.jp' },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Endring av seminartid – neste uke',
    dateOffsetDays: -1, dateTime: '15:00',
    bodyHtml: `<p>Hei,</p>
<p>Neste mandag har jeg et uforutsett fakultetsmøte, så jeg må flytte seminaret til tirsdag kl. 15:00. Rommet er det samme (512).</p>
<p>Kan du gi meg beskjed innen slutten av denne uken om du kan komme? Beklager ulempen.</p>
<p>Med vennlig hilsen,<br>Prof. Erik Andersen</p>`,
  },
  {
    id: 'normal-2-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Studiekontoret', address: 'gakumu@meijo-u.ac.jp' },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Frist for kursregistrering – {{D+3}}',
    dateOffsetDays: -2, dateTime: '09:00',
    bodyHtml: `<p>Kjære studenter,</p>
<p>Vi minner om at kursregistreringen for første semester avsluttes {{D+3}} kl. 23:59. Vennligst sjekk din situasjon på portalen.</p>
<p>【Sjekk følgende】<br>
・At du ikke har overskredet den årlige studiepoenggrensen (48 studiepoeng)<br>
・At alle obligatoriske emner er registrert<br>
・At det ikke er timeplankollisjoner</p>
<p>Kontakt: Studiekontoret, lokal 1234</p>`,
  },
  {
    id: 'normal-3-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Universitetsbiblioteket', address: 'library@meijo-u.ac.jp' },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Påminnelse: innleveringsfrist for bøker',
    dateOffsetDays: -3, dateTime: '10:00',
    bodyHtml: `<p>Kjære låner,</p>
<p>Vi minner om at følgende bøker må leveres tilbake innen {{D+2}}:</p>
<p>・Grunnleggende cybersikkerhet (2. utg.)<br>
・Introduksjon til kognitiv psykologi</p>
<p>Du kan fornye lånet via bibliotekets portal (kun én fornyelse tillatt).</p>`,
  },
  {
    id: 'normal-4-no',
    lang: 'no',
    isTrap: false,
    traps: [],
    from: { display: 'Ingrid Larsen', address: 'larsen.ingrid.2023@meijo-u.ac.jp' },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Deler lysbildene til neste ukes seminar',
    dateOffsetDays: -4, dateTime: '18:30',
    bodyHtml: `<p>Hei!</p>
<p>Sender deg lysbildene mine til det felles seminaret neste uke. Ta en titt når du har anledning!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  Se lysbildene på Google Drive
</a></p>
<p>Ta gjerne kontakt hvis du har spørsmål. Vi sees!</p>
<p>Ingrid</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-no: 【BEC】Utgi seg for å være utenlandsk leverandør
   * 罠: falsk domene（oxf0rd）+ dobbel filtype（.pdf.exe）
   * Psykologisk press: frist（etter {{D+9}} godtas ikke）
   */
  {
    id: 'trap-1-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Norway – Support',
      address: 'support@oxf0rd-edu-norway.com',
    },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Viktig] Endring av bankdetaljer – støtte til internasjonale studenter',
    dateOffsetDays: 0, dateTime: '14:30',
    bodyHtml: `<p>Kjære bruker,</p>
<p>Jeg heter Lars Hansen og jobber i supportteamet til Oxford Education Norway.</p>
<p>På grunn av en oppgradering av banksystemet vårt har kontonummeret for innbetaling av støtte til internasjonale studenter blitt endret. Ved neste betaling ber vi deg bruke de nye bankdetaljene som finnes i <strong>vedlagt bekreftelsesdokument</strong>.</p>
<p><strong>※ Etter {{D+9}} vil ikke betalinger til den gamle kontoen bli godtatt.</strong></p>
<p>Oxford Education Norway<br>Lars Hansen<br>Tlf: 22-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Bekreftelse_Bankdetaljer.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 312,
      isTrapped: true,
    }],
  },

  /**
   * trap-2-no: 【BEC】Utgi seg for å være autoritetsperson（CEO-svindel）
   * 罠: gratis e-postdomene（gmail）+ falsk lenke + hastverk + autoritet
   * Psykologisk press: på reise・i dag・konfidensielt
   */
  {
    id: 'trap-2-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Yoshikawa (Dekan)',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Haster – Trenger din hjelp i dag',
    dateOffsetDays: -2, dateTime: '11:45',
    bodyHtml: `<p>Hei,</p>
<p>Jeg er på konferanse i London og kan ikke ta telefoner. Jeg har en hastesak jeg trenger hjelp med.</p>
<p>I forbindelse med et samarbeidsprosjekt med et utenlandsk universitet må jeg dele informasjon om ansvarlige studenter i dag. Kan du fylle ut skjemaet i lenken nedenfor og sende det så snart som mulig?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz"
      data-phished-url="/phished?type=link">
  Klikk her for å fylle ut skjemaet
</a></p>
<p>Hold dette konfidensielt foreløpig – prosjektet er ikke offisielt annonsert ennå.</p>
<p>Takk,<br>Prof. Yoshikawa</p>`,
  },

  /**
   * trap-3-no: 【Spear phishing】Kapring av e-posttråd
   * 罠: dobbel filtype（.pdf.exe）+ utnyttelse av tillit
   * Psykologisk press: unnskyldning・kontinuitet i arbeidet
   */
  {
    id: 'trap-3-no',
    lang: 'no',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Bjørn Olsen（M1-student, Informatikk）',
      address: 'olsen.bjorn.2024@gmail.com',
    },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: 'Re: Manglende dokumenter i stipendsøknaden',
    dateOffsetDays: -4, dateTime: '16:30',
    bodyHtml: `<p>Hei,</p>
<p>Jeg har rettet alt du påpekte. Beklager bryderiet!</p>
<p>Sender de rettede dokumentene som et passordbeskyttet ZIP-arkiv.<br>
Passord: <strong>2024</strong></p>
<p>Si ifra hvis alt ser greit ut denne gangen. Takk!</p>
<p>Bjørn</p>`,
    attachments: [{
      name: 'Stipendsoknad_Rettet.pdf.exe',
      mimeType: 'application/pdf',
      sizeKB: 158,
      isTrapped: true,
    }],
  },

  /**
   * trap-4-no: 【Phishing】Falsk infrastrukturvarsel
   * 罠: falsk domene（ccmallg vs ccmailg）+ falsk lenke + hastverk
   * Psykologisk press: mistenkelig pålogging・i dag・konto suspendert
   */
  {
    id: 'trap-4-no',
    lang: 'no',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'IT-senteret – Meijo Universitet',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: { display: 'Deg (TA)', address: 'ta-guest@ccmailg.meijo-u.ac.jp' },
    subject: '[Haster] Bekreftelse av konto kreves',
    dateOffsetDays: -5, dateTime: '09:00',
    bodyHtml: `<p>Dette er en viktig melding fra IT-senteret ved Meijo Universitet.</p>
<p><strong>Det er oppdaget mistenkelig påloggingsaktivitet på e-postkontoen din.</strong> For å sikre kontoen din ber vi deg fullføre identitetsbekreftelsen i dag.</p>
<p>▼ Bekreft kontoen din her<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ Hvis bekreftelsen ikke er fullført innen kl. 23:59 i dag, vil kontoen din bli midlertidig suspendert.</strong></p>
<p>IT-senteret – Meijo Universitet<br>
ccmailg.meijo-u.ac.jp</p>`,
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