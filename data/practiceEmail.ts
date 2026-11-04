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
/** 正規（安全）な添付ファイル名（実ファイル名・拡張子 .pdf が見える形。UI言語ごと） */
const ATTACHMENT_NAMES: Record<Language, string> = {
  ja: '交流会のご案内.pdf',
  en: 'exchange_meetup_invitation.pdf',
  de: 'Einladung_Austauschtreffen.pdf',
  zh: '交流会邀请.pdf',
  ko: '교류회_안내.pdf',
  it: 'Invito_Incontro_Scambio.pdf',
  vi: 'Thu_moi_giao_luu.pdf',
  es: 'Invitacion_Encuentro_Intercambio.pdf',
  pl: 'Zaproszenie_Spotkanie_Wymiany.pdf',
  no: 'Invitasjon_Utvekslingstreff.pdf',
  fi: 'Kutsu_Vaihtotapaaminen.pdf',
}

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
    subject: '【国際センター】留学生交流会のお知らせ',
    greeting: '留学生の皆さまへ',
    body1: '国際センターです。留学生の皆さんが参加できる交流会を開催します。日程や会場は下記のページをご確認ください。',
    linkText: '交流会の案内ページを見る',
    body2: '当日のプログラムは添付のPDFにまとめています。ご不明な点があれば国際センターまでお問い合わせください。',
    closing: '名城大学 国際センター',
  },
  en: {
    intro: 'This is a practice email. When you open it, try out the ways of checking it: look at the sender field, hover over the link to see the real URL, and check the file extension of the attachment. Nothing you do on this screen is recorded, and it does not affect your results.',
    startButton: 'Start the experiment',
    badge: 'Practice',
    fromDisplay: 'Meijo University International Center',
    toDisplay: 'You',
    subject: '[International Center] Exchange Students Meetup',
    greeting: 'Dear exchange students,',
    body1: 'This is the International Center. We are holding a meetup where exchange students can get to know each other. Please check the page below for the date and venue.',
    linkText: 'View the meetup information page',
    body2: "The day's program is summarized in the attached PDF. If you have any questions, please contact the International Center.",
    closing: 'Meijo University International Center',
  },
  de: {
    intro: 'Dies ist eine Übungs-E-Mail. Wenn Sie sie öffnen, probieren Sie die Prüfschritte aus: Sehen Sie sich das Absenderfeld an, bewegen Sie die Maus über den Link, um die echte URL zu sehen, und prüfen Sie die Dateiendung des Anhangs. Was Sie auf diesem Bildschirm tun, wird nicht aufgezeichnet und hat keinen Einfluss auf Ihr Ergebnis.',
    startButton: 'Experiment starten',
    badge: 'Übung',
    fromDisplay: 'Meijo-Universität International Center',
    toDisplay: 'Sie',
    subject: '[International Center] Treffen für Austauschstudierende',
    greeting: 'Liebe Austauschstudierende,',
    body1: 'hier ist das International Center. Wir veranstalten ein Treffen, bei dem sich Austauschstudierende kennenlernen können. Termin und Veranstaltungsort finden Sie auf der unten verlinkten Seite.',
    linkText: 'Zur Infoseite des Treffens',
    body2: 'Das Programm des Tages ist in der angehängten PDF zusammengefasst. Bei Fragen wenden Sie sich bitte an das International Center.',
    closing: 'Meijo-Universität International Center',
  },
  zh: {
    intro: '这是一封练习邮件。打开后，请试着练习确认方法：查看发件人栏、将鼠标悬停在链接上以查看真实网址、检查附件的扩展名。您在本页面的操作不会被记录，也不会影响结果。',
    startButton: '开始实验',
    badge: '练习',
    fromDisplay: '名城大学 国际中心',
    toDisplay: '您',
    subject: '【国际中心】留学生交流会通知',
    greeting: '各位交换留学生：',
    body1: '这里是国际中心。我们将举办一场供留学生相互交流的交流会。日程及会场请查看以下页面。',
    linkText: '查看交流会说明页面',
    body2: '当天的活动安排已整理在附件PDF中。如有疑问，请与国际中心联系。',
    closing: '名城大学 国际中心',
  },
  ko: {
    intro: '이것은 연습 이메일입니다. 열어 보신 후, 보낸사람 칸을 확인하고, 링크에 마우스를 올려 실제 URL을 확인하고, 첨부파일의 확장자를 확인하는 등 확인 방법을 연습해 보세요. 이 화면에서의 조작은 기록되지 않으며 결과에도 영향을 주지 않습니다.',
    startButton: '실험 시작',
    badge: '연습',
    fromDisplay: '메이조대학 국제센터',
    toDisplay: '귀하',
    subject: '[국제센터] 유학생 교류회 안내',
    greeting: '교환학생 여러분께,',
    body1: '국제센터입니다. 유학생들이 서로 교류할 수 있는 교류회를 개최합니다. 일정과 장소는 아래 페이지를 확인해 주세요.',
    linkText: '교류회 안내 페이지 보기',
    body2: '당일 프로그램은 첨부된 PDF에 정리되어 있습니다. 궁금한 점이 있으면 국제센터로 문의해 주세요.',
    closing: '메이조대학 국제센터',
  },
  it: {
    intro: "Questa è un'email di prova. Dopo averla aperta, prova i modi per verificarla: guarda il campo del mittente, passa il mouse sul link per vedere l'URL reale e controlla l'estensione del file allegato. Nulla di ciò che fai in questa schermata viene registrato e non influisce sul risultato.",
    startButton: "Inizia l'esperimento",
    badge: 'Prova',
    fromDisplay: 'Centro Internazionale dell\'Università Meijo',
    toDisplay: 'Tu',
    subject: '[Centro Internazionale] Incontro per studenti in scambio',
    greeting: 'Cari studenti in scambio,',
    body1: 'è il Centro Internazionale. Organizziamo un incontro in cui gli studenti in scambio possono conoscersi. Per la data e la sede, consulta la pagina qui sotto.',
    linkText: "Vai alla pagina dell'incontro",
    body2: 'Il programma della giornata è riassunto nel PDF allegato. Per qualsiasi domanda, contatta il Centro Internazionale.',
    closing: 'Centro Internazionale dell\'Università Meijo',
  },
  vi: {
    intro: 'Đây là email luyện tập. Khi mở, hãy thử các cách kiểm tra: xem ô người gửi, di chuột lên liên kết để thấy URL thật, và kiểm tra phần mở rộng của tệp đính kèm. Mọi thao tác trên màn hình này không được ghi lại và không ảnh hưởng đến kết quả.',
    startButton: 'Bắt đầu thí nghiệm',
    badge: 'Luyện tập',
    fromDisplay: 'Trung tâm Quốc tế Đại học Meijo',
    toDisplay: 'Bạn',
    subject: '[Trung tâm Quốc tế] Thông báo buổi giao lưu sinh viên trao đổi',
    greeting: 'Các bạn sinh viên trao đổi thân mến,',
    body1: 'đây là Trung tâm Quốc tế. Chúng tôi tổ chức một buổi giao lưu để các bạn sinh viên trao đổi làm quen với nhau. Vui lòng xem lịch và địa điểm tại trang bên dưới.',
    linkText: 'Xem trang thông tin buổi giao lưu',
    body2: 'Chương trình trong ngày được tóm tắt trong tệp PDF đính kèm. Nếu có thắc mắc, vui lòng liên hệ Trung tâm Quốc tế.',
    closing: 'Trung tâm Quốc tế Đại học Meijo',
  },
  es: {
    intro: 'Este es un correo de práctica. Al abrirlo, prueba las formas de comprobarlo: mira el campo del remitente, pasa el ratón por encima del enlace para ver la URL real y revisa la extensión del archivo adjunto. Nada de lo que hagas en esta pantalla se registra y no afecta a tu resultado.',
    startButton: 'Comenzar el experimento',
    badge: 'Práctica',
    fromDisplay: 'Centro Internacional de la Universidad Meijo',
    toDisplay: 'Tú',
    subject: '[Centro Internacional] Encuentro para estudiantes de intercambio',
    greeting: 'Estimados estudiantes de intercambio:',
    body1: 'les escribe el Centro Internacional. Organizamos un encuentro para que los estudiantes de intercambio se conozcan. Consulten la fecha y el lugar en la página de abajo.',
    linkText: 'Ver la página del encuentro',
    body2: 'El programa del día está resumido en el PDF adjunto. Si tienen dudas, contacten con el Centro Internacional.',
    closing: 'Centro Internacional de la Universidad Meijo',
  },
  pl: {
    intro: 'To jest wiadomość ćwiczeniowa. Po jej otwarciu przećwicz sposoby sprawdzania: spójrz na pole nadawcy, najedź kursorem na link, aby zobaczyć prawdziwy adres URL, i sprawdź rozszerzenie załącznika. Nic, co zrobisz na tym ekranie, nie jest rejestrowane i nie wpływa na wynik.',
    startButton: 'Rozpocznij eksperyment',
    badge: 'Ćwiczenie',
    fromDisplay: 'Centrum Międzynarodowe Uniwersytetu Meijo',
    toDisplay: 'Ty',
    subject: '[Centrum Międzynarodowe] Spotkanie dla studentów wymiany',
    greeting: 'Drodzy studenci wymiany,',
    body1: 'tu Centrum Międzynarodowe. Organizujemy spotkanie, na którym studenci wymiany mogą się poznać. Termin i miejsce znajdziesz na stronie poniżej.',
    linkText: 'Zobacz stronę informacyjną spotkania',
    body2: 'Program dnia podsumowano w załączonym pliku PDF. W razie pytań prosimy o kontakt z Centrum Międzynarodowym.',
    closing: 'Centrum Międzynarodowe Uniwersytetu Meijo',
  },
  no: {
    intro: 'Dette er en øvingse-post. Når du åpner den, kan du prøve måtene å sjekke på: se på avsenderfeltet, hold musepekeren over lenken for å se den virkelige URL-en, og sjekk filtypen til vedlegget. Ingenting du gjør på denne skjermen blir registrert, og det påvirker ikke resultatet ditt.',
    startButton: 'Start eksperimentet',
    badge: 'Øving',
    fromDisplay: 'Meijo-universitetets internasjonale senter',
    toDisplay: 'Du',
    subject: '[Internasjonalt senter] Treff for utvekslingsstudenter',
    greeting: 'Kjære utvekslingsstudenter,',
    body1: 'dette er Det internasjonale senteret. Vi arrangerer et treff der utvekslingsstudenter kan bli kjent med hverandre. Se siden nedenfor for dato og sted.',
    linkText: 'Se informasjonssiden for treffet',
    body2: 'Programmet for dagen er oppsummert i den vedlagte PDF-en. Har du spørsmål, ta kontakt med Det internasjonale senteret.',
    closing: 'Meijo-universitetets internasjonale senter',
  },
  fi: {
    intro: 'Tämä on harjoitusviesti. Kun avaat sen, kokeile tarkistustapoja: katso lähettäjäkenttä, vie hiiri linkin päälle nähdäksesi todellisen URL-osoitteen ja tarkista liitteen tiedostopääte. Mitään tällä näytöllä tekemääsi ei tallenneta, eikä se vaikuta tulokseesi.',
    startButton: 'Aloita koe',
    badge: 'Harjoitus',
    fromDisplay: 'Meijon yliopiston kansainvälinen keskus',
    toDisplay: 'Sinä',
    subject: '[Kansainvälinen keskus] Vaihto-opiskelijoiden tapaaminen',
    greeting: 'Hyvät vaihto-opiskelijat,',
    body1: 'täällä on kansainvälinen keskus. Järjestämme tapaamisen, jossa vaihto-opiskelijat voivat tutustua toisiinsa. Katso päivämäärä ja paikka alla olevalta sivulta.',
    linkText: 'Katso tapaamisen tiedotussivu',
    body2: 'Päivän ohjelma on koottu liitteenä olevaan PDF-tiedostoon. Jos sinulla on kysyttävää, ota yhteyttä kansainväliseen keskukseen.',
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
        name: ATTACHMENT_NAMES[lang] ?? ATTACHMENT_NAMES.en,
        sizeKB: 186,
        mimeType: 'application/pdf',
        isTrapped: false,
      },
    ],
  }

  return { intro: loc.intro, startButton: loc.startButton, badge: loc.badge, email }
}
