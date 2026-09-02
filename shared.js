// Keep the visitor's effective page scale consistent across static-page navigation.
const pageScaleStorageKey = "tojdoron-page-scale";
const getNativePageScale = () => {
  const scale = Number(window.devicePixelRatio);
  return Number.isFinite(scale) && scale > 0 ? scale : 1;
};
const readSavedPageScale = () => {
  try {
    const scale = Number.parseFloat(window.localStorage.getItem(pageScaleStorageKey) || "");
    return Number.isFinite(scale) && scale >= 0.5 && scale <= 5 ? scale : null;
  } catch {
    return null;
  }
};
const savePageScale = (scale) => {
  try { window.localStorage.setItem(pageScaleStorageKey, String(scale)); } catch {}
};

let nativePageScale = getNativePageScale();
let emulatedPageScale = 1;
const savedPageScale = readSavedPageScale();

if (savedPageScale === null) {
  savePageScale(nativePageScale);
} else {
  const scaleRatio = savedPageScale / nativePageScale;
  if (Math.abs(scaleRatio - 1) > 0.01 && scaleRatio >= 0.5 && scaleRatio <= 2.5) {
    document.documentElement.style.zoom = String(scaleRatio);
    emulatedPageScale = scaleRatio;
  }
}

const syncPageScale = () => {
  const nextScale = getNativePageScale();
  if (Math.abs(nextScale - nativePageScale) < 0.01) return;
  nativePageScale = nextScale;
  savePageScale(nativePageScale);
  if (emulatedPageScale !== 1) {
    document.documentElement.style.removeProperty("zoom");
    emulatedPageScale = 1;
  }
};

window.addEventListener("resize", syncPageScale, { passive: true });
window.visualViewport?.addEventListener("resize", syncPageScale, { passive: true });
window.addEventListener("pagehide", () => {
  if (emulatedPageScale === 1) savePageScale(nativePageScale);
});

document.documentElement.classList.add("js");

