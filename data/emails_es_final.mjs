// =====================================================================
// スペイン語版(母語版) 罠4・通常4 — 日本語版 emails_ja_final.mjs と1対1で対応
// 対応ルールは emails_en_final.mjs の冒頭と同じ(アドレス・URL・拡張子・サイズ・タグ・日付トークンは日本語版と同一)。
// 人名: ローマ字(日本人は名→姓、中国人の李 明は Li Ming)。
// 変種: スペインとラテンアメリカのどちらでも不自然にならない中立的な表現(vosotros は使わず ustedes、語彙は共通語)。
// 呼びかけ: 事務連絡・教員は ustedes(複数)/ usted(罠2・単数)、TA仲間同士は tú。
// =====================================================================

const TO = { display: 'TA', address: 'ta-guest@ccmailg.meijo-u.ac.jp' };

export const emailsEsFinal = [
  // ---------------- normal 1 ----------------
  {
    id: 'normal-1-es', lang: 'es', isTrap: false, traps: [],
    from: { display: 'Seiji Tanaka', address: 'tanaka-seiji@meijo-u.ac.jp' },
    to: TO,
    subject: 'Cambio en el programa del seminario de la próxima semana',
    date: { offsetDays: -1, time: '16:40' },
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe Tanaka. Debido a un evento de la universidad, el seminario del curso de ejercicios a mi cargo, previsto para el {{D+7}}, se traslada para el {{D+8}}, en la tercera hora.</p>
<p>Adjunto el programa actualizado. Por favor, respondan a más tardar el {{D+3}} para indicarme si pueden participar como TA. Si no les resulta posible, coordinaremos otro día.</p>
<p>Saludos cordiales,</p>
<p>Seiji Tanaka<br>Departamento de Ingeniería de la Información</p>`,
    attachments: [{ name: 'Programa_Seminario_Actualizado.pdf', sizeKB: 118, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 2 ----------------
  {
    id: 'normal-2-es', lang: 'es', isTrap: false, traps: [],
    from: { display: 'Oficina de Asuntos Académicos', address: 'gakumu@meijo-u.ac.jp' },
    to: TO,
    subject: 'Cómo entregar el informe de trabajo de TA',
    date: { offsetDays: -2, time: '10:05' },
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe la Oficina de Asuntos Académicos. Les explicamos cómo entregar el informe de trabajo de TA de este mes.</p>
<p>Inicien sesión en el portal de la universidad mediante el siguiente enlace e ingresen los días y las horas trabajadas en el formulario del informe.</p>
<p><a href="javascript:void(0)" data-display-url="https://portal.meijo-u.ac.jp/ta/report">Formulario de informe de trabajo de TA (portal de la universidad)</a></p>
<p>El plazo de entrega es el {{D+7}}. Si tienen alguna duda, consulten en la ventanilla de la Oficina de Asuntos Académicos.</p>
<p>Oficina de Asuntos Académicos</p>`,
    attachments: [],
  },

  // ---------------- normal 3 ----------------
  {
    id: 'normal-3-es', lang: 'es', isTrap: false, traps: [],
    from: { display: 'Centro Internacional', address: 'kokusai@meijo-u.ac.jp' },
    to: TO,
    subject: 'Aviso de cierre por las vacaciones de invierno',
    date: { offsetDays: -3, time: '13:20' },
    bodyHtml: `<p>Estimados estudiantes internacionales y TA:</p>
<p>Les escribe el Centro Internacional. Les informamos sobre el funcionamiento de nuestra oficina durante las vacaciones de invierno.</p>
<p>Consulten el PDF adjunto para más detalles. Durante el cierre, las respuestas a las consultas por correo electrónico podrían demorar.</p>
<p>Centro Internacional</p>`,
    attachments: [{ name: 'Aviso_Vacaciones_de_Invierno.pdf', sizeKB: 312, mimeType: 'application/pdf', isTrapped: false }],
  },

  // ---------------- normal 4 ----------------
  {
    id: 'normal-4-es', lang: 'es', isTrap: false, traps: [],
    from: { display: 'Kenta Sato', address: 'sato-kenta@ccmailg.meijo-u.ac.jp' },
    to: TO,
    subject: 'He compartido los materiales de la capacitación de TA',
    date: { offsetDays: 0, time: '08:55' },
    bodyHtml: `<p>Hola, soy Sato, otro TA.</p>
<p>Reuní en Google Drive los materiales de la capacitación de TA de la semana pasada. ¿Puedes comprobar si puedes abrirlos?</p>
<p><a href="javascript:void(0)" data-display-url="https://drive.google.com/drive/folders/1kTA2tr4in1ng0materials">Materiales de la capacitación de TA (Google Drive)</a></p>
<p>Si falta algo, avísame.</p>
<p>Sato</p>`,
    attachments: [],
  },

  // ---------------- trap 1 ----------------
  {
    id: 'trap-1-es', lang: 'es', isTrap: true,
    traps: ['sender_domain_spoof', 'attachment_double_ext', 'urgency_deadline', 'sensitive_info_request'],
    from: { display: 'Oficina de Apoyo Estudiantil – Asignación de TA', address: 'ta-teate@ccmailg.meijo-u.co.jp' },
    to: TO,
    subject: '[Importante] Confirmación de su cuenta bancaria para la asignación de TA (hoy)',
    date: { offsetDays: 0, time: '09:12' },
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe la Oficina de Apoyo Estudiantil. Para efectuar el pago de la asignación de TA de este mes, no hemos podido confirmar los datos de la cuenta bancaria registrada.</p>
<p>Completen el formulario adjunto con los datos de su cuenta y devuélvanlo <strong>antes de las 17:00 de hoy</strong>. Si vence el plazo, el pago de este mes se aplazará al mes siguiente o más adelante.</p>
<p>Oficina de Apoyo Estudiantil – Asignación de TA</p>`,
    attachments: [{ name: 'Formulario_Verificacion_Cuenta_Asignacion_TA.pdf.exe', sizeKB: 287, mimeType: 'application/pdf', isTrapped: true }],
  },

  // ---------------- trap 2 ----------------
  {
    id: 'trap-2-es', lang: 'es', isTrap: true,
    traps: ['free_mail_sender', 'link_mismatch', 'urgency', 'secrecy', 'authority'],
    from: { display: 'Takashi Kubota', address: 'kubota.takashi.meijo@gmail.com' },
    to: TO,
    subject: 'Urgente: solicitud de confirmación (por favor, manténgalo en confidencialidad)',
    date: { offsetDays: -1, time: '19:47' },
    bodyHtml: `<p>Estimado TA:</p>
<p>Le escribe Kubota. Estoy en una reunión y no puedo atender llamadas. Necesito que confirme con urgencia un asunto sobre documentos relacionados con su trabajo de TA.</p>
<p>Revise los documentos y responda mediante el formulario de abajo. Como se trata de un asunto de personal, le pido que no lo comente con otros docentes ni estudiantes.</p>
<p><a href="javascript:void(0)" data-display-url="https://docs.google.com-edit.net/forms/d/e/1FAIpQLSf/viewform" data-phished-url="/phished?type=link">Formulario de confirmación de documentos</a></p>
<p>Takashi Kubota<br>Director de la Escuela de Posgrado de Ciencias y Tecnología</p>`,
    attachments: [],
  },

  // ---------------- trap 3 ----------------
  {
    id: 'trap-3-es', lang: 'es', isTrap: true,
    traps: ['free_mail_sender', 'attachment_double_ext', 'fake_reply_thread'],
    from: { display: 'Li Ming', address: 'li.ming.0912@gmail.com' },
    to: TO,
    subject: 'RE: Calificación del informe 5',
    date: { offsetDays: -1, time: '21:03' },
    bodyHtml: `<p>Hola, soy Li, otro TA.</p>
<p>Te envío la versión corregida de las notas de calificación del informe 5 que mencioné antes. ¿Puedes revisar si los criterios te parecen correctos?</p>
<p>Li</p>
<hr>
<p style="color:#666">&gt; Del correo anterior:<br>&gt; Me gustaría unificar de nuevo los criterios de calificación del informe 5. ¿Me los puedes enviar cuando los hayas revisado?</p>`,
    attachments: [{ name: 'Notas_Calificacion_Informe5_Revisadas.docx.exe', sizeKB: 164, mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', isTrapped: true }],
  },

  // ---------------- trap 4 ----------------
  {
    id: 'trap-4-es', lang: 'es', isTrap: true,
    traps: ['sender_domain_typo', 'link_text_mismatch', 'threat_deadline'],
    from: { display: 'Centro de Informática – Seguridad', address: 'security@ccmallg.meijo-u.ac.jp' },
    to: TO,
    subject: '[Centro de Informática] Solicitud de verificación de identidad de su cuenta',
    date: { offsetDays: 0, time: '07:30' },
    bodyHtml: `<p>Estimados TA:</p>
<p>Les escribe el Centro de Informática. Hemos detectado un intento de acceso no autorizado a su cuenta.</p>
<p>Por su seguridad, verifiquen su identidad mediante el siguiente enlace <strong>dentro de las próximas 24 horas</strong>. Si no podemos confirmar su identidad, su cuenta se suspenderá temporalmente.</p>
<p><a href="javascript:void(0)" data-display-url="https://meijo-u-portal-support.com/account/verify" data-phished-url="/phished?type=link">https://portal.meijo-u.ac.jp/account/verify</a></p>
<p>Centro de Informática – Seguridad</p>`,
    attachments: [],
  },
];
