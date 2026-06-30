import type { Email } from '@/types'

/**
 * 日本語版メール（通常4通 + 罠4通）
 * 全被験者共通で使用する
 */
export const emailsJa: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '田中 誠二 教授', address: 'tanaka.s@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '来週のゼミについて（日程変更のお知らせ）',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>お疲れ様です。田中です。</p><p>来週月曜日（5月27日）のゼミですが、急遽学内会議が入ったため日程を変更させてください。</p><p>変更後：5月28日（火）15:00〜17:00、研究室（8号館512）</p><p>参加可否について今週中に返信いただけますか。</p>`,
  },
  {
    id: 'normal-2-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '学務課', address: 'gakumu@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '前期履修登録の最終確認について',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>学生各位</p><p>前期の履修登録期間が2026年5月25日（月）23:59をもって終了します。</p><p>【確認事項】<br>・登録単位数の上限（年間48単位）を超えていないか<br>・必修科目が漏れなく登録されているか<br>・時間割に重複がないか</p><p>不明な点は学務課（内線: 1234）にてご相談ください。</p>`,
  },
  {
    id: 'normal-3-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '附属図書館', address: 'library@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '貸出資料の返却期限が近づいています',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>附属図書館よりお知らせです。</p><p>【返却期限：2026年5月24日（日）】<br>・サイバーセキュリティの基礎と実践<br>・認知心理学入門（第2版）</p><p>延長はポータルサイト「図書館サービス」より手続きができます（1回のみ）。</p>`,
  },
  {
    id: 'normal-4-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '学生支援課（奨学金係）', address: 'scholarship@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '【締切間近】2026年度前期 奨学金継続申請について',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>奨学金受給者の方へ</p><p>【申請期限】2026年5月30日（金）17:00</p><p>【提出書類】<br>1. 奨学金継続願（ポータルよりダウンロード）<br>2. 成績証明書（学務課にて発行）<br>3. 家族の収入証明（前年度分）</p><p>期限を過ぎると受給が停止となりますのでご注意ください。</p>`,
  },

  // ============================================================
  // 罠メール × 4通（IPA事例ベース・4攻撃タイプ）
  // ============================================================

  /**
   * trap-1-ja: 【BEC】海外ベンダーなりすまし
   * 罠: ドメイン偽装（oxf0rd） + 二重拡張子（.pdf.exe）
   */
  {
    id: 'trap-1-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education Japan サポート', address: 'support@oxf0rd-edu-japan.com' },
    to: 'あなた（TA）',
    subject: '留学生サポートシステムの口座変更に関するご確認',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>いつもお世話になっております。</p><p>このたびシステム改修に伴い、次回以降の留学生サポート費用の振込先口座を変更させていただくこととなりました。</p><p>変更後の口座情報を記載した確認書類を添付いたします。お手数ですが内容をご確認の上、次回の振込手続きにご利用ください。</p><p>Oxford Education Japan サポートチーム</p>`,
    attachments: [{
      name: '振込先変更確認書.pdf.exe',
      displayName: '振込先変更確認書.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-2-ja: 【BEC】権威者なりすまし（CEO詐欺）
   * 罠: フリーメールドメイン + リンク偽装 + 緊急性 + 権威
   */
  {
    id: 'trap-2-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '吉川 研究科長', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: 'あなた（TA）',
    subject: '至急：留学生招致プロジェクトへのご協力依頼',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>お疲れ様です。吉川です。</p><p>現在海外出張中のため電話に出られない状況です。</p><p>極秘で進めている留学生招致プロジェクトの件で、至急ご協力いただきたいことがあります。下記のスプレッドシートに対象学生の情報を入力し、今日中に共有していただけますか。</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">こちらのスプレッドシートに入力してください</a></p><p>本件は機密事項のため、他の教職員への共有はお控えください。</p>`,
  },

  /**
   * trap-3-ja: 【標的型】業務継続メールの乗っ取り
   * 罠: 二重拡張子（.pdf.exe） + 信頼関係の悪用
   */
  {
    id: 'trap-3-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: '李 明（情報工学研究科 M1）', address: 'li.ming.2024@gmail.com' },
    to: 'あなた（TA）',
    subject: 'Re: 奨学金申請書類の不備について',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>お世話になっております。李です。</p><p>先日ご指摘いただいた書類の不備について、修正が完了しました。パスワード付きZIPにて再送いたします。</p><p>解凍パスワード：<strong>2024</strong></p><p>お手数をおかけして大変申し訳ありませんでした。ご確認のほどよろしくお願いいたします。</p>`,
    attachments: [{
      name: '奨学金申請書_修正版.pdf.exe',
      displayName: '奨学金申請書_修正版.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-4-ja: 【フィッシング】インフラ偽通知
   * 罠: ドメイン偽装（ccmallg vs ccmailg） + リンク偽装 + 緊急性
   */
  {
    id: 'trap-4-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '名城大学 情報センター', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '【重要】全学メールシステムのセキュリティ更新について',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>名城大学情報センターよりご連絡いたします。</p><p>全学メールシステムのセキュリティアップデートに伴い、全ユーザーのアカウント有効化手続きが必要となりました。</p><p><strong>5月25日（日）23:59までに手続きを完了してください。期限を過ぎた場合、アカウントが一時停止となります。</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">アカウント有効化手続きはこちら</a></p>`,
  },
]

/**
 * 英語版メール（通常4通 + 罠4通）
 * 日本在籍の留学生TAとして自然な英語シナリオ。日本語版と攻撃タイプは等価。
 */
export const emailsEn: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Michael Johnson', address: 'johnson.m@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Schedule Change – Seminar Next Week',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Hi,</p><p>Just a quick heads-up that next Monday's seminar (May 27) has been moved due to a faculty meeting.</p><p>New time: Tuesday, May 28, 3:00–5:00 PM, Room 512 (Building 8)</p><p>Please let me know by Friday if you can make it. Thanks.</p><p>Prof. Johnson</p>`,
  },
  {
    id: 'normal-2-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Academic Affairs Office', address: 'academic-affairs@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Reminder: Course Registration Deadline – May 25',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Dear Students,</p><p>This is a reminder that the course registration period for the first semester ends on <strong>Monday, May 25 at 11:59 PM</strong>.</p><p>Please log in to the student portal and verify the following before the deadline:</p><p>・You have not exceeded the annual credit limit (48 credits)<br>・All required courses are registered<br>・There are no scheduling conflicts</p><p>For assistance, please visit the Academic Affairs Office (ext. 1234).</p>`,
  },
  {
    id: 'normal-3-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Meijo University Library', address: 'library@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Library Loan Reminder – Items Due Soon',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Dear Library Member,</p><p>This is a reminder that the following items are due by <strong>Sunday, May 24</strong>:</p><p>・Introduction to Cybersecurity (2nd ed.)<br>・Cognitive Psychology: A Student's Handbook</p><p>You may renew online via the Library Portal (one renewal per item). Late returns will result in borrowing restrictions.</p>`,
  },
  {
    id: 'normal-4-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Student Support Office', address: 'student-support@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Scholarship Renewal Application – Deadline Approaching',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>Dear Scholarship Recipients,</p><p>This is a reminder that the scholarship renewal application for the first semester is due by <strong>Friday, May 30 at 5:00 PM</strong>.</p><p>Required documents:<br>1. Scholarship Renewal Form (download from the portal)<br>2. Academic transcript (issued by Academic Affairs)<br>3. Household income certificate (previous fiscal year)</p><p>Failure to submit by the deadline will result in suspension of scholarship payments. Please contact the Student Support Office if you have any questions.</p>`,
  },

  // ============================================================
  // 罠メール × 4通（IPA事例ベース・4攻撃タイプ）
  // ============================================================

  /**
   * trap-1-en: 【BEC】Vendor impersonation
   * 罠: domain（springernatur-japan.com タイポスクワッティング）+ extension（.pdf.exe）
   */
  {
    id: 'trap-1-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Springer Nature Billing', address: 'billing@springernatur-japan.com' },
    to: 'You (TA)',
    subject: 'Important: Updated Bank Details for Journal Subscription Payments',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Dear Customer,</p><p>We are writing to inform you that due to a recent system migration, our bank account details for subscription payments have been updated.</p><p>Please find the updated banking information in the attached document. Kindly use these new details for all future payments.</p><p>If you have any questions, please do not hesitate to contact us.</p><p>Springer Nature Billing Team</p>`,
    attachments: [{
      name: 'Updated_Banking_Details.pdf.exe',
      displayName: 'Updated_Banking_Details.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-2-en: 【BEC】Authority impersonation (CEO fraud)
   * 罠: フリーメールドメイン（Gmail）+ リンク偽装 + 緊急性 + 権威（学部長）
   */
  {
    id: 'trap-2-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Prof. Yamamoto (Dean)', address: 'yamamoto.meijo.dean@gmail.com' },
    to: 'You (TA)',
    subject: 'Urgent: Assistance Needed – Confidential Research Project',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Hi,</p><p>I'm currently at an international conference and unable to take calls. I need your help urgently with a confidential international research project.</p><p>Could you please enter the required student information into the spreadsheet below and share it with me by end of day? This is time-sensitive.</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">Click here to access the spreadsheet</a></p><p>Please keep this matter strictly confidential and do not share it with other staff members.</p><p>Prof. Yamamoto</p>`,
  },

  /**
   * trap-3-en: 【Spear phishing】Business email compromise (thread hijacking)
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用（学生からの返信）
   */
  {
    id: 'trap-3-en',
    lang: 'en',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: 'Ahmad Karimi (M1 Student)', address: 'ahmad.karimi.2024@gmail.com' },
    to: 'You (TA)',
    subject: 'Re: Issues with Scholarship Application Documents',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Dear TA,</p><p>Thank you for pointing out the issues with my documents. I have corrected all the items you mentioned and resent the files as a password-protected ZIP.</p><p>Password: <strong>2024</strong></p><p>I apologize for the inconvenience. Please let me know if there are any remaining issues.</p><p>Ahmad Karimi<br>Graduate School of Information Science, M1</p>`,
    attachments: [{
      name: 'Scholarship_Application_Revised.pdf.exe',
      displayName: 'Scholarship_Application_Revised.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-4-en: 【Phishing】Fake infrastructure notification
   * 罠: ドメイン偽装（meijo-u-support.com）+ リンク偽装 + 緊急性 + 権威（大学IT部門）
   */
  {
    id: 'trap-4-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Meijo University IT Support', address: 'helpdesk@ccmallg.meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: '[Action Required] Microsoft 365 Account Verification',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>Dear Meijo University Account Holder,</p><p>As part of our university-wide security compliance update, all Microsoft 365 accounts must be re-verified before May 25.</p><p><strong>Accounts that are not verified by 11:59 PM on May 25 will be temporarily suspended.</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/ms365/verify">Verify your account here</a></p><p>If you have already completed verification, please disregard this message.</p>`,
  },
]

/**
 * 英語版メール・ドイツ在住日本人向け（通常4通 + 罠4通）
 * 舞台：アウクスブルク大学（Universität Augsburg）の交換留学生
 * 正規ドメイン：@uni-augsburg.de
 * 偽装ドメイン：@uni-augsburg-de.com
 */
export const emailsDe_en: Email[] = [
  {
    id: 'normal-1-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Dr. Klaus Müller', address: 'klaus.mueller@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Change of Schedule – Seminar on May 27',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Dear Exchange Students,</p><p>The seminar scheduled for Monday, May 27 has been moved due to a departmental meeting.</p><p>New time: Wednesday, May 28, 2:00–4:00 PM, Room 2103 (Building D)</p><p>Please confirm your attendance by end of this week.</p><p>Best regards,<br>Prof. Dr. Klaus Müller</p>`,
  },
  {
    id: 'normal-2-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'International Office – Universität Augsburg', address: 'international@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Reminder: Course Registration Deadline – May 25',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Dear Exchange Students,</p><p>The course registration closes on <strong>Monday, May 25 at 11:59 PM</strong>.</p><p>Please log in to Digicampus and ensure:<br>・All required courses are registered<br>・Credit limit not exceeded (30 ECTS)<br>・No scheduling conflicts</p><p>For assistance, visit the International Office (Room 1012, Building A).</p>`,
  },
  {
    id: 'normal-3-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Universitätsbibliothek Augsburg', address: 'bibliothek@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Library Notice – Borrowed Items Due Soon',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Dear Library Member,</p><p>The following items are due by <strong>Sunday, May 24</strong>:</p><p>・Cybersecurity: Principles and Practice (3rd ed.)<br>・Cognitive Psychology – An Introduction</p><p>You may renew online via the library portal (one renewal per item).</p>`,
  },
  {
    id: 'normal-4-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Studierendensekretariat – Universität Augsburg', address: 'studiensekretariat@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Reminder: DAAD Scholarship Application Deadline – May 30',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>Dear Students,</p><p>DAAD scholarship renewal applications are due by <strong>Friday, May 30 at 5:00 PM</strong>.</p><p>Required documents:<br>1. Renewal application form (download from portal)<br>2. Current transcript of records<br>3. Proof of enrollment for upcoming semester</p><p>Submit in person at Studierendensekretariat (Building A, Room 1001).</p>`,
  },
  {
    id: 'trap-1-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Elsevier Academic Billing', address: 'billing@elsevier-academlc.com' },
    to: 'You (Exchange Student)',
    subject: 'Important: Updated Payment Details for Academic Resource Access',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Dear Account Holder,</p><p>Due to our recent banking infrastructure upgrade, payment account details for your institution have been updated.</p><p>Please find the new banking information in the attached document and use it for all future transactions.</p><p>Kind regards,<br>Elsevier Academic Billing Team</p>`,
    attachments: [{
      name: 'billing_update_confirmation.pdf.exe',
      displayName: 'billing_update_confirmation.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  {
    id: 'trap-2-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Prof. Dr. Thomas Weber (Dean)', address: 'weber.augsburg.dean@gmail.com' },
    to: 'You (Exchange Student)',
    subject: 'Urgent: Help Needed – Confidential Exchange Program Review',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Dear Student,</p><p>I am at a conference in Berlin and unable to take calls. I urgently need your help with a confidential review of exchange program participants.</p><p>Please enter the required information into the document below and share it with me before 5:00 PM today.</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/3bWx">Access the review document here</a></p><p>Please keep this strictly confidential.</p><p>Prof. Dr. Weber</p>`,
  },
  {
    id: 'trap-3-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: 'Laura Becker (German Course Tutor)', address: 'laura.becker.tutor2024@gmail.com' },
    to: 'You (Exchange Student)',
    subject: 'Re: Missing Pages in Your German Course Assignment',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Hi,</p><p>I've corrected the missing pages and resending as a password-protected ZIP.</p><p>Password: <strong>2024</strong></p><p>Sorry for the confusion!</p><p>Laura Becker<br>German Language Course, Universität Augsburg</p>`,
    attachments: [{
      name: 'german_assignment_revised.pdf.exe',
      displayName: 'german_assignment_revised.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  {
    id: 'trap-4-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Universität Augsburg – IT Services', address: 'it-support@uni-augsburg-de.com' },
    to: 'You (Exchange Student)',
    subject: '[Action Required] Digicampus Account Verification – Deadline May 25',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>Dear Universität Augsburg Account Holder,</p><p>All Digicampus accounts must be re-verified by <strong>May 25</strong>.</p><p><strong>Accounts not verified by 11:59 PM on May 25 will be temporarily suspended.</strong></p><p><a href="javascript:void(0)" data-display-url="https://uni-augsburg-portal-support.com/digicampus/verify">Verify your Digicampus account here</a></p>`,
  },
]

/**
 * 韓国語版メール（通常4通 + 罠4通）
 * 日本在住の韓国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する韓国人留学生TA
 */
export const emailsKo: Email[] = [
  {
    id: 'normal-1-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '김 민준 교수', address: 'kim.m@meijo-u.ac.jp' },
    to: '당신 (TA)',
    subject: '다음 주 세미나 일정 변경 안내',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>안녕하세요.</p><p>다음 주 월요일(5월 27일) 세미나가 교내 회의로 인해 불가피하게 일정이 변경되었습니다.</p><p>변경 일시: 5월 28일(화) 15:00~17:00, 연구실(8호관 512호)</p><p>참석 가능 여부를 이번 주 안으로 회신해 주시기 바랍니다.</p><p>감사합니다.<br>김 민준 교수</p>`,
  },
  {
    id: 'normal-2-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '학무과', address: 'gakumu@meijo-u.ac.jp' },
    to: '당신 (TA)',
    subject: '전기 수강 신청 최종 확인 안내',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>재학생 여러분께</p><p>전기 수강 신청 기간이 2026년 5월 25일(월) 23:59에 종료됩니다.</p><p>【확인 사항】<br>・연간 이수 학점 상한(48학점)을 초과하지 않았는지<br>・필수 과목이 빠짐없이 신청되었는지<br>・시간표 중복이 없는지</p><p>문의 사항은 학무과(내선: 1234)로 연락해 주십시오.</p>`,
  },
  {
    id: 'normal-3-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '부속 도서관', address: 'library@meijo-u.ac.jp' },
    to: '당신 (TA)',
    subject: '대출 자료 반납 기한이 다가오고 있습니다',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>부속 도서관에서 안내드립니다.</p><p>【반납 기한: 2026년 5월 24일(일)】<br>・사이버 보안의 기초와 실践<br>・인지심리학 입문 (제2판)</p><p>연장을 원하시는 경우, 포털 사이트 '도서관 서비스'에서 신청하실 수 있습니다(1회 한정).</p>`,
  },
  {
    id: 'normal-4-ko',
    lang: 'ko',
    isTrap: false,
    traps: [],
    from: { display: '학생지원과 (장학금 담당)', address: 'scholarship@meijo-u.ac.jp' },
    to: '당신 (TA)',
    subject: '【마감 임박】2026년도 전기 장학금 계속 신청 안내',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>장학금 수혜자 여러분께</p><p>【신청 기한】2026년 5월 30일(금) 17:00</p><p>【제출 서류】<br>1. 장학금 계속 신청서(포털에서 다운로드)<br>2. 성적 증명서(학무과 발급)<br>3. 가족 소득 증명서(전년도분)</p><p>기한을 넘기면 지급이 정지되오니 주의하시기 바랍니다.</p>`,
  },
  /**
   * trap-1-ko: 【BEC】해외 벤더 사칭
   * 罠: 도메인 위장（oxf0rd）+ 이중 확장자（.pdf.exe）
   */
  {
    id: 'trap-1-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education Korea 지원팀', address: 'support@oxf0rd-edu-korea.com' },
    to: '당신 (TA)',
    subject: '유학생 지원 시스템 계좌 변경 확인 요청',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>항상 감사합니다.</p><p>이번 시스템 개편에 따라 다음 회차부터 유학생 지원 비용의 입금 계좌가 변경되었습니다.</p><p>변경된 계좌 정보가 기재된 확인 서류를 첨부하오니, 내용을 확인하신 후 다음 입금 절차에 이용해 주시기 바랍니다.</p><p>Oxford Education Korea 지원팀</p>`,
    attachments: [{
      name: '계좌변경확인서.pdf.exe',
      displayName: '계좌변경확인서.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-2-ko: 【BEC】권위자 사칭（CEO 사기）
   * 罠: 무료 메일 도메인 + 링크 위장 + 긴급성 + 권위
   */
  {
    id: 'trap-2-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '요시카와 연구과장', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: '당신 (TA)',
    subject: '긴급: 유학생 유치 프로젝트 협조 요청',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>수고하십니다. 요시카와입니다.</p><p>현재 해외 출장 중이라 전화를 받을 수 없는 상황입니다.</p><p>극비로 진행 중인 유학생 유치 프로젝트와 관련하여 긴급히 협조를 부탁드립니다. 아래 스프레드시트에 대상 학생 정보를 입력하여 오늘 중으로 공유해 주시겠습니까?</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">여기를 클릭하여 스프레드시트에 입력해 주세요</a></p><p>본 건은 기밀 사항이므로 다른 교직원에게 공유하지 마십시오.</p>`,
  },
  /**
   * trap-3-ko: 【표적형】업무 연속 메일 탈취
   * 罠: 이중 확장자（.pdf.exe）+ 신뢰 관계 악용
   */
  {
    id: 'trap-3-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: '박 지수 (정보공학연구과 M1)', address: 'park.jisu.2024@gmail.com' },
    to: '당신 (TA)',
    subject: 'Re: 장학금 신청 서류 미비 사항에 대하여',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>안녕하세요.</p><p>지적해 주신 서류 미비 사항을 수정 완료하였습니다. 보안을 위해 비밀번호가 설정된 ZIP 파일로 재송부합니다.</p><p>압축 해제 비밀번호: <strong>2024</strong></p><p>불편을 드려 대단히 죄송합니다. 확인 부탁드립니다.</p><p>박 지수<br>정보공학연구과 박사전기과정 1년</p>`,
    attachments: [{
      name: '장학금신청서_수정본.pdf.exe',
      displayName: '장학금신청서_수정본.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-4-ko: 【피싱】인프라 위장 통지
   * 罠: 도메인 위장（ccmallg vs ccmailg）+ 링크 위장 + 긴급성
   */
  {
    id: 'trap-4-ko',
    lang: 'ko',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '메이조대학 정보센터', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: '당신 (TA)',
    subject: '【중요】전학 메일 시스템 보안 업데이트 안내',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>메이조대학 정보센터에서 안내드립니다.</p><p>전학 메일 시스템 보안 업데이트에 따라 모든 사용자의 계정 활성화 절차가 필요하게 되었습니다.</p><p><strong>5월 25일(일) 23:59까지 절차를 완료해 주십시오. 기한이 지나면 계정이 일시 정지됩니다.</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">계정 활성화 절차는 여기를 클릭하세요</a></p>`,
  },
]

/**
 * 中国語版メール（通常4通 + 罠4通）
 * 日本在住の中国語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍する中国人留学生TA
 */
export const emailsZh: Email[] = [
  {
    id: 'normal-1-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '陈 教授', address: 'chen.prof@meijo-u.ac.jp' },
    to: '您（TA）',
    subject: '下周研讨会日程变更通知',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>您好，</p><p>由于临时有教务会议，下周一（5月27日）的研讨会需要调整时间，敬请谅解。</p><p>调整后时间：5月28日（周二）15:00～17:00，研究室（8号馆512室）</p><p>请于本周内回复是否能够出席。</p><p>感谢您的配合。<br>陈 教授</p>`,
  },
  {
    id: 'normal-2-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '教务处', address: 'gakumu@meijo-u.ac.jp' },
    to: '您（TA）',
    subject: '前期选课最终确认通知',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>各位同学：</p><p>前期选课截止时间为2026年5月25日（周一）23:59。</p><p>【确认事项】<br>・年度学分上限（48学分）是否超出<br>・必修课是否全部选齐<br>・课程时间是否有冲突</p><p>如有疑问，请联系教务处（内线：1234）。</p>`,
  },
  {
    id: 'normal-3-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '附属图书馆', address: 'library@meijo-u.ac.jp' },
    to: '您（TA）',
    subject: '借阅资料还书期限临近提醒',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>附属图书馆通知：</p><p>【还书期限：2026年5月24日（周日）】<br>・《网络安全基础与实践》<br>・《认知心理学入门》（第2版）</p><p>如需续借，请登录门户网站"图书馆服务"进行操作（仅限续借一次）。</p>`,
  },
  {
    id: 'normal-4-zh',
    lang: 'zh',
    isTrap: false,
    traps: [],
    from: { display: '学生支援课（奖学金系）', address: 'scholarship@meijo-u.ac.jp' },
    to: '您（TA）',
    subject: '【截止日期临近】2026年度前期奖学金续申请通知',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>奖学金受领者的同学：</p><p>【申请截止】2026年5月30日（周五）17:00</p><p>【提交材料】<br>1. 奖学金续申请表（从门户下载）<br>2. 成绩证明书（教务处开具）<br>3. 家庭收入证明（上一年度）</p><p>逾期将停止发放，请务必按时提交。</p>`,
  },
  /**
   * trap-1-zh: 【BEC】海外供应商冒充
   * 罠: 域名伪装（oxf0rd）+ 双重扩展名（.pdf.exe）
   */
  {
    id: 'trap-1-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education China 支持团队', address: 'support@oxf0rd-edu-china.com' },
    to: '您（TA）',
    subject: '留学生支援系统收款账户变更确认',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>您好，感谢您一直以来的支持。</p><p>由于系统升级，本次起留学生支援费用的汇款账户将进行变更。</p><p>请查看附件中的账户变更确认书，并在下次汇款时使用新账户信息。</p><p>如有疑问，请随时与我们联系。</p><p>Oxford Education China 支持团队</p>`,
    attachments: [{
      name: '账户变更确认书.pdf.exe',
      displayName: '账户变更确认书.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-2-zh: 【BEC】权威人士冒充（CEO诈骗）
   * 罠: 免费邮件域名 + 链接伪装 + 紧迫性 + 权威
   */
  {
    id: 'trap-2-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '吉川 研究科长', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: '您（TA）',
    subject: '紧急：留学生招募项目协助请求',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>您好，我是吉川。</p><p>目前我正在海外出差，无法接听电话。</p><p>关于正在秘密推进的留学生招募项目，需要紧急请您协助。请您在下方表格中填写目标学生信息，并于今日内共享给我。</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">请点击此处填写电子表格</a></p><p>本事项属于机密，请勿告知其他教职人员。</p>`,
  },
  /**
   * trap-3-zh: 【鱼叉式网络钓鱼】业务邮件劫持
   * 罠: 双重扩展名（.pdf.exe）+ 信任关系利用
   */
  {
    id: 'trap-3-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: '王 芳（信息工学研究科 M1）', address: 'wang.fang.2024@gmail.com' },
    to: '您（TA）',
    subject: 'Re: 关于奖学金申请材料不完整的问题',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>您好，</p><p>非常感谢您指出材料中的不足之处。我已完成全部修改，为了安全起见，以加密ZIP文件重新发送。</p><p>解压密码：<strong>2024</strong></p><p>给您添麻烦了，非常抱歉。请查收确认。</p><p>王 芳<br>信息工学研究科 博士前期课程1年级</p>`,
    attachments: [{
      name: '奖学金申请书_修改版.pdf.exe',
      displayName: '奖学金申请书_修改版.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-4-zh: 【网络钓鱼】基础设施伪装通知
   * 罠: 域名伪装（ccmallg vs ccmailg）+ 链接伪装 + 紧迫性
   */
  {
    id: 'trap-4-zh',
    lang: 'zh',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: '名城大学 信息中心', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: '您（TA）',
    subject: '【重要】全校邮件系统安全更新通知',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>名城大学信息中心通知：</p><p>由于全校邮件系统安全升级，所有用户需完成账户激活操作。</p><p><strong>请于5月25日（周日）23:59前完成操作，逾期账户将被暂时停用。</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">请点击此处进行账户激活</a></p>`,
  },
]

/**
 * イタリア語版メール（通常4通 + 罠4通）
 * 日本在住のイタリア語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するイタリア人留学生TA
 */
export const emailsIt: Email[] = [
  {
    id: 'normal-1-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Marco Rossi', address: 'rossi.m@meijo-u.ac.jp' },
    to: 'Tu (TA)',
    subject: 'Modifica orario – Seminario della prossima settimana',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Gentile collaboratore,</p><p>A causa di una riunione di facoltà, il seminario di lunedì 27 maggio è stato spostato.</p><p>Nuovo orario: martedì 28 maggio, ore 15:00–17:00, studio (Edificio 8, stanza 512)</p><p>Ti chiedo di confermare la tua presenza entro questa settimana.</p><p>Cordiali saluti,<br>Prof. Marco Rossi</p>`,
  },
  {
    id: 'normal-2-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Ufficio Didattica', address: 'gakumu@meijo-u.ac.jp' },
    to: 'Tu (TA)',
    subject: 'Promemoria: scadenza iscrizione esami – 25 maggio',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Gentili studenti,</p><p>Si ricorda che il periodo di iscrizione agli esami del primo semestre termina lunedì 25 maggio alle ore 23:59.</p><p>Si prega di verificare:<br>・Di non aver superato il limite annuale di crediti (48 CFU)<br>・Che tutti i corsi obbligatori siano stati registrati<br>・Che non vi siano sovrapposizioni di orario</p><p>Per assistenza, contattare l'Ufficio Didattica (int. 1234).</p>`,
  },
  {
    id: 'normal-3-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Biblioteca Universitaria', address: 'library@meijo-u.ac.jp' },
    to: 'Tu (TA)',
    subject: 'Promemoria restituzione libri in prestito',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Gentile utente,</p><p>I seguenti materiali devono essere restituiti entro domenica 24 maggio:</p><p>・Fondamenti di Cybersicurezza (2ª ed.)<br>・Introduzione alla Psicologia Cognitiva</p><p>È possibile rinnovare il prestito tramite il portale della biblioteca (rinnovo consentito una sola volta).</p>`,
  },
  {
    id: 'normal-4-it',
    lang: 'it',
    isTrap: false,
    traps: [],
    from: { display: 'Ufficio Borse di Studio', address: 'scholarship@meijo-u.ac.jp' },
    to: 'Tu (TA)',
    subject: '【Scadenza imminente】Rinnovo borsa di studio – primo semestre 2026',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>Gentili borsisti,</p><p>【Scadenza】venerdì 30 maggio 2026, ore 17:00</p><p>【Documenti richiesti】<br>1. Modulo di rinnovo borsa (scaricabile dal portale)<br>2. Certificato accademico (rilasciato dall'Ufficio Didattica)<br>3. Attestato di reddito familiare (anno precedente)</p><p>Il mancato rispetto della scadenza comporterà la sospensione dell'erogazione.</p>`,
  },
  /**
   * trap-1-it: 【BEC】Impersonificazione fornitore estero
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   */
  {
    id: 'trap-1-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education Italy – Supporto', address: 'support@oxf0rd-edu-italy.com' },
    to: 'Tu (TA)',
    subject: 'Modifica coordinate bancarie – Sistema supporto studenti internazionali',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Gentile utente,</p><p>A seguito di un aggiornamento del sistema, le coordinate bancarie per i pagamenti del supporto agli studenti internazionali sono state modificate.</p><p>In allegato troverà il documento di conferma con le nuove coordinate. La invitiamo a utilizzarle per il prossimo pagamento.</p><p>Per qualsiasi domanda, non esiti a contattarci.</p><p>Cordiali saluti,<br>Oxford Education Italy – Team di supporto</p>`,
    attachments: [{
      name: 'Conferma_Coordinate_Bancarie.pdf.exe',
      displayName: 'Conferma_Coordinate_Bancarie.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-2-it: 【BEC】Impersonificazione figura autoritaria（CEO fraud）
   * 罠: free mailドメイン + リンク偽装 + 緊急性 + 権威
   */
  {
    id: 'trap-2-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Prof. Yoshikawa (Preside)', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: 'Tu (TA)',
    subject: 'Urgente: richiesta di supporto – progetto riservato',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Buongiorno,</p><p>Sono attualmente in viaggio all'estero e non posso rispondere al telefono.</p><p>Ho bisogno urgente del tuo aiuto per un progetto riservato di reclutamento studenti internazionali. Potresti inserire i dati richiesti nel foglio di calcolo qui sotto e condividerlo con me entro oggi?</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">Clicca qui per accedere al foglio di calcolo</a></p><p>Ti chiedo di mantenere la massima riservatezza e di non condividere questa informazione con altri colleghi.</p><p>Prof. Yoshikawa</p>`,
  },
  /**
   * trap-3-it: 【Spear phishing】Dirottamento email di lavoro
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   */
  {
    id: 'trap-3-it',
    lang: 'it',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: 'Lorenzo Bianchi (Studente M1)', address: 'lorenzo.bianchi.2024@gmail.com' },
    to: 'Tu (TA)',
    subject: 'Re: Documenti mancanti per la domanda di borsa di studio',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Gentile TA,</p><p>Grazie per avermi segnalato i problemi con i documenti. Ho corretto tutti i punti indicati e ti invio nuovamente i file in un archivio ZIP protetto da password.</p><p>Password: <strong>2024</strong></p><p>Mi scuso per l'inconveniente. Fammi sapere se sono necessarie ulteriori correzioni.</p><p>Lorenzo Bianchi<br>Corso di Laurea Magistrale in Informatica, 1° anno</p>`,
    attachments: [{
      name: 'Domanda_Borsa_Corretta.pdf.exe',
      displayName: 'Domanda_Borsa_Corretta.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-4-it: 【Phishing】Notifica infrastruttura falsa
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   */
  {
    id: 'trap-4-it',
    lang: 'it',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Centro Informatico – Università Meijo', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: 'Tu (TA)',
    subject: '【Importante】Aggiornamento sicurezza sistema email universitario',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>Gentile utente,</p><p>A seguito dell'aggiornamento del sistema di sicurezza della posta elettronica universitaria, è necessario che tutti gli utenti completino la procedura di attivazione dell'account.</p><p><strong>La procedura deve essere completata entro domenica 25 maggio alle ore 23:59. In caso contrario, l'account verrà temporaneamente sospeso.</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">Clicca qui per attivare il tuo account</a></p>`,
  },
]

/**
 * ベトナム語版メール（通常4通 + 罠4通）
 * 日本在住のベトナム語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するベトナム人留学生TA
 */
export const emailsVi: Email[] = [
  {
    id: 'normal-1-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'GS. Nguyễn Minh Tuấn', address: 'nguyen.m@meijo-u.ac.jp' },
    to: 'Bạn (TA)',
    subject: 'Thông báo thay đổi lịch seminar tuần tới',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Xin chào,</p><p>Do có cuộc họp nội bộ đột xuất, seminar vào thứ Hai tuần tới (ngày 27/5) sẽ phải thay đổi lịch.</p><p>Lịch mới: Thứ Ba, 28/5, 15:00–17:00, phòng nghiên cứu (Tòa nhà 8, phòng 512)</p><p>Vui lòng xác nhận tham dự trước cuối tuần này.</p><p>Trân trọng,<br>GS. Nguyễn Minh Tuấn</p>`,
  },
  {
    id: 'normal-2-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Phòng Đào tạo', address: 'gakumu@meijo-u.ac.jp' },
    to: 'Bạn (TA)',
    subject: 'Nhắc nhở: Hạn chót đăng ký môn học – 25/5',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Kính gửi các sinh viên,</p><p>Thời hạn đăng ký môn học học kỳ I sẽ kết thúc vào <strong>thứ Hai, 25/5 lúc 23:59</strong>.</p><p>Vui lòng kiểm tra các mục sau trước hạn chót:<br>・Số tín chỉ không vượt quá giới hạn hàng năm (48 tín chỉ)<br>・Tất cả môn bắt buộc đã được đăng ký<br>・Không có xung đột lịch học</p><p>Liên hệ Phòng Đào tạo (máy lẻ: 1234) nếu cần hỗ trợ.</p>`,
  },
  {
    id: 'normal-3-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Thư viện Đại học', address: 'library@meijo-u.ac.jp' },
    to: 'Bạn (TA)',
    subject: 'Nhắc nhở: Hạn trả tài liệu mượn sắp đến',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Kính gửi độc giả,</p><p>Các tài liệu sau đây cần được trả trước <strong>Chủ nhật, 24/5</strong>:</p><p>・Cơ sở An ninh mạng (tái bản lần 2)<br>・Nhập môn Tâm lý học Nhận thức</p><p>Bạn có thể gia hạn trực tuyến qua cổng thông tin thư viện (chỉ gia hạn được một lần).</p>`,
  },
  {
    id: 'normal-4-vi',
    lang: 'vi',
    isTrap: false,
    traps: [],
    from: { display: 'Phòng Hỗ trợ Sinh viên (Bộ phận Học bổng)', address: 'scholarship@meijo-u.ac.jp' },
    to: 'Bạn (TA)',
    subject: '【Sắp hết hạn】Thông báo gia hạn học bổng học kỳ I năm 2026',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>Kính gửi các sinh viên nhận học bổng,</p><p>【Hạn nộp hồ sơ】Thứ Sáu, 30/5/2026, 17:00</p><p>【Hồ sơ cần nộp】<br>1. Đơn xin gia hạn học bổng (tải từ cổng thông tin)<br>2. Bảng điểm (do Phòng Đào tạo cấp)<br>3. Giấy chứng nhận thu nhập gia đình (năm trước)</p><p>Nộp hồ sơ trễ sẽ dẫn đến tạm dừng chi trả học bổng.</p>`,
  },
  /**
   * trap-1-vi: 【BEC】Mạo danh nhà cung cấp nước ngoài
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   */
  {
    id: 'trap-1-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education Vietnam – Hỗ trợ', address: 'support@oxf0rd-edu-vietnam.com' },
    to: 'Bạn (TA)',
    subject: 'Xác nhận thay đổi tài khoản ngân hàng – Hệ thống hỗ trợ du học sinh',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Kính gửi quý khách,</p><p>Do nâng cấp hệ thống, tài khoản ngân hàng nhận thanh toán phí hỗ trợ du học sinh đã được thay đổi.</p><p>Vui lòng xem tài liệu xác nhận đính kèm và sử dụng thông tin tài khoản mới cho lần thanh toán tiếp theo.</p><p>Nếu có thắc mắc, xin liên hệ với chúng tôi.</p><p>Trân trọng,<br>Oxford Education Vietnam – Đội ngũ hỗ trợ</p>`,
    attachments: [{
      name: 'Xac_nhan_tai_khoan_moi.pdf.exe',
      displayName: 'Xac_nhan_tai_khoan_moi.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-2-vi: 【BEC】Mạo danh người có thẩm quyền（CEO fraud）
   * 罠: free mailドメイン + リンク偽装 + 緊急性 + 権威
   */
  {
    id: 'trap-2-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'GS. Yoshikawa (Trưởng khoa)', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: 'Bạn (TA)',
    subject: 'Khẩn: Yêu cầu hỗ trợ – Dự án tuyển sinh bí mật',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Xin chào,</p><p>Tôi đang công tác nước ngoài và không thể nghe điện thoại.</p><p>Tôi cần gấp sự hỗ trợ của bạn cho một dự án tuyển sinh sinh viên quốc tế đang được triển khai bí mật. Bạn có thể điền thông tin sinh viên vào bảng tính dưới đây và chia sẻ cho tôi trong hôm nay không?</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">Nhấp vào đây để điền vào bảng tính</a></p><p>Đây là thông tin mật, vui lòng không chia sẻ với giáo viên hay nhân viên khác.</p><p>GS. Yoshikawa</p>`,
  },
  /**
   * trap-3-vi: 【Spear phishing】Chiếm đoạt chuỗi email công việc
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   */
  {
    id: 'trap-3-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: 'Trần Thị Mai (Sinh viên M1)', address: 'tran.mai.2024@gmail.com' },
    to: 'Bạn (TA)',
    subject: 'Re: Hồ sơ xin học bổng còn thiếu tài liệu',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Kính gửi TA,</p><p>Cảm ơn bạn đã chỉ ra những thiếu sót trong hồ sơ của tôi. Tôi đã sửa đầy đủ các mục được đề cập và gửi lại dưới dạng file ZIP có mật khẩu bảo vệ.</p><p>Mật khẩu giải nén: <strong>2024</strong></p><p>Xin lỗi vì đã gây bất tiện. Vui lòng kiểm tra và cho tôi biết nếu cần chỉnh sửa thêm.</p><p>Trần Thị Mai<br>Khoa Công nghệ Thông tin, Năm 1 Thạc sĩ</p>`,
    attachments: [{
      name: 'Ho_so_hoc_bong_da_sua.pdf.exe',
      displayName: 'Ho_so_hoc_bong_da_sua.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-4-vi: 【Phishing】Thông báo giả mạo hạ tầng
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   */
  {
    id: 'trap-4-vi',
    lang: 'vi',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Trung tâm Thông tin – ĐH Meijo', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: 'Bạn (TA)',
    subject: '【Quan trọng】Cập nhật bảo mật hệ thống email toàn trường',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>Kính gửi người dùng,</p><p>Do nâng cấp bảo mật hệ thống email toàn trường, tất cả người dùng cần hoàn tất thủ tục kích hoạt tài khoản.</p><p><strong>Vui lòng hoàn tất trước 23:59 Chủ nhật, 25/5. Tài khoản chưa kích hoạt sẽ bị tạm ngưng.</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">Nhấp vào đây để kích hoạt tài khoản</a></p>`,
  },
]