const languageStorageKey = "tojdoron-language";
const russianTranslations = {
  "Language": "Язык",
  "Dushanbe, Tajikistan": "Душанбе, Таджикистан",
  "Dushanbe": "Душанбе",
  "Tajikistan": "Таджикистан",
  "Call TOJDORON at +992 978 241717": "Позвонить в TOJDORON: +992 978 241717",
  "Call TOJDORON at +992 978 231717": "Позвонить в TOJDORON: +992 978 231717",
  "TOJDORON home": "Главная страница TOJDORON",
  "Open navigation": "Открыть навигацию",
  "Close navigation": "Закрыть навигацию",
  "Primary navigation": "Основная навигация",
  "Skip to content": "Перейти к основному содержимому",
  "Home": "Главная",
  "About us": "О компании",
  "Services": "Услуги",
  "Contact us": "Контакты",
  "Request a quote": "Запросить расчёт",
  "Request a freight quote": "Запросить расчёт перевозки",
  "Road freight": "Автоперевозки",
  "Sea freight": "Морские перевозки",
  "Cargo shipping": "Перевозка грузов",
  "Air freight": "Авиаперевозки",
  "Freight, without borders.": "Перевозки без границ.",
  "TOJDORON organizes the right route, the right transport, and clear support from pickup to final destination.": "TOJDORON подбирает оптимальный маршрут и вид транспорта и обеспечивает прозрачное сопровождение — от забора груза до конечного пункта назначения.",
  "Plan your shipment": "Спланировать перевозку",
  "Explore services": "Изучить услуги",
  "TOJDORON transport modes": "Виды перевозок TOJDORON",
  "Road freight for flexible international routes": "Автомобильные перевозки по гибким международным маршрутам",
  "Sea freight for efficient long-distance shipping": "Эффективные морские перевозки на дальние расстояния",
  "Cargo shipping matched to the load": "Перевозка грузов с учётом их особенностей",
  "Air freight for time-critical delivery": "Авиаперевозки для доставки в сжатые сроки",
  "Current route": "Текущий маршрут",
  "Road": "Авто",
  "Sea": "Море",
  "Cargo": "Грузы",
  "Air": "Авиа",
  "One team around the whole journey.": "Одна команда на всём маршруте.",
  "International shipping can cross several borders, carriers, and transport modes. TOJDORON keeps those moving parts connected.": "Международная перевозка может проходить через несколько границ, перевозчиков и видов транспорта. TOJDORON объединяет все этапы в единую систему.",
  "Worldwide coordination. Global delivery thinking.": "Международная координация. Глобальный подход к доставке.",
  "We select the practical route, monitor transit, and stay close to your cargo at every stage—whether the shipment moves by road, sea, air, or a combination shaped around the load.": "Мы выбираем оптимальный маршрут, контролируем перевозку и остаёмся на связи на каждом этапе — независимо от того, доставляется ли груз автомобильным, морским, воздушным или комбинированным транспортом.",
  "For businesses and private clients, that means one clear place to begin and one team to contact as the shipment progresses.": "Для компаний и частных клиентов это означает понятную точку старта и единую команду, с которой можно связаться на протяжении всей перевозки.",
  "Meet TOJDORON": "Познакомиться с TOJDORON",
  "Choose the route that fits the cargo.": "Выберите маршрут, подходящий для вашего груза.",
  "Four core services, coordinated as one logistics solution.": "Четыре ключевые услуги, объединённые в одно логистическое решение.",
  "Flexible international transport for full, partial, and carefully planned loads.": "Гибкие международные перевозки полных и сборных грузов с продуманной организацией.",
  "View road freight": "Посмотреть автоперевозки",
  "Cost-conscious maritime routes organized through to the final destination.": "Экономичные морские маршруты с организацией доставки до конечного пункта.",
  "View sea freight": "Посмотреть морские перевозки",
  "A practical shipping plan shaped around the size, handling, and timing of the load.": "Практичный план перевозки с учётом размеров груза, требований к обработке и сроков доставки.",
  "View cargo shipping": "Посмотреть перевозку грузов",
  "Fast, closely coordinated delivery for urgent and time-sensitive cargo.": "Быстрая доставка с чёткой координацией для срочных грузов с жёсткими сроками.",
  "View air freight": "Посмотреть авиаперевозки",
  "A clear line from request to delivery.": "Понятный путь от запроса до доставки.",
  "The transport mode can change. The way we support the shipment stays consistent.": "Вид транспорта может меняться. Сопровождение перевозки остаётся неизменным.",
  "Start with your cargo details": "Начните с информации о грузе",
  "Understand the shipment": "Анализируем груз",
  "Share the cargo, origin, destination, timing, and handling needs.": "Расскажите о грузе, пунктах отправления и назначения, сроках и требованиях к обработке.",
  "Match the route": "Подбираем маршрут",
  "We organize a transport plan that balances speed, practicality, and cost.": "Мы организуем план перевозки, который учитывает скорость, удобство и стоимость.",
  "Monitor movement": "Контролируем перевозку",
  "Your cargo is followed through the key stages of transit.": "Мы контролируем груз на ключевых этапах перевозки.",
  "Support delivery": "Сопровождаем доставку",
  "We stay engaged through arrival at the final destination.": "Мы остаёмся на связи до прибытия груза в конечный пункт.",
  "We move.": "Мы перевозим.",
  "We organize.": "Мы организуем.",
  "We deliver worldwide.": "Мы доставляем по всему миру.",
  "One point of contact": "Единая точка контакта",
  "A clear route into the process for businesses and private clients.": "Понятная точка входа в процесс для компаний и частных клиентов.",
  "Mode-neutral planning": "Планирование без привязки к виду транспорта",
  "Road, sea, cargo, or air is chosen around the shipment—not around a fixed template.": "Вид перевозки выбирается под конкретный груз, а не по заранее заданному шаблону.",
  "Support at every stage": "Поддержка на каждом этапе",
  "Practical communication from initial request through final delivery.": "Прозрачное взаимодействие от первого запроса до конечной доставки.",
  "Our partners": "Наши партнёры",
  "Trusted connections behind every shipment.": "Надёжные партнёры для каждой перевозки.",
  "We work with a trusted network of organizations that helps us coordinate cargo across routes and borders.": "Мы сотрудничаем с надёжной сетью организаций, которая помогает нам координировать перевозки по разным маршрутам и через границы.",
  "TOJDORON partner organizations": "Партнёрские организации TOJDORON",
  "TOJDORON partner logos": "Логотипы партнёров TOJDORON",
  "Show previous partners": "Показать предыдущих партнёров",
  "Show next partners": "Показать следующих партнёров",
  "Partner organization 1 logo": "Логотип партнёрской организации 1",
  "Partner organization 2 logo": "Логотип партнёрской организации 2",
  "Partner organization 3 logo": "Логотип партнёрской организации 3",
  "Partner organization 4 logo": "Логотип партнёрской организации 4",
  "Partner organization 5 logo": "Логотип партнёрской организации 5",
  "Partner organization 6 logo": "Логотип партнёрской организации 6",
  "Partner organization 7 logo": "Логотип партнёрской организации 7",
  "Fardo Cargo partner logo": "Логотип партнёра Fardo Cargo",
  "Rusmostrans partner logo": "Логотип партнёра Rusmostrans",
  "Armark partner logo": "Логотип партнёра Armark",
  "Zira Trade partner logo": "Логотип партнёра Zira Trade",
  "Pomcap partner logo": "Логотип партнёра Pomcap",
  "Symphony Residence partner logo": "Логотип партнёра Symphony Residence",
  "Arvis partner logo": "Логотип партнёра Arvis",
  "Rahmat Tea partner logo": "Логотип партнёра Rahmat Tea",
  "Avrang partner logo": "Логотип партнёра Avrang",
  "Jana Post partner logo": "Логотип партнёра Jana Post",
  "Have cargo to move?": "Нужно перевезти груз?",
  "Tell us where it starts, where it needs to go, and what matters most.": "Расскажите, откуда отправляется груз, куда его нужно доставить и что для вас важнее всего.",
  "International logistics and freight coordination worldwide.": "Международная логистика и координация перевозок по всему миру.",
  "Company": "Компания",
  "Contact": "Контакты",
  "Phone 1": "Телефон 1",
  "Phone 2": "Телефон 2",
  "Phone": "Телефон",
  "Phone 1: +992 978 241717": "Телефон 1: +992 978 241717",
  "Phone 2: +992 978 231717": "Телефон 2: +992 978 231717",
  "Email": "Эл. почта",
  "Origin": "Пункт отправления",
  "Jabor Rasulov Street 3, Dushanbe": "ул. Джаббора Расулова, 3, Душанбе",
  "International transport company": "Международная транспортная компания",
  "All rights reserved.": "Все права защищены.",
  "Choose a TOJDORON phone number": "Выберите номер телефона TOJDORON",
  "TOJDORON phone numbers": "Номера телефонов TOJDORON",
  "Call +992 978 241717": "Позвонить: +992 978 241717",
  "Call +992 978 231717": "Позвонить: +992 978 231717",
  "Logistics organized around people.": "Логистика, построенная вокруг людей.",
  "A TOJDORON-marked white freight truck, container train, port cranes, and cargo aircraft moving through a mountain logistics corridor": "Белый грузовик с маркировкой TOJDORON, контейнерный поезд, портовые краны и грузовой самолёт в горном логистическом коридоре",
  "Two TOJDORON logistics specialists reviewing an international cargo route in Dushanbe": "Два специалиста TOJDORON по логистике, анализирующие международный маршрут перевозки в Душанбе",
  "TOJDORON is an international transport company that brings route planning, cargo movement, and practical support together in one place.": "TOJDORON — международная транспортная компания, объединяющая планирование маршрутов, перевозку грузов и практическую поддержку в одном месте.",
  "We help cargo move worldwide.": "Мы помогаем доставлять грузы по всему миру.",
  "We offer comprehensive logistics solutions for businesses and private clients across road, sea, cargo, and air freight.": "Мы предлагаем комплексные логистические решения для компаний и частных клиентов в сфере автомобильных и морских перевозок, обработки грузов и авиаперевозок.",
  "Our team": "Наша команда",
  "The team behind every route.": "Команда, которая стоит за каждым маршрутом.",
  "Meet the people who keep TOJDORON responsive, organized, and close to every shipment.": "Познакомьтесь с командой TOJDORON — специалистами, которые обеспечивают оперативную связь, чёткую организацию и внимание к каждой перевозке.",
  "Iskandari Shakhzod": "Искандари Шахзод",
  "Chief Executive Officer (CEO)": "Генеральный директор (CEO)",
  "Leads the company’s direction and client relationships.": "Отвечает за развитие компании и работу с клиентами.",
  "Call Iskandari Shakhzod": "Позвонить Искандари Шахзоду",
  "Email Iskandari Shakhzod": "Написать Искандари Шахзоду",
  "Portrait of Iskandari Shakhzod, Chief Executive Officer at TOJDORON": "Портрет Искандари Шахзода, генерального директора TOJDORON",
  "Mavlyanova Firuza": "Мавлянова Фируза",
  "Logistics Director / Head of Logistics Department": "Директор по логистике / Руководитель отдела логистики",
  "Leads the logistics department and coordinates day-to-day freight operations.": "Руководит отделом логистики и координирует текущие операции по перевозке грузов.",
  "Call Mavlyanova Firuza": "Позвонить Мавляновой Фирузе",
  "Email Mavlyanova Firuza": "Написать Мавляновой Фирузе",
  "Portrait of Mavlyanova Firuza, Logistics Director at TOJDORON": "Портрет Мавляновой Фирузы, директора по логистике в TOJDORON",
  "Amjad Ali Jaffary": "Амджад Али Джаффари",
  "Operations Director & Head of IT": "Операционный директор и руководитель IT-направления",
  "Oversees daily operations and leads the company’s IT function.": "Отвечает за ежедневную работу компании и руководит IT-направлением.",
  "Call Amjad Ali Jaffary": "Позвонить Амджаду Али Джаффари",
  "Email Amjad Ali Jaffary": "Написать Амджаду Али Джаффари",
  "Portrait of Amjad Ali Jaffary, Operations Director and Head of IT at TOJDORON": "Портрет Амджада Али Джаффари, операционного директора и руководителя IT-направления TOJDORON",
  "Maryam Karimov": "Марьям Каримова",
  "Graphic Designer": "Графический дизайнер",
  "Creates compelling visual concepts that communicate TOJDORON’s message and strengthen its brand across digital and print channels.": "Создаёт выразительные визуальные концепции, которые передают идеи TOJDORON и укрепляют бренд в цифровых и печатных материалах.",
  "Call Maryam Karimov": "Позвонить Марьям Каримовой",
  "Email Maryam Karimov": "Написать Марьям Каримовой",
  "Portrait of Maryam Karimov, Graphic Designer at TOJDORON": "Портрет Марьям Каримовой, графического дизайнера TOJDORON",
  "Nekruz Ahmadov": "Некруз Ахмедов",
  "Logistics Specialist": "Специалист по логистике",
  "Coordinates shipment details and supports smooth day-to-day freight operations.": "Координирует детали перевозок и помогает обеспечивать слаженную ежедневную работу с грузами.",
  "Call Nekruz Ahmadov": "Позвонить Некрузу Ахмедову",
  "Email Nekruz Ahmadov": "Написать Некрузу Ахмедову",
  "Portrait of Nekruz Ahmadov, Logistics Specialist at TOJDORON": "Портрет Некруза Ахмедова, специалиста по логистике в TOJDORON",
  "Qurbonov Alijon": "Курбонов Алиджон",
  "Coordinates shipment schedules and supports smooth, timely cargo movement across each route.": "Координирует графики перевозок и помогает обеспечивать бесперебойное и своевременное перемещение грузов по каждому маршруту.",
  "Call Qurbonov Alijon": "Позвонить Курбонову Алиджону",
  "Email Qurbonov Alijon": "Написать Курбонову Алиджону",
  "Portrait of Qurbonov Alijon, Logistics Specialist at TOJDORON": "Портрет Курбонова Алиджона, специалиста по логистике в TOJDORON",
  "Ganjina Faiziddinova": "Ганджина Фаизиддинова",
  "Supports shipment coordination and helps ensure smooth, timely cargo movement across each route.": "Помогает координировать перевозки и обеспечивать бесперебойное и своевременное перемещение грузов по каждому маршруту.",
  "Call Ganjina Faiziddinova": "Позвонить Ганджине Фаизиддиновой",
  "Email Ganjina Faiziddinova": "Написать Ганджине Фаизиддиновой",
  "Portrait of Ganjina Faiziddinova, Logistics Specialist at TOJDORON": "Портрет Ганджины Фаизиддиновой, специалиста по логистике в TOJDORON",
  "Our role starts before the shipment moves. We learn what is being transported, where it needs to go, how quickly it needs to arrive, and which handling conditions matter. From there, we organize the transport option that fits.": "Наша работа начинается до отправления груза. Мы выясняем, что перевозится, куда и как быстро это должно прибыть, а также какие условия обработки важны. Затем мы организуем подходящий вариант перевозки.",
  "As the cargo moves, TOJDORON monitors the important transit stages and remains available as a clear point of contact. That continuity is at the heart of our work.": "В пути TOJDORON контролирует ключевые этапы перевозки и остаётся вашим постоянным контактным лицом. Такая непрерывность — основа нашей работы.",
  "See our freight services": "Посмотреть наши транспортные услуги",
  "One company. Every stage connected.": "Одна компания. Все этапы взаимосвязаны.",
  "We plan": "Планируем",
  "Routes and transport modes are selected around the cargo, destination, timing, and budget.": "Маршруты и виды транспорта выбираются с учётом груза, пункта назначения, сроков и бюджета.",
  "We organize": "Организуем",
  "The moving parts of the shipment are coordinated into one practical delivery plan.": "Все этапы перевозки объединяются в единый практичный план доставки.",
  "We monitor": "Контролируем",
  "Key transit stages remain visible so questions can be handled with context.": "Ключевые этапы перевозки остаются понятными, чтобы на вопросы можно было отвечать с учётом всей ситуации.",
  "We support delivery": "Сопровождаем доставку",
  "Our involvement continues through arrival at the final destination.": "Мы продолжаем работу до прибытия груза в конечный пункт.",
  "International freight coordination": "Координация международных перевозок",
  "Coordinated freight worldwide.": "Координация перевозок по всему миру.",
  "We organize road, sea, cargo, and air freight around each shipment’s route, timing, and handling requirements.": "Мы организуем автомобильные, морские и авиаперевозки, а также обработку грузов с учётом маршрута, сроков и требований каждого отправления.",
  "Find our office": "Найти наш офис",
  "Interactive operational view of road, sea, cargo, and air freight": "Интерактивный обзор автомобильных и морских перевозок, обработки грузов и авиаперевозок",
  "Scheduled cross-border delivery": "Плановая трансграничная доставка",
  "Containerized ocean transit": "Морская перевозка в контейнерах",
  "Warehouse consolidation and dispatch": "Консолидация и отправка со склада",
  "Priority airfreight uplift": "Приоритетная авиаперевозка",
  "Cargo handling": "Обработка грузов",
  "Highlight a freight service": "Выберите услугу для просмотра",
  "What clients can expect from us.": "Чего клиенты могут от нас ожидать.",
  "Clear decisions, practical communication, and attention to the cargo itself.": "Понятные решения, прозрачное взаимодействие и внимание к каждому грузу.",
  "Clear coordination": "Чёткая координация",
  "One understandable path through a shipment that may involve several stages.": "Понятная схема перевозки, даже если она включает несколько этапов.",
  "Fit-for-purpose routes": "Маршруты под задачу",
  "The route follows the needs of the cargo rather than a fixed service template.": "Маршрут строится вокруг потребностей груза, а не вокруг фиксированного шаблона услуги.",
  "Responsive support": "Оперативная поддержка",
  "Questions are handled by people who understand the shipment context.": "На вопросы отвечают специалисты, понимающие контекст перевозки.",
  "Worldwide outlook": "Глобальный подход",
  "Every plan is shaped with the final destination and the full journey in view.": "Каждый план учитывает конечный пункт и весь путь груза.",
  "Company credentials": "Документы компании",
  "Official documents for your review.": "Официальные документы для ознакомления.",
  "Official documents confirming TOJDORON’s authorization and compliance for motor freight transport.": "Официальные документы, подтверждающие право TOJDORON осуществлять автомобильные грузоперевозки и соответствие установленным требованиям.",
  "Certificate of conformity": "Сертификат соответствия",
  "Certificate issued by the Ministry of Transport of the Republic of Tajikistan.": "Сертификат выдан Министерством транспорта Республики Таджикистан.",
  "Motor freight transport licence": "Лицензия на автомобильные грузоперевозки",
  "Licence issued for motor freight transport.": "Лицензия на осуществление автомобильных грузоперевозок.",
  "Licensing requirements": "Лицензионные требования",
  "Supporting licensing requirements document for licence no. 0000921.": "Документ, содержащий лицензионные требования для лицензии № 0000921.",
  "Download PDF": "Скачать PDF",
  "Download the conformity certificate as PDF": "Скачать сертификат соответствия в формате PDF",
  "Download the motor freight transport licence as PDF": "Скачать лицензию на автомобильные грузоперевозки в формате PDF",
  "Download the licensing requirements document as PDF": "Скачать документ с лицензионными требованиями в формате PDF",
  "TOJDORON certificate of conformity for motor freight transport": "Сертификат соответствия TOJDORON для автомобильных грузоперевозок",
  "TOJDORON licence for motor freight transport": "Лицензия TOJDORON на автомобильные грузоперевозки",
  "Licensing requirements document for TOJDORON motor freight transport": "Документ с лицензионными требованиями по автомобильным грузоперевозкам TOJDORON",
  "Let’s organize the next route.": "Организуем следующий маршрут.",
  "Share the shipment details and TOJDORON will help you identify the right way forward.": "Расскажите о перевозке, и TOJDORON поможет определить оптимальный следующий шаг.",
  "Get in touch": "Связаться с нами",
  "The right mode for every shipment.": "Подходящий вид перевозки для каждого отправления.",
  "TOJDORON organizes road, sea, cargo, and air freight as individual services or as one connected logistics plan.": "TOJDORON организует автомобильные, морские и авиаперевозки, а также обработку грузов — по отдельности или в рамках единого логистического плана.",
  "Service sections": "Разделы услуг",
  "TOJDORON-branded road truck, container ship, warehouse cargo equipment, and air freight aircraft": "Фирменный грузовик TOJDORON, контейнеровоз, складское оборудование для работы с грузами и грузовой самолёт",
  "White road freight truck on an international highway": "Белый грузовой автомобиль на международной трассе",
  "Container ship beneath working port cranes": "Контейнеровоз под работающими портовыми кранами",
  "Palletized cargo being carefully handled in a warehouse": "Груз на паллетах, который аккуратно обрабатывают на складе",
  "Cargo aircraft being loaded on an airport apron": "Грузовой самолёт, который загружают на перроне аэропорта",
  "White road freight truck in green mountain terrain": "Белый грузовой автомобиль на фоне зелёных гор",
  "Container ship beneath port cranes": "Контейнеровоз под портовыми кранами",
  "Cargo pallets being handled inside a warehouse": "Паллеты с грузом, обрабатываемые на складе",
  "Cargo aircraft being loaded at an airport": "Грузовой самолёт, загружаемый в аэропорту",
  "Flexible cargo movement across international road routes.": "Гибкая перевозка грузов по международным автомобильным маршрутам.",
  "Road freight is a practical choice when a shipment needs adaptable routing, pickup and delivery coordination, or a direct connection between locations. We organize the journey around the load and destination.": "Автоперевозки подходят, когда грузу нужен гибкий маршрут, координация забора и доставки или прямое сообщение между пунктами. Мы организуем путь с учётом груза и пункта назначения.",
  "TOJDORON logistics specialists coordinating an international shipment from Dushanbe": "Специалисты TOJDORON по логистике координируют международную перевозку из Душанбе",
  "Modern white tractor-trailer positioned at a freight loading dock": "Современный белый автопоезд у погрузочной рампы",
  "Large container vessel being worked by gantry cranes at a commercial port": "Большое контейнерное судно у причала, где работают козловые краны",
  "Forklift carrying a wrapped pallet inside a professional cargo warehouse": "Погрузчик перевозит упакованную паллету внутри грузового склада",
  "Wide-body cargo aircraft receiving a wrapped pallet at an airport freight terminal": "Широкофюзеляжный грузовой самолёт принимает упакованную паллету в грузовом терминале аэропорта",
  "Full and partial load planning": "Планирование полных и сборных грузов",
  "International route coordination": "Координация международных маршрутов",
  "Pickup-to-destination support": "Сопровождение от забора груза до доставки",
  "Shipment-stage communication": "Связь на каждом этапе перевозки",
  "Request a road freight quote": "Запросить расчёт автоперевозки",
  "Efficient maritime shipping for long-distance international cargo.": "Эффективная морская доставка международных грузов на дальние расстояния.",
  "For cargo suited to ocean transport, TOJDORON helps select a practical maritime route and keeps the shipment connected to the next stage of delivery beyond the port.": "Для грузов, подходящих для морской перевозки, TOJDORON подбирает практичный маршрут и координирует дальнейшую доставку после прохождения порта.",
  "Maritime route selection": "Подбор морского маршрута",
  "Containerized cargo planning": "Планирование контейнерной перевозки",
  "Port-stage coordination": "Координация на этапе порта",
  "Onward delivery organization": "Организация дальнейшей доставки",
  "Request a sea freight quote": "Запросить расчёт морской перевозки",
  "A shipping option matched to the cargo—not the other way around.": "Вид перевозки подбирается под ваш груз, а не наоборот.",
  "We accept and deliver varied types of freight, comparing the available transport options to find a convenient and cost-conscious plan for the shipment.": "Мы перевозим разные типы грузов, сравнивая доступные варианты транспорта, чтобы подобрать удобный и экономичный план перевозки.",
  "Route and mode comparison": "Сравнение маршрутов и видов транспорта",
  "Varied cargo profiles": "Разные типы грузов",
  "Handling-aware planning": "Планирование с учётом требований к обработке",
  "Business and private shipments": "Грузы компаний и частных клиентов",
  "Discuss your cargo": "Обсудить ваш груз",
  "Fast transport for urgent and time-sensitive cargo.": "Быстрая перевозка срочных грузов с жёсткими сроками доставки.",
  "When timing is the priority, air freight offers a direct way to move cargo quickly. TOJDORON organizes the air route and helps connect airport handling with the final destination.": "Когда сроки важнее всего, авиаперевозки позволяют быстро доставить груз. TOJDORON организует авиамаршрут и связывает обработку в аэропорту с доставкой до конечного пункта.",
  "Urgent shipment planning": "Планирование срочных отправлений",
  "International air routes": "Международные авиамаршруты",
  "Airport-stage coordination": "Координация на этапе аэропорта",
  "Final-destination support": "Поддержка до конечного пункта",
  "Request an air freight quote": "Запросить расчёт авиаперевозки",
  "One shipment can use more than one mode.": "Одна перевозка может включать несколько видов транспорта.",
  "Some routes are strongest when road, sea, cargo handling, and air connections work together. TOJDORON looks at the full journey and organizes the handoffs as part of one plan.": "Некоторые маршруты особенно эффективны, когда автомобильные и морские перевозки, обработка грузов и авиаперевозки объединены в единую систему. TOJDORON рассматривает весь маршрут целиком и координирует передачу груза между этапами в рамках единого плана.",
  "Multimodal planning": "Мультимодальное планирование",
  "One coordinated plan from departure to delivery.": "Единый план на всём маршруте — от отправления до доставки.",
  "Transport modes in one coordinated route": "Виды транспорта в рамках единого маршрута",
  "Not sure which mode fits?": "Не уверены, какой вид перевозки подходит?",
  "Send the cargo details. We’ll help identify the most practical transport approach.": "Отправьте информацию о грузе. Мы поможем определить наиболее практичный способ перевозки.",
  "Tell us where the cargo needs to go.": "Расскажите, куда нужно доставить груз.",
  "Start with the shipment details or reach our Dushanbe office directly. TOJDORON will help shape the next step.": "Начните с данных о перевозке или свяжитесь напрямую с нашим офисом в Душанбе. TOJDORON поможет определить следующий шаг.",
  "Email us": "Написать нам",
  "Our Dushanbe office": "Наш офис в Душанбе",
  "Jabor Rasulov Street 3, 3rd floor": "ул. Джаббора Расулова, 3, 3-й этаж",
  "Landmark: Farovon Market": "Ориентир: рынок Фаровон",
  "Open in Google Maps": "Открыть в Google Картах",
  "Helpful details to send": "Что указать в запросе",
  "Origin and destination": "Пункт отправления и пункт назначения",
  "Cargo type and approximate size": "Тип и примерный размер груза",
  "Preferred timing": "Желаемые сроки",
  "Any special handling needs": "Особые требования к обработке",
  "Complete the form and TOJDORON will receive your shipment details.": "Заполните форму, и TOJDORON получит данные о вашей перевозке.",
  "Your name": "Ваше имя",
  "Optional": "Необязательно",
  "Email address": "Адрес электронной почты",
  "Phone number": "Номер телефона",
  "Service": "Вид перевозки",
  "Not sure yet": "Пока не определились",
  "City or country": "Город или страна",
  "Destination": "Пункт назначения",
  "Cargo details": "Данные о грузе",
  "What are you shipping, when should it move, and what should we know?": "Что нужно перевезти, когда отправить груз и что нам важно знать?",
  "Send my enquiry": "Отправить запрос",
  "Required fields are marked with an asterisk.": "Обязательные поля отмечены звёздочкой.",
  "Find TOJDORON in Dushanbe.": "Найдите офис TOJDORON в Душанбе.",
  "Jabor Rasulov Street 3, 3rd floor, near Farovon Market.": "ул. Джаббора Расулова, 3, 3-й этаж, рядом с рынком Фаровон.",
  "Google map showing TOJDORON at Jabor Rasulov Street 3 in Dushanbe": "Карта Google с расположением офиса TOJDORON на улице Джаббора Расулова, 3, в Душанбе",
  "Prefer to speak directly?": "Предпочитаете поговорить напрямую?",
  "Choose either TOJDORON contact line and speak with our team about the shipment.": "Выберите один из номеров TOJDORON и обсудите перевозку с нашей командой.",
  "TOJDORON freight enquiry": "Запрос на расчёт перевозки TOJDORON",
  "Name": "Имя",
  "Not provided": "Не указано",
  "Add a short description of the cargo and route.": "Добавьте краткое описание груза и маршрута.",
  "Complete this field before sending the enquiry.": "Заполните это поле перед отправкой запроса.",
  "Enter a complete email address, such as name@example.com.": "Укажите полный адрес электронной почты, например name@example.com.",
  "Check the highlighted fields, then send the enquiry again.": "Проверьте выделенные поля и снова отправьте запрос.",
  "Sending enquiry…": "Отправка запроса…",
  "Your enquiry was sent successfully. We'll be in touch soon.": "Ваш запрос успешно отправлен. Мы свяжемся с вами в ближайшее время.",
  "We couldn't send your enquiry. Please try again or email us directly.": "Не удалось отправить запрос. Попробуйте ещё раз или напишите нам напрямую.",
  "Form email is not configured yet. Add the Web3Forms access key before publishing.": "Почта формы ещё не настроена. Добавьте ключ Web3Forms перед публикацией."
};

