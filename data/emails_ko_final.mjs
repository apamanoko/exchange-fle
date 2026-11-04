// =====================================================================
// 韓国語版(母語版) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 人名: 日本人の名前は韓国語の外来語表記(日本語の読み)、中国人の名前(李 明)は現代中国語の読みで「리밍」。漢字(ハンジャ)は使わない。
// 敬語: 事務連絡・教員は합쇼체(です・ます体)、TA仲間同士は해요체(やわらかい丁寧語)。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsKoFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-ko', lang: 'ko', isTrap: false, traps: [],
    from: { display: '다나카 세이지', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: '다음 주 세미나 일정 변경 안내',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>TA 여러분께</p>
<p>다나카입니다. 제가 담당하는 연습 과목의 세미나가 학내 행사로 인해, {{D+7}}에 예정되어 있던 일정에서 {{D+8}} 3교시로 변경되었습니다.</p>
<p>변경된 일정표를 첨부합니다. TA로 참석 가능하신지 {{D+3}}까지 회신으로 알려 주세요. 어려운 경우에는 다른 날로 조정하겠습니다.</p>
<p>잘 부탁드립니다.</p>
<p>다나카 세이지<br>정보공학부 정보공학과</p>`,
    attachments: [{ name: '세미나_일정_변경본.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-ko', lang: 'ko', isTrap: false, traps: [],
    from: { display: '학무과', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'TA 근무 보고 제출 방법 안내',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>학무과입니다. 이번 달 TA 근무 보고서의 제출 방법을 안내드립니다.</p>
<p>아래 링크에서 학내 포털의 근무 보고 양식에 로그인하여 근무일과 근무 시간을 입력해 주세요.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">TA 근무 보고 양식(학내 포털)</a></p>
<p>제출 기한은 {{D+7}}입니다. 궁금한 점이 있으시면 학무과 창구로 문의해 주세요.</p>
<p>학무과</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-ko', lang: 'ko', isTrap: false, traps: [],
    from: { display: '국제센터', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: '동계 휴업 기간 안내',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>유학생·TA 여러분께</p>
<p>국제센터입니다. 동계 휴업 기간 중의 창구 운영에 대해 알려드립니다.</p>
<p>자세한 내용은 첨부된 PDF를 확인해 주세요. 휴업 기간 중에는 이메일 문의에 대한 답변이 늦어질 수 있습니다.</p>
<p>국제센터</p>`,
    attachments: [{ name: '동계휴업_안내.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-ko', lang: 'ko', isTrap: false, traps: [],
    from: { display: '사토 겐타', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'TA 연수 자료 공유했어요',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>수고 많으세요. 같은 TA인 사토예요.</p>
<p>지난주 TA 연수 자료를 구글 드라이브에 정리해 두었어요. 열리는지 확인해 주실 수 있나요?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">TA 연수 자료(구글 드라이브)</a></p>
<p>부족한 자료가 있으면 알려 주세요.</p>
<p>사토</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-ko', lang: 'ko', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: '학생지원과 TA 수당 담당', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '[중요] TA 수당 입금 계좌 확인 요청(오늘 중)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>학생지원과입니다. 이번 달 TA 수당을 입금하는 데 있어, 등록되어 있는 계좌 정보를 확인하지 못했습니다.</p>
<p>첨부된 확인서에 계좌 정보를 기재하여 <strong>오늘 오후 5시까지</strong> 회신해 주세요. 기한이 지나면 이번 달 수당 입금은 다음 달 이후로 연기됩니다.</p>
<p>학생지원과 TA 수당 담당</p>`,
    attachments: [{ name: 'TA수당_계좌확인서.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-ko', lang: 'ko', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: '구보타 다카시', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: '긴급: 확인 부탁드립니다(비밀로 해 주세요)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>TA 담당자께</p>
<p>구보타입니다. 지금 회의 중이라 자리를 비울 수 없어 전화를 받지 못합니다. TA 업무와 관련된 서류에 대해 급히 확인해 주셨으면 하는 것이 있습니다.</p>
<p>아래 양식에서 서류 내용을 확인하고 회신해 주세요. 인사와 관련된 내용이므로, 다른 교직원이나 학생에게는 말하지 말아 주세요.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">서류 확인 양식</a></p>
<p>구보타 다카시<br>이공학연구과장</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-ko', lang: 'ko', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: '리밍', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'Re: 제5회 리포트 채점 건',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>안녕하세요, 같은 TA인 리예요.</p>
<p>전에 말했던 제5회 리포트 채점 메모를 수정한 버전으로 보내요. 기준이 이 정도면 맞는지 봐 주실 수 있나요?</p>
<p>리</p>
<hr>
<p style="color:#666">&gt; 이전 메일에서<br>&gt; 제5회 리포트 채점 기준을 다시 한번 맞추고 싶어요. 수정하면 보내 주실 수 있나요?</p>`,
    attachments: [{ name: '제5회_채점메모_수정본.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-ko', lang: 'ko', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: '정보센터 보안 담당', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '[정보센터] 계정 본인 확인 요청',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>TA 담당자 여러분께</p>
<p>정보센터입니다. 사용 중이신 계정에서 비정상적인 로그인 시도가 감지되었습니다.</p>
<p>안전을 위해 <strong>24시간 이내</strong>에 아래 링크에서 본인 확인을 해 주세요. 확인이 되지 않으면 계정 이용이 일시 중지됩니다.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>정보센터 보안 담당</p>`,
    attachments: [],
  },
];
