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
    subject: '来週のゼミについて',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>お疲れ様です。田中です。</p><p>来週月曜のゼミですが、学内会議が入ってしまいました。申し訳ないのですが、火曜15時に変更させてください。場所は同じく512室です。</p><p>参加できそうか、今週中に一言もらえると助かります。よろしくお願いします。</p>`,
  },
  {
    id: 'normal-2-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '学務課', address: 'gakumu@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '前期履修登録の確認について',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>学生各位</p><p>前期の履修登録期間が5月25日（月）23:59に終了します。ポータルサイトより登録内容をご確認ください。</p><p>【確認事項】<br>・年間48単位の上限を超えていないか<br>・必修科目の登録漏れがないか</p><p>問い合わせ：学務課 内線1234</p>`,
  },
  {
    id: 'normal-3-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '附属図書館', address: 'library@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '貸出資料の返却期限のお知らせ',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>返却期限：5月24日（日）</p><p>・サイバーセキュリティの基礎と実践<br>・認知心理学入門（第2版）</p><p>ポータルから延長申請ができます（1回のみ）。</p>`,
  },
  {
    id: 'normal-4-ja',
    lang: 'ja',
    isTrap: false,
    traps: [],
    from: { display: '佐藤 健太', address: 'sato.k.2023@meijo-u.ac.jp' },
    to: 'あなた（TA）',
    subject: '来週の発表資料共有します',
    date: '2026年5月18日 18:30',
    bodyHtml: `<p>お疲れ様です、佐藤です。</p><p>来週の合同ゼミで使う発表資料、共有しておきます。事前に見ておいてもらえると助かります。</p><p><a href="https://drive.google.com/file/d/xxxxxxxxx" data-display-url="https://drive.google.com/file/d/xxxxxxxxx">Google Driveはこちら</a></p><p>何かあればLINEで連絡ください！</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-ja: 【BEC】ベンダーなりすまし
   * 罠: ドメイン偽装（oxf0rd）+ 拡張子偽装（.pdf.exe）
   * 心理的圧力: 期限（5月31日以降は受付不可）
   */
  {
    id: 'trap-1-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Oxford Education Japan サポート',
      address: 'support@oxf0rd-edu-japan.com',
    },
    to: 'あなた（TA）',
    subject: '【重要】留学生サポート費用の振込先変更のお願い',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>〇〇様</p><p>お世話になっております。Oxford Education Japan サポート担当の山田と申します。</p><p>このたびシステム更新に伴い、振込先口座が変更となりました。次回より新口座へのお振込みをお願いいたします。</p><p>変更後の口座情報は<strong>添付の確認書</strong>をご参照ください。ご不明点はお気軽にお問い合わせください。</p><p><strong>※ 旧口座への振込は5月31日以降は受け付けできません。</strong></p><p>Oxford Education Japan<br>山田 太郎<br>Tel: 03-XXXX-XXXX</p>`,
    attachments: [{
      name: '振込先変更確認書.pdf.exe',
      displayName: '振込先変更確認書.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-2-ja: 【BEC】権威者なりすまし（CEO詐欺）
   * 罠: フリーメール偽装（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: 海外出張中・今日中・機密
   */
  {
    id: 'trap-2-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '吉川 研究科長',
      address: 'yoshikawa.meijo.univ@gmail.com',
    },
    to: 'あなた（TA）',
    subject: '至急対応をお願いします',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>お疲れ様です。</p><p>現在ロンドンの学会に参加中で電話が難しい状況です。至急お願いしたいことがあってメールしています。</p><p>海外の大学との連携プロジェクトで、今日中に担当学生の情報を共有する必要があります。下記のフォームに入力して送信してください。</p><p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/spreadsheets/d/1xYz" data-phished-url="/phished?type=link">こちらのフォームに入力してください</a></p><p>このプロジェクトはまだ公式発表前のため、他の方への共有はお控えください。</p><p>よろしくお願いします。<br>吉川</p>`,
  },

  /**
   * trap-3-ja: 【標的型】業務継続メールの乗っ取り
   * 罠: 拡張子偽装（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: 謝罪・過去のやり取りの継続
   */
  {
    id: 'trap-3-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: '李 明（情報工学研究科 M1）',
      address: 'li.ming.2024@gmail.com',
    },
    to: 'あなた（TA）',
    subject: 'Re: 奨学金申請書類の不備について',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>お世話になっております。李です。</p><p>先日ご指摘いただいた不備を修正しました。お手数をおかけして大変申し訳ありません。</p><p>パスワード付きZIPで添付いたします。<br>解凍パスワード：<strong>2024</strong></p><p>よろしくお願いいたします。</p>`,
    attachments: [{
      name: '奨学金申請書_修正版.pdf.exe',
      displayName: '奨学金申請書_修正版.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-4-ja: 【フィッシング】インフラ偽通知
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   * 心理的圧力: 不審ログイン検出・本日中・アカウント停止
   * 正規: @ccmailg.meijo-u.ac.jp
   * 偽装: @ccmallg.meijo-u.ac.jp（mail→mall）
   */
  {
    id: 'trap-4-ja',
    lang: 'ja',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: '名城大学 情報センター',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: 'あなた（TA）',
    subject: '【緊急】メールアカウントの確認が必要です',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>名城大学 情報センターからの重要なお知らせです。</p><p>お使いのメールアカウントで<strong>不審なログインが検出されました</strong>。アカウントの安全を確保するため、本日中に本人確認の手続きをお願いします。</p><p>▼ 本人確認はこちら<br><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/auth/update" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/auth/update</a></p><p><strong>※ 本日23:59までに手続きが完了しない場合、アカウントが一時停止となります。</strong></p><p>名城大学 情報センター<br>ccmailg.meijo-u.ac.jp</p>`,
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
    subject: 'Change of Schedule – Seminar Next Week',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Hi,</p>