const pageTitles = {
  "TOJDORON — International Freight, Organized": "TOJDORON — Организованные международные перевозки",
  "About TOJDORON — International Transport Company": "О TOJDORON — Международная транспортная компания",
  "Freight Services — TOJDORON": "Транспортные услуги — TOJDORON",
  "Contact TOJDORON — Request a Freight Quote": "Контакты TOJDORON — Запросить расчёт перевозки"
};

const pageDescriptions = {
  "TOJDORON coordinates international road, sea, air, and cargo freight from Dushanbe, Tajikistan.": "TOJDORON координирует автомобильные и морские перевозки, обработку грузов и авиаперевозки из Душанбе (Таджикистан).",
  "Learn how TOJDORON organizes international freight from Dushanbe with clear planning and support at every stage.": "Узнайте, как TOJDORON организует международные перевозки из Душанбе с понятным планированием и поддержкой на каждом этапе.",
  "Explore TOJDORON road freight, sea freight, cargo shipping, and air freight services for international delivery.": "Изучите услуги TOJDORON: автомобильные и морские перевозки, обработка грузов и авиаперевозки для международной доставки.",
  "Contact TOJDORON in Dushanbe for an international freight quote by road, sea, cargo, or air.": "Свяжитесь с TOJDORON в Душанбе, чтобы получить расчёт международной автомобильной или морской перевозки, обработки грузов либо авиаперевозки."
};

