import React, { useState } from 'react';
import { Check, Copy, Download, FileText, Info } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useAppSettings } from '../context/AppSettingsContext';

type InquiryType = 'concert' | 'presse' | 'partenariat';

interface FormValues {
  name: string;
  organization: string;
  email: string;
  inquiryType: InquiryType;
  cityCountry: string;
  desiredDate: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  cityCountry?: string;
  message?: string;
  consent?: string;
}

export const EventsAndBookingSection: React.FC = () => {
  const { language } = useAppSettings();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'concert',
    cityCountry: '',
    desiredDate: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [preparedBrief, setPreparedBrief] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);

  const inquiryCategories: {
    id: InquiryType;
    titleFr: string;
    titleEn: string;
    descFr: string;
    descEn: string;
  }[] = [
    {
      id: 'concert',
      titleFr: 'Demandes de concert',
      titleEn: 'Concert Inquiries',
      descFr:
        'Programmation de festivals, salles de spectacle et événements musicaux (sous réserve des disponibilités et conditions validées par le management).',
      descEn:
        'Festival programming, concert venues, and live music events (subject to availability and terms approved by management).',
    },
    {
      id: 'presse',
      titleFr: 'Demandes presse & médias',
      titleEn: 'Press & Media Inquiries',
      descFr:
        'Entretiens éditoriaux, reportages, plateaux radio/télévision et demandes d’éléments biographiques vérifiés.',
      descEn:
        'Editorial interviews, features, radio/TV appearances, and requests for verified biographical materials.',
    },
    {
      id: 'partenariat',
      titleFr: 'Partenariats',
      titleEn: 'Partnerships',
      descFr:
        'Collaborations culturelles et projets institutionnels soumis à l’approbation préalable de l’artiste.',
      descEn:
        'Cultural collaborations and institutional projects subject to the artist’s prior approval.',
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
    if (!formValues.consent) {
      nextErrors.consent =
        language === 'fr'
          ? 'Veuillez confirmer avoir pris connaissance du statut de préproduction du formulaire.'
          : 'Please confirm that you understand the pre-production status of this form.';
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
            ? 'Demande de concert'
            : 'Concert Inquiry'
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
              '=== FICHE DE DEMANDE PRÉPARÉE — MAAHLOX LE VIBEUR ===',
              'Statut : Concept en préproduction (non transmis automatiquement — coordonnées de management en attente de validation)',
              `Date de génération : ${new Date().toISOString().slice(0, 10)}`,
              `Type de demande : ${typeLabel}`,
              `Nom du contact : ${formValues.name.trim()}`,
              `Organisation / Structure : ${
                formValues.organization.trim() || 'Non précisée'
              }`,
              `E-mail de réponse : ${formValues.email.trim()}`,
              `Ville & Pays : ${formValues.cityCountry.trim()}`,
              `Date souhaitée : ${formValues.desiredDate || 'À définir'}`,
              '',
              '--- MESSAGE & DÉTAILS DU PROJET ---',
              formValues.message.trim(),
              '=====================================================',
            ].join('\n')
          : [
              '=== PREPARED INQUIRY BRIEF — MAAHLOX LE VIBEUR ===',
              'Status: Pre-production concept (not automatically transmitted — management contact details pending validation)',
              `Generated on: ${new Date().toISOString().slice(0, 10)}`,
              `Inquiry Type: ${typeLabel}`,
              `Contact Name: ${formValues.name.trim()}`,
              `Organization: ${
                formValues.organization.trim() || 'Not specified'
              }`,
              `Reply Email: ${formValues.email.trim()}`,
              `City & Country: ${formValues.cityCountry.trim()}`,
              `Desired Date: ${formValues.desiredDate || 'To be determined'}`,
              '',
              '--- MESSAGE & PROJECT DETAILS ---',
              formValues.message.trim(),
              '==================================================',
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
      aria-labelledby="booking-heading"
      className="relative py-20 md:py-32 theme-surface border-b theme-border transition-colors duration-250 font-poppins"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* SECTION : Presse, Management & Booking */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-12 border-b theme-border">
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
                ? 'Canal de contact en attente des coordonnées vérifiées'
                : 'Contact channel awaiting verified management coordinates'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Colonne gauche */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base theme-text opacity-90 leading-relaxed">
                {language === 'fr'
                  ? 'Sélectionnez le volet correspondant à votre démarche professionnelle. Tant que les coordonnées officielles de booking et de management ne sont pas renseignées et validées par l’équipe de l’artiste, aucune adresse e-mail ni numéro de téléphone non vérifiés ne sont publiés.'
                  : 'Select the category matching your professional inquiry. Until official booking and management coordinates are provided and validated by the artist’s team, no unverified email addresses or phone numbers are published.'}
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
                      className={`w-full text-left p-5 border transition-colors duration-150 ${
                        isSelected
                          ? 'theme-bg border-[#FF5A1F]'
                          : 'theme-bg border theme-border hover:theme-border-strong'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-display text-2xl theme-text tracking-wide">
                          {language === 'fr' ? cat.titleFr : cat.titleEn}
                        </h3>
                        <span className="text-xs font-semibold theme-accent-text">
                          {isSelected
                            ? language === 'fr'
                              ? 'ACTIF'
                              : 'ACTIVE'
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

              {/* Dossier de presse */}
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
                {siteConfig.bookingConfig.pressKitUrl ? (
                  <a
                    href={siteConfig.bookingConfig.pressKitUrl}
                    download
                    className="inline-flex items-center gap-2 text-xs font-semibold theme-accent-text hover:underline"
                  >
                    <span>
                      {language === 'fr'
                        ? 'Télécharger le dossier de presse officiel (PDF)'
                        : 'Download Official Press Kit (PDF)'}
                    </span>
                  </a>
                ) : (
                  <p className="text-xs theme-muted leading-relaxed">
                    {language === 'fr'
                      ? 'Le dossier de presse téléchargeable sera activé dès réception du fichier PDF validé par l’équipe de Maahlox Le Vibeur.'
                      : 'The downloadable press kit will be enabled once the verified PDF file is provided by Maahlox Le Vibeur’s team.'}
                  </p>
                )}
              </div>
            </div>

            {/* Colonne droite : Formulaire */}
            <div className="lg:col-span-7 theme-bg border theme-border p-6 md:p-8 shadow-xl">
              <div className="pb-5 mb-6 border-b theme-border flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold theme-text">
                    {language === 'fr'
                      ? 'Préparer un brief de demande structuré'
                      : 'Prepare a structured inquiry brief'}
                  </h3>
                  <p className="text-xs theme-muted mt-1">
                    {language === 'fr'
                      ? 'Aucun endpoint d’envoi n’étant connecté en préproduction, ce formulaire vérifie vos informations et génère une fiche prête à être copiée ou téléchargée.'
                      : 'Since no live messaging endpoint is connected in pre-production, this form validates your details and generates a brief ready to copy or download.'}
                  </p>
                </div>
                <span className="text-[11px] font-medium uppercase px-2.5 py-1 theme-surface theme-muted border theme-border shrink-0">
                  {language === 'fr'
                    ? 'Mode préproduction'
                    : 'Pre-production mode'}
                </span>
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F]"
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F]"
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F]"
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text focus:border-[#FF5A1F]"
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F]"
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
                      className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text focus:border-[#FF5A1F]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-xs font-semibold uppercase tracking-wider theme-text mb-2"
                  >
                    {language === 'fr'
                      ? 'Message et contexte de l’événement *'
                      : 'Message and event context *'}
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
                        ? 'Précisez le lieu envisagé, la jauge ou le cadre éditorial...'
                        : 'Specify the proposed venue, capacity, or editorial scope...'
                    }
                    className="w-full px-3.5 py-2.5 theme-surface border theme-border-strong text-sm theme-text placeholder:opacity-50 focus:border-[#FF5A1F]"
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

                <div>
                  <label className="flex items-start gap-3 cursor-pointer text-xs theme-muted">
                    <input
                      type="checkbox"
                      checked={formValues.consent}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          consent: e.target.checked,
                        })
                      }
                      aria-invalid={Boolean(errors.consent)}
                      className="mt-0.5 w-4 h-4 accent-[#FF5A1F]"
                    />
                    <span>
                      {language === 'fr'
                        ? 'Je comprends que ce site est un concept en attente de validation et que cette fiche est générée localement (aucune transmission automatique tant que l’endpoint officiel du management n’est pas connecté). *'
                        : 'I understand that this site is a concept awaiting validation and that this brief is generated locally (no automatic transmission until the official management endpoint is connected). *'}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs theme-accent-text">
                      {errors.consent}
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="px-6 py-3.5 theme-accent-bg font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-150 disabled:opacity-50 whitespace-nowrap shrink-0"
                  >
                    {isGenerating
                      ? language === 'fr'
                        ? 'Vérification en cours...'
                        : 'Validating...'
                      : language === 'fr'
                      ? 'Générer la fiche de demande'
                      : 'Generate inquiry brief'}
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
                      ? 'Récapitulatif de demande généré'
                      : 'Generated inquiry summary'
                  }
                  className="mt-8 p-5 theme-surface border border-[#FF5A1F] space-y-4"
                >
                  <div className="flex items-start gap-2.5 text-xs theme-text">
                    <Info
                      className="w-4 h-4 theme-accent-text shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="leading-relaxed">
                      <strong>
                        {language === 'fr'
                          ? 'Fiche générée localement (non transmise) :'
                          : 'Locally generated brief (not transmitted):'}
                      </strong>{' '}
                      {language === 'fr'
                        ? 'aucun serveur de messagerie officiel n’étant connecté sur cette version de démonstration, votre demande n’a pas été envoyée. Vous pouvez la copier ou la télécharger ci-dessous.'
                        : 'since no official messaging server is connected in this concept version, your inquiry has not been sent. You may copy or download it below.'}
                    </p>
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
      </div>
    </section>
  );
};
