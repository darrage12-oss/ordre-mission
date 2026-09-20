const PDF = {
    // Generate exact 100% replica of the Moroccan SRM TTA Ordre de Mission form
    generateTemplate(missionData) {
        const m = missionData || {};
        const agent = m.agent || {};
        
        const year = m.dateDepart ? new Date(m.dateDepart).getFullYear() : (new Date().getFullYear());
        const dateDepart = this._formatDate(m.dateDepart);
        const dateRetour = this._formatDate(m.dateRetour);
        const heureDepart = this._formatTime(m.heureDepart);
        const heureRetour = this._formatTime(m.heureRetour);
        const dateCreation = this._formatDate(m.dateCreation || m.dateDepart);
        const lieuCreation = m.lieuCreation || agent.province || 'OUEZZANE';

        // Checkbox: empty square or square with checkmark
        const checkSvg = `<svg width="12" height="12" viewBox="0 0 12 12" style="vertical-align: middle; margin-right: 6px; display: inline-block;">
            <rect x="0.5" y="0.5" width="11" height="11" fill="#fff" stroke="#000" stroke-width="1"/>
            <path d="M2.5 6 L5 9 L9.5 2.5" fill="none" stroke="#000" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
        
        const emptyBoxSvg = `<svg width="12" height="12" viewBox="0 0 12 12" style="vertical-align: middle; margin-right: 6px; display: inline-block;">
            <rect x="0.5" y="0.5" width="11" height="11" fill="#fff" stroke="#000" stroke-width="1"/>
        </svg>`;

        const isCov = Boolean(m.covoiturage);
        const isVehServ = Boolean(m.vehiculeService);
        const isTranspCom = Boolean(m.transportCommun);
        const isVehPerso = Boolean(m.vehiculePerso);

        const logoSrc = (typeof LOGO_BASE64 !== 'undefined' && LOGO_BASE64) ? LOGO_BASE64 : 'assets/logo.png';

        return `
        <div class="a4-document">
            <!-- HEADER TABLE 100% EXACT -->
            <table class="om-header-table">
                <tr>
                    <td class="om-hdr-logo">
                        <img src="${logoSrc}" alt="Logo SRM TTA" class="om-logo-img">
                    </td>
                    <td class="om-hdr-center">
                        <div class="om-hdr-subtitle">Formulaire Direction Provinciale</div>
                        <div class="om-hdr-title">Ordre de mission</div>
                    </td>
                    <td class="om-hdr-right">
                        <div class="om-hdr-right-cell om-b-bottom">${year}</div>
                        <div class="om-hdr-right-cell om-b-bottom">Version : 01</div>
                        <div class="om-hdr-right-cell">Page 1 sur 1</div>
                    </td>
                </tr>
            </table>

            <!-- SECTION AGENT -->
            <div class="om-section-header">Agent</div>
            <div class="om-data-block">
                <div class="om-line">
                    <span class="om-label om-lbl-w1">Nom et prénom :</span>
                    <span class="om-val">${agent.nom || ''}</span>
                </div>
                <div class="om-row-two">
                    <div class="om-col-left">
                        <span class="om-label om-lbl-w1">Matricule :</span>
                        <span class="om-val">${agent.matricule || ''}</span>
                    </div>
                    <div class="om-col-right">
                        <span class="om-label om-lbl-w2">Fonction :</span>
                        <span class="om-val">${agent.fonction || ''}</span>
                    </div>
                </div>
                <div class="om-row-two">
                    <div class="om-col-left">
                        <span class="om-label om-lbl-w1">Direction :</span>
                        <span class="om-val">${agent.direction || ''}</span>
                    </div>
                    <div class="om-col-right">
                        <span class="om-label om-lbl-w2">Département :</span>
                        <span class="om-val">${agent.departement || ''}</span>
                    </div>
                </div>
                <div class="om-line">
                    <span class="om-label om-lbl-w1">Division :</span>
                    <span class="om-val">${agent.division || ''}</span>
                </div>
                <div class="om-line">
                    <span class="om-label om-lbl-w1">Province / Préfecture :</span>
                    <span class="om-val">${agent.province || ''}</span>
                </div>
            </div>

            <!-- SECTION MISSION -->
            <div class="om-section-header">Mission</div>
            <div class="om-data-block">
                <div class="om-line">
                    <span class="om-label om-lbl-w1">Lieu de déplacement :</span>
                    <span class="om-val">${m.lieuDeplacement || ''}</span>
                </div>
                <div class="om-line">
                    <span class="om-label om-lbl-w1">Motif du déplacement :</span>
                    <span class="om-val">${m.motifDeplacement || ''}</span>
                </div>
                <div class="om-row-two">
                    <div class="om-col-left">
                        <span class="om-label om-lbl-w1">Date de départ :</span>
                        <span class="om-val">${dateDepart}</span>
                    </div>
                    <div class="om-col-right">
                        <span class="om-label om-lbl-w2">Heure de départ :</span>
                        <span class="om-val">${heureDepart}</span>
                    </div>
                </div>
                <div class="om-row-two">
                    <div class="om-col-left">
                        <span class="om-label om-lbl-w1">Date de retour :</span>
                        <span class="om-val">${dateRetour}</span>
                    </div>
                    <div class="om-col-right">
                        <span class="om-label om-lbl-w2">Heure de retour :</span>
                        <span class="om-val">${heureRetour}</span>
                    </div>
                </div>
            </div>

            <!-- SECTION MOYEN DE TRANSPORT -->
            <div class="om-section-header">Moyen de transport</div>
            <div class="om-data-block">
                <div class="om-transport-line">
                    ${isCov ? checkSvg : emptyBoxSvg} Covoiturage :
                </div>
                <div class="om-transport-line">
                    ${isVehServ ? checkSvg : emptyBoxSvg} Véhicule de service : ${m.vehiculeServiceNum || ''}
                </div>
                <div class="om-transport-line">
                    ${isTranspCom ? checkSvg : emptyBoxSvg} Transport commun :
                </div>
                <div class="om-row-two" style="margin-bottom: 3px;">
                    <div class="om-col-left">
                        ${isVehPerso ? checkSvg : emptyBoxSvg} Véhicule personnel - Marque : <span class="om-val-inline">${m.vehiculePersoMarque || ''}</span>
                    </div>
                    <div class="om-col-right">
                        Puissance Fiscale : <span class="om-val-inline">${m.puissanceFiscale || ''}</span>
                    </div>
                </div>

                <!-- Kilometrage, Fait le, Signature -->
                <div class="om-footer-details">
                    <div class="om-footer-left">
                        <div class="om-km-line">
                            Kilométrage parcouru (Km)&nbsp;&nbsp;&nbsp;&nbsp;<strong>${m.kilometrage ? m.kilometrage + ' Km' : ''}</strong>
                        </div>
                        <div class="om-date-box">
                            <div>Fait le : ${dateCreation}</div>
                            <div>à ${lieuCreation}</div>
                        </div>
                    </div>
                    <div class="om-footer-right">
                        <div class="om-sig-text">Signature de l'agent</div>
                    </div>
                </div>
            </div>

            <!-- 4 CADRES VISAS 2x2 -->
            <div class="om-visas-wrap">
                <div class="om-visa-box">
                    <div class="om-visa-hdr">Visa Chef de hiérarchique</div>
                    <div class="om-visa-body"></div>
                </div>
                <div class="om-visa-box">
                    <div class="om-visa-hdr">Visa Chef de Département</div>
                    <div class="om-visa-body"></div>
                </div>
                <div class="om-visa-box">
                    <div class="om-visa-hdr">Visa Directeur Provincial / Préfectorat</div>
                    <div class="om-visa-body"></div>
                </div>
                <div class="om-visa-box">
                    <div class="om-visa-hdr">Visa Directeur Central Concerné</div>
                    <div class="om-visa-body"></div>
                </div>
            </div>
        </div>
        `;
    },

    // Show preview modal with the generated template
    showPreview(missionData) {
        this._currentMissionData = missionData;
        const html = this.generateTemplate(missionData);
        const container = document.getElementById('preview-container');
        if (container) {
            container.innerHTML = html;
        }
        const modal = document.getElementById('modal-preview');
        if (modal) {
            modal.classList.add('show');
        }
    },

    // Close preview modal
    closePreview(event) {
        if (event && event.target !== event.currentTarget) return;
        const modal = document.getElementById('modal-preview');
        if (modal) {
            modal.classList.remove('show');
        }
    },

    // Export 100% pixel-perfect A4 PDF using html2pdf strictly on 1 single page
    exportPDF() {
        const modalContent = document.getElementById('preview-container');
        const element = modalContent ? modalContent.querySelector('.a4-document') : null;
        if (!element) {
            App.showToast('Erreur : Aucun document à exporter', 'error');
            return;
        }

        const agentName = this._currentMissionData?.agent?.nom || 'Agent';
        const date = this._currentMissionData?.dateDepart || new Date().toISOString().split('T')[0];
        const cleanName = agentName.replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `Ordre_de_Mission_${cleanName}_${date}.pdf`;

        App.showToast('Génération du PDF A4 (1 page)...', 'info');

        // Remove the 'modal-preview' display temporarily to let html2canvas capture the raw element naturally
        const origTransform = element.style.transform;
        const origMargin = element.style.margin;
        
        const container = document.getElementById('preview-container');
        const origJustify = container.style.justifyContent;

        // Force native size and remove centering margins that confuse html2canvas
        element.style.transform = 'none';
        element.style.margin = '0';
        container.style.justifyContent = 'flex-start';
        
        // Ensure no scroll offsets affect capture
        const originalScrollX = window.scrollX;
        const originalScrollY = window.scrollY;
        window.scrollTo(0, 0);

        const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        html2pdf().set(opt).from(element).toPdf().get('pdf').then((pdf) => {
            // Force strictly 1 page: delete any extra blank pages caused by pixel rounding
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = totalPages; i > 1; i--) {
                pdf.deletePage(i);
            }
        }).save().then(() => {
            // Restore original styles
            element.style.transform = origTransform;
            element.style.margin = origMargin;
            container.style.justifyContent = origJustify;
            window.scrollTo(originalScrollX, originalScrollY);
            App.showToast('PDF A4 (1 page) téléchargé avec succès !', 'success');
        }).catch(err => {
            element.style.transform = origTransform;
            element.style.margin = origMargin;
            container.style.justifyContent = origJustify;
            window.scrollTo(originalScrollX, originalScrollY);
            console.error(err);
            App.showToast('Erreur lors de l\'export PDF', 'error');
        });
    },

    exportPDFById(id) {
        const mission = Missions.getById(id);
        if (!mission) {
            App.showToast('Mission non trouvée', 'error');
            return;
        }
        this.showPreview(mission);
        setTimeout(() => this.exportPDF(), 400);
    },

    // Print with exact @media print styling
    print() {
        const content = document.getElementById('preview-container').innerHTML;
        const printDiv = document.getElementById('print-template');
        printDiv.innerHTML = content;
        window.print();
    },

    _formatDate(dateStr) {
        if (!dateStr) return '';
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    },

    _formatTime(timeStr) {
        if (!timeStr) return '';
        return timeStr.replace(':', 'h');
    },

    _currentMissionData: null
};