const normalizeTranslationKey = (value) => value.replace(/\s+/g, " ").trim();
const getSavedLanguage = () => {
  try {
    return window.localStorage.getItem(languageStorageKey) === "en" ? "en" : "ru";
  } catch {
    return "ru";
  }
};

const textSources = new WeakMap();
const attributeSources = new WeakMap();
const originalTitle = document.title;
const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
let currentLanguage = getSavedLanguage();

const translate = (source) => currentLanguage === "ru" ? russianTranslations[source] || source : source;

const setLanguageSwitcherState = () => {
  const switcher = document.querySelector("[data-language-switcher]");
  if (!switcher) return;
  switcher.setAttribute("aria-label", currentLanguage === "ru" ? "Выбор языка" : "Language selection");
  switcher.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.setAttribute("aria-label", button.dataset.language === "ru" ? (currentLanguage === "ru" ? "Русский язык" : "Switch to Russian") : (currentLanguage === "en" ? "English language" : "Переключить на английский"));
  });
};

const applyLanguage = (language) => {
  currentLanguage = language === "en" ? "en" : "ru";
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === "ru" ? pageTitles[originalTitle] || originalTitle : originalTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", currentLanguage === "ru" ? pageDescriptions[originalDescription] || originalDescription : originalDescription);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const raw = node.nodeValue || "";
    const source = textSources.has(node) ? textSources.get(node) : normalizeTranslationKey(raw);
    if (!source) return;
    textSources.set(node, source);
    const leading = raw.match(/^\s*/)?.[0] || "";
    const trailing = raw.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${translate(source)}${trailing}`;
  });

  document.querySelectorAll("[data-translation-key]").forEach((element) => {
    element.textContent = translate(element.dataset.translationKey || "");
  });

  const translatableAttributes = ["aria-label", "alt", "placeholder", "title", "data-route-label", "data-atlas-copy-action"];
  document.querySelectorAll("*").forEach((element) => {
    const sources = attributeSources.get(element) || {};
    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!(attribute in sources)) sources[attribute] = element.getAttribute(attribute);
      element.setAttribute(attribute, translate(sources[attribute]));
    });
    attributeSources.set(element, sources);
  });

  setLanguageSwitcherState();
  document.dispatchEvent(new CustomEvent("tojdoron:languagechange", { detail: { language: currentLanguage } }));
};

const addLanguageSwitcher = () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar || navbar.querySelector("[data-language-switcher]")) return;
  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.dataset.languageSwitcher = "true";
  switcher.setAttribute("role", "group");
  switcher.innerHTML = `<span class="language-switcher__options"><button type="button" data-language="ru"><svg class="language-switcher__flag language-switcher__flag--ru" viewBox="0 0 28 18" aria-hidden="true"><rect width="28" height="6" fill="#fff" /><rect y="6" width="28" height="6" fill="#0039a6" /><rect y="12" width="28" height="6" fill="#d52b1e" /></svg><span class="language-switcher__code">RU</span></button><button type="button" data-language="en"><svg class="language-switcher__flag language-switcher__flag--en" viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169" /><path d="m0 0 60 30M60 0 0 30" stroke="#fff" stroke-width="6" /><path d="m0 0 60 30M60 0 0 30" stroke="#c8102e" stroke-width="2.5" /><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10" /><path d="M30 0v30M0 15h60" stroke="#c8102e" stroke-width="6" /></svg><span class="language-switcher__code">ENG</span></button></span>`;
  navbar.append(switcher);
  switcher.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language === "en" ? "en" : "ru";
      try { window.localStorage.setItem(languageStorageKey, language); } catch {}
      applyLanguage(language);
    });
  });
};

