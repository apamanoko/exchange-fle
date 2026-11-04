import type { Email, Language } from '@/types'

// ─────────────────────────────────────────────────────────────────────────────
// data/practiceEmail.ts
// 本番前に1通だけ表示する「練習メール」（採点対象外・ログ記録なし）。
// 無害な通常メール（国際センターからの事務連絡）。リンク1つ・添付1つ（どちらも正規）。
// getEmailSet の16通には含めず、slot_index も付けない。UI言語に合わせて固定表示する。
// ─────────────────────────────────────────────────────────────────────────────

/** 職員（国際センター）の正規ドメイン */
const STAFF_ADDRESS   = 'intl-center@meijo-u.ac.jp'
/** 学生（本人）の正規ドメイン */
const STUDENT_ADDRESS = 'ta-guest@ccmailg.meijo-u.ac.jp'
/** 正規（安全）なリンク先 */
const SAFE_LINK_URL   = 'https://www.meijo-u.ac.jp/international/'
/** 正規（安全）な添付ファイル名（拡張子 .pdf が見えること） */
const ATTACHMENT_NAME = 'orientation_guide.pdf'

type Loc = {
  /** 練習メールの上に出す案内文 */
  intro: string
  /** 「実験を始める」ボタン */
  startButton: string
  /** 「練習」バッジ */
  badge: string
  /** 差出人表示名（国際センター） */
  fromDisplay: string
  /** 宛先表示名（あなた） */
  toDisplay: string
  subject: string
  greeting: string
  body1: string
  linkText: string
  body2: string
  closing: string
}

