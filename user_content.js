// =========================================================================
// user_content.js - Persistenter Dokumenten- & Content-Upload für alle Fächer
// Speichert Mitschriften, Zusammenfassungen, Tafelbilder, PDFs und Notizen
// 100% Client-Side via IndexedDB (Funktioniert lokal und auf GitHub Pages)
// =========================================================================

const USER_CONTENT_CATEGORIES = {
  mitschrift: { id: 'mitschrift', label: '📝 Mitschrift', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.12)' },
  zusammenfassung: { id: 'zusammenfassung', label: '📑 Zusammenfassung', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  uebung: { id: 'uebung', label: '🎯 Übung / Blatt', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  klausurtipp: { id: 'klausurtipp', label: '💡 Klausurtipp', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  formeln: { id: 'formeln', label: '📐 Formelsammlung', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)' },
  sonstiges: { id: 'sonstiges', label: '📎 Sonstiges', color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)' }
};

// --- 1. INDEXEDDB DATABASE WRAPPER ---
class UserContentDB {
  constructor() {
    this.dbName = 'LernportalUserDB';
    this.dbVersion = 1;
    this.storeName = 'documents';
    this.db = null;
    this.isReady = false;
    this.initPromise = this.init();
  }

  async init() {
    if (this.isReady && this.db) return this.db;

    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB nicht unterstützt - Fallback auf LocalStorage');
        this.isReady = true;
        resolve(null);
        return;
      }

      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('fachId', 'fachId', { unique: false });
          store.createIndex('category', 'category', { unique: false });
          store.createIndex('createdAt', 'createdAt', { unique: false });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        this.isReady = true;
        await this._seedDefaults();
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB Fehler beim Öffnen:', event.target.error);
        this.isReady = true;
        resolve(null);
      };
    });
  }

  async _seedDefaults() {
    try {
      const existing = await this.getDocument('doc_meds_pdf');
      if (!existing && !localStorage.getItem('deleted_doc_meds_pdf')) {
        await this.addDocument({
          id: 'doc_meds_pdf',
          fachId: 'physik',
          title: 'Meds.pdf – Komplette Mitschrift, Klausurthemen & Aufgaben',
          category: 'mitschrift',
          notes: 'Originale Unterrichtsmitschrift IGS Göttingen Ph12 EA:\n• S. 31: Die 7 Klausurthemen für Freitag\n• S. 32: Die 4 typischen Funktionen (Proportional, Quadratisch, Antiproportional, 1/r²)\n• S. 33: Klausurblatt "Auswerten von Messwerten II" (Coulomb, Plattenkondensator, Entladekurve)\n• S. 28/30: Auslenkung geladene Kugel im E-Feld\n• S. 7: Widerspruchsbeweis Feldlinien\n• S. 4: Glimmlampe & Polprüfer\n• S. 2/3: Elektroskop & Influenz',
          fileName: 'Meds.pdf',
          fileType: 'application/pdf',
          fileSize: 5697330,
          fileData: 'Meds.pdf',
          createdAt: '2026-09-16T22:02:45.000Z'
        });
      }
    } catch (e) {
      console.log('Default docs seed info:', e);
    }
  }

  async addDocument(doc) {
    await this.initPromise;
    if (!doc.id) {
      doc.id = 'doc_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
    }
    if (!doc.createdAt) {
      doc.createdAt = new Date().toISOString();
    }
    doc.updatedAt = new Date().toISOString();

    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.put(doc);
        req.onsuccess = () => resolve(doc);
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      // Fallback
      const list = this._getFallbackList();
      list.push(doc);
      this._saveFallbackList(list);
      return doc;
    }
  }

  async updateDocument(id, updates) {
    await this.initPromise;
    const doc = await this.getDocument(id);
    if (!doc) throw new Error('Dokument nicht gefunden: ' + id);

    const updated = { ...doc, ...updates, updatedAt: new Date().toISOString() };
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.put(updated);
        req.onsuccess = () => resolve(updated);
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      const list = this._getFallbackList().map(d => d.id === id ? updated : d);
      this._saveFallbackList(list);
      return updated;
    }
  }

  async deleteDocument(id) {
    await this.initPromise;
    if (id === 'doc_meds_pdf') {
      try { localStorage.setItem('deleted_doc_meds_pdf', 'true'); } catch (e) {}
    }
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readwrite');
        const store = tx.objectStore(this.storeName);
        const req = store.delete(id);
        req.onsuccess = () => resolve(true);
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      const list = this._getFallbackList().filter(d => d.id !== id);
      this._saveFallbackList(list);
      return true;
    }
  }

  async getDocument(id) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.get(id);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      const list = this._getFallbackList();
      return list.find(d => d.id === id) || null;
    }
  }

  async getDocumentsByFach(fachId) {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const index = store.index('fachId');
        const req = index.getAll(fachId);
        req.onsuccess = () => {
          const docs = req.result || [];
          docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          resolve(docs);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      const list = this._getFallbackList();
      const filtered = list.filter(d => d.fachId === fachId);
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return filtered;
    }
  }

  async getAllDocuments() {
    await this.initPromise;
    if (this.db) {
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.storeName], 'readonly');
        const store = tx.objectStore(this.storeName);
        const req = store.getAll();
        req.onsuccess = () => {
          const docs = req.result || [];
          docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          resolve(docs);
        };
        req.onerror = (e) => reject(e.target.error);
      });
    } else {
      const list = this._getFallbackList();
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return list;
    }
  }

  async getCountByFach(fachId) {
    const docs = await this.getDocumentsByFach(fachId);
    return docs.length;
  }

  _getFallbackList() {
    try {
      const raw = localStorage.getItem('lernportal_user_docs_fallback');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  _saveFallbackList(list) {
    try {
      localStorage.setItem('lernportal_user_docs_fallback', JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage voll oder gesperrt:', e);
    }
  }
}

const userDB = new UserContentDB();

// --- 2. UPLOAD STATE & CONTROLLER ---
let currentUploadFile = null;
let currentUploadFileDataUrl = null;
let selectedUploadCategory = 'mitschrift';
let activeUploadFachId = 'physik';
let currentActiveViewerDocId = null;
let currentFachFilterCat = 'all';

// Open Upload Modal
function openUploadModal(fachId, defaultCategory = 'mitschrift') {
  activeUploadFachId = fachId || (typeof navState !== 'undefined' && navState.currentFach) || 'physik';
  selectedUploadCategory = defaultCategory;
  currentUploadFile = null;
  currentUploadFileDataUrl = null;

  const modal = document.getElementById('uploadDocModal');
  if (!modal) return;

  // Populate Fach select
  const select = document.getElementById('uploadDocFachSelect');
  if (select) {
    select.innerHTML = '';
    const faecherList = (typeof FAECHER_DATA !== 'undefined') ? Object.values(FAECHER_DATA) : [
      { id: 'physik', name: 'Physik eA (PH11)' },
      { id: 'mathe', name: 'Mathematik eA (MA11)' },
      { id: 'politik', name: 'Politik-Wirtschaft (PO11)' },
      { id: 'geschichte', name: 'Geschichte (GE11)' },
      { id: 'deutsch', name: 'Deutsch (DE11)' },
      { id: 'chemie', name: 'Chemie (CH11)' },
      { id: 'biologie', name: 'Biologie (BI11)' },
      { id: 'englisch', name: 'Englisch (EN11)' },
      { id: 'informatik', name: 'Informatik (IF11)' }
    ];

    faecherList.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = `${f.name || f.id} ${f.courseCode ? '(' + f.courseCode + ')' : ''}`;
      if (f.id === activeUploadFachId) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // Reset inputs
  const titleInput = document.getElementById('uploadDocTitle');
  if (titleInput) titleInput.value = '';

  const notesInput = document.getElementById('uploadDocNotes');
  if (notesInput) notesInput.value = '';

  const fileInput = document.getElementById('uploadDocFileInput');
  if (fileInput) fileInput.value = '';

  // Reset dropzone display
  resetUploadDropzoneUI();

  // Highlight category
  selectUploadCategory(selectedUploadCategory);

  // Clear feedback
  const feedback = document.getElementById('uploadDocFeedback');
  if (feedback) {
    feedback.style.display = 'none';
    feedback.textContent = '';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeUploadModal(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('uploadDocModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function selectUploadCategory(catId) {
  selectedUploadCategory = catId;
  document.querySelectorAll('.upload-cat-chip').forEach(chip => {
    if (chip.getAttribute('data-cat') === catId) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

function resetUploadDropzoneUI() {
  const dropPrompt = document.getElementById('dropzonePrompt');
  const filePreview = document.getElementById('dropzoneFilePreview');
  if (dropPrompt) dropPrompt.style.display = 'flex';
  if (filePreview) filePreview.style.display = 'none';
}

function setupDropzoneEvents() {
  const dropzone = document.getElementById('uploadDocDropzone');
  const fileInput = document.getElementById('uploadDocFileInput');
  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    dropzone.addEventListener(name, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleSelectedFile(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (fileInput.files && fileInput.files.length > 0) {
      handleSelectedFile(fileInput.files[0]);
    }
  });
}

function handleSelectedFile(file) {
  if (!file) return;

  // Max 45 MB check
  if (file.size > 45 * 1024 * 1024) {
    alert('Die ausgewählte Datei ist sehr groß (> 45 MB). Bitte wähle eine Datei unter 45 MB, um eine optimale Performance zu gewährleisten.');
    return;
  }

  currentUploadFile = file;

  // Auto-fill title if empty
  const titleInput = document.getElementById('uploadDocTitle');
  if (titleInput && !titleInput.value.trim()) {
    // Remove extension for title
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
    titleInput.value = nameWithoutExt;
  }

  const dropPrompt = document.getElementById('dropzonePrompt');
  const filePreview = document.getElementById('dropzoneFilePreview');
  const fileNameEl = document.getElementById('previewFileName');
  const fileSizeEl = document.getElementById('previewFileSize');
  const fileIconEl = document.getElementById('previewFileIcon');
  const imgThumbEl = document.getElementById('previewImageThumb');

  if (dropPrompt) dropPrompt.style.display = 'none';
  if (filePreview) filePreview.style.display = 'flex';
  if (fileNameEl) fileNameEl.textContent = file.name;
  if (fileSizeEl) fileSizeEl.textContent = formatBytes(file.size);

  const isImg = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

  if (fileIconEl) {
    if (isImg) fileIconEl.textContent = '🖼️';
    else if (isPdf) fileIconEl.textContent = '📄';
    else fileIconEl.textContent = '📝';
  }

  // Read as Data URL
  const reader = new FileReader();
  reader.onload = (e) => {
    currentUploadFileDataUrl = e.target.result;
    if (isImg && imgThumbEl) {
      imgThumbEl.src = currentUploadFileDataUrl;
      imgThumbEl.style.display = 'block';
    } else if (imgThumbEl) {
      imgThumbEl.style.display = 'none';
    }
  };
  reader.readAsDataURL(file);
}

function removeSelectedFile(event) {
  if (event) event.stopPropagation();
  currentUploadFile = null;
  currentUploadFileDataUrl = null;
  const fileInput = document.getElementById('uploadDocFileInput');
  if (fileInput) fileInput.value = '';
  resetUploadDropzoneUI();
}

async function saveUploadDocument(event) {
  if (event) event.preventDefault();

  const titleInput = document.getElementById('uploadDocTitle');
  const notesInput = document.getElementById('uploadDocNotes');
  const fachSelect = document.getElementById('uploadDocFachSelect');
  const saveBtn = document.getElementById('btnSaveUploadDoc');
  const feedback = document.getElementById('uploadDocFeedback');

  const title = (titleInput && titleInput.value.trim()) || (currentUploadFile ? currentUploadFile.name : 'Neues Dokument');
  const notes = (notesInput && notesInput.value.trim()) || '';
  const fachId = fachSelect ? fachSelect.value : activeUploadFachId;

  if (!title && !currentUploadFile && !notes) {
    alert('Bitte gib mindestens einen Titel, eine Notiz oder wähle eine Datei aus!');
    return;
  }

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '⏳ Speichern...';
  }

  try {
    const newDoc = {
      fachId: fachId,
      title: title,
      category: selectedUploadCategory || 'mitschrift',
      notes: notes,
      fileName: currentUploadFile ? currentUploadFile.name : null,
      fileType: currentUploadFile ? currentUploadFile.type : (notes ? 'text/plain' : null),
      fileSize: currentUploadFile ? currentUploadFile.size : (notes ? new Blob([notes]).size : 0),
      fileData: currentUploadFileDataUrl || null,
      createdAt: new Date().toISOString()
    };

    await userDB.addDocument(newDoc);

    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#10b981';
      feedback.textContent = '✓ Erfolgreich im Fach gespeichert!';
    }

    setTimeout(() => {
      closeUploadModal();

      // Refresh corresponding views
      if (typeof renderFachDetail === 'function' && typeof navState !== 'undefined' && navState.currentFach === fachId) {
        renderFachDetail(fachId);
      } else if (fachId === 'physik' && typeof renderPhysikPortal === 'function') {
        renderPhysikPortal();
      } else if (fachId === 'seminarfach' && typeof renderSeminarfachView === 'function') {
        renderSeminarfachView();
      }

      // Update badge counts
      updateSubjectDocumentBadge(fachId);
    }, 400);

  } catch (err) {
    console.error('Fehler beim Speichern des Dokuments:', err);
    if (feedback) {
      feedback.style.display = 'block';
      feedback.style.color = '#ef4444';
      feedback.textContent = 'Fehler beim Speichern: ' + err.message;
    }
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = '💾 Dokument speichern';
    }
  }
}

// --- 3. DOCUMENT VIEWER MODAL ---
async function openDocViewer(docId) {
  try {
    const doc = await userDB.getDocument(docId);
    if (!doc) {
      alert('Dokument konnte nicht geladen werden.');
      return;
    }

    currentActiveViewerDocId = docId;
    const modal = document.getElementById('userDocViewerModal');
    if (!modal) return;

    // Header Meta
    const titleEl = document.getElementById('viewerDocTitle');
    const catEl = document.getElementById('viewerDocCategory');
    const fachEl = document.getElementById('viewerDocFach');
    const metaEl = document.getElementById('viewerDocMeta');

    if (titleEl) titleEl.textContent = doc.title;
    
    const catInfo = USER_CONTENT_CATEGORIES[doc.category] || USER_CONTENT_CATEGORIES.sonstiges;
    if (catEl) {
      catEl.textContent = catInfo.label;
      catEl.style.color = catInfo.color;
      catEl.style.backgroundColor = catInfo.bg;
      catEl.style.borderColor = catInfo.color + '44';
    }

    const fachData = (typeof FAECHER_DATA !== 'undefined' && FAECHER_DATA[doc.fachId]) ? FAECHER_DATA[doc.fachId].name : doc.fachId.toUpperCase();
    if (fachEl) fachEl.textContent = '📚 ' + fachData;

    const dateStr = formatDate(doc.createdAt);
    const sizeStr = doc.fileSize ? formatBytes(doc.fileSize) : '';
    if (metaEl) metaEl.textContent = `Hochgeladen: ${dateStr} ${sizeStr ? '• ' + sizeStr : ''}`;

    // Content Display
    const contentBox = document.getElementById('viewerDocContent');
    if (contentBox) {
      contentBox.innerHTML = '';

      const isImg = doc.fileType && doc.fileType.startsWith('image/');
      const isPdf = doc.fileType === 'application/pdf' || (doc.fileName && doc.fileName.toLowerCase().endsWith('.pdf'));

      if (isImg && doc.fileData) {
        contentBox.innerHTML = `
          <div class="viewer-img-container">
            <img src="${doc.fileData}" alt="${escapeHtml(doc.title)}" class="viewer-full-img" />
          </div>
        `;
      } else if (isPdf && doc.fileData) {
        contentBox.innerHTML = `
          <div class="viewer-pdf-container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; padding: 0.4rem 0.6rem; background: var(--bg-subtle); border-radius: 6px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">📄 Eingebettetes PDF: <strong>${escapeHtml(doc.fileName || doc.title)}</strong></span>
              <a href="${doc.fileData}" target="_blank" class="btn-pdf-external-link">↗️ In neuem Tab öffnen</a>
            </div>
            <iframe src="${doc.fileData}" class="viewer-pdf-frame" title="${escapeHtml(doc.title)}"></iframe>
          </div>
        `;
      } else if (doc.fileData) {
        // Other file type
        contentBox.innerHTML = `
          <div class="viewer-file-generic-box">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">📎</div>
            <h3>${escapeHtml(doc.fileName || doc.title)}</h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem;">${formatBytes(doc.fileSize)} • ${escapeHtml(doc.fileType || 'Datei')}</p>
            <button class="btn-doc-download-primary" onclick="downloadCurrentViewerDoc()">
              ⬇️ Datei herunterladen (${escapeHtml(doc.fileName)})
            </button>
          </div>
        `;
      } else {
        // Pure text / notes
        contentBox.innerHTML = `
          <div class="viewer-text-only-box">
            <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">📝</div>
            <p style="color: var(--text-secondary); font-size: 0.85rem;">Persönliche Text-Mitschrift</p>
          </div>
        `;
      }

      // Render Notes Section if exists
      if (doc.notes && doc.notes.trim()) {
        const notesBox = document.createElement('div');
        notesBox.className = 'viewer-notes-callout';
        notesBox.innerHTML = `
          <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>💬</span><span>Deine persönlichen Notizen &amp; Klausurtipps:</span>
          </div>
          <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; white-space: pre-wrap;">${escapeHtml(doc.notes)}</div>
        `;
        contentBox.appendChild(notesBox);
      }
    }

    // Download Button setup
    const dlBtn = document.getElementById('viewerBtnDownload');
    if (dlBtn) {
      if (doc.fileData) {
        dlBtn.style.display = 'inline-flex';
        dlBtn.onclick = () => downloadDoc(doc);
      } else {
        dlBtn.style.display = 'none';
      }
    }

    // Delete Button setup
    const delBtn = document.getElementById('viewerBtnDelete');
    if (delBtn) {
      delBtn.onclick = () => deleteDocWithConfirm(doc.id, doc.fachId);
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

  } catch (err) {
    console.error('Fehler beim Anzeigen:', err);
    alert('Dokument konnte nicht angezeigt werden: ' + err.message);
  }
}

function closeDocViewer(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('userDocViewerModal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

function downloadDoc(doc) {
  if (!doc || !doc.fileData) {
    alert('Für dieses Element ist keine Datei zum Herunterladen hinterlegt.');
    return;
  }
  const link = document.createElement('a');
  link.href = doc.fileData;
  link.download = doc.fileName || `${doc.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.bin`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadCurrentViewerDoc() {
  if (!currentActiveViewerDocId) return;
  userDB.getDocument(currentActiveViewerDocId).then(doc => {
    if (doc) downloadDoc(doc);
  });
}

async function deleteDocWithConfirm(id, fachId) {
  if (!confirm('Möchtest du dieses Dokument wirklich unwiderruflich löschen?')) {
    return;
  }

  try {
    await userDB.deleteDocument(id);
    closeDocViewer();

    // Refresh views
    if (typeof renderFachDetail === 'function' && typeof navState !== 'undefined' && navState.currentFach === fachId) {
      renderFachDetail(fachId);
    } else if (fachId === 'physik' && typeof renderPhysikPortal === 'function') {
      renderPhysikPortal();
    } else if (fachId === 'seminarfach' && typeof renderSeminarfachView === 'function') {
      renderSeminarfachView();
    }
    updateSubjectDocumentBadge(fachId);
  } catch (err) {
    console.error('Fehler beim Löschen:', err);
    alert('Fehler beim Löschen: ' + err.message);
  }
}

// --- 4. SUBJECT VIEW RENDERERS ---

// Render the user documents section inside any subject view (Mathe, Politik, etc.)
async function renderSubjectUserDocuments(fachId, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const docs = await userDB.getDocumentsByFach(fachId);

  let html = `
    <div class="user-content-section">
      <div class="user-content-header-bar">
        <div class="user-content-title-box">
          <div class="user-content-badge-title">
            <span>📁</span>
            <span>Meine Dokumente &amp; Mitschriften</span>
            <span class="user-doc-count-pill">${docs.length}</span>
          </div>
          <p class="user-content-subtitle">
            Hier kannst du deine eigenen Mitschriften, Zusammenfassungen, Tafelbild-Fotos oder Arbeitsblätter hochladen und jederzeit abrufen.
          </p>
        </div>
        <div class="user-content-action-buttons">
          <button class="btn-upload-accent" onclick="openUploadModal('${fachId}')">
            <span>➕</span><span>Dokument hochladen</span>
          </button>
        </div>
      </div>
  `;

  if (docs.length === 0) {
    html += `
      <div class="user-docs-empty-card" onclick="openUploadModal('${fachId}')">
        <div class="empty-icon">📁</div>
        <div class="empty-title">Noch keine eigenen Dokumente für dieses Fach</div>
        <p class="empty-desc">
          Klicke hier oder oben auf „Dokument hochladen“, um deine erste Mitschrift, ein PDF oder ein Foto einzufügen.
        </p>
        <button class="btn-empty-upload" onclick="event.stopPropagation(); openUploadModal('${fachId}')">
          ➕ Jetzt Datei oder Notiz hinzufügen
        </button>
      </div>
    `;
  } else {
    html += `
      <div class="user-docs-grid">
    `;

    docs.forEach(doc => {
      html += renderDocCardHtml(doc);
    });

    html += `
      </div>
    `;
  }

  html += `</div>`;
  container.innerHTML = html;
}

// Render dedicated Physics Uploads View (Mode 'uploads' in Physik portal)
async function renderPhysikUploadsView(containerEl) {
  if (!containerEl) return;

  const allDocs = await userDB.getDocumentsByFach('physik');
  const filtered = (currentFachFilterCat === 'all') 
    ? allDocs 
    : allDocs.filter(d => d.category === currentFachFilterCat);

  let html = `
    <!-- Top Action & Info Bar -->
    <div class="physik-uploads-hero-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.4rem;">
            <span class="p-badge" style="background: rgba(125, 122, 255, 0.15); color: #7d7aff; border: 1px solid rgba(125, 122, 255, 0.3);">
              📁 Physik-Archiv
            </span>
            <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 700;">
              ${allDocs.length} Dokument(e) gesichert
            </span>
          </div>
          <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.4rem 0;">
            Deine persönlichen Physik-Dokumente &amp; Mitschriften
          </h2>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0; max-width: 680px; line-height: 1.45;">
            Lade deine eigenen Fotos von Tafelbildern, handschriftliche Rechnungen, Zusammenfassungen oder Klausurtipps hoch. Alle Dateien sind 100% lokal und offline verfügbar.
          </p>
        </div>
        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
          <button class="btn-upload-accent" onclick="openUploadModal('physik')">
            <span>➕</span><span>Dokument hochladen</span>
          </button>
          <button class="btn-cal-action" onclick="exportUserContentBackup()" title="Alle Dokumente als JSON sichern">
            <span>💾</span><span>Backup sichern</span>
          </button>
          <button class="btn-cal-action" onclick="triggerImportUserContentBackup()" title="Gesichertes Backup wiederherstellen">
            <span>📥</span><span>Wiederherstellen</span>
          </button>
          <input type="file" id="importBackupFileInput" style="display:none;" accept=".json" onchange="handleImportBackupFile(event)">
        </div>
      </div>

      <!-- Quick Drag & Drop Banner -->
      <div class="quick-drop-inline" onclick="openUploadModal('physik')">
        <span style="font-size: 1.4rem;">📥</span>
        <span>Klicke hier oder ziehe Dateien hinein, um sofort neues Physik-Material hochzuladen.</span>
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div class="doc-filter-bar">
      <button class="doc-filter-pill ${currentFachFilterCat === 'all' ? 'active' : ''}" onclick="filterUserDocsCategory('all')">
        Alle anzeigen (${allDocs.length})
      </button>
      <button class="doc-filter-pill ${currentFachFilterCat === 'mitschrift' ? 'active' : ''}" onclick="filterUserDocsCategory('mitschrift')">
        📝 Mitschriften
      </button>
      <button class="doc-filter-pill ${currentFachFilterCat === 'zusammenfassung' ? 'active' : ''}" onclick="filterUserDocsCategory('zusammenfassung')">
        📑 Zusammenfassungen
      </button>
      <button class="doc-filter-pill ${currentFachFilterCat === 'uebung' ? 'active' : ''}" onclick="filterUserDocsCategory('uebung')">
        🎯 Übungen &amp; Rechnungen
      </button>
      <button class="doc-filter-pill ${currentFachFilterCat === 'klausurtipp' ? 'active' : ''}" onclick="filterUserDocsCategory('klausurtipp')">
        💡 Klausurtipps
      </button>
      <button class="doc-filter-pill ${currentFachFilterCat === 'formeln' ? 'active' : ''}" onclick="filterUserDocsCategory('formeln')">
        📐 Formelsammlungen
      </button>
    </div>
  `;

  if (filtered.length === 0) {
    html += `
      <div class="user-docs-empty-card" onclick="openUploadModal('physik')">
        <div class="empty-icon">📁</div>
        <div class="empty-title">
          ${currentFachFilterCat === 'all' ? 'Noch keine Physik-Dokumente vorhanden' : 'Keine Dokumente in dieser Kategorie'}
        </div>
        <p class="empty-desc">
          Lade deine erste Physik-Mitschrift, Formelübersicht oder Tafelbild-Aufnahme hoch.
        </p>
        <button class="btn-empty-upload" onclick="event.stopPropagation(); openUploadModal('physik', '${currentFachFilterCat !== 'all' ? currentFachFilterCat : 'mitschrift'}')">
          ➕ Jetzt erstes Dokument hochladen
        </button>
      </div>
    `;
  } else {
    html += `
      <div class="user-docs-grid">
    `;

    filtered.forEach(doc => {
      html += renderDocCardHtml(doc);
    });

    html += `
      </div>
    `;
  }

  containerEl.innerHTML = html;
}

function filterUserDocsCategory(cat) {
  currentFachFilterCat = cat;
  if (typeof renderPhysikPortal === 'function') {
    renderPhysikPortal();
  }
}

// Generates HTML for an individual document card
function renderDocCardHtml(doc) {
  const cat = USER_CONTENT_CATEGORIES[doc.category] || USER_CONTENT_CATEGORIES.sonstiges;
  const isImg = doc.fileType && doc.fileType.startsWith('image/');
  const isPdf = doc.fileType === 'application/pdf' || (doc.fileName && doc.fileName.toLowerCase().endsWith('.pdf'));

  let icon = '📝';
  if (isImg) icon = '🖼️';
  else if (isPdf) icon = '📄';

  const dateStr = formatDate(doc.createdAt);
  const sizeStr = doc.fileSize ? formatBytes(doc.fileSize) : '';

  let thumbHtml = '';
  if (isImg && doc.fileData) {
    thumbHtml = `
      <div class="doc-card-thumb-box" onclick="openDocViewer('${doc.id}')">
        <img src="${doc.fileData}" alt="${escapeHtml(doc.title)}" class="doc-card-thumb-img" loading="lazy" />
      </div>
    `;
  }

  const notesSnippet = doc.notes ? escapeHtml(doc.notes.length > 90 ? doc.notes.substring(0, 90) + '...' : doc.notes) : '';

  return `
    <div class="user-doc-card" onclick="openDocViewer('${doc.id}')">
      <div class="user-doc-card-body">
        <div class="doc-card-top-row">
          <span class="user-doc-badge" style="color: ${cat.color}; background: ${cat.bg}; border: 1px solid ${cat.color}33;">
            ${cat.label}
          </span>
          <span class="doc-card-date">${dateStr}</span>
        </div>

        ${thumbHtml}

        <div class="doc-card-title-row">
          <span class="doc-card-type-icon">${icon}</span>
          <div class="doc-card-title">${escapeHtml(doc.title)}</div>
        </div>

        ${doc.fileName ? `<div class="doc-card-filename">📎 ${escapeHtml(doc.fileName)} ${sizeStr ? '(' + sizeStr + ')' : ''}</div>` : ''}

        ${notesSnippet ? `
          <div class="doc-card-notes-snippet">
            ${notesSnippet}
          </div>
        ` : ''}
      </div>

      <div class="user-doc-card-footer" onclick="event.stopPropagation()">
        <button class="btn-doc-view" onclick="openDocViewer('${doc.id}')" title="Vorschau &amp; Details anzeigen">
          👁️ Öffnen
        </button>
        ${doc.fileData ? `
          <button class="btn-doc-dl" onclick="downloadDocById('${doc.id}')" title="Datei herunterladen">
            ⬇️ Download
          </button>
        ` : ''}
        <button class="btn-doc-del" onclick="deleteDocWithConfirm('${doc.id}', '${doc.fachId}')" title="Dokument löschen">
          🗑️
        </button>
      </div>
    </div>
  `;
}

function downloadDocById(id) {
  userDB.getDocument(id).then(doc => {
    if (doc) downloadDoc(doc);
  });
}

// Update badges in UI if elements exist
async function updateSubjectDocumentBadge(fachId) {
  const badge = document.getElementById(`docBadge_${fachId}`);
  if (badge) {
    const count = await userDB.getCountByFach(fachId);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  }

  const physikBadge = document.getElementById('physikDocCountBadge');
  if (physikBadge && fachId === 'physik') {
    const count = await userDB.getCountByFach('physik');
    physikBadge.textContent = count > 0 ? `(${count})` : '';
  }
}

// --- 5. BACKUP & EXPORT/IMPORT ---
async function exportUserContentBackup() {
  try {
    const allDocs = await userDB.getAllDocuments();
    if (allDocs.length === 0) {
      alert('Du hast noch keine eigenen Dokumente hochgeladen, die exportiert werden könnten.');
      return;
    }

    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      source: 'Tonda Oberstufen-Portal',
      documentCount: allDocs.length,
      documents: allDocs
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tonda_lernportal_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Backup erfolgreich erstellt! ${allDocs.length} Dokument(e) wurden exportiert.`);
  } catch (err) {
    console.error('Fehler beim Export:', err);
    alert('Fehler beim Exportieren: ' + err.message);
  }
}

function triggerImportUserContentBackup() {
  const fileInput = document.getElementById('importBackupFileInput');
  if (fileInput) {
    fileInput.click();
  }
}

async function handleImportBackupFile(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data.documents || !Array.isArray(data.documents)) {
      alert('Ungültiges Backup-Format: Keine Dokumente gefunden.');
      return;
    }

    let importedCount = 0;
    for (const doc of data.documents) {
      if (doc && doc.id) {
        await userDB.addDocument(doc);
        importedCount++;
      }
    }

    alert(`Erfolgreich ${importedCount} Dokument(e) wiederhergestellt!`);

    // Refresh view
    if (typeof renderFachDetail === 'function' && typeof navState !== 'undefined' && navState.currentFach) {
      renderFachDetail(navState.currentFach);
    } else if (typeof renderPhysikPortal === 'function') {
      renderPhysikPortal();
    }
  } catch (err) {
    console.error('Fehler beim Import:', err);
    alert('Fehler beim Importieren der Datei: ' + err.message);
  } finally {
    event.target.value = '';
  }
}

// --- 6. UTILITY FUNCTIONS ---
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(isoStr) {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (e) {
    return isoStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Auto-initialize dropzone when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDropzoneEvents);
} else {
  setupDropzoneEvents();
}