/**
 * スペイン語版メール（通常4通 + 罠4通）
 * 日本在住のスペイン語母語話者向け。日本語版と攻撃タイプは等価。
 * 舞台：名城大学に在籍するスペイン語圏留学生TA
 */
export const emailsEs: Email[] = [
  {
    id: 'normal-1-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Carlos García', address: 'garcia.c@meijo-u.ac.jp' },
    to: 'Tú (TA)',
    subject: 'Cambio de horario – Seminario de la próxima semana',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Estimado/a colaborador/a,</p><p>Debido a una reunión de facultad, el seminario del próximo lunes 27 de mayo ha sido reprogramado.</p><p>Nuevo horario: martes 28 de mayo, 15:00–17:00 h, despacho (Edificio 8, sala 512)</p><p>Te agradecería que confirmaras tu asistencia antes del final de esta semana.</p><p>Un cordial saludo,<br>Prof. Carlos García</p>`,
  },
  {
    id: 'normal-2-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Oficina de Asuntos Académicos', address: 'gakumu@meijo-u.ac.jp' },
    to: 'Tú (TA)',
    subject: 'Recordatorio: plazo de matrícula – 25 de mayo',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Estimados estudiantes,</p><p>Les recordamos que el plazo de matrícula del primer semestre finaliza el <strong>lunes 25 de mayo a las 23:59</strong>.</p><p>Por favor, verifiquen lo siguiente antes del plazo:<br>・No superar el límite anual de créditos (48 créditos)<br>・Tener registradas todas las asignaturas obligatorias<br>・No tener conflictos de horario</p><p>Para cualquier consulta, contacten con la Oficina de Asuntos Académicos (ext. 1234).</p>`,
  },
  {
    id: 'normal-3-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Biblioteca Universitaria', address: 'library@meijo-u.ac.jp' },
    to: 'Tú (TA)',
    subject: 'Aviso: fecha de devolución de préstamos próxima',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Estimado/a usuario/a,</p><p>Los siguientes materiales deben devolverse antes del <strong>domingo 24 de mayo</strong>:</p><p>・Fundamentos de Ciberseguridad (2.ª ed.)<br>・Introducción a la Psicología Cognitiva</p><p>Puede renovar el préstamo en línea a través del portal de la biblioteca (renovación permitida una sola vez).</p>`,
  },
  {
    id: 'normal-4-es',
    lang: 'es',
    isTrap: false,
    traps: [],
    from: { display: 'Oficina de Becas', address: 'scholarship@meijo-u.ac.jp' },
    to: 'Tú (TA)',
    subject: '【Plazo inminente】Renovación de beca – primer semestre 2026',
    date: '2026年5月18日 08:30',
    bodyHtml: `<p>Estimados becarios,</p><p>【Fecha límite】viernes 30 de mayo de 2026, 17:00 h</p><p>【Documentación requerida】<br>1. Solicitud de renovación de beca (descargar del portal)<br>2. Certificado académico (expedido por la Oficina de Asuntos Académicos)<br>3. Justificante de ingresos familiares (año anterior)</p><p>La no presentación en plazo conllevará la suspensión del pago de la beca.</p>`,
  },
  /**
   * trap-1-es: 【BEC】Suplantación de proveedor extranjero
   * 罠: domain偽装（oxf0rd）+ 二重拡張子（.pdf.exe）
   */
  {
    id: 'trap-1-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'extension'],
    from: { display: 'Oxford Education Spain – Soporte', address: 'support@oxf0rd-edu-spain.com' },
    to: 'Tú (TA)',
    subject: 'Cambio de cuenta bancaria – Sistema de apoyo a estudiantes internacionales',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Estimado/a cliente,</p><p>Como resultado de una actualización de nuestro sistema, los datos bancarios para el pago del apoyo a estudiantes internacionales han sido modificados.</p><p>Adjuntamos el documento de confirmación con los nuevos datos. Le rogamos que los utilice en el próximo pago.</p><p>Para cualquier consulta, no dude en ponerse en contacto con nosotros.</p><p>Atentamente,<br>Oxford Education Spain – Equipo de soporte</p>`,
    attachments: [{
      name: 'Confirmacion_Cuenta_Bancaria.pdf.exe',
      displayName: 'Confirmacion_Cuenta_Bancaria.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-2-es: 【BEC】Suplantación de figura de autoridad（CEO fraud）
   * 罠: free mailドメイン + リンク偽装 + 緊急性 + 権威
   */
  {
    id: 'trap-2-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Prof. Yoshikawa (Decano)', address: 'yoshikawa.meijo.univ@gmail.com' },
    to: 'Tú (TA)',
    subject: 'Urgente: solicitud de ayuda – proyecto confidencial',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Buenos días,</p><p>Actualmente me encuentro de viaje en el extranjero y no puedo atender llamadas.</p><p>Necesito urgentemente tu ayuda con un proyecto confidencial de captación de estudiantes internacionales. ¿Podrías introducir los datos requeridos en la hoja de cálculo que aparece a continuación y compartirla conmigo antes del final del día?</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz">Haz clic aquí para acceder a la hoja de cálculo</a></p><p>Te pido que mantengas la máxima discreción y no compartas esta información con otros compañeros.</p><p>Prof. Yoshikawa</p>`,
  },
  /**
   * trap-3-es: 【Spear phishing】Secuestro de hilo de correo
   * 罠: 二重拡張子（.pdf.exe）+ 信頼関係の悪用
   */
  {
    id: 'trap-3-es',
    lang: 'es',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: { display: 'Miguel Fernández (Estudiante M1)', address: 'miguel.fernandez.2024@gmail.com' },
    to: 'Tú (TA)',
    subject: 'Re: Documentación incompleta en la solicitud de beca',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Estimado/a TA,</p><p>Gracias por señalarme los problemas con la documentación. He corregido todos los puntos indicados y te reenvío los archivos en un ZIP protegido con contraseña.</p><p>Contraseña: <strong>2024</strong></p><p>Disculpa las molestias. Avísame si necesitas alguna corrección adicional.</p><p>Miguel Fernández<br>Máster en Ingeniería Informática, 1.er año</p>`,
    attachments: [{
      name: 'Solicitud_Beca_Corregida.pdf.exe',
      displayName: 'Solicitud_Beca_Corregida.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },
  /**
   * trap-4-es: 【Phishing】Notificación falsa de infraestructura
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   */
  {
    id: 'trap-4-es',
    lang: 'es',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: { display: 'Centro de Informática – Universidad Meijo', address: 'admin@ccmallg.meijo-u.ac.jp' },
    to: 'Tú (TA)',
    subject: '【Importante】Actualización de seguridad del sistema de correo universitario',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>Estimado/a usuario/a,</p><p>Debido a una actualización de seguridad del sistema de correo electrónico universitario, todos los usuarios deben completar el proceso de activación de cuenta.</p><p><strong>El proceso debe completarse antes del domingo 25 de mayo a las 23:59. Las cuentas no activadas serán suspendidas temporalmente.</strong></p><p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/auth/login">Haz clic aquí para activar tu cuenta</a></p>`,
  },
]