import React, { useState, useRef } from 'react';
import { WebsiteContent, EnquirySubmission, GalleryItem, TrainerItem, TransformationItem, ClassItem, InstagramPost } from '../types';
import { processImageFile, getStoredEnquiries, deleteStoredEnquiry } from '../utils/storage';
import {
  X,
  Upload,
  Trash2,
  RefreshCw,
  Save,
  Check,
  Image as ImageIcon,
  FileText,
  Users,
  Calendar,
  Inbox,
  Download,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: WebsiteContent;
  onSaveContent: (updated: WebsiteContent) => void;
  onResetDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  content,
  onSaveContent,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'content' | 'classes' | 'trainers' | 'enquiries' | 'backup'>('images');
  const [imageCategory, setImageCategory] = useState<'hero' | 'logo' | 'gallery' | 'trainers' | 'results' | 'classes' | 'instagram'>('hero');
  
  // Local editable draft state
  const [draft, setDraft] = useState<WebsiteContent>(content);
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(getStoredEnquiries());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync draft whenever content updates
  React.useEffect(() => {
    setDraft(content);
  }, [content]);

  React.useEffect(() => {
    if (isOpen) {
      setEnquiries(getStoredEnquiries());
    }
  }, [isOpen]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingUploadTarget, setPendingUploadTarget] = useState<{
    section: string;
    id?: string;
  } | null>(null);

  if (!isOpen) return null;

  const triggerUpload = (section: string, id?: string) => {
    setPendingUploadTarget({ section, id });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !pendingUploadTarget) return;

    try {
      setIsProcessingFile(true);
      setErrorMessage('');
      const dataUrl = await processImageFile(file);

      const target = pendingUploadTarget;

      if (target.section === 'hero') {
        setDraft((prev) => ({
          ...prev,
          hero: { ...prev.hero, heroImage: dataUrl },
        }));
      } else if (target.section === 'logo') {
        setDraft((prev) => ({
          ...prev,
          logoImage: dataUrl,
        }));
      } else if (target.section === 'gallery') {
        if (target.id) {
          setDraft((prev) => ({
            ...prev,
            gallery: prev.gallery.map((g) => (g.id === target.id ? { ...g, image: dataUrl } : g)),
          }));
        } else {
          // Add new gallery item
          const newItem: GalleryItem = {
            id: 'gal-' + Date.now(),
            title: 'SLAM Studio Update',
            category: 'Gym',
            image: dataUrl,
            aspect: 'square',
          };
          setDraft((prev) => ({
            ...prev,
            gallery: [newItem, ...prev.gallery],
          }));
        }
      } else if (target.section === 'trainers' && target.id) {
        setDraft((prev) => ({
          ...prev,
          trainers: prev.trainers.map((t) => (t.id === target.id ? { ...t, image: dataUrl } : t)),
        }));
      } else if (target.section === 'results') {
        if (target.id) {
          setDraft((prev) => ({
            ...prev,
            results: {
              ...prev.results,
              items: prev.results.items.map((r) => (r.id === target.id ? { ...r, imageAfter: dataUrl } : r)),
            },
          }));
        } else {
          // Add new result item
          const newRes: TransformationItem = {
            id: 'res-' + Date.now(),
            title: 'New Member Journey',
            duration: '12 Weeks',
            achievement: 'Custom transformation goal achieved.',
            imageAfter: dataUrl,
            isPlaceholder: false,
          };
          setDraft((prev) => ({
            ...prev,
            results: {
              ...prev.results,
              items: [newRes, ...prev.results.items],
            },
          }));
        }
      } else if (target.section === 'classes' && target.id) {
        setDraft((prev) => ({
          ...prev,
          groupClasses: {
            ...prev.groupClasses,
            classes: prev.groupClasses.classes.map((c) => (c.id === target.id ? { ...c, image: dataUrl } : c)),
          },
        }));
      } else if (target.section === 'instagram' && target.id) {
        setDraft((prev) => ({
          ...prev,
          instagramSection: {
            ...prev.instagramSection,
            posts: prev.instagramSection.posts.map((p) => (p.id === target.id ? { ...p, image: dataUrl } : p)),
          },
        }));
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process image file');
    } finally {
      setIsProcessingFile(false);
      setPendingUploadTarget(null);
    }
  };

  const handleSave = () => {
    onSaveContent(draft);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportBackup = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(draft, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `slam_nanganallur_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        setDraft(parsed);
        onSaveContent(parsed);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      } catch (err) {
        setErrorMessage('Invalid JSON backup file format');
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = deleteStoredEnquiry(id);
    setEnquiries(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      {/* Hidden file input for uploads */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp,image/jpg"
        className="hidden"
      />

      <div
        className="relative w-full max-w-5xl bg-[#0f0f0f] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#141414] border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E60000] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                SLAM NANGANALLUR — Studio Control Panel
              </h3>
              <p className="text-xs text-neutral-400">
                Manual image uploads, content updates & customer inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {savedSuccess && (
              <span className="text-xs text-[#25D366] font-bold flex items-center gap-1.5 animate-fadeIn">
                <Check className="w-4 h-4" /> Saved Successfully!
              </span>
            )}

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Publish Changes</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Control Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 bg-[#121212] border-b border-neutral-850 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Image Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'content'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Business Content</span>
          </button>

          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'classes'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Classes & Timings</span>
          </button>

          <button
            onClick={() => setActiveTab('trainers')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'trainers'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Trainers</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'enquiries'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Inbox className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Leads & Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'backup'
                ? 'border-[#E60000] text-white bg-neutral-900/50'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-[#E60000]" />
            <span>Backup & Reset</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-red-950/80 border border-red-800 text-xs text-red-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage('')} className="text-red-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: IMAGE MANAGEMENT SYSTEM */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* Category sub-filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-850">
                {(
                  [
                    { key: 'hero', label: '1. Hero Image' },
                    { key: 'logo', label: '2. SLAM Logo' },
                    { key: 'gallery', label: '3. Studio Gallery' },
                    { key: 'trainers', label: '4. Trainers' },
                    { key: 'results', label: '5. Client Results' },
                    { key: 'classes', label: '6. Group Classes' },
                    { key: 'instagram', label: '7. Instagram Posts' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setImageCategory(cat.key)}
                    className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      imageCategory === cat.key
                        ? 'bg-[#E60000] text-white shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 1. HERO IMAGE */}
              {imageCategory === 'hero' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Main Hero Background Image
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Supports JPG, PNG, and WebP. Automatically optimized with dark gradient overlay.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerUpload('hero')}
                      disabled={isProcessingFile}
                      className="px-4 py-2 rounded bg-neutral-800 hover:bg-[#E60000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isProcessingFile ? 'Processing...' : 'Upload / Replace'}</span>
                    </button>
                  </div>

                  <div className="relative h-72 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
                    <img
                      src={draft.hero.heroImage}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-6">
                      <div>
                        <span className="px-2.5 py-0.5 rounded bg-[#E60000] text-white text-[10px] font-bold uppercase">
                          Active Hero Preview
                        </span>
                        <h4
                          className="text-2xl font-bold uppercase text-white mt-1"
                          style={{ fontFamily: "'Bebas Neue', 'Oswald', sans-serif" }}
                        >
                          {draft.hero.heading}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. LOGO */}
              {imageCategory === 'logo' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        SLAM Studio Logo
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload custom official SLAM logo PNG/SVG with transparent background.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerUpload('logo')}
                        disabled={isProcessingFile}
                        className="px-4 py-2 rounded bg-neutral-800 hover:bg-[#E60000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Logo</span>
                      </button>

                      {draft.logoImage && (
                        <button
                          onClick={() => setDraft((p) => ({ ...p, logoImage: undefined }))}
                          className="px-3 py-2 rounded bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Use Default Vector</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                    {draft.logoImage ? (
                      <img src={draft.logoImage} alt="Custom logo preview" className="max-h-24 object-contain" />
                    ) : (
                      <div className="text-center">
                        <p className="text-xs text-neutral-500 mb-2">Using Built-in SLAM Athletic Vector Logo</p>
                        <span className="text-3xl font-black italic tracking-tighter uppercase text-white">
                          SL<span className="text-[#E60000]">A</span>M
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 3. STUDIO GALLERY */}
              {imageCategory === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Studio Gallery Photos ({draft.gallery.length})
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload real gym photos, strength rigs, and sports turf images.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerUpload('gallery')}
                      className="px-4 py-2 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Add New Photo</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {draft.gallery.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex flex-col justify-between group"
                      >
                        <div className="relative aspect-video">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-[#E60000]">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-3">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                gallery: prev.gallery.map((g) =>
                                  g.id === item.id ? { ...g, title: e.target.value } : g
                                ),
                              }))
                            }
                            className="w-full text-xs font-semibold text-white bg-neutral-950 border border-neutral-800 rounded px-2 py-1 mb-2"
                          />
                          <div className="flex items-center justify-between gap-1">
                            <button
                              onClick={() => triggerUpload('gallery', item.id)}
                              className="flex-1 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold uppercase text-neutral-200"
                            >
                              Replace
                            </button>
                            <button
                              onClick={() =>
                                setDraft((prev) => ({
                                  ...prev,
                                  gallery: prev.gallery.filter((g) => g.id !== item.id),
                                }))
                              }
                              className="p-1 rounded bg-red-950 hover:bg-red-900 text-red-300"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. TRAINERS PHOTOS */}
              {imageCategory === 'trainers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Certified Coaches Photos
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload photos of your coaches, physiotherapists, and dietitians.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {draft.trainers.map((tr) => (
                      <div key={tr.id} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                          <img src={tr.image} alt={tr.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-bold text-white uppercase truncate">{tr.name}</p>
                        <p className="text-[11px] text-[#E60000] truncate">{tr.role}</p>
                        <button
                          onClick={() => triggerUpload('trainers', tr.id)}
                          className="w-full mt-3 py-1.5 rounded bg-neutral-800 hover:bg-[#E60000] text-[10px] font-bold uppercase text-white transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Upload className="w-3 h-3" /> Replace Photo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. CLIENT RESULTS PHOTOS */}
              {imageCategory === 'results' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Member Transformation Photos
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload real progress pictures from your studio members.
                      </p>
                    </div>
                    <button
                      onClick={() => triggerUpload('results')}
                      className="px-4 py-2 rounded bg-[#E60000] hover:bg-[#CC0000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Add Transformation</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {draft.results.items.map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                          <img src={item.imageAfter} alt={item.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                            {item.duration}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              results: {
                                ...prev.results,
                                items: prev.results.items.map((r) =>
                                  r.id === item.id ? { ...r, title: e.target.value } : r
                                ),
                              },
                            }))
                          }
                          className="w-full text-xs font-semibold text-white bg-neutral-950 border border-neutral-800 rounded px-2 py-1 mb-2"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => triggerUpload('results', item.id)}
                            className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold uppercase text-white"
                          >
                            Replace Photo
                          </button>
                          <button
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                results: {
                                  ...prev.results,
                                  items: prev.results.items.filter((r) => r.id !== item.id),
                                },
                              }))
                            }
                            className="p-1.5 rounded bg-red-950 hover:bg-red-900 text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. GROUP CLASSES PHOTOS */}
              {imageCategory === 'classes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Group Classes Images
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Update imagery for HIIT, Functional training, and Mobility sessions.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {draft.groupClasses.classes.map((cls) => (
                      <div key={cls.id} className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                          <img src={cls.image} alt={cls.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-bold text-white uppercase truncate">{cls.name}</p>
                        <p className="text-[11px] text-neutral-400 truncate">{cls.time}</p>
                        <button
                          onClick={() => triggerUpload('classes', cls.id)}
                          className="w-full mt-2 py-1.5 rounded bg-neutral-800 hover:bg-[#E60000] text-[10px] font-bold uppercase text-white transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Upload className="w-3 h-3" /> Replace Photo
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. INSTAGRAM PREVIEW IMAGES */}
              {imageCategory === 'instagram' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                        Instagram Grid Images ({draft.instagramSection.posts.length})
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Upload screenshots or photos corresponding to your Instagram posts.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                    {draft.instagramSection.posts.map((post) => (
                      <div key={post.id} className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                        <div className="relative aspect-square rounded overflow-hidden mb-2">
                          <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
                        </div>
                        <button
                          onClick={() => triggerUpload('instagram', post.id)}
                          className="w-full py-1 rounded bg-neutral-800 hover:bg-[#E60000] text-[9px] font-bold uppercase text-white"
                        >
                          Replace
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BUSINESS CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={draft.businessName}
                    onChange={(e) => setDraft({ ...draft, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Full Brand Title
                  </label>
                  <input
                    type="text"
                    value={draft.fullName}
                    onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={draft.tagline}
                    onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    WhatsApp Number (digits with country code, e.g. 919840855444)
                  </label>
                  <input
                    type="text"
                    value={draft.whatsapp}
                    onChange={(e) => setDraft({ ...draft, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={draft.instagramUrl}
                    onChange={(e) => setDraft({ ...draft, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={draft.instagramHandle}
                    onChange={(e) => setDraft({ ...draft, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                  Full Studio Address
                </label>
                <textarea
                  rows={2}
                  value={draft.address}
                  onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                />
              </div>

              <div className="pt-4 border-t border-neutral-850">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#E60000] mb-3">
                  Hero Section Text
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Hero Heading</label>
                    <input
                      type="text"
                      value={draft.hero.heading}
                      onChange={(e) =>
                        setDraft({ ...draft, hero: { ...draft.hero, heading: e.target.value } })
                      }
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Hero Subheadline</label>
                    <input
                      type="text"
                      value={draft.hero.subheadline}
                      onChange={(e) =>
                        setDraft({ ...draft, hero: { ...draft.hero, subheadline: e.target.value } })
                      }
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">Hero Secondary Line</label>
                    <textarea
                      rows={2}
                      value={draft.hero.secondaryLine}
                      onChange={(e) =>
                        setDraft({ ...draft, hero: { ...draft.hero, secondaryLine: e.target.value } })
                      }
                      className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-850">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#E60000] mb-3">
                  About Section Text
                </h4>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">About Description</label>
                  <textarea
                    rows={3}
                    value={draft.about.description}
                    onChange={(e) =>
                      setDraft({ ...draft, about: { ...draft.about, description: e.target.value } })
                    }
                    className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 text-sm text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLASSES & TIMINGS */}
          {activeTab === 'classes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Group Class Schedule
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Edit class names, days, timings, and assigned trainers.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {draft.groupClasses.classes.map((cls, idx) => (
                  <div key={cls.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Class Name
                        </label>
                        <input
                          type="text"
                          value={cls.name}
                          onChange={(e) => {
                            const newClasses = [...draft.groupClasses.classes];
                            newClasses[idx].name = e.target.value;
                            setDraft({
                              ...draft,
                              groupClasses: { ...draft.groupClasses, classes: newClasses },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Days
                        </label>
                        <input
                          type="text"
                          value={cls.days}
                          onChange={(e) => {
                            const newClasses = [...draft.groupClasses.classes];
                            newClasses[idx].days = e.target.value;
                            setDraft({
                              ...draft,
                              groupClasses: { ...draft.groupClasses, classes: newClasses },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Timings
                        </label>
                        <input
                          type="text"
                          value={cls.time}
                          onChange={(e) => {
                            const newClasses = [...draft.groupClasses.classes];
                            newClasses[idx].time = e.target.value;
                            setDraft({
                              ...draft,
                              groupClasses: { ...draft.groupClasses, classes: newClasses },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                          Assigned Trainer
                        </label>
                        <input
                          type="text"
                          value={cls.trainer}
                          onChange={(e) => {
                            const newClasses = [...draft.groupClasses.classes];
                            newClasses[idx].trainer = e.target.value;
                            setDraft({
                              ...draft,
                              groupClasses: { ...draft.groupClasses, classes: newClasses },
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRAINERS */}
          {activeTab === 'trainers' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Coaching Staff Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {draft.trainers.map((tr, idx) => (
                  <div key={tr.id} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                        Trainer Name
                      </label>
                      <input
                        type="text"
                        value={tr.name}
                        onChange={(e) => {
                          const updated = [...draft.trainers];
                          updated[idx].name = e.target.value;
                          setDraft({ ...draft, trainers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={tr.role}
                        onChange={(e) => {
                          const updated = [...draft.trainers];
                          updated[idx].role = e.target.value;
                          setDraft({ ...draft, trainers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1">
                        Specializations
                      </label>
                      <input
                        type="text"
                        value={tr.specialization}
                        onChange={(e) => {
                          const updated = [...draft.trainers];
                          updated[idx].specialization = e.target.value;
                          setDraft({ ...draft, trainers: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LEADS & ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Received Member Enquiries ({enquiries.length})
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Prospective members who submitted the website enquiry form.
                  </p>
                </div>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-12 bg-neutral-900/50 rounded-xl border border-neutral-800">
                  <Inbox className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
                  <p className="text-sm text-neutral-400">No customer enquiries submitted yet.</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    When visitors fill out the "Start Your Fitness Journey" form, leads appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{enq.name}</span>
                          <span className="px-2 py-0.5 rounded bg-[#E60000]/20 text-[#E60000] text-[10px] font-bold uppercase">
                            {enq.interest}
                          </span>
                          <span className="text-[11px] text-neutral-500">{enq.timestamp}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300">
                          <span>Phone: <strong>{enq.phone}</strong></span>
                          {enq.email && <span>Email: {enq.email}</span>}
                        </div>
                        {enq.message && (
                          <p className="text-xs text-neutral-400 bg-neutral-950 p-2 rounded mt-1 italic">
                            "{enq.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20enquiring%20with%20SLAM%20Nanganallur!`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded bg-[#25D366] text-white text-xs font-bold uppercase"
                        >
                          WhatsApp Lead
                        </a>
                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-1.5 rounded bg-red-950 hover:bg-red-900 text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-xl">
              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Export Website Data
                </h4>
                <p className="text-xs text-neutral-400">
                  Save all custom uploaded images, schedule times, trainer info, and contact details as a portable JSON file.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#E60000]" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Restore From Backup
                </h4>
                <p className="text-xs text-neutral-400">
                  Upload a previously saved SLAM website JSON backup to instantly restore all content.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                  <Upload className="w-4 h-4 text-[#E60000]" />
                  <span>Choose JSON Backup File</span>
                  <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                </label>
              </div>

              <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/50 space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-red-400">
                  Reset to Studio Defaults
                </h4>
                <p className="text-xs text-neutral-400">
                  Revert all images and text back to the default SLAM Nanganallur brand template.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all website images and content to defaults?')) {
                      onResetDefaults();
                      onClose();
                    }
                  }}
                  className="px-4 py-2 rounded bg-red-900/80 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
