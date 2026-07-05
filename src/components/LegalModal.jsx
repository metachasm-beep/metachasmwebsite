import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';

export default function LegalModal({ isOpen, onClose, type }) {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      description: 'Last updated: July 2026',
      body: (
        <div className="space-y-4 text-sm text-[#111111]/80 font-sans">
          <p>
            At Metachasm, we are committed to protecting your personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Rules, 2011.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">1. Data Collection</h3>
          <p>
            We collect personal data that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services. This may include your name, email address, and phone number. We also collect certain technical data like IP addresses and browser cookies automatically when you visit our platform.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">2. Usage of Data</h3>
          <p>
            We process your data to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with the law. We do not sell your personal data to third parties.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">3. Security Practices</h3>
          <p>
            We have implemented reasonable and appropriate security measures designed to protect the security of any personal information we process.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">4. Your Rights</h3>
          <p>
            Under the DPDP Act, you have the right to access, correct, or erase your personal data. You may withdraw your consent for data processing at any time.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">5. Grievance Officer</h3>
          <p>
            In accordance with Indian Law, the name and contact details of the Grievance Officer are provided below:<br/><br/>
            Name: Legal Department<br/>
            Email: legal@metachasm.com<br/>
            Address: Metachasm HQ, Cyber City, Gurugram, India
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      description: 'Last updated: July 2026',
      body: (
        <div className="space-y-4 text-sm text-[#111111]/80 font-sans">
          <p>
            These Terms & Conditions constitute a legally binding agreement made between you and Metachasm concerning your access to and use of the website.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">1. Intellectual Property Rights</h3>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by us.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">2. User Representations</h3>
          <p>
            By using the Site, you represent and warrant that all registration information you submit will be true, accurate, current, and complete, and that your use of the Site will not violate any applicable law or regulation.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">3. Limitation of Liability</h3>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the site.
          </p>
          <h3 className="font-bold text-[#111111] mt-4">4. Governing Law</h3>
          <p>
            These Terms shall be governed by and defined following the laws of India. Metachasm and yourself irrevocably consent that the courts of Gurugram, Haryana shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </div>
      ),
    },
  };

  const currentContent = type ? content[type] : content.privacy;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#F9F9F6]/95 backdrop-blur-xl border border-[#111111]/10 shadow-2xl p-0 overflow-hidden sm:rounded-xl">
        <div className="p-6 border-b border-[#111111]/10 bg-[#FAFAFA]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#111111] uppercase tracking-tighter" style={{ fontFamily: 'var(--font-heading)' }}>
              {currentContent.title}
            </DialogTitle>
            <DialogDescription className="font-mono text-[10px] tracking-widest text-[#0055FF] uppercase font-bold mt-2">
              {currentContent.description}
            </DialogDescription>
          </DialogHeader>
        </div>
        <ScrollArea className="h-[50vh] px-6 py-6" style={{ overflowY: 'auto' }}>
          {currentContent.body}
        </ScrollArea>
        <div className="p-4 border-t border-[#111111]/10 bg-[#FAFAFA] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-[#111111] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#0055FF] transition-colors rounded"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Acknowledge
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


