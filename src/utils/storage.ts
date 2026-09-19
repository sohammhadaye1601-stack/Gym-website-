import { WebsiteContent, EnquirySubmission } from '../types';
import { initialContent } from '../data/initialContent';

const CONTENT_STORAGE_KEY = 'slam_nanganallur_website_content_v1';
const ENQUIRIES_STORAGE_KEY = 'slam_nanganallur_enquiries_v1';

export function getStoredContent(): WebsiteContent {
  try {
    const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with initialContent in case new properties are added
      return { ...initialContent, ...parsed };
    }
  } catch (e) {
    console.error('Error reading from localStorage', e);
  }
  return initialContent;
}

export function saveStoredContent(content: WebsiteContent): boolean {
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    return true;
  } catch (e) {
    console.error('Error writing to localStorage', e);
    return false;
  }
}

export function resetStoredContent(): WebsiteContent {
  try {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing localStorage', e);
  }
  return initialContent;
}

export function getStoredEnquiries(): EnquirySubmission[] {
  try {
    const saved = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error reading enquiries', e);
  }
  return [];
}

export function saveNewEnquiry(enquiry: Omit<EnquirySubmission, 'id' | 'timestamp'>): EnquirySubmission {
  const newSubmission: EnquirySubmission = {
    ...enquiry,
    id: 'enq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  try {
    const existing = getStoredEnquiries();
    const updated = [newSubmission, ...existing];
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving enquiry', e);
  }

  return newSubmission;
}

export function deleteStoredEnquiry(id: string): EnquirySubmission[] {
  try {
    const existing = getStoredEnquiries();
    const updated = existing.filter((item) => item.id !== id);
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting enquiry', e);
    return [];
  }
}

// Convert image file to compressed base64 data URL to keep localStorage tidy and performant
export async function processImageFile(file: File, maxWidth = 1400, maxHeight = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      reject(new Error('Only JPG, PNG, and WebP images are supported.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to WebP or JPEG for space efficiency
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing.'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}