<p>Hope you're doing well. I have a faculty meeting that's come up on Monday, so I'll need to move next week's seminar to Tuesday at 3 PM. Same room (512).</p>
<p>Could you let me know if that works for you by end of this week? Sorry for the short notice.</p>
<p>Best,<br>Prof. Johnson</p>`,
  },
  {
    id: 'normal-2-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Academic Affairs Office', address: 'academic@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Course Registration Deadline – May 25',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Dear Students,</p>
<p>This is a reminder that the course registration period ends on Monday, May 25 at 11:59 PM.</p>
<p>Please check the following before the deadline:<br>
・You have not exceeded the annual credit limit (48 credits)<br>
・All required courses are registered<br>
・No schedule conflicts exist</p>
<p>Contact Academic Affairs (ext. 1234) if you need assistance.</p>`,
  },
  {
    id: 'normal-3-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'University Library', address: 'library@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Library Books Due Soon',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Dear Library Member,</p>
<p>Just a reminder that the following items are due on Sunday, May 24:</p>
<p>・Introduction to Cybersecurity (2nd ed.)<br>
・Cognitive Psychology: A Handbook</p>
<p>You can renew online through the library portal (one renewal per item).</p>`,
  },
  {
    id: 'normal-4-en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'James Carter', address: 'carter.j.2023@meijo-u.ac.jp' },
    to: 'You (TA)',
    subject: 'Sharing slides for next week',
    date: '2026年5月18日 18:30',
    bodyHtml: `<p>Hey,</p>
<p>Sharing my slides for the joint seminar next week. Feel free to take a look beforehand!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  View slides on Google Drive
</a></p>
<p>Let me know if you have any questions. See you there!</p>
<p>James</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-en: 【BEC】Vendor Impersonation
   * 罠: ドメイン偽装（spr1nger）+ 拡張子偽装（.pdf.exe）
   * 心理的圧力: 期限（after May 31）
   */
  {
    id: 'trap-1-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Springer Academic Support',
      address: 'billing@spr1nger-academic.com',
    },
    to: 'You (TA)',
    subject: '[Important] Updated Bank Details for Journal Access',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Dear Account Holder,</p>
<p>My name is Sarah Thompson from Springer Academic Support.</p>
<p>Due to our recent banking system migration, the payment account for your institution's journal access subscription has been updated. Please refer to the <strong>attached confirmation document</strong> for the new banking details and use them for your next payment.</p>
<p><strong>※ Payments to the old account will not be accepted after May 31.</strong></p>
<p>Springer Academic Support<br>Sarah Thompson<br>Tel: +44-XXXX-XXXX</p>`,
    attachments: [{
      name: 'bank_details_update.pdf.exe',
      displayName: 'bank_details_update.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-2-en: 【BEC】Authority Impersonation (CEO Fraud)
   * 罠: フリーメール偽装（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: traveling・today・confidential
   */
  {
    id: 'trap-2-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Michael Johnson (Dean)',
      address: 'johnson.meijo.univ@gmail.com',
    },
    to: 'You (TA)',
    subject: 'Urgent – Need your help today',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Hi,</p>
<p>I'm currently at a conference in London and can't take calls. I need your help urgently.</p>
<p>We have a partnership project with an overseas university and I need to share student information with them today. Could you fill in the details in the form below and submit it as soon as possible?</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/2aXz"
      data-phished-url="/phished?type=link">
  Click here to access the form
</a></p>
<p>Please keep this confidential for now – it hasn't been officially announced yet.</p>
<p>Thanks,<br>Prof. Johnson</p>`,
  },

  /**
   * trap-3-en: 【Spear Phishing】Thread Hijacking
   * 罠: 拡張子偽装（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: 謝罪・過去のやり取りの継続
   */
  {
    id: 'trap-3-en',
    lang: 'en',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Mohammed Al-Rashid (M1, Info. Engineering)',
      address: 'mohammed.alrashid.2024@gmail.com',
    },
    to: 'You (TA)',
    subject: 'Re: Missing Documents for Scholarship Application',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Hi,</p>
