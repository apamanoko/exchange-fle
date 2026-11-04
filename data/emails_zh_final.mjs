// =====================================================================
// 中国語版(母語版・簡体字) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 文字: 簡体字(中国大陸の参加者を想定。台湾などの参加者がいる場合は、繁体字版が別途必要)。
// 人名: 日本人の名前は、中国語でも漢字のまま簡体字で表記(田中诚二 など)。中国人の李 明は「李明」。
// 敬語: 事務連絡・教員は「您」、TA仲間同士は「你」。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsZhFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-zh', lang: 'zh', isTrap: false, traps: [],
    from: { display: '田中诚二', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: '关于下周研讨课日程变更的通知',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>各位TA：</p>
<p>我是田中。因校内活动，我负责的练习课程原定于{{D+7}}的研讨课，改至{{D+8}}第3节课。</p>
<p>修改后的日程表见附件。请在{{D+3}}前回复告知您是否能以TA身份参加。如果不方便，我们再另行安排其他日期。</p>
<p>谨上</p>
<p>田中诚二<br>信息工学部 信息工学科</p>`,
    attachments: [{ name: '研讨课日程_修改版.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-zh', lang: 'zh', isTrap: false, traps: [],
    from: { display: '教务处', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: '关于提交TA工作报告的方法',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>各位TA：</p>
<p>我们是教务处。现将本月TA工作报告的提交方法通知如下。</p>
<p>请通过下方链接登录校内门户网站，在工作报告表格中填写工作日期和工作时长。</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA工作报告表格（校内门户）</a></p>
<p>提交截止日期为{{D+7}}。如有疑问，请到教务处窗口咨询。</p>
<p>教务处</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-zh', lang: 'zh', isTrap: false, traps: [],
    from: { display: '国际交流中心', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: '关于寒假休业期间的通知',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>各位留学生及TA：</p>
<p>我们是国际交流中心。现将寒假休业期间的窗口办公安排通知如下。</p>
<p>详情请见附件PDF。休业期间，邮件咨询的回复可能会有所延迟。</p>
<p>国际交流中心</p>`,
    attachments: [{ name: '寒假休业通知.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-zh', lang: 'zh', isTrap: false, traps: [],
    from: { display: '佐藤健太', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'TA培训资料已共享',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>你好，我是同为TA的佐藤。</p>
<p>我把上周TA培训的资料整理到了Google Drive上。你能确认一下是否可以打开吗？</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA培训资料（Google Drive）</a></p>
<p>如果缺少什么资料，请告诉我。</p>
<p>佐藤</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-zh', lang: 'zh', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: '学生支援课 TA津贴负责', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '【重要】关于确认TA津贴汇款账户（今日内）',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>各位TA：</p>
<p>我们是学生支援课。为发放本月TA津贴，我们尚未能确认已登记的银行账户信息。</p>
<p>请在附件的确认表中填写账户信息，并于<strong>今天下午5点前</strong>回复。逾期的话，本月津贴将推迟到下个月或之后发放。</p>
<p>学生支援课 TA津贴负责</p>`,
    attachments: [{ name: 'TA津贴_账户确认表.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-zh', lang: 'zh', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: '久保田隆', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: '紧急：请求确认（请保密）',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>您好：</p>
<p>我是久保田。我正在开会，无法接电话。关于与您TA工作相关的文件，有一件事需要您紧急确认。</p>
<p>请查看文件，并通过下方表格回复。由于涉及人事问题，请不要告知其他教职员工或学生。</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">文件确认表格</a></p>
<p>久保田隆<br>理工学研究科长</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-zh', lang: 'zh', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: '李明', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: '回复：关于第5次报告评分',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>你好，我是同为TA的李。</p>
<p>把之前说过的第5次报告评分笔记的修改版发给你。你能帮我看看评分标准是否合适吗？</p>
<p>李</p>
<hr>
<p style="color:#666">&gt; 来自上一封邮件：<br>&gt; 我想再统一一下第5次报告的评分标准。修改好之后，能发给我吗？</p>`,
    attachments: [{ name: '第5次_评分笔记_修改版.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-zh', lang: 'zh', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: '信息中心 安全负责', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '【信息中心】请求确认账户身份',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>各位TA：</p>
<p>我们是信息中心。我们检测到您的账户存在异常登录尝试。</p>
<p>为了账户安全，请在<strong>24小时内</strong>通过下方链接确认身份。如果无法确认，您的账户将被暂时停用。</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>信息中心 安全负责</p>`,
    attachments: [],
  },
];