window.TOJDORON_I18N = {
  t: (source) => translate(source),
  getLanguage: () => currentLanguage,
  setLanguage: (language) => {
    try { window.localStorage.setItem(languageStorageKey, language === "en" ? "en" : "ru"); } catch {}
    applyLanguage(language);
  }
};

addLanguageSwitcher();
applyLanguage(currentLanguage);

const reducePageMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let navigationInProgress = false;
let navigationTimeout = null;
let pageIntroTimeout = null;
let skipPageIntro = false;
try {
  skipPageIntro = window.sessionStorage.getItem("tojdoron-page-transition") === "pending";
  if (skipPageIntro) window.sessionStorage.removeItem("tojdoron-page-transition");
} catch {}

const pageTransition = document.createElement("div");
const pageTransitionMarkup = '<div class="page-transition__lockup"><svg class="page-transition__piece page-transition__piece--star" viewBox="0 0 629 440" aria-hidden="true"><path pathLength="1" d="M216 35 187 144 76 118 153 188 12 362 214 259 420 409 358 282 405 108 285 140Z" /></svg><img class="page-transition__piece page-transition__piece--wordmark" src="assets/tojdoron-logo-wordmark.png?v=logo-deconstruction-v3" alt="" width="629" height="440" /><img class="page-transition__piece page-transition__piece--logo" src="assets/tojdoron-logo-green-v2.png" alt="" width="629" height="440" /></div>';
pageTransition.className = "page-transition";
pageTransition.setAttribute("aria-hidden", "true");
pageTransition.innerHTML = pageTransitionMarkup;
document.body.prepend(pageTransition);

