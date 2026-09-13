import { Link, useParams } from "react-router-dom";
import MobileMenu from "../components/MobileMenu";
import Footer from "../components/Footer";

const pages = {
  about: {
    title: "About FlashNews24",
    intro: "FlashNews24 is an independent digital news platform focused on delivering clear, useful and timely news for readers in India and around the world.",
    content: [
      "FlashNews24 was created with a simple purpose: to make important news easier to discover, understand and follow. In a digital environment where readers are surrounded by a constant flow of information, we believe that news should be presented clearly, responsibly and with enough context to help people understand why a story matters.",
      
      "Our platform covers a wide range of subjects that are relevant to everyday readers. These include India, World, Technology, Business, Jobs & Education and Science. We aim to bring together important developments from different areas while keeping the presentation simple and accessible. Our goal is not simply to publish information, but to help readers understand the key points behind the news they are reading.",
      
      "India is one of the major areas of coverage on FlashNews24. We publish updates and useful information about developments across the country, including important public affairs, social developments, economy, education, technology and other topics that may affect readers. We try to provide meaningful context rather than relying only on short headlines.",
      
      "Our World coverage focuses on major international developments and events that may have significance for Indian and global audiences. International news can often be complex because events in one country can affect economies, businesses, technology, travel and communities elsewhere. We therefore aim to present important developments in a straightforward way so that readers can quickly understand the broader picture.",
      
      "Technology is another important part of FlashNews24. Technology continues to influence how people communicate, work, study, shop and access information. Our technology coverage focuses on useful developments, digital trends, artificial intelligence, consumer technology, online services and other innovations that are relevant to modern life. We aim to explain technology in language that is understandable even when the underlying subject is technical.",
      
      "Business and economic developments can have a direct impact on individuals, companies and communities. Through our Business coverage, FlashNews24 aims to provide readers with understandable information about major business developments, markets, companies, employment trends, digital businesses and other economic topics. We focus on clarity and context so readers can better understand the significance of important developments.",
      
      "Jobs & Education coverage is intended to be useful for students, job seekers, working professionals and people looking for opportunities to improve their skills. Education and employment information can change frequently, so readers should always verify important eligibility requirements, dates, application procedures and official announcements with the relevant authority or organization. FlashNews24 aims to make such information easier to find and understand while encouraging readers to consult authoritative sources before taking important decisions.",
      
      "Science is another area where clear communication is especially important. Scientific discoveries and research can sometimes be difficult to understand when presented only through technical language. FlashNews24 aims to explain significant science developments in a reader-friendly manner while avoiding unnecessary complexity. We believe that accurate science communication can help readers understand how research and innovation may influence society and everyday life.",
      
      "Accuracy and responsible reporting are central values of FlashNews24. We make reasonable efforts to check information and present news in a clear and responsible manner. However, news can develop quickly, and information may change after an article has been published. For this reason, readers should treat important information, especially information involving health, finance, law, government decisions, employment or public safety, with appropriate care and verify it through authoritative sources.",
      
      "We also believe that transparency is an important part of a trustworthy digital publication. When information needs clarification, correction or updating, content may be reviewed and changed when necessary. Our aim is to improve the usefulness and reliability of the information available on the platform rather than treating published content as permanently unchangeable.",
      
      "FlashNews24 is designed for readers who want news without unnecessary complexity. We understand that many people read news on mobile devices and often have limited time. Our website therefore focuses on readable articles, clear headlines, useful navigation and a straightforward browsing experience. We continue to improve the website so readers can move between important stories and different sections more easily.",
      
      "We also recognize that a modern news platform is more than a collection of articles. Readers may access FlashNews24 through the website, mobile experiences, social platforms and other digital channels. We aim to maintain a consistent identity and provide useful information across these channels while continuing to improve the overall experience.",
      
      "FlashNews24 does not encourage readers to rely on a single source for important decisions. News reporting can provide information and context, but individual circumstances may require professional advice or confirmation from official sources. When an article concerns subjects such as financial decisions, medical matters, legal issues, government services or employment applications, readers should consult qualified professionals or official authorities whenever appropriate.",
      
      "We value our readers and the feedback they provide. Corrections, suggestions, questions and constructive criticism can help identify areas where information or presentation can be improved. If you notice an error or believe an article requires clarification, we encourage you to contact the FlashNews24 team with the relevant article title or link and a clear explanation of the issue.",
      
      "Our long-term goal is to build FlashNews24 into a useful and dependable digital destination for readers who want accessible news and meaningful context. We want the platform to grow through useful content, responsible publishing and a better reader experience rather than simply increasing the number of articles published.",
      
      "As FlashNews24 continues to develop, we will work on improving the quality of our articles, expanding useful coverage, strengthening the website experience and making information easier to discover. We believe sustainable growth comes from creating genuine value for readers and maintaining responsible publishing practices.",
      
      "For general questions, feedback, corrections, suggestions or business enquiries, readers can visit our Contact page. For information about how website data may be handled, please review our Privacy Policy. Readers can also review our Disclaimer for important information about the nature and use of content published on FlashNews24.",
      
      "FlashNews24 is committed to continuously improving its platform and serving readers with useful, understandable and responsibly presented information. We appreciate every reader who visits the website, reads our stories, shares useful information with others and provides constructive feedback. Our objective remains simple: to make important news easier to understand and easier to follow.",
      
      "Last updated: September 13, 2026"
    ]
  },

  contact: {
    title: "Contact Us",
    intro: "We would love to hear from you. Your questions, feedback and suggestions help us improve FlashNews24.",
    content: [
      "Thank you for visiting FlashNews24. We value communication with our readers and welcome genuine questions, constructive feedback, corrections, suggestions and business enquiries. Our Contact page is intended to provide a simple way for readers and other interested parties to reach the FlashNews24 team.",
      
      "FlashNews24 is an independent digital news platform focused on providing useful, understandable and timely news. Because our content is intended for a wide range of readers, feedback from visitors can help us identify areas where information, presentation or website functionality could be improved.",
      
      "If you have a question about an article published on FlashNews24, please include the article title or the relevant page link whenever possible. Providing the exact article information helps us identify the content quickly and understand the context of your question.",
      
      "We also welcome factual correction requests. If you believe an article contains inaccurate, outdated or incomplete information, please explain the specific issue and, where possible, provide a reliable source that can help us review the information. Our team may investigate the matter and update or correct content when appropriate.",
      
      "News can change quickly, and information available at the time of publication may later be updated. A correction request does not automatically mean that an article will be changed, but legitimate concerns will be considered carefully as part of our effort to maintain useful and responsible content.",
      
      "Readers are encouraged to provide constructive feedback about the quality, clarity and usefulness of our articles. If an article is difficult to understand, lacks useful context or could be improved in another way, you can share your suggestion with us. Reader feedback can help us make future content more useful.",
      
      "We also welcome suggestions for topics that readers would like to see covered. Suggestions may include important developments, technology, business, education, employment, science, public-interest topics or other subjects that may be relevant to our audience.",
      
      "For business enquiries, partnerships, media-related communication or other professional matters, please provide sufficient information about the purpose of your enquiry. Clear details help us understand the nature of the request and determine the most appropriate way to respond.",
      
      "FlashNews24 aims to communicate responsibly and respectfully. Messages containing abusive language, spam, misleading information, malicious links or irrelevant promotional material may not receive a response. We encourage visitors to keep communication clear, relevant and respectful.",
      
      "When contacting FlashNews24, please avoid sending unnecessary sensitive personal information. Do not include passwords, financial account credentials, government identification numbers, medical records or other highly sensitive information in ordinary enquiries unless there is a specific and appropriate reason to do so.",
      
      "Information provided through a contact or feedback message may be used to understand and respond to the enquiry, investigate an article-related concern, improve the website or maintain appropriate records. For more information about how information may be handled, please review our Privacy Policy.",
      
      "We understand that some enquiries may require additional time to review. Article correction requests, technical issues and other detailed matters may need to be checked before a response or change can be provided. A submitted enquiry should therefore not be treated as confirmation that an article will immediately be changed.",
      
      "For urgent matters involving health, safety, legal issues, financial decisions or government services, readers should contact the appropriate qualified professional, emergency service or official authority directly. FlashNews24's Contact page is not an emergency service and should not be used as a substitute for professional assistance.",
      
      "If you are contacting us about employment or education information, please provide the article title or link and clearly explain the information you believe needs clarification. Official institutions, employers and government authorities remain the appropriate sources for final confirmation of eligibility, deadlines, application procedures and other important requirements.",
      
      "If your enquiry concerns technology, an application, a product or an online service mentioned in an article, please include the relevant article details and explain the issue. Product specifications, features, availability and policies can change, so our team may need to verify the information before considering an update.",
      
      "We value transparency when dealing with legitimate corrections and feedback. When an issue is confirmed, FlashNews24 may update the relevant content to improve accuracy and clarity. Depending on the circumstances, an update may include additional context, a correction or clarification.",
      
      "Contact information and communication channels may change as FlashNews24 develops. Visitors should use the current contact information displayed through the official FlashNews24 website rather than relying on old information found on external websites or previously shared messages.",
      
      "FlashNews24 may receive enquiries from readers in India and from other parts of the world. While our primary focus includes news relevant to Indian readers, we also cover international developments and topics of broader interest.",
      
      "We appreciate the time readers take to report errors, suggest improvements and share useful feedback. Responsible communication between publishers and readers can help create a better digital news experience and improve the quality of information available online.",
      
      "When submitting feedback, concise and specific information is generally the most helpful. For example, an article title, page link, a short explanation of the issue and a reliable supporting source can make it easier for our team to investigate a concern.",
      
      "FlashNews24 cannot guarantee an individual response to every message received. The volume and nature of enquiries may vary, and some messages may not require a direct response. However, legitimate concerns and relevant editorial feedback may be reviewed as appropriate.",
      
      "We aim to maintain a professional and reader-focused approach to communication. Our objective is to listen to genuine concerns, improve our platform and make FlashNews24 more useful for its audience.",
      
      "For privacy-related questions, please review the Privacy Policy and contact us if you have a specific concern about information you have submitted. For information about the nature of our published content, please review the Disclaimer.",
      
      "If you would like to contact FlashNews24 regarding an article, correction, suggestion, technical issue, business enquiry or general feedback, please use the contact details or communication options provided on the official Contact page.",
      
      "Thank you for being part of the FlashNews24 reader community. Your feedback helps us understand what readers need and where we can improve our content and website experience.",
      
      "Last updated: September 13, 2026"
    ]
  },

  privacy: {
    title: "Privacy Policy",
    intro: "Your privacy matters to FlashNews24. This Privacy Policy explains how information may be handled when you visit and use our website.",
    content: [
      "FlashNews24 respects the privacy of visitors and is committed to handling information responsibly. This Privacy Policy explains the general types of information that may be collected when visitors use the FlashNews24 website, how that information may be used, and the choices visitors may have regarding their information.",
      
      "By using the FlashNews24 website, visitors acknowledge that they have read and understood this Privacy Policy. If you do not agree with any part of this policy, you may choose not to use the website. We may update this Privacy Policy from time to time when our website, services or applicable requirements change.",
      
      "FlashNews24 is an independent digital news platform. Our website provides news, information, explanations and other editorial content for general informational purposes. We aim to operate the website in a responsible manner while respecting the privacy of people who visit our pages.",
      
      "Information that visitors voluntarily provide may include information submitted through contact forms, feedback forms, emails or other communication methods made available by FlashNews24. For example, a visitor may provide a name, email address or other information when contacting us. Visitors should avoid submitting sensitive personal information unless it is specifically required and appropriate for the purpose of communication.",
      
      "FlashNews24 may also receive certain technical information automatically when visitors access the website. Depending on the technologies and services used by the website, this may include information such as browser type, device type, operating system, approximate location, referring pages, pages visited, general usage information and other technical data. Such information is commonly used to understand how websites function and how visitors interact with them.",
      
      "Cookies are small data files that may be stored on a visitor's device by a website or by services operating on the website. FlashNews24 may use cookies or similar technologies to support website functionality, remember certain preferences, understand website usage and improve the visitor experience.",
      
      "Some cookies may be necessary for the website to function properly, while others may be associated with analytics, advertising or third-party services. The availability and purpose of cookies may change as website features and service providers change.",
      
      "Visitors may be able to control or restrict cookies through the settings of their web browser or device. Disabling certain cookies may affect some website features or functionality. Browser settings differ between devices and browsers, so visitors should consult the relevant browser documentation for information about managing cookies.",
      
      "FlashNews24 may use analytics services to understand general website traffic and usage patterns. Analytics information can help us identify which areas of the website are useful to readers, understand technical problems, improve page performance and make the website easier to navigate. Analytics services may process technical information according to their own privacy policies and terms.",
      
      "The FlashNews24 website may display advertisements provided by third-party advertising services. These services may use cookies or similar technologies to provide, personalize, measure or improve advertisements. Advertising providers may collect information according to their own privacy policies and applicable laws.",
      
      "Third-party services may independently collect and process information when visitors interact with their content, advertisements, links or services. FlashNews24 does not control the privacy practices of independent third parties. Visitors should review the privacy policies of relevant third-party providers to understand how those services handle information.",
      
      "FlashNews24 may include links to external websites, services, applications or social media platforms. These external websites are operated independently and have their own terms and privacy policies. Once a visitor leaves FlashNews24 and accesses an external service, the privacy practices of that service will apply. We encourage visitors to review the privacy policies of external websites before providing personal information.",
      
      "Social media features, sharing tools or embedded content may be available on some FlashNews24 pages. Third-party platforms may collect information when visitors interact with those features. Their data collection and processing practices are governed by the privacy policies of the respective platforms.",
      
      "FlashNews24 does not intentionally request sensitive personal information through ordinary website browsing. Visitors should not submit passwords, financial account credentials, government identification numbers, medical records or other highly sensitive information through general contact or feedback channels unless specifically requested through an appropriate secure process.",
      
      "Information voluntarily submitted by visitors may be used to respond to questions, feedback, correction requests, suggestions or business enquiries. It may also be used to understand reader feedback and improve the quality and usefulness of the website.",
      
      "FlashNews24 does not intend to sell personal information submitted directly through ordinary website communication channels. However, third-party services integrated into the website may independently process information according to their own policies and applicable legal requirements.",
      
      "We take reasonable steps to protect information under our control. However, no website, online communication method or electronic storage system can be guaranteed to be completely secure. Visitors should understand that information transmitted over the internet may involve security risks outside the complete control of any website operator.",
      
      "If FlashNews24 receives a legitimate request concerning information submitted by a visitor, we may take reasonable steps to respond based on the nature of the request, the information available to us and applicable legal requirements. Certain information may not be directly accessible or may be handled by third-party services rather than FlashNews24.",
      
      "Parents and guardians should use appropriate supervision when children access online services. FlashNews24 is not designed to intentionally collect sensitive personal information from children through ordinary website browsing. If a parent or guardian believes that a child has submitted personal information through the website, they may contact us so that the matter can be reviewed.",
      
      "FlashNews24 may retain communications and technical information for as long as reasonably necessary for the purpose for which it was collected, to maintain records, resolve issues, improve services, comply with legal obligations or protect the security and integrity of the website.",
      
      "This Privacy Policy applies primarily to the FlashNews24 website and does not automatically apply to independent third-party websites, applications, advertising networks, social media platforms or other external services linked from our website. Visitors should review the applicable policies of those services separately.",
      
      "The website may be accessed by visitors from different countries and regions. Privacy rights and legal requirements can vary depending on where a visitor is located. Where applicable, visitors may have rights concerning access, correction, deletion, restriction or other forms of control over personal information, subject to applicable law and reasonable limitations.",
      
      "If you believe that information you submitted to FlashNews24 needs to be corrected or if you have a privacy-related question, please contact the FlashNews24 team through the Contact page. Providing sufficient details about the request can help us understand and respond to the issue more effectively.",
      
      "We may update this Privacy Policy when necessary to reflect changes in our website, technologies, services, legal requirements or privacy practices. When the policy is updated, the revised version will be published on this page. Visitors are encouraged to review this page periodically for the latest information.",
      
      "This Privacy Policy is intended to provide general information about privacy practices associated with FlashNews24. It does not create contractual rights beyond those required by applicable law and should not be interpreted as legal advice.",
      
      "FlashNews24 is committed to maintaining a responsible approach to privacy while continuing to improve its digital news platform. We appreciate the trust of our readers and aim to provide a useful website experience while being transparent about the types of information and technologies that may be involved in operating the platform.",
      
      "For questions, privacy concerns, correction requests or other enquiries related to this policy, please visit the FlashNews24 Contact page.",
      
      "Last updated: September 13, 2026"
    ]
  },

  disclaimer: {
    title: "Disclaimer",
    intro: "Important information about the content published on FlashNews24.",
    content: [
      "The information published on FlashNews24 is provided for general informational and educational purposes. Our website publishes news, explanations, updates and other editorial content intended to help readers understand current developments and topics of general interest.",
      "While we make reasonable efforts to provide accurate, useful and timely information, FlashNews24 does not guarantee that every piece of information published on the website will always be complete, current, accurate or free from errors. News can develop rapidly, and information that is accurate at the time of publication may change as new facts become available.",
      "Readers should consider the publication date and context of an article before relying on information published on FlashNews24. Important information should be independently verified through appropriate official or authoritative sources.",
      "FlashNews24 publishes information based on sources and material available during the editorial process. Some stories may be based on official statements, public records, reports, announcements, research, interviews or other publicly available information. Additional facts may become available after publication.",
      "The presence of a statement, claim or quotation in an article does not necessarily mean that FlashNews24 independently endorses every statement made by a source. Readers should distinguish between verified facts, attributed statements, opinions and developing information.",
      "FlashNews24 may update, correct, clarify or remove content when necessary. If an error is identified, we may review the relevant material and make an appropriate correction. However, we cannot guarantee that every error will be identified immediately.",
      "News and informational articles should not be considered professional advice. Content relating to health, medicine, finance, investment, taxation, law, employment, education, technology or other specialized subjects is provided for general information and should not replace advice from a qualified professional.",
      "Health and medical information published on FlashNews24 is intended for general awareness and education. Readers should not use such information as a substitute for consultation with a qualified healthcare professional. In an emergency or serious medical situation, appropriate professional or emergency services should be contacted.",
      "Financial and investment information is provided for general informational purposes and should not be considered financial, investment, taxation or legal advice. Financial decisions can involve significant risks, and readers should conduct their own research and consult qualified professionals before making important decisions.",
      "Legal information published on FlashNews24 is general information and should not be treated as legal advice. Laws and regulations can differ between locations and may change over time. Readers with legal concerns should consult a qualified legal professional or the relevant authority.",
      "Jobs and education information may include announcements, opportunities, eligibility details, examinations and related updates. Such information can change without notice. Readers should always verify dates, eligibility requirements, fees, documents and application procedures directly with the relevant institution, employer, examination authority or official government website.",
      "Government-related information should be verified through official government sources whenever it concerns applications, benefits, documents, deadlines, eligibility or other important matters. FlashNews24 aims to explain such information clearly but does not replace official government communication.",
      "Technology-related information may include software updates, artificial intelligence developments, products, services and other technical subjects. Features, specifications, prices, availability and policies can change after publication. Readers should verify current information with the official provider.",
      "FlashNews24 may publish information about companies, products, services, organizations, applications or websites. Mentioning a company, product or service does not automatically mean that FlashNews24 endorses, sponsors or partners with that entity unless explicitly stated.",
      "Links to external websites may be included for reference or convenience. External websites are independently operated and have their own content, terms, policies and privacy practices. FlashNews24 does not control or guarantee the accuracy, availability or security of external websites.",
      "Readers should exercise appropriate caution when visiting external websites, downloading files, registering for services or providing personal information. Any interaction with a third-party service is subject to that service's own policies and terms.",
      "FlashNews24 may display advertisements or use legitimate digital services to support the operation of the platform. Advertising relationships do not automatically determine editorial content, and advertisements should be considered separately from independent editorial material unless clearly identified otherwise.",
      "The website may use analytics tools, advertising services, social media features and other third-party technologies. These services may operate according to their own policies. FlashNews24 does not control all activities performed by independent third-party service providers.",
      "Readers are responsible for evaluating information according to their own circumstances. FlashNews24 content should be treated as one source of information and should not necessarily be the sole basis for decisions that may have significant consequences.",
      "FlashNews24 does not guarantee uninterrupted website availability. Technical problems, maintenance, hosting issues, internet connectivity, third-party service interruptions or other circumstances may occasionally affect access to the website or its features.",
      "To the extent permitted by applicable law, FlashNews24 is not responsible for consequences arising solely from a reader's reliance on information published on the website. This does not limit any rights or protections that cannot legally be excluded.",
      "Opinions expressed in clearly identified opinion, commentary or analysis content belong to the respective author or source and do not necessarily represent the views of FlashNews24.",
      "Images, illustrations and other media may come from different sources and may be subject to their respective rights or usage conditions. FlashNews24 aims to use media responsibly. If you have a legitimate concern regarding particular material, please contact us with sufficient details so the matter can be reviewed.",
      "If you identify an apparent factual error, misleading information or another issue with an article, we encourage you to contact the FlashNews24 team. Please provide the article title or link and explain the specific issue.",
      "This Disclaimer may be updated when necessary to reflect changes in the website, content practices, services or applicable requirements. The latest version published on this page will apply after an update.",
      "By accessing and using FlashNews24, visitors acknowledge that the website provides general informational and educational content and that important information should be independently verified where appropriate.",
      "For questions, corrections, feedback or other concerns regarding this Disclaimer or content published on FlashNews24, please visit our Contact page.",
      "Last updated: September 13, 2026"
    ]
  }
};