const LOC: Record<Language, Loc> = {
  ja: {
    intro: 'これは練習です。メールを開いたら、差出人の欄を確認する・リンクにマウスを重ねて実際のURLを見る・添付ファイルの拡張子を確認する、といった確認の仕方を試してみてください。この画面の操作は記録されず、結果にも影響しません。',
    startButton: '実験を始める',
    badge: '練習',
    fromDisplay: '名城大学 国際センター',
    toDisplay: 'あなた',
    subject: '【国際センター】留学生向けオリエンテーションのご案内',
    greeting: '留学生の皆さまへ',
    body1: '国際センターです。新学期のオリエンテーションについてご案内します。日程や持ち物は下記のページをご確認ください。',
    linkText: 'オリエンテーション案内ページを見る',
    body2: '詳しい手続きは添付のPDFにまとめています。ご不明な点があれば国際センターまでお問い合わせください。',
    closing: '名城大学 国際センター',
  },
  en: {
    intro: 'This is a practice email. When you open it, try out the ways of checking it: look at the sender field, hover over the link to see the real URL, and check the file extension of the attachment. Nothing you do on this screen is recorded, and it does not affect your results.',
    startButton: 'Start the experiment',
    badge: 'Practice',
    fromDisplay: 'Meijo University International Center',
    toDisplay: 'You',
    subject: '[International Center] Orientation for Exchange Students',
    greeting: 'Dear exchange students,',
    body1: 'This is the International Center. Here is some information about the orientation for the new semester. Please check the page below for the schedule and what to bring.',
    linkText: 'View the orientation information page',
    body2: 'The detailed procedures are summarized in the attached PDF. If you have any questions, please contact the International Center.',
    closing: 'Meijo University International Center',
  },
  de: {
    intro: 'Dies ist eine Übungs-E-Mail. Wenn Sie sie öffnen, probieren Sie die Prüfschritte aus: Sehen Sie sich das Absenderfeld an, bewegen Sie die Maus über den Link, um die echte URL zu sehen, und prüfen Sie die Dateiendung des Anhangs. Was Sie auf diesem Bildschirm tun, wird nicht aufgezeichnet und hat keinen Einfluss auf Ihr Ergebnis.',
    startButton: 'Experiment starten',
    badge: 'Übung',
    fromDisplay: 'Meijo-Universität International Center',
    toDisplay: 'Sie',
    subject: '[International Center] Orientierung für Austauschstudierende',
    greeting: 'Liebe Austauschstudierende,',
    body1: 'hier ist das International Center. Im Folgenden Informationen zur Orientierung für das neue Semester. Termine und mitzubringende Unterlagen finden Sie auf der unten verlinkten Seite.',
    linkText: 'Zur Orientierungsseite',
    body2: 'Die ausführlichen Abläufe sind in der angehängten PDF zusammengefasst. Bei Fragen wenden Sie sich bitte an das International Center.',
    closing: 'Meijo-Universität International Center',
  },
  zh: {
    intro: '这是一封练习邮件。打开后，请试着练习确认方法：查看发件人栏、将鼠标悬停在链接上以查看真实网址、检查附件的扩展名。您在本页面的操作不会被记录，也不会影响结果。',
    startButton: '开始实验',
    badge: '练习',
    fromDisplay: '名城大学 国际中心',
    toDisplay: '您',
    subject: '【国际中心】交换留学生迎新说明',
    greeting: '各位交换留学生：',
    body1: '这里是国际中心。现就新学期的迎新活动通知如下。日程及需携带的物品请查看以下页面。',
    linkText: '查看迎新说明页面',
    body2: '详细手续已整理在附件PDF中。如有疑问，请与国际中心联系。',
    closing: '名城大学 国际中心',
  },
  ko: {
    intro: '이것은 연습 이메일입니다. 열어 보신 후, 보낸사람 칸을 확인하고, 링크에 마우스를 올려 실제 URL을 확인하고, 첨부파일의 확장자를 확인하는 등 확인 방법을 연습해 보세요. 이 화면에서의 조작은 기록되지 않으며 결과에도 영향을 주지 않습니다.',
    startButton: '실험 시작',
    badge: '연습',
    fromDisplay: '메이조대학 국제센터',
    toDisplay: '귀하',
    subject: '[국제센터] 교환학생 오리엔테이션 안내',
    greeting: '교환학생 여러분께,',
    body1: '국제센터입니다. 새 학기 오리엔테이션을 안내드립니다. 일정과 준비물은 아래 페이지를 확인해 주세요.',
    linkText: '오리엔테이션 안내 페이지 보기',
    body2: '자세한 절차는 첨부된 PDF에 정리되어 있습니다. 궁금한 점이 있으면 국제센터로 문의해 주세요.',
    closing: '메이조대학 국제센터',
  },
  it: {
    intro: "Questa è un'email di prova. Dopo averla aperta, prova i modi per verificarla: guarda il campo del mittente, passa il mouse sul link per vedere l'URL reale e controlla l'estensione del file allegato. Nulla di ciò che fai in questa schermata viene registrato e non influisce sul risultato.",
    startButton: "Inizia l'esperimento",
    badge: 'Prova',
    fromDisplay: 'Centro Internazionale dell\'Università Meijo',
    toDisplay: 'Tu',
    subject: '[Centro Internazionale] Orientamento per studenti in scambio',
    greeting: 'Cari studenti in scambio,',
    body1: 'è il Centro Internazionale. Di seguito le informazioni sull\'orientamento per il nuovo semestre. Per il calendario e cosa portare, consulta la pagina qui sotto.',
    linkText: 'Vai alla pagina di orientamento',
    body2: 'Le procedure dettagliate sono riassunte nel PDF allegato. Per qualsiasi domanda, contatta il Centro Internazionale.',
    closing: 'Centro Internazionale dell\'Università Meijo',
  },
  vi: {
    intro: 'Đây là email luyện tập. Khi mở, hãy thử các cách kiểm tra: xem ô người gửi, di chuột lên liên kết để thấy URL thật, và kiểm tra phần mở rộng của tệp đính kèm. Mọi thao tác trên màn hình này không được ghi lại và không ảnh hưởng đến kết quả.',
    startButton: 'Bắt đầu thí nghiệm',
    badge: 'Luyện tập',
    fromDisplay: 'Trung tâm Quốc tế Đại học Meijo',
    toDisplay: 'Bạn',
    subject: '[Trung tâm Quốc tế] Thông báo định hướng cho sinh viên trao đổi',
    greeting: 'Các bạn sinh viên trao đổi thân mến,',
    body1: 'đây là Trung tâm Quốc tế. Dưới đây là thông tin về buổi định hướng cho học kỳ mới. Vui lòng xem lịch và vật dụng cần mang theo tại trang bên dưới.',
    linkText: 'Xem trang thông tin định hướng',
    body2: 'Các thủ tục chi tiết được tóm tắt trong tệp PDF đính kèm. Nếu có thắc mắc, vui lòng liên hệ Trung tâm Quốc tế.',
    closing: 'Trung tâm Quốc tế Đại học Meijo',
  },
  es: {
    intro: 'Este es un correo de práctica. Al abrirlo, prueba las formas de comprobarlo: mira el campo del remitente, pasa el ratón por encima del enlace para ver la URL real y revisa la extensión del archivo adjunto. Nada de lo que hagas en esta pantalla se registra y no afecta a tu resultado.',
    startButton: 'Comenzar el experimento',
    badge: 'Práctica',
    fromDisplay: 'Centro Internacional de la Universidad Meijo',
    toDisplay: 'Tú',
    subject: '[Centro Internacional] Orientación para estudiantes de intercambio',
    greeting: 'Estimados estudiantes de intercambio:',
    body1: 'les escribe el Centro Internacional. A continuación, información sobre la orientación del nuevo semestre. Consulten el calendario y qué traer en la página de abajo.',
    linkText: 'Ver la página de orientación',
    body2: 'Los trámites detallados están resumidos en el PDF adjunto. Si tienen dudas, contacten con el Centro Internacional.',
    closing: 'Centro Internacional de la Universidad Meijo',
  },
  pl: {
    intro: 'To jest wiadomość ćwiczeniowa. Po jej otwarciu przećwicz sposoby sprawdzania: spójrz na pole nadawcy, najedź kursorem na link, aby zobaczyć prawdziwy adres URL, i sprawdź rozszerzenie załącznika. Nic, co zrobisz na tym ekranie, nie jest rejestrowane i nie wpływa na wynik.',
    startButton: 'Rozpocznij eksperyment',
    badge: 'Ćwiczenie',
    fromDisplay: 'Centrum Międzynarodowe Uniwersytetu Meijo',
    toDisplay: 'Ty',
    subject: '[Centrum Międzynarodowe] Orientacja dla studentów wymiany',
    greeting: 'Drodzy studenci wymiany,',
    body1: 'tu Centrum Międzynarodowe. Poniżej informacje o spotkaniu orientacyjnym na nowy semestr. Harmonogram i co zabrać znajdziesz na stronie poniżej.',
    linkText: 'Zobacz stronę z informacjami orientacyjnymi',
    body2: 'Szczegółowe procedury podsumowano w załączonym pliku PDF. W razie pytań prosimy o kontakt z Centrum Międzynarodowym.',
    closing: 'Centrum Międzynarodowe Uniwersytetu Meijo',
  },
  no: {
    intro: 'Dette er en øvingse-post. Når du åpner den, kan du prøve måtene å sjekke på: se på avsenderfeltet, hold musepekeren over lenken for å se den virkelige URL-en, og sjekk filtypen til vedlegget. Ingenting du gjør på denne skjermen blir registrert, og det påvirker ikke resultatet ditt.',
    startButton: 'Start eksperimentet',
    badge: 'Øving',
    fromDisplay: 'Meijo-universitetets internasjonale senter',
    toDisplay: 'Du',
    subject: '[Internasjonalt senter] Orientering for utvekslingsstudenter',
    greeting: 'Kjære utvekslingsstudenter,',
    body1: 'dette er Det internasjonale senteret. Her er informasjon om orienteringen for det nye semesteret. Se siden nedenfor for timeplan og hva du skal ha med.',
    linkText: 'Se orienteringssiden',
    body2: 'De detaljerte rutinene er oppsummert i den vedlagte PDF-en. Har du spørsmål, ta kontakt med Det internasjonale senteret.',
    closing: 'Meijo-universitetets internasjonale senter',
  },
  fi: {
    intro: 'Tämä on harjoitusviesti. Kun avaat sen, kokeile tarkistustapoja: katso lähettäjäkenttä, vie hiiri linkin päälle nähdäksesi todellisen URL-osoitteen ja tarkista liitteen tiedostopääte. Mitään tällä näytöllä tekemääsi ei tallenneta, eikä se vaikuta tulokseesi.',
    startButton: 'Aloita koe',
    badge: 'Harjoitus',
    fromDisplay: 'Meijon yliopiston kansainvälinen keskus',
    toDisplay: 'Sinä',
    subject: '[Kansainvälinen keskus] Perehdytys vaihto-opiskelijoille',
    greeting: 'Hyvät vaihto-opiskelijat,',
    body1: 'täällä on kansainvälinen keskus. Alla tietoa uuden lukukauden perehdytyksestä. Katso aikataulu ja mukaan otettavat tavarat alla olevalta sivulta.',
    linkText: 'Katso perehdytyssivu',
    body2: 'Yksityiskohtaiset ohjeet on koottu liitteenä olevaan PDF-tiedostoon. Jos sinulla on kysyttävää, ota yhteyttä kansainväliseen keskukseen.',
    closing: 'Meijon yliopiston kansainvälinen keskus',
  },
}