const startPageIntro = (skipIntro = false) => {
  if (pageIntroTimeout) window.clearTimeout(pageIntroTimeout);
  pageIntroTimeout = null;
  pageTransition.className = "page-transition";
  pageTransition.innerHTML = pageTransitionMarkup;

  if (reducePageMotion || skipIntro) {
    pageTransition.classList.add("is-entered");
    return;
  }

  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    pageIntroTimeout = window.setTimeout(() => {
      pageTransition.classList.add("is-entered");
      pageIntroTimeout = null;
    }, 1040);
  }));
};

startPageIntro(skipPageIntro);

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const menuLinks = document.querySelectorAll(".nav-menu a");
  const years = document.querySelectorAll("[data-year]");

  years.forEach((year) => {
    year.textContent = String(new Date().getFullYear());
  });

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(willOpen));
    toggle.setAttribute("aria-label", window.TOJDORON_I18N.t(willOpen ? "Close navigation" : "Open navigation"));
    menu?.classList.toggle("is-open", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
  });

  document.addEventListener("tojdoron:languagechange", () => {
    if (!toggle) return;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-label", window.TOJDORON_I18N.t(isOpen ? "Close navigation" : "Open navigation"));
  });

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

  const callMenus = document.querySelectorAll("[data-call-menu]");
  const closeCallMenus = () => {
    callMenus.forEach((callMenu) => {
      callMenu.classList.remove("is-open");
      callMenu.querySelector(".floating-call__toggle")?.setAttribute("aria-expanded", "false");
    });
  };

  callMenus.forEach((callMenu) => {
    const callToggle = callMenu.querySelector(".floating-call__toggle");
    callToggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !callMenu.classList.contains("is-open");
      closeCallMenus();
      callMenu.classList.toggle("is-open", willOpen);
      callToggle.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.addEventListener("click", closeCallMenus);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCallMenus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 928) closeMenu();
  });

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const revealItems = document.querySelectorAll("[data-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    if (navigationTimeout) window.clearTimeout(navigationTimeout);
    navigationTimeout = null;
    navigationInProgress = false;
    try { window.sessionStorage.removeItem("tojdoron-page-transition"); } catch {}
    startPageIntro();
    closeMenu();
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;
    if (!destination.pathname.endsWith(".html") && !destination.pathname.endsWith("/")) return;

    if (navigationInProgress) return;

    event.preventDefault();
    navigationInProgress = true;
    closeMenu();
    if (reducePageMotion) {
      window.location.href = destination.href;
      return;
    }

    try { window.sessionStorage.setItem("tojdoron-page-transition", "pending"); } catch {}
    pageTransition.className = "page-transition is-leaving";
    window.requestAnimationFrame(() => pageTransition.classList.add("is-covering"));
    navigationTimeout = window.setTimeout(() => {
      window.location.href = destination.href;
      navigationTimeout = null;
    }, 1000);
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 5%", threshold: 0.01 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }
});
