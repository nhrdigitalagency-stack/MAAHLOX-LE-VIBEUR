import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, Download, FileText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useAppSettings } from '../context/AppSettingsContext';

gsap.registerPlugin(ScrollTrigger);

type InquiryType = 'concert' | 'presse' | 'partenariat';

interface FormValues {
  name: string;
  organization: string;
  email: string;
  inquiryType: InquiryType;
  cityCountry: string;
  desiredDate: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  cityCountry?: string;
  message?: string;
}

export const EventsAndBookingSection: React.FC = () => {
  const { language } = useAppSettings();
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'concert',
    cityCountry: '',
    desiredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [preparedBrief, setPreparedBrief] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 82%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inquiryCategories: {
    id: InquiryType;
    titleFr: string;
    titleEn: string;
    descFr: string;
    descEn: string;
  }[] = [
    {
      id: 'concert',
      titleFr: 'Demandes de concert & Festivals',
      titleEn: 'Concert & Festival Inquiries',
      descFr:
        'Programmation de festivals, salles de spectacle, tournées internationales et événements musicaux.',
      descEn:
        'Festival programming, concert venues, international tours, and live music events.',
    },
    {
      id: 'presse',
      titleFr: 'Demandes presse & médias',
      titleEn: 'Press & Media Inquiries',
      descFr:
        'Entretiens éditoriaux, reportages, plateaux radio/télévision et accréditations médias.',
      descEn:
        'Editorial interviews, features, radio/TV appearances, and media accreditations.',
    },
    {
      id: 'partenariat',
      titleFr: 'Partenariats & Marques',
      titleEn: 'Brand Partnerships',
      descFr:
        'Collaborations culturelles, campagnes d’image et projets spéciaux avec Maahlox Le Vibeur.',
      descEn:
        'Cultural collaborations, brand campaigns, and special projects with Maahlox Le Vibeur.',
    },
  ];

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    if (!formValues.name.trim() || formValues.name.trim().length < 2) {
      nextErrors.name =
        language === 'fr'
          ? 'Veuillez renseigner votre nom complet (minimum 2 caractères).'
          : 'Please enter your full name (minimum 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email.trim() || !emailRegex.test(formValues.email.trim())) {
      nextErrors.email =
        language === 'fr'
          ? 'Veuillez saisir une adresse e-mail professionnelle valide.'
          : 'Please enter a valid professional email address.';
    }
    if (!formValues.cityCountry.trim()) {
      nextErrors.cityCountry =
        language === 'fr'
          ? 'Veuillez préciser la ville et le pays concernés.'
          : 'Please specify the relevant city and country.';
    }
    if (!formValues.message.trim() || formValues.message.trim().length < 15) {
      nextErrors.message =
        language === 'fr'
          ? 'Veuillez détailler votre demande (minimum 15 caractères).'
          : 'Please detail your request (minimum 15 characters).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsGenerating(true);
    window.setTimeout(() => {
      const typeLabel =
        formValues.inquiryType === 'concert'
          ? language === 'fr'
            ? 'Demande de concert / Festival'
            : 'Concert / Festival Inquiry'
          : formValues.inquiryType === 'presse'
          ? language === 'fr'
            ? 'Demande presse & média'
            : 'Press & Media Inquiry'
          : language === 'fr'
          ? 'Proposition de partenariat'
          : 'Partnership Proposal';

      const summary =
        language === 'fr'
          ? [
              '=== DOSSIER DE DEMANDE BOOKING & MANAGEMENT — MAAHLOX LE VIBEUR ===',
              `Date : ${new Date().toISOString().slice(0, 10)}`,
              `Objet : ${typeLabel}`,
              `Nom du contact : ${formValues.name.trim()}`,
              `Organisation / Structure : ${
                formValues.organization.trim() || 'Non précisée'
              }`,
              `E-mail de réponse : ${formValues.email.trim()}`,
              `Ville & Pays : ${formValues.cityCountry.trim()}`,
              `Date souhaitée : ${formValues.desiredDate || 'À définir'}`,
              '',
              '--- MESSAGE & DÉTAILS DE L’ÉVÉNEMENT ---',
              formValues.message.trim(),
              '===================================================================',
            ].join('\n')
          : [
              '=== BOOKING & MANAGEMENT INQUIRY BRIEF — MAAHLOX LE VIBEUR ===',
              `Date: ${new Date().toISOString().slice(0, 10)}`,
              `Subject: ${typeLabel}`,
              `Contact Name: ${formValues.name.trim()}`,
              `Organization: ${
                formValues.organization.trim() || 'Not specified'
              }`,
              `Reply Email: ${formValues.email.trim()}`,
              `City & Country: ${formValues.cityCountry.trim()}`,
              `Desired Date: ${formValues.desiredDate || 'To be determined'}`,
              '',
              '--- MESSAGE & EVENT DETAILS ---',
              formValues.message.trim(),
              '==============================================================',
            ].join('\n');

      setPreparedBrief(summary);
      setIsGenerating(false);
    }, 180);
  };

  const handleCopyBrief = async () => {
    if (!preparedBrief) return;
    try {
      await navigator.clipboard.writeText(preparedBrief);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const handleDownloadBrief = () => {
    if (!preparedBrief) return;
    const blob = new Blob([preparedBrief], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `booking-maahlox-${formValues.inquiryType}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      aria-labelledby="booking-heading"
      className="relative py-20 md:py-32 theme-surface border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div
          ref={headerRef}
          className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border"
        >
          <div>
            <p className="text-xs md:text-sm font-semibold uppercase tracking-widest theme-accent-text mb-2">
              {language === 'fr'
                ? '09. Presse, Management & Booking'
                : '09. Press, Management & Booking'}
            </p>
            <h2
              id="booking-heading"
              className="font-display text-4xl md:text-6xl theme-text tracking-tight [text-wrap:balance]"
            >
              {language === 'fr'
                ? 'FAISONS VIBRER VOTRE ÉVÉNEMENT.'
                : 'LET’S MAKE YOUR EVENT VIBRATE.'}
            </h2>
          </div>
          <span className="text-xs font-semibold theme-accent-text">
            {language === 'fr'
              ? 'Booking International · Presse · Partenariats'
              : 'International Booking · Press · Partnerships'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Colonne gauche */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-6">
            <p className="text-base theme-text opacity-90 leading-relaxed">
              {language === 'fr'
                ? 'Sélectionnez le volet correspondant à votre démarche professionnelle pour préparer votre demande de programmation, d’entretien média ou de partenariat.'
                : 'Select the category matching your professional inquiry to prepare your show booking, media interview, or partnership request.'}
            </p>

            <div className="space-y-4">
              {inquiryCategories.map((cat) => {
                const isSelected = formValues.inquiryType === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setFormValues((prev) => ({
                        ...prev,
                        inquiryType: cat.id,
                      }))
                    }
                    className={`w-full text-left p-5 border transition-all duration-250 hover:-translate-y-1 ${
                      isSelected
                        ? 'theme-bg border-[#FF5A1F] shadow-lg'
                        : 'theme-bg border theme-border hover:border-[#FF5A1F]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="font-display text-2xl theme-text tracking-wide">
                        {language === 'fr' ? cat.titleFr : cat.titleEn}
                      </h3>
                      <span className="text-xs font-semibold theme-accent-text">
                        {isSelected
                          ? language === 'fr'
                            ? 'SÉLECTIONNÉ'
                            : 'SELECTED'
                          : language === 'fr'
                          ? 'CHOISIR'
                          : 'SELECT'}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm theme-muted leading-relaxed">
                      {language === 'fr' ? cat.descFr : cat.descEn}
                    </p>
                  </button>
                );
              })}
            </div>

            {siteConfig.bookingConfig.pressKitUrl && (
              <div className="p-5 theme-bg border theme-border space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider theme-text">
                  <FileText
                    className="w-4 h-4 theme-accent-text"
                    aria-hidden="true"
                  />
                  <span>
                    {language === 'fr'
                      ? 'Dossier de presse (EPK)'
                      : 'Electronic Press Kit (EPK)'}
                  </span>
                </div>
                <a
                  href={siteConfig.bookingConfig.pressKitUrl}
                  download
                  className="inline-flex items-center gap-2 text-xs font-semibold theme-accent-text hover:underline"
                >
                  <span>
                    {language === 'fr'
                      ? 'Télécharger le dossier de presse (PDF)'
                      : 'Download Press Kit (PDF)'}
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Colonne droite : Formulaire */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 theme-bg border theme-border hover:border-[#FF5A1F]/50 transition-colors duration-300 p-6 md:p-8 shadow-xl"
          >
            <div className="pb-5 mb-6 border-b theme-border">
              <h3 className="text-lg font-semibold theme-text">
                {language === 'fr'
                  ? 'Formulaire de demande professionnelle'
                  : 'Professional Inquiry Form'}
              </h3>
              <p className="text-xs theme-muted mt-1">
                {language === 'fr'
                  ? 'Renseignez les informations de votre événement ou projet pour générer votre dossier de demande.'
                  : 'Fill in your event or project details to generate your inquiry brief.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-name"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr' ? 'Nom complet *' : 'Full name *'}
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={formValues.name}
                    onChange={(e) =>
                      setFormValues({ ...formValues, name: e.target.value })
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    placeholder={
                      language === 'fr' ? 'Ex. : Marc Ndongo' : 'e.g. Marc Ndongo'
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F] transition-colors duration-150"
                  />
                  {errors.name && (
                    <p
                      id="error-name"
                      className="mt-1.5 text-xs theme-accent-text"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-org"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr'
                      ? 'Organisation / Structure'
                      : 'Organization / Company'}
                  </label>
                  <input
                    id="booking-org"
                    type="text"
                    value={formValues.organization}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        organization: e.target.value,
                      })
                    }
                    placeholder={
                      language === 'fr'
                        ? 'Festival, média, agence...'
                        : 'Festival, media outlet, agency...'
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F] transition-colors duration-150"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr'
                      ? 'Adresse e-mail professionnelle *'
                      : 'Professional email address *'}
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'error-email' : undefined
                    }
                    placeholder="contact@organisation.org"
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F] transition-colors duration-150"
                  />
                  {errors.email && (
                    <p
                      id="error-email"
                      className="mt-1.5 text-xs theme-accent-text"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-type"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr'
                      ? 'Type de demande *'
                      : 'Inquiry type *'}
                  </label>
                  <select
                    id="booking-type"
                    value={formValues.inquiryType}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        inquiryType: e.target.value as InquiryType,
                      })
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text focus:border-[#FF5A1F] transition-colors duration-150"
                  >
                    <option value="concert">
                      {language === 'fr'
                        ? 'Demande de concert'
                        : 'Concert inquiry'}
                    </option>
                    <option value="presse">
                      {language === 'fr'
                        ? 'Demande presse & média'
                        : 'Press & media inquiry'}
                    </option>
                    <option value="partenariat">
                      {language === 'fr' ? 'Partenariat' : 'Partnership'}
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="booking-location"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr'
                      ? 'Ville et pays *'
                      : 'City and country *'}
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    required
                    value={formValues.cityCountry}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        cityCountry: e.target.value,
                      })
                    }
                    aria-invalid={Boolean(errors.cityCountry)}
                    aria-describedby={
                      errors.cityCountry ? 'error-location' : undefined
                    }
                    placeholder={
                      language === 'fr'
                        ? 'Ex. : Douala, Cameroun'
                        : 'e.g. Douala, Cameroon'
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F] transition-colors duration-150"
                  />
                  {errors.cityCountry && (
                    <p
                      id="error-location"
                      className="mt-1.5 text-xs theme-accent-text"
                    >
                      {errors.cityCountry}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr' ? 'Date souhaitée' : 'Desired date'}
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={formValues.desiredDate}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        desiredDate: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text focus:border-[#FF5A1F] transition-colors duration-150"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="booking-message"
                  className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                >
                  {language === 'fr'
                    ? 'Message et détails de l’événement *'
                    : 'Message and event details *'}
                </label>
                <textarea
                  id="booking-message"
                  rows={4}
                  required
                  value={formValues.message}
                  onChange={(e) =>
                    setFormValues({ ...formValues, message: e.target.value })
                  }
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'error-message' : undefined
                  }
                  placeholder={
                    language === 'fr'
                      ? 'Précisez le lieu envisagé, la jauge ou le cadre de votre projet...'
                      : 'Specify the proposed venue, capacity, or project scope...'
                  }
                  className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F] transition-colors duration-150"
                />
                {errors.message && (
                  <p
                    id="error-message"
                    className="mt-1.5 text-xs theme-accent-text"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-7 py-3.5 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-95 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,90,31,0.35)] transition-all duration-200 disabled:opacity-50 whitespace-nowrap shrink-0"
                >
                  {isGenerating
                    ? language === 'fr'
                      ? 'Préparation en cours...'
                      : 'Preparing...'
                    : language === 'fr'
                    ? 'Valider ma demande'
                    : 'Submit inquiry'}
                </button>

                <span className="text-[11px] theme-muted">
                  {language === 'fr' ? '* Champs requis' : '* Required fields'}
                </span>
              </div>
            </form>

            {preparedBrief && (
              <div
                role="region"
                aria-label={
                  language === 'fr'
                    ? 'Récapitulatif de demande'
                    : 'Inquiry summary'
                }
                className="mt-8 p-5 theme-surface border border-[#FF5A1F] space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold theme-accent-text uppercase tracking-wider">
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {language === 'fr'
                      ? 'Votre dossier de demande est prêt'
                      : 'Your inquiry brief is ready'}
                  </span>
                </div>

                <pre className="p-4 theme-bg border theme-border font-poppins text-xs theme-text opacity-90 overflow-x-auto whitespace-pre-wrap">
                  {preparedBrief}
                </pre>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyBrief}
                    className="inline-flex items-center gap-2 px-4 py-2.5 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150"
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {language === 'fr'
                            ? 'Copié dans le presse-papiers'
                            : 'Copied to clipboard'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>
                          {language === 'fr'
                            ? 'Copier le récapitulatif'
                            : 'Copy summary'}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadBrief}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border theme-border-strong text-xs font-medium uppercase tracking-wider theme-text hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors duration-150"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {language === 'fr'
                        ? 'Télécharger (.txt)'
                        : 'Download (.txt)'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