<p>Thank you for pointing out the issues with my application. I've fixed everything you mentioned – really sorry for the trouble.</p>
<p>I'm sending the corrected documents as a password-protected ZIP.<br>
Password: <strong>2024</strong></p>
<p>Please let me know if everything looks okay. Thanks again!</p>
<p>Mohammed</p>`,
    attachments: [{
      name: 'scholarship_application_revised.pdf.exe',
      displayName: 'scholarship_application_revised.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-4-en: 【Phishing】Infrastructure Fake Notification
   * 罠: ドメイン偽装（ccmallg vs ccmailg）+ リンク偽装 + 緊急性
   * 心理的圧力: 不審ログイン・本日中・アカウント停止
   */
  {
    id: 'trap-4-en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Meijo University IT Center',
      address: 'admin@ccmallg.meijo-u.ac.jp',
    },
    to: 'You (TA)',
    subject: '[Urgent] Action Required: Verify Your Account',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>This is an important notice from Meijo University IT Center.</p>
<p><strong>Suspicious login activity has been detected on your account.</strong> To secure your account, please complete identity verification today.</p>
<p>▼ Verify your account here<br>
<a href="javascript:void(0)"
   data-display-url="https://portal.meijo-u.ac.jp/auth/update"
   data-phished-url="/phished?type=link">
  https://portal.meijo-u.ac.jp/auth/update
</a></p>
<p><strong>※ If verification is not completed by 11:59 PM today, your account will be temporarily suspended.</strong></p>
<p>Meijo University IT Center<br>
ccmailg.meijo-u.ac.jp</p>`,
  },
]

/**
 * 英語版メール・ドイツ在住日本人向け（通常4通 + 罠4通）
 * 舞台：アウクスブルク大学（Universität Augsburg）の交換留学生
 * 正規ドメイン：@uni-augsburg.de
 * 偽装ドメイン：@uni-augsburg-de.com
 */
