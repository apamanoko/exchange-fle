// =====================================================================
// 日本語メール 最終版(罠4・通常4)  —  emails.ts の emailsJa に差し替える設計図
//
// 【フィールド名について(要照合)】
//   現在の Email / Attachment 型に合わせて、Claude Code にフィールド名を揃えてもらうこと。
//   ・to           : { display, address }           (宛先の実アドレス表示)
//   ・date         : { offsetDays, time }           (ヘッダ日付。「今日+offsetDays日」の time に展開)
//   ・本文/件名の {{D+n}} / {{D-n}} は renderDateTokens で「M月D日（曜）」に展開
//   ・attachments  : { name(拡張子込みの実名), sizeKB, mimeType(アイコン用の見かけの種類), isTrapped }
//   ・traps        : 手がかりタグ(既存の列挙に合わせて読み替え)
//   ・罠のリンク   : href="javascript:void(0)" data-display-url(ホバー時に見えるURL) data-phished-url
//   ・通常のリンク : href="javascript:void(0)" data-display-url(ホバー時に見えるURL。遷移は /safe)
//
// 【設計の要点】
//   ・正規ドメイン: 教職員 @meijo-u.ac.jp / 学生 @ccmailg.meijo-u.ac.jp
//   ・役割: 参加者は「TA担当者」(宛先 ta-guest@ccmailg.meijo-u.ac.jp)
//   ・個人的な依頼: 罠2(研究科長)・罠3(TA仲間) / 通常1(教授)・通常4(TA仲間)
//   ・事務的な通知: 罠1(学生支援課)・罠4(情報センター) / 通常2(学務課)・通常3(国際センター)
//   ・添付: 罠2通(.exe)・通常2通(正規PDF) / リンク: 罠2通(偽装)・通常2通(正規)
// =====================================================================

const TO = { display: 'TA担当者', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsJaFinal = [
  // ---------------- 通常1: 田中教授(個人的な依頼・返信が必要・正規PDF添付) ----------------
  {
    id: 'normal-1-ja', lang: 'ja', isTrap: false, traps: [],
    from: { display: '田中 誠二', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: '来週のゼミ日程の変更について',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>TA担当の皆さん</p>
<p>田中です。担当している演習科目で、{{D+7}}のゼミを、学内行事の都合で{{D+8}}の3限に変更することになりました。</p>
<p>変更後の日程表を添付します。TAとして参加できるかどうか、{{D+3}}までに返信で教えてください。難しい場合は、代わりの日で調整します。</p>
<p>よろしくお願いします。</p>
<p>田中 誠二<br>情報工学部 情報工学科</p>`,
    attachments: [{ name: 'ゼミ日程_変更後.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- 通常2: 学務課(事務的・正規リンク・期限に余裕) ----------------
  {
    id: 'normal-2-ja', lang: 'ja', isTrap: false, traps: [],
    from: { display: '学務課', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'TA勤務報告の提出方法について',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>TA担当者 各位</p>
<p>学務課です。今月分のTA勤務報告の提出方法をご案内します。</p>
<p>下記のリンクから、学内ポータルの勤務報告フォームにログインし、勤務日と時間数を入力してください。</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA勤務報告フォーム(学内ポータル)</a></p>
<p>提出期限は{{D+7}}です。不明な点があれば、学務課の窓口までお問い合わせください。</p>
<p>学務課</p>`,
    attachments: [],
  },

  // ---------------- 通常3: 国際センター(事務的・正規PDF添付・多言語の一文) ----------------
  {
    id: 'normal-3-ja', lang: 'ja', isTrap: false, traps: [],
    from: { display: '国際センター', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: '冬季休業期間のご案内',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>留学生・TAの皆さん</p>
<p>国際センターです。冬季休業期間中の窓口の対応についてお知らせします。</p>
<p>詳細は添付のPDFをご確認ください。休業期間中は、メールでの問い合わせへの返信が遅くなる場合があります。</p>
<p>国際センター</p>`,
    attachments: [{ name: '冬季休業のご案内.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- 通常4: 佐藤(TA仲間・個人的な依頼・正規Driveリンク) ----------------
  {
    id: 'normal-4-ja', lang: 'ja', isTrap: false, traps: [],
    from: { display: '佐藤 健太', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'TA研修の資料、共有しました',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>お疲れさまです。同じTAの佐藤です。</p>
<p>先週のTA研修の資料を、Googleドライブにまとめました。見られるか、確認してもらえますか?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA研修資料(Googleドライブ)</a></p>
<p>足りない資料があれば、教えてください。</p>
<p>佐藤</p>`,
    attachments: [],
  },

  // ---------------- 罠1: 学生支援課を装う(事務的)。ドメイン偽装・二重拡張子・期限と不利益 ----------------
  {
    id: 'trap-1-ja', lang: 'ja', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: '学生支援課 TA手当担当', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '【重要】TA手当 振込口座の確認について(本日中)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>TA担当者 各位</p>
<p>学生支援課です。今月分のTA手当の振込にあたり、登録されている口座情報の確認が取れていません。</p>
<p>添付の確認書に口座情報を記入し、<strong>本日17時まで</strong>に返送してください。期限を過ぎた場合、今月分の振込は来月以降に延期されます。</p>
<p>学生支援課 TA手当担当</p>`,
    attachments: [{ name: 'TA手当_口座確認書.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- 罠2: 久保田研究科長を装う(個人的な依頼)。フリーメール・偽装リンク・至急と内密 ----------------
  {
    id: 'trap-2-ja', lang: 'ja', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: '久保田 隆', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: '至急:確認のお願い(内密にお願いします)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>TAの方へ</p>
<p>久保田です。いま会議で席を外せず、電話に出られません。TA業務に関わる書類について、急ぎで確認してほしいことがあります。</p>
<p>下記のフォームから、書類の内容を確認して回答してください。人事に関わる内容のため、他の教職員や学生には伝えないでください。</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">書類確認フォーム</a></p>
<p>久保田 隆<br>理工学研究科長</p>`,
    attachments: [],
  },

  // ---------------- 罠3: TA仲間を装う(個人的な依頼)。フリーメール・二重拡張子・見覚えのないRe: ----------------
  {
    id: 'trap-3-ja', lang: 'ja', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: '李 明', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'Re: 第5回レポート採点の件',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>お疲れさま。同じTAの李です。</p>
<p>前に言っていた第5回レポートの採点メモを、修正した版を送ります。基準がこれで合っているか、見てもらえますか?</p>
<p>李</p>
<hr>
<p style="color:#666">> 前回のメールより<br>> 第5回のレポート、採点基準をもう一度そろえたいです。修正したら、送ってもらえますか?</p>`,
    attachments: [{ name: '第5回_採点メモ_修正版.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- 罠4: 情報センターを装う(事務的)。ドメインの綴り違い・リンク文字列と実URLの不一致・脅し ----------------
  {
    id: 'trap-4-ja', lang: 'ja', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: '情報センター セキュリティ担当', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '【情報センター】アカウントの本人確認のお願い',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>TA担当者 各位</p>
<p>情報センターです。お使いのアカウントに、不正なログインの試行を検知しました。</p>
<p>安全のため、<strong>24時間以内</strong>に下記のリンクから本人確認を行ってください。確認が取れない場合、アカウントの利用を一時停止します。</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>情報センター セキュリティ担当</p>`,
    attachments: [],
  },
];