export type PracticeContent = {
  intro: string
  startButton: string
  badge: string
  email: Email
}

/**
 * UI言語に対応した練習メールと案内文を返す（固定内容・採点対象外）。
 * email.id は 'practice-1'（本番の trap / normal とは別名前空間）。
 */
export function getPracticeContent(lang: Language): PracticeContent {
  const loc = LOC[lang] ?? LOC.en
  const bodyHtml =
    `<p>${loc.greeting}</p>` +
    `<p>${loc.body1}</p>` +
    `<p><a href="${SAFE_LINK_URL}">${loc.linkText}</a></p>` +
    `<p>${loc.body2}</p>` +
    `<p>${loc.closing}</p>`

  const email: Email = {
    id: 'practice-1',
    lang,
    isTrap: false,
    traps: [],
    from: { display: loc.fromDisplay, address: STAFF_ADDRESS },
    to: { display: loc.toDisplay, address: STUDENT_ADDRESS },
    subject: loc.subject,
    bodyHtml,
    dateOffsetDays: -1,
    dateTime: '09:30',
    attachments: [
      {
        name: ATTACHMENT_NAME,
        displayName: ATTACHMENT_NAME,
        mimeType: 'application/pdf',
        isTrapped: false,
      },
    ],
  }

  return { intro: loc.intro, startButton: loc.startButton, badge: loc.badge, email }
}