export const emailsDe_en: Email[] = [

  // ============================================================
  // 通常メール × 4通
  // ============================================================

  {
    id: 'normal-1-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Prof. Dr. Klaus Müller', address: 'klaus.mueller@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Seminar Rescheduled – Next Week',
    date: '2026年5月21日 15:00',
    bodyHtml: `<p>Dear students,</p>
<p>I'm afraid I have a departmental meeting next Monday, so I'll need to move our seminar to Tuesday at 2 PM. Room 2103 (Building D) stays the same.</p>
<p>Please let me know if you can make it by end of this week. Sorry for the inconvenience.</p>
<p>Best regards,<br>Prof. Dr. Klaus Müller</p>`,
  },
  {
    id: 'normal-2-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'International Office – Universität Augsburg', address: 'international@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Course Registration Deadline – May 25',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Dear Exchange Students,</p>
<p>Just a reminder that course registration closes on Monday, May 25 at 11:59 PM via Digicampus.</p>
<p>Please make sure:<br>
・All required courses are registered<br>
・You have not exceeded the credit limit (30 ECTS)<br>
・No scheduling conflicts</p>
<p>Visit the International Office (Room 1012, Building A) if you need help.</p>`,
  },
  {
    id: 'normal-3-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Universitätsbibliothek Augsburg', address: 'bibliothek@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: 'Library Books Due Sunday',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Dear Library Member,</p>
<p>Just a quick reminder that the following items are due on Sunday, May 24:</p>
<p>・Cybersecurity: Principles and Practice (3rd ed.)<br>
・Cognitive Psychology – An Introduction</p>
<p>You can renew online via the library portal (one renewal per item).</p>`,
  },
  {
    id: 'normal-4-de_en',
    lang: 'en',
    isTrap: false,
    traps: [],
    from: { display: 'Anna Schneider', address: 'anna.schneider.2023@uni-augsburg.de' },
    to: 'You (Exchange Student)',
    subject: "Slides for next week's seminar",
    date: '2026年5月18日 18:30',
    bodyHtml: `<p>Hey!</p>
<p>Here are my slides for the seminar next week. Have a look whenever you get a chance!</p>
<p><a href="https://drive.google.com/file/d/xxxxxxxxx"
      data-display-url="https://drive.google.com/file/d/xxxxxxxxx">
  View slides on Google Drive
</a></p>
<p>Feel free to message me if you have questions. See you next week!</p>
<p>Anna</p>`,
  },

  // ============================================================
  // 罠メール × 4通
  // ============================================================

  /**
   * trap-1-de_en: 【BEC】Vendor Impersonation
   * 罠: ドメイン偽装（elsevier-academlc）+ 拡張子偽装（.pdf.exe）
   * 心理的圧力: 期限（after May 31）
   */
  {
    id: 'trap-1-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'extension', 'urgency'],
    from: {
      display: 'Elsevier Academic Billing',
      address: 'billing@elsevier-academlc.com',
    },
    to: 'You (Exchange Student)',
    subject: '[Important] Updated Bank Details for Academic Access',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Dear Account Holder,</p>
<p>My name is David Walsh from Elsevier Academic Billing.</p>
<p>Due to our recent banking system migration, the payment account for your institution's academic resource subscription has been updated. Please refer to the <strong>attached confirmation document</strong> for the new banking details.</p>
<p><strong>※ Payments to the old account will not be accepted after May 31.</strong></p>
<p>Elsevier Academic Billing<br>David Walsh<br>Tel: +44-XXXX-XXXX</p>`,
    attachments: [{
      name: 'bank_details_confirmation.pdf.exe',
      displayName: 'bank_details_confirmation.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-2-de_en: 【BEC】Authority Impersonation (CEO Fraud)
   * 罠: フリーメール偽装（gmail）+ リンク偽装 + 緊急性 + 権威
   * 心理的圧力: conference・today・confidential
   */
  {
    id: 'trap-2-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Prof. Dr. Thomas Weber (Dean)',
      address: 'weber.augsburg.dean@gmail.com',
    },
    to: 'You (Exchange Student)',
    subject: 'Urgent – Need your help today',
    date: '2026年5月20日 11:45',
    bodyHtml: `<p>Hi,</p>
<p>I'm at a conference in Berlin right now and can't take calls. I need your help with something urgent.</p>
<p>We have a partner university review due today and I need student information submitted through the link below as soon as possible.</p>
<p><a href="javascript:void(0)"
      data-display-url="https://docs.google.com-edit.net/spreadsheets/d/3bWx"
      data-phished-url="/phished?type=link">
  Click here to access the submission form
</a></p>
<p>Please keep this between us for now – it hasn't been officially announced yet.</p>
<p>Thanks,<br>Prof. Dr. Weber</p>`,
  },

  /**
   * trap-3-de_en: 【Spear Phishing】Thread Hijacking
   * 罠: 拡張子偽装（.pdf.exe）+ 信頼関係の悪用
   * 心理的圧力: 謝罪・過去のやり取りの継続
   */
  {
    id: 'trap-3-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['extension', 'authority'],
    from: {
      display: 'Laura Becker (German Course Tutor)',
      address: 'laura.becker.tutor2024@gmail.com',
    },
    to: 'You (Exchange Student)',
    subject: 'Re: Missing Pages in Your Assignment',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Hi,</p>
<p>Thanks for getting back to me! I've corrected all the missing pages you mentioned. Really sorry about that.</p>
<p>Sending the full assignment again as a password-protected ZIP.<br>
Password: <strong>2024</strong></p>
<p>Let me know if everything looks good this time!</p>
<p>Laura</p>`,
    attachments: [{
      name: 'assignment_revised.pdf.exe',
      displayName: 'assignment_revised.pdf',
      mimeType: 'application/pdf',
      isTrapped: true,
    }],
  },

  /**
   * trap-4-de_en: 【Phishing】Infrastructure Fake Notification
   * 罠: ドメイン偽装（uni-augsburg-de.com）+ リンク偽装 + 緊急性
   * 心理的圧力: 不審ログイン・本日中・アカウント停止
   * 正規: @uni-augsburg.de
   * 偽装: @uni-augsburg-de.com
   */
  {
    id: 'trap-4-de_en',
    lang: 'en',
    isTrap: true,
    traps: ['domain', 'link', 'urgency', 'authority'],
    from: {
      display: 'Universität Augsburg – IT Services',
      address: 'it-support@uni-augsburg-de.com',
    },
    to: 'You (Exchange Student)',
    subject: '[Urgent] Action Required: Verify Your Digicampus Account',
    date: '2026年5月17日 09:00',
    bodyHtml: `<p>This is an important notice from Universität Augsburg IT Services.</p>
<p><strong>Suspicious login activity has been detected on your Digicampus account.</strong> To secure your account, please complete identity verification today.</p>
<p>▼ Verify your account here<br>
<a href="javascript:void(0)"
   data-display-url="https://digicampus.uni-augsburg.de/auth/update"
   data-phished-url="/phished?type=link">
  https://digicampus.uni-augsburg.de/auth/update
</a></p>
<p><strong>※ If verification is not completed by 11:59 PM today, your Digicampus access will be suspended, preventing access to course materials and exam registration.</strong></p>
<p>Universität Augsburg IT Services<br>
uni-augsburg.de</p>`,
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
    to: '당신 (TA)',
    subject: '다음 주 세미나 일정 변경 안내',
    date: '2026年5月21日 15:00',
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
    to: '당신 (TA)',
    subject: '전기 수강 신청 마감 안내',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>재학생 여러분께</p>
<p>전기 수강 신청 기간이 5월 25일(월) 23:59에 마감됩니다. 포털 사이트에서 신청 내용을 반드시 확인해 주세요.</p>
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
    to: '당신 (TA)',
    subject: '대출 도서 반납 기한 안내',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>안녕하세요.</p>
<p>아래 도서의 반납 기한이 5월 24일(일)로 다가왔습니다.</p>
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
    to: '당신 (TA)',
    subject: '다음 주 발표 자료 공유드립니다',
    date: '2026年5月18日 18:30',
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
   * 심리적 압박: 기한（5월 31일 이후 수납 불가）
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
    to: '당신 (TA)',
    subject: '【중요】유학생 지원비 납입 계좌 변경 안내',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>안녕하세요.</p>
<p>Oxford Education Korea 지원팀 김영수입니다.</p>
<p>이번 시스템 업그레이드로 인해 유학생 지원비 납입 계좌가 변경되었습니다. 다음 번 납입 시에는 <strong>첨부된 확인서</strong>에 기재된 새 계좌를 이용해 주시기 바랍니다.</p>
<p><strong>※ 5월 31일 이후에는 기존 계좌로의 입금을 받지 않습니다.</strong></p>
<p>Oxford Education Korea<br>김 영수<br>Tel: 02-XXXX-XXXX</p>`,
    attachments: [{
      name: '계좌변경확인서.pdf.exe',
      displayName: '계좌변경확인서.pdf',
      mimeType: 'application/pdf',
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
    to: '당신 (TA)',
    subject: '긴급 부탁드립니다',
    date: '2026年5月20日 11:45',
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
    to: '당신 (TA)',
    subject: 'Re: 장학금 신청 서류 미비 사항에 대하여',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>안녕하세요.</p>
<p>지적해 주신 서류 미비 사항을 모두 수정했습니다. 불편을 드려서 정말 죄송합니다.</p>
<p>수정한 파일을 비밀번호 설정 ZIP으로 다시 보내드립니다.<br>
압축 해제 비밀번호: <strong>2024</strong></p>
<p>확인 후 문제없으시면 알려주세요. 감사합니다!</p>
<p>박 지수 드림</p>`,
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
    to: '당신 (TA)',
    subject: '【긴급】계정 확인이 필요합니다',
    date: '2026年5月17日 09:00',
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
    to: '您（TA）',
    subject: '下周研讨会时间变更通知',
    date: '2026年5月21日 15:00',
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
    to: '您（TA）',
    subject: '前期选课截止通知',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>各位同学：</p>
<p>前期选课截止时间为5月25日（周一）23:59，请通过门户网站确认选课内容。</p>
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
    to: '您（TA）',
    subject: '借阅图书还书期限提醒',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>您好，</p>
<p>以下图书的还书期限为5月24日（周日），请及时归还。</p>
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
    to: '您（TA）',
    subject: '下周发表资料共享',
    date: '2026年5月18日 18:30',
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
   * 心理压力: 截止日期（5月31日后不受理）
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
    to: '您（TA）',
    subject: '【重要】留学生支援费用收款账户变更通知',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>您好，</p>
<p>我是Oxford Education China支持团队的李建国。</p>
<p>由于系统升级，留学生支援费用的收款账户已发生变更。下次付款时，请参考<strong>附件中的确认函</strong>使用新账户信息。</p>
<p><strong>※ 5月31日之后将不再接受旧账户的汇款。</strong></p>
<p>Oxford Education China<br>李 建国<br>Tel: 010-XXXX-XXXX</p>`,
    attachments: [{
      name: '账户变更确认函.pdf.exe',
      displayName: '账户变更确认函.pdf',
      mimeType: 'application/pdf',
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
    to: '您（TA）',
    subject: '紧急请求帮助',
    date: '2026年5月20日 11:45',
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
    to: '您（TA）',
    subject: 'Re: 关于奖学金申请材料不完整的问题',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>您好，</p>
<p>您指出的材料不完整问题我已全部修改完毕，给您添麻烦了，非常抱歉。</p>
<p>修改后的文件以加密ZIP格式重新发送。<br>
解压密码：<strong>2024</strong></p>
<p>确认后如有问题请告知，谢谢！</p>
<p>刘 晓明</p>`,
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
    to: '您（TA）',
    subject: '【紧急】需要确认您的账户',
    date: '2026年5月17日 09:00',
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
    to: 'Tu (TA)',
    subject: 'Cambio orario seminario – settimana prossima',
    date: '2026年5月21日 15:00',
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
    to: 'Tu (TA)',
    subject: 'Scadenza iscrizione corsi – 25 maggio',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Gentili studenti,</p>
<p>Vi ricordiamo che il periodo di iscrizione ai corsi del primo semestre termina lunedì 25 maggio alle ore 23:59. Vi preghiamo di verificare la vostra situazione sul portale.</p>
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
    to: 'Tu (TA)',
    subject: 'Promemoria restituzione libri',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Gentile utente,</p>
<p>Ti ricordiamo che i seguenti libri devono essere restituiti entro domenica 24 maggio:</p>
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
    to: 'Tu (TA)',
    subject: 'Slides per il seminario della settimana prossima',
    date: '2026年5月18日 18:30',
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
   * 心理的圧力: 期限（dopo il 31 maggio non accettato）
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
    to: 'Tu (TA)',
    subject: '[Importante] Modifica coordinate bancarie – Supporto studenti internazionali',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Gentile utente,</p>
<p>Sono Marco Bianchi del team di supporto di Oxford Education Italy.</p>
<p>A seguito di un aggiornamento del nostro sistema bancario, le coordinate per il pagamento del supporto agli studenti internazionali sono state modificate. Per il prossimo pagamento, ti preghiamo di fare riferimento al <strong>documento di conferma allegato</strong>.</p>
<p><strong>※ I pagamenti sul vecchio conto non saranno accettati dopo il 31 maggio.</strong></p>
<p>Oxford Education Italy<br>Marco Bianchi<br>Tel: 02-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Conferma_Coordinate_Bancarie.pdf.exe',
      displayName: 'Conferma_Coordinate_Bancarie.pdf',
      mimeType: 'application/pdf',
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
    to: 'Tu (TA)',
    subject: 'Urgente – Ho bisogno del tuo aiuto oggi',
    date: '2026年5月20日 11:45',
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
    to: 'Tu (TA)',
    subject: 'Re: Documenti mancanti per la domanda di borsa di studio',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Ciao,</p>
<p>Ho corretto tutti i problemi che mi hai segnalato. Scusa tantissimo per il disturbo!</p>
<p>Ti rimando i documenti corretti in un archivio ZIP protetto da password.<br>
Password: <strong>2024</strong></p>
<p>Fammi sapere se va tutto bene questa volta. Grazie ancora!</p>
<p>Lorenzo</p>`,
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
    to: 'Tu (TA)',
    subject: '[Urgente] Verifica del tuo account richiesta',
    date: '2026年5月17日 09:00',
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
    to: 'Bạn (TA)',
    subject: 'Thay đổi lịch seminar tuần tới',
    date: '2026年5月21日 15:00',
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
    to: 'Bạn (TA)',
    subject: 'Thông báo hạn chót đăng ký môn học – 25/5',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Kính gửi các sinh viên,</p>
<p>Thời hạn đăng ký môn học học kỳ I sẽ kết thúc vào thứ Hai, 25/5 lúc 23:59. Vui lòng kiểm tra lại trên cổng thông tin.</p>
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
    to: 'Bạn (TA)',
    subject: 'Nhắc nhở: Hạn trả sách sắp đến',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Kính gửi bạn đọc,</p>
<p>Các tài liệu sau đây sẽ đến hạn trả vào Chủ nhật, 24/5:</p>
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
    to: 'Bạn (TA)',
    subject: 'Chia sẻ tài liệu thuyết trình tuần tới',
    date: '2026年5月18日 18:30',
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
   * 心理的圧力: 期限（sau ngày 31/5 không nhận）
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
    to: 'Bạn (TA)',
    subject: '【Quan trọng】Thông báo thay đổi tài khoản ngân hàng nhận học phí hỗ trợ du học sinh',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Xin chào,</p>
<p>Tôi là Trần Văn Hùng từ bộ phận hỗ trợ của Oxford Education Vietnam.</p>
<p>Do nâng cấp hệ thống ngân hàng, tài khoản nhận thanh toán học phí hỗ trợ du học sinh đã thay đổi. Vui lòng tham khảo <strong>tài liệu xác nhận đính kèm</strong> để biết thông tin tài khoản mới cho lần thanh toán tiếp theo.</p>
<p><strong>※ Sau ngày 31/5, chúng tôi sẽ không nhận thanh toán vào tài khoản cũ.</strong></p>
<p>Oxford Education Vietnam<br>Trần Văn Hùng<br>Tel: 028-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Xac_nhan_tai_khoan_moi.pdf.exe',
      displayName: 'Xac_nhan_tai_khoan_moi.pdf',
      mimeType: 'application/pdf',
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
    to: 'Bạn (TA)',
    subject: 'Khẩn – Cần bạn giúp hôm nay',
    date: '2026年5月20日 11:45',
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
    to: 'Bạn (TA)',
    subject: 'Re: Hồ sơ xin học bổng còn thiếu tài liệu',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Xin chào,</p>
<p>Em đã sửa tất cả những điểm thầy/cô chỉ ra rồi ạ. Xin lỗi đã gây phiền phức!</p>
<p>Em gửi lại tài liệu đã sửa dưới dạng file ZIP có mật khẩu bảo vệ.<br>
Mật khẩu giải nén: <strong>2024</strong></p>
<p>Thầy/cô xem qua và cho em biết nếu có vấn đề gì nhé. Cảm ơn thầy/cô!</p>
<p>Trần Thị Mai</p>`,
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
    to: 'Bạn (TA)',
    subject: '【Khẩn】Cần xác minh tài khoản của bạn',
    date: '2026年5月17日 09:00',
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
    to: 'Tú (TA)',
    subject: 'Cambio de horario – Seminario de la semana que viene',
    date: '2026年5月21日 15:00',
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
    to: 'Tú (TA)',
    subject: 'Plazo de matrícula – 25 de mayo',
    date: '2026年5月20日 09:00',
    bodyHtml: `<p>Estimados estudiantes,</p>
<p>Os recordamos que el plazo de matrícula del primer semestre finaliza el lunes 25 de mayo a las 23:59. Por favor, comprobad vuestra situación en el portal.</p>
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
    to: 'Tú (TA)',
    subject: 'Recordatorio: fecha de devolución de libros',
    date: '2026年5月19日 10:00',
    bodyHtml: `<p>Estimado/a usuario/a,</p>
<p>Te recordamos que los siguientes libros deben devolverse antes del domingo 24 de mayo:</p>
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
    to: 'Tú (TA)',
    subject: 'Comparto las diapositivas para el seminario de la semana que viene',
    date: '2026年5月18日 18:30',
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
   * 心理的圧力: 期限（después del 31 de mayo no se acepta）
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
    to: 'Tú (TA)',
    subject: '[Importante] Cambio de datos bancarios – Apoyo a estudiantes internacionales',
    date: '2026年5月22日 14:30',
    bodyHtml: `<p>Estimado/a usuario/a,</p>
<p>Mi nombre es Carlos Martínez, del equipo de soporte de Oxford Education Spain.</p>
<p>Debido a una actualización de nuestro sistema bancario, los datos de pago para el apoyo a estudiantes internacionales han cambiado. Para el próximo pago, consulta el <strong>documento de confirmación adjunto</strong> para obtener los nuevos datos bancarios.</p>
<p><strong>※ Los pagos a la cuenta antigua no se aceptarán después del 31 de mayo.</strong></p>
<p>Oxford Education Spain<br>Carlos Martínez<br>Tel: 91-XXXX-XXXX</p>`,
    attachments: [{
      name: 'Confirmacion_Datos_Bancarios.pdf.exe',
      displayName: 'Confirmacion_Datos_Bancarios.pdf',
      mimeType: 'application/pdf',
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
    to: 'Tú (TA)',
    subject: 'Urgente – Necesito tu ayuda hoy',
    date: '2026年5月20日 11:45',
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
    to: 'Tú (TA)',
    subject: 'Re: Documentación incompleta en la solicitud de beca',
    date: '2026年5月18日 16:30',
    bodyHtml: `<p>Hola,</p>
<p>Ya he corregido todo lo que me indicaste. ¡Perdona las molestias!</p>
<p>Te reenvío los documentos corregidos en un archivo ZIP protegido con contraseña.<br>
Contraseña: <strong>2024</strong></p>
<p>Avísame si todo está bien esta vez. ¡Gracias!</p>
<p>Miguel</p>`,
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
    to: 'Tú (TA)',
    subject: '[Urgente] Se requiere verificar tu cuenta',
    date: '2026年5月17日 09:00',
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