function InfoPage({ page: pageProp }) {
  const { page: pageParam } = useParams();
  const page = pageProp || pageParam;
  const data = pages[page] || pages.about;

  return (
    <div className="professional-home">

      <div className="top-info-bar">
        <div className="top-info-inner">
          <span>Sunday, September 13, 2026</span>

          <div className="top-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/disclaimer">Disclaimer</Link>
          </div>
        </div>
      </div>

      <header className="main-news-header">
        <div className="news-header-inner">

          <Link to="/" className="big-logo">
            <span>Flash</span><b>News24</b>
          </Link>

          <nav className="main-navigation">
            <Link to="/">HOME</Link>
            <Link to="/category/india">INDIA</Link>
            <Link to="/category/world">WORLD</Link>
            <Link to="/category/technology">TECHNOLOGY</Link>
            <Link to="/category/business">BUSINESS</Link>
            <Link to="/category/science">SCIENCE</Link>
          </nav>

          <MobileMenu />

          <Link to="/search" className="large-search">
            ⌕
          </Link>

        </div>
      </header>

      <div className="professional-breaking">
        <div className="breaking-title">⚡ BREAKING NEWS</div>
        <div className="breaking-scroll">
          <span>FlashNews24 — Latest news, explained clearly.</span>
        </div>
      </div>

      <main className="info-page">

        <Link to="/" className="info-back">
          ← Back to Home
        </Link>

        <article className="info-card">

          <span className="info-label">FLASHNEWS24</span>

          <h1>{data.title}</h1>

          <p className="info-intro">
            {data.intro}
          </p>

          <div className="info-content">
            {data.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="info-updated">
            Last updated: September 13, 2026
          </div>

        </article>

      </main>

      <Footer />

    </div>
  );
}

export default InfoPage;